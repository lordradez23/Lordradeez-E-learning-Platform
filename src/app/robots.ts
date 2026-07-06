import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/home/",
        "/contact-us/",
        "/login/",
        "/register/",
        "/admin/",
        "/instructor-dashboard/",
        "/account/",
        "/checkout/",
        "/cart/",
      ],
    },
    sitemap: "https://lordradeez-academy.vercel.app/sitemap.xml",
  };
}
