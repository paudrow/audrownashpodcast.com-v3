import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const routes = {
  '/posts/1-electric-sheep': 'https://audrownashpodcast.com/posts/1-electric-sheep',
  '/posts/1-electric-sheep/transcript': 'https://audrownashpodcast.com/posts/1-electric-sheep/transcript',

  '/posts/2-agility': 'https://audrownashpodcast.com/posts/2-agility',
  '/posts/2-agility/transcript': 'https://audrownashpodcast.com/posts/2-agility/transcript',

  '/posts/3-polymath': 'https://audrownashpodcast.com/posts/3-polymath',
  '/posts/3-polymath/transcript': 'https://audrownashpodcast.com/posts/3-polymath/transcript',

  '/posts/4-bluewhite': 'https://audrownashpodcast.com/posts/4-bluewhite',
  '/posts/4-bluewhite/transcript': 'https://audrownashpodcast.com/posts/4-bluewhite/transcript',

  '/posts/5-fprime': 'https://audrownashpodcast.com/posts/5-fprime',
  '/posts/5-fprime/transcript': 'https://audrownashpodcast.com/posts/5-fprime/transcript',

  '/posts/6-osra': 'https://audrownashpodcast.com/posts/6-osra',
  '/posts/6-osra/transcript': 'https://audrownashpodcast.com/posts/6-osra/transcript',

  '/posts/7-machina': 'https://audrownashpodcast.com/posts/7-machina',
  '/posts/7-machina/transcript': 'https://audrownashpodcast.com/posts/7-machina/transcript',

  '/posts/8-cuby': 'https://audrownashpodcast.com/posts/8-cuby',
  '/posts/8-cuby/transcript': 'https://audrownashpodcast.com/posts/8-cuby/transcript',

  '/posts/9-foxglove': 'https://audrownashpodcast.com/posts/9-foxglove',
  '/posts/9-foxglove/transcript': 'https://audrownashpodcast.com/posts/9-foxglove/transcript',

  '/posts/10-chef': 'https://audrownashpodcast.com/posts/10-chef',
  '/posts/10-chef/transcript': 'https://audrownashpodcast.com/posts/10-chef/transcript',

  '/posts/11-koop': 'https://audrownashpodcast.com/posts/11-koop',
  '/posts/11-koop/transcript': 'https://audrownashpodcast.com/posts/11-koop/transcript',

  '/posts/12-pipedream': 'https://audrownashpodcast.com/posts/12-pipedream',
  '/posts/12-pipedream/transcript': 'https://audrownashpodcast.com/posts/12-pipedream/transcript',

  '/posts/13-prefix': 'https://audrownashpodcast.com/posts/13-prefix',
  '/posts/13-prefix/transcript': 'https://audrownashpodcast.com/posts/13-prefix/transcript',

  '/posts/14-formic': 'https://audrownashpodcast.com/posts/14-formic',
  '/posts/14-formic/transcript': 'https://audrownashpodcast.com/posts/14-formic/transcript',

  '/posts/15-picknik': 'https://audrownashpodcast.com/posts/15-picknik',
  '/posts/15-picknik/transcript': 'https://audrownashpodcast.com/posts/15-picknik/transcript',

  '/posts/16-roscon': 'https://audrownashpodcast.com/posts/16-roscon',
  '/posts/16-roscon/transcript': 'https://audrownashpodcast.com/posts/16-roscon/transcript',
}

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname

  // Check if this path exists in our routes
  if (path in routes) {
    // Return redirect response to the mapped URL
    return NextResponse.redirect(routes[path as keyof typeof routes])
  }

  // If no redirect is needed, continue with the request
  return NextResponse.next()
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    '/posts/:path*', // matches all paths starting with /posts/
  ],
}