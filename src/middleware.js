import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect } = context;
  
  // Configuration
  const supportedLocales = ['en', 'vi'];
  const defaultLocale = 'en';
  const apiPathPrefix = '/api';
  
  // Get URL information
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log('Middleware processing:', pathname); // Debug log
  
  // Skip language prefixing for _image routes
  if (pathname.includes('/_image') || pathname.startsWith('/_image')) {
    return next();
  }

  // Skip language prefixing for _image routes
  if (pathname.includes('/_astro') || pathname.startsWith('/_astro')) {
    return next();
  }

  // Skip locale check for API routes
  if (pathname.startsWith(apiPathPrefix)) {
    context.locals.locale = defaultLocale;
    return next();
  }
  
  // For non-API routes, check path for locale
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // If no path segments or first segment is not a valid locale
  if (!pathSegments.length || !supportedLocales.includes(firstSegment)) {
    // Redirect to same path with default locale
    const newPath = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    console.log('Redirecting to:', newPath); // Debug log
    return redirect(newPath);
  }
  
  // Valid locale - set it in locals for use in components
  context.locals.locale = firstSegment;
  
  // Continue to page handler
  return next();
}); 

// Helper function to check for other paths you might want to exclude
function isExcludedPath(pathname) {
  const excludedPaths = [
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    // Add other paths that should be excluded from language prefixing
  ];
  
  return excludedPaths.some(path => pathname === path);
}