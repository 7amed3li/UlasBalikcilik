import { NextResponse } from "next/server";

const locales = ['tr', 'en', 'ar', 'ru', 'fa', 'fr', 'de', 'it', 'es', 'zh'];
const defaultLocale = 'en';

// In-memory rate limiter for Edge/Node Middleware
// Use globalThis to persist the Map across Next.js dev reloads
const rateLimitMap = globalThis.rateLimitMap || new Map();
if (process.env.NODE_ENV !== 'production') globalThis.rateLimitMap = rateLimitMap;

function applyRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const limit = 150; // 150 requests per minute per IP

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false; // not limited
  }

  const record = rateLimitMap.get(ip);
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
    return false;
  }

  record.count++;
  if (record.count > limit) {
    return true; // Rate limited!
  }

  return false;
}

export function proxy(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 0. Global Rate Limiting (Protects everything)
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (applyRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Çok fazla istek gönderdiniz. Lütfen yavaşlayın (Too Many Requests).' },
      { status: 429 }
    );
  }

  // 1. Fix malformed crawler URLs like /https:/kardeslercihangir.com/foo or /http:/...
  const malformedMatch = pathname.match(/^\/(?:https?:(?:\/)*(?:kardeslercihangir\.com)?)(.*)$/i);
  if (malformedMatch) {
    let cleanPath = malformedMatch[1] || "/";
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

    // If it points to an old WooCommerce product, redirect to /menu
    if (
      cleanPath.startsWith("/urun/") ||
      cleanPath.startsWith("/product/") ||
      cleanPath.startsWith("/urun-kategori/") ||
      cleanPath.startsWith("/product-category/")
    ) {
      cleanPath = "/menu";
    }

    url.pathname = cleanPath;
    return NextResponse.redirect(url, 301);
  }

  // 2. Fallback check for any legacy /urun/ or /product/ paths
  if (
    pathname.startsWith("/urun/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/urun-kategori/") ||
    pathname.startsWith("/product-category/")
  ) {
    url.pathname = "/menu";
    return NextResponse.redirect(url, 301);
  }

  // 3. Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next();
    const supabaseCookie = request.cookies.get('sb-evkcvnyahjxrsglythgt-auth-token') || request.cookies.get('sb-auth-token');
    
    // If not on login page and no auth cookie, redirect to login
    if (!pathname.endsWith("/admin") && !supabaseCookie) {
      const loginUrl = url.clone();
      loginUrl.pathname = "/admin";
      return NextResponse.redirect(loginUrl);
    }

    // In a full implementation, you would strictly verify the JWT here. 
    // Since we check it in the Server Components (page.js) and API routes with supabase.auth.getUser(), 
    // this acts as a first-line perimeter check.
    return res;
  }

  // 4. Inject locale for dynamic routing
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  let locale = defaultLocale;
  if (!pathnameIsMissingLocale) {
    locale = pathname.split('/')[1];
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static assets: images, logo.webp, etc.
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|logo.webp|manifest.webmanifest).*)",
  ],
};
