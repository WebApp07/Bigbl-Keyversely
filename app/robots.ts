import { MetadataRoute } from "next";
import { SERVER_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/", "/order/", "/profile/"],
      },
    ],
    sitemap: `${SERVER_URL}/sitemap.xml`,
    host: SERVER_URL,
  };
}
