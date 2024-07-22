import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/menu",
    "/api/webhook",
    "/api/menu",
    "/api/menuCategory",
    "/api/menuCategoryMenu",
  ],
  ignoredRoutes: [""],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
