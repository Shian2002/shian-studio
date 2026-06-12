import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter for maptile
const tileTimestamps = new Map<string, number[]>();
const TILE_RATE_WINDOW = 60_000; // 1 minute
const TILE_RATE_MAX = 60; // max 60 tile requests per window

function isTileRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = tileTimestamps.get(ip)?.filter(
    (t) => now - t < TILE_RATE_WINDOW
  ) ?? [];

  // Cleanup old entries periodically to prevent memory leak
  if (tileTimestamps.size > 1000) {
    for (const [key, ts] of tileTimestamps) {
      if (ts.every((t) => now - t >= TILE_RATE_WINDOW)) {
        tileTimestamps.delete(key);
      }
    }
  }

  if (timestamps.length >= TILE_RATE_MAX) {
    return true;
  }

  tileTimestamps.set(ip, [...timestamps, now]);
  return false;
}

// Map tile proxy - avoids browser Tracking Prevention blocking direct tile requests
export async function GET(request: NextRequest) {
  // Rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : (request.headers.get('x-real-ip') ?? 'unknown');
  if (isTileRateLimited(ip)) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const z = searchParams.get('z');
  const x = searchParams.get('x');
  const y = searchParams.get('y');

  if (!z || !x || !y) {
    return new NextResponse('Missing z/x/y parameters', { status: 400 });
  }

  // Validate z/x/y are integers within valid ranges
  const zNum = parseInt(z, 10);
  const xNum = parseInt(x, 10);
  const yNum = parseInt(y, 10);

  if (isNaN(zNum) || isNaN(xNum) || isNaN(yNum)) {
    return new NextResponse('Invalid tile coordinates — must be integers', { status: 400 });
  }
  if (zNum < 0 || zNum > 19) {
    return new NextResponse('Invalid zoom level — must be 0–19', { status: 400 });
  }
  const maxTile = Math.pow(2, zNum);
  if (xNum < 0 || xNum >= maxTile || yNum < 0 || yNum >= maxTile) {
    return new NextResponse('Invalid tile coordinates for zoom level', { status: 400 });
  }

  // Try multiple tile sources in order
  const sources = [
    `https://a.tile.openstreetmap.org/${zNum}/${xNum}/${yNum}.png`,
    `https://b.tile.openstreetmap.org/${zNum}/${xNum}/${yNum}.png`,
    `https://c.tile.openstreetmap.org/${zNum}/${xNum}/${yNum}.png`,
  ];

  for (const url of sources) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.openstreetmap.org/',
        },
        signal: AbortSignal.timeout(1200),
      });
      if (res.ok) {
        const body = await res.arrayBuffer();
        return new NextResponse(body, {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': 'https://shian-studio.vercel.app',
          },
        });
      }
    } catch {
      continue;
    }
  }

  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="#eef2f7"/>
    <path d="M-20 58 C40 36 82 96 142 72 C194 51 214 80 276 52" fill="none" stroke="#d5dde8" stroke-width="18"/>
    <path d="M-10 176 C38 150 86 188 132 166 C181 143 220 162 266 136" fill="none" stroke="#d5dde8" stroke-width="14"/>
    <path d="M62 -20 L116 276 M158 -12 L206 270" stroke="#ffffff" stroke-width="8" opacity=".75"/>
    <path d="M-20 118 L276 102 M-16 220 L276 208" stroke="#ffffff" stroke-width="10" opacity=".85"/>
    <circle cx="${(xNum * 47 + yNum * 19) % 256}" cy="${(yNum * 53 + zNum * 17) % 256}" r="3" fill="#94a3b8" opacity=".55"/>
  </svg>`;
  return new NextResponse(fallbackSvg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': 'https://shian-studio.vercel.app',
    },
  });
}
