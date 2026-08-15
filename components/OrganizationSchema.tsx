export default function OrganizationSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://getkeyversely.com/#organization",
    name: "KEYVERSELY LLC",
    url: "https://getkeyversely.com",
    email: "support@getkeyversely.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "63 N Burritt Ave, Rm 100 PMB 1180",
      addressLocality: "Buffalo",
      addressRegion: "WY",
      postalCode: "82834",
      addressCountry: "US",
    },
    sameAs: [
      "https://marketplace.microsoft.com/en-us/marketplace/partner-dir/f2266aa5-5704-4384-ad55-100cf2c530cb/overview",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://getkeyversely.com/#website",
    url: "https://getkeyversely.com",
    name: "Keyversely",
    publisher: { "@id": "https://getkeyversely.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://getkeyversely.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
