import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",
]);
export default clerkMiddleware((auth, req) => {
  if (protectedRutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
