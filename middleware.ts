import { NextRequest, NextResponse } from 'next/server';

// Generate a cryptographically secure random nonce for CSP
function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const nonce = isDev ? '' : generateNonce();

  // Pass nonce to server components via request header
  // (layout.tsx reads it with `headers().get('x-nonce')`)
  const requestHeaders = new Headers(request.headers);
  if (nonce) {
    requestHeaders.set('x-nonce', nonce);
  }

  const csp = [
    "default-src 'self'",
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://unpkg.com"
      : `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://unpkg.com`,
    "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com https://fonts.loli.net",
    "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://server.arcgisonline.com https://*.arcgisonline.com https://trae-api-cn.mchost.guru https://lf-cdn.trae.com.cn https://www.googletagmanager.com https://www.google-analytics.com",
    `connect-src 'self'${isDev ? " ws: wss:" : ''} https://www.google-analytics.com https://www.google.com https://formsubmit.co https://formspree.io https://api.resend.com https://server.arcgisonline.com https://*.arcgisonline.com`,
    "font-src 'self' data: https://fonts.gstatic.com https://fonts.loli.net https://gstatic.loli.net",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formsubmit.co https://formspree.io",
    "object-src 'none'",
  ].join('; ');

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|site.webmanifest).*)',
  ],
};
