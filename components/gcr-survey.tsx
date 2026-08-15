"use client";

import Script from "next/script";

const GCR_MERCHANT_ID = process.env.NEXT_PUBLIC_GCR_MERCHANT_ID;

export default function GcrSurvey({
  orderId,
  email,
  deliveryCountry,
  estimatedDeliveryDate,
}: {
  orderId: string;
  email: string;
  deliveryCountry: string;
  estimatedDeliveryDate: string;
}) {
  if (!GCR_MERCHANT_ID) return null;

  const renderOptIn = `
    window.renderOptIn = function () {
      window.gapi.load("surveyoptin", function () {
        window.gapi.surveyoptin.render({
          "merchant_id": ${JSON.stringify(GCR_MERCHANT_ID)},
          "order_id": ${JSON.stringify(orderId)},
          "email": ${JSON.stringify(email)},
          "delivery_country": ${JSON.stringify(deliveryCountry)},
          "estimated_delivery_date": ${JSON.stringify(estimatedDeliveryDate)},
          "opt_in_style": "CENTER_DIALOG"
        });
      });
    };
  `;

  return (
    <>
      <Script
        id="gcr-survey-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: renderOptIn }}
      />
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />
    </>
  );
}