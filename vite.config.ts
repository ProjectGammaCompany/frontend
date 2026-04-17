import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
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
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*{html,css,js,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 3000000,
      },
      manifest: {
        name: "EduPlay",
        short_name: "EduPlay",
        icons: [
          {
            src: "/img/favicon/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/img/favicon/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        scope: "/",
        orientation: "any",
        lang: "ru-RU",
        start_url: "/home",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        screenshots: [
          {
            src: "/img/screenshots/desktop.png",
            type: "image/png",
            sizes: "2880x1564",
            form_factor: "wide",
          },
          {
            src: "/img/screenshots/mobile.png",
            type: "image/png",
            sizes: "narrow",
          },
        ],
        display: "standalone",
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
