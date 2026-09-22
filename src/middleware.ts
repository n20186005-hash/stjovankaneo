import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Enforce the canonical host (https://stjovankaneo.com): redirect www -> non-www
// and http -> https with a 301. Only applied to the production domain so local
// dev (http://localhost) and preview deploys keep working.
export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const proto = request.headers.get('x-forwarded-proto') ?? 'http';

  const isProdHost =
    host === 'stjovankaneo.com' || host === 'www.stjovankaneo.com';

  if (isProdHost && (host.startsWith('www.') || proto === 'http')) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = 'stjovankaneo.com';
    url.port = '';
    return Response.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
