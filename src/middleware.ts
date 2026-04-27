import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the 'id' cookie
  const id = request.cookies.get('id')?.value

  // Define the protected routes
  const isCreatePage = request.nextUrl.pathname.startsWith('/create-blog')

  // If the user is trying to access a protected route and is not logged in
  if (isCreatePage && !id) {
    // Redirect to the signin page
    const signinUrl = new URL('/signin', request.url)
    return NextResponse.redirect(signinUrl)
  }

  // Continue with the request if authenticated or accessing public route
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/create-blog/:path*'],
}
