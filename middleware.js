export { auth as middleware } from "@/app/_lib/auth";

export const config = {
  // list all private routes
  matcher: ["/account/:path*"],
};
