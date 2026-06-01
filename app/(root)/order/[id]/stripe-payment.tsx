const stripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  return (
    <>
      <h3>Stripe Payment</h3>
    </>
  );
};

export default stripePayment;
