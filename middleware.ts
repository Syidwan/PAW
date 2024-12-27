// export { auth as middleware } from "@/auth"
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/organization(.*)', '/board-org(.*)', '/board(.*)', "/select-org"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
    
  }


  
  // const session = await auth()
  // if (session.userId) {
  //   let path = "/select-org";

  //   if (session.orgId) {
  //     path = `/organization/${session.orgId}`;
  //   }
  // }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}