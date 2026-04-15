import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";
import tsconfigPaths from "vite-tsconfig-paths";

const excludedRoutes = [
  "/auth",
  "/forgot-password",
  "/profile",
  "/notifications",
  "/myEvents",
];
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tsconfigPaths(),
    Sitemap({
      hostname: "https://hse-eduplay.ru",
      generateRobotsTxt: true,
      exclude: excludedRoutes,
      readable: true,
      changefreq: {
        "/": "monthly",
      },
      priority: {
        "/": 1,
      },
      robots: [
        {
          userAgent: "meta-externalagent",
          disallow: "/",
        },
        {
          userAgent: "*",
          allow: "/",
          disallow: excludedRoutes,
        },
      ],
    }),
  ],
});
