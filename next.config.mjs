/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com https://fonts.loli.net; img-src 'self' data: blob: https://*.tile.openstreetmap.org https://server.arcgisonline.com https://*.arcgisonline.com https://trae-api-cn.mchost.guru https://lf-cdn.trae.com.cn https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://formsubmit.co https://formspree.io https://api.resend.com https://server.arcgisonline.com https://*.arcgisonline.com; font-src 'self' data: https://fonts.gstatic.com https://fonts.loli.net; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
