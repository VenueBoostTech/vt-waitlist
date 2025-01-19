// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// No custom middleware function needed - just the configuration
export default withAuth({
  pages: {
    signIn: "/auth/login"
  }
})

// export function middleware(req: NextRequest) {
//   const host = req.headers.get('host') || '';
//   const [subdomain] = host.split('.waitlist.omnistackhub.xyz');
  
//   // Check if it's a subdomain request
//   if (subdomain && subdomain !== 'www' && subdomain !== '') {
//     const url = req.nextUrl.clone();
//     url.pathname = `/waitlist/${subdomain}`; // Redirect to waitlist route
//     return NextResponse.rewrite(url);
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/dashboard/:path*"]
}