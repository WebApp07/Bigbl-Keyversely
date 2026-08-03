import { getAllProducts } from "@/lib/actions/product.actions";
import { SERVER_URL } from "@/lib/constants";

export async function GET() {
  const { data: products } = await getAllProducts({
    query: "all",
    page: 1,
    limit: 1000,
  });

  console.log(products[0].images[0]);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">
<channel>

<title>Keyversely</title>
<link>${SERVER_URL}</link>
<description>Official Keyversely Product Feed</description>

${products
  .map(
    (product) => `
<item>
<g:id>${product.id}</g:id>

<title><![CDATA[${product.name}]]></title>

<description><![CDATA[${product.description}]]></description>

<link>${SERVER_URL}/product/${product.slug}</link>

<g:image_link>${product.images[0]}</g:image_link>

<g:availability>${
      product.stock > 0 ? "in_stock" : "out_of_stock"
    }</g:availability>

<g:price>${Number(product.price).toFixed(2)} USD</g:price>

<g:condition>new</g:condition>

<g:brand>${product.brand}</g:brand>

</item>
`,
  )
  .join("")}

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
