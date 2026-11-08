import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'lucide-react'],
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 80, 85, 90, 100],
    deviceSizes: [375, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // 301 Permanent Redirects for legacy WordPress / WooCommerce URLs
  async redirects() {
    return [
      // Domain Canonicalization: non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'kardeslercihangir.com',
          },
        ],
        destination: 'https://www.kardeslercihangir.com/:path*',
        permanent: true,
      },
      // Old WordPress WooCommerce product pages -> /menu
      {
        source: "/urun/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/urun-etiketi/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/product/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/urun-kategori/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/product-category/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/product-tag/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/kategori/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/shop/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/magaza/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/magaza",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/my-account/:slug*",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/menumuz",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/menu-2",
        destination: "/menu",
        permanent: true,
      },
      // Old Turkish Pages -> New Clean Routes
      {
        source: "/hakkimizda",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/hakkimizda/:slug*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/iletisim",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/iletisim/:slug*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/bize-ulasin",
        destination: "/contact",
        permanent: true,
      },
      // Old WordPress Admin & System paths -> /
      {
        source: "/wp-admin/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
        destination: "/",
        permanent: true,
      },
      // Fix for malformed /https:// or /http:// URLs indexed by Google
      {
        source: "/https\\://kardeslercihangir.com/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/http\\://kardeslercihangir.com/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/https\\://www.kardeslercihangir.com/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/http\\://www.kardeslercihangir.com/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  // Security & static asset performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Strict CSP only for Admin Routes to prevent XSS without breaking public site scripts
        source: "/admin/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://evkcvnyahjxrsglythgt.supabase.co wss://evkcvnyahjxrsglythgt.supabase.co;"
          }
        ]
      },
      {
        // Cache static font assets aggressively (1 year immutable)
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache static media assets aggressively
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable", // 30 days
          },
        ],
      },
      {
        source: "/logo.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
