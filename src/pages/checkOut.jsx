import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createCheckout } from "../sevices/stripe";

const STRIPE_KEY = process.env.REACT_APP_STRIPE_TEST_API_KEY;

// console.log(STRIPE_KEY);

const stripePromise = loadStripe(STRIPE_KEY);

const Checkout = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const { amount, email, bookingId } = location?.state;

  useEffect(() => {
    createCheckout(amount, email, bookingId).then((data) => {
      //   console.log("data", data);
      setClientSecret(data?.clientSecret);
    });
  }, [amount, email, bookingId]);

  return (
    <div className="container py-5">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default Checkout;
