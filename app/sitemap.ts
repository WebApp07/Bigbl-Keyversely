import { MetadataRoute } from "next";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { SERVER_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await getAllProducts({
    query: "all",
    page: 1,
    limit: 10000,
  });

  const categories = await getAllCategories();

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SERVER_URL}/product/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((item) => ({
    url: `${SERVER_URL}/search?q=all&category=${encodeURIComponent(
      item.category,
    )}&page=1`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SERVER_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SERVER_URL}/search?q=all&category=all&page=1`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SERVER_URL}/contact-us`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${SERVER_URL}/about`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${SERVER_URL}/privacy-policy`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${SERVER_URL}/refund-policy`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${SERVER_URL}/shipping-policy`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${SERVER_URL}/terms-conditions`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${SERVER_URL}/faq`,
      lastModified: new Date(),
      priority: 0.5,
    },

    // Category search pages
    ...categoryPages,

    // Product pages
    ...productUrls,
  ];
}
