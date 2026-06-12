import { NextRequest, NextResponse } from 'next/server';

// Map tile proxy - avoids browser Tracking Prevention blocking direct tile requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const z = searchParams.get('z');
  const x = searchParams.get('x');
  const y = searchParams.get('y');

  if (!z || !x || !y) {
    return new NextResponse('Missing z/x/y parameters', { status: 400 });
  }

  // Try multiple tile sources in order
  const sources = [
    `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`,
    `https://b.tile.openstreetmap.org/${z}/${x}/${y}.png`,
    `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`,
  ];

  for (const url of sources) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.openstreetmap.org/',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const body = await res.arrayBuffer();
        return new NextResponse(body, {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    } catch {
      continue;
    }
  }

  return new NextResponse('Tile not available', { status: 502 });
}
