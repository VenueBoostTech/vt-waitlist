// middleware.ts
import { withAuth } from "next-auth/middleware"

// No custom middleware function needed - just the configuration
export default withAuth({
  pages: {
    signIn: "/auth/login"
  }
})

export const config = {
  matcher: ["/dashboard/:path*"]
}