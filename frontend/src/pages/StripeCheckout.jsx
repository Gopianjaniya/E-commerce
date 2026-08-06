import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { ShieldCheck } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const CheckoutForm = ({ clientSecret, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/orders` },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      toast.success("🎉 Payment successful! Your order is confirmed.");
      navigate("/orders");
    } else {
      toast.error("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-7 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-5 text-green-600 text-sm font-medium">
        <ShieldCheck size={16} />
        Secured by Stripe
      </div>
      <PaymentElement id="payment-element" className="mb-5" />
      <button
        disabled={isProcessing || !stripe || !elements}
        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <><span className="spinner" /> Processing Payment…</>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default function StripeCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (location.state?.clientSecret) {
      setClientSecret(location.state.clientSecret);
      setOrderId(location.state.orderId);
    } else {
      toast.error("Payment session invalid. Please try again.");
      navigate("/cart");
    }
  }, [location, navigate]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: { colorPrimary: "#2563eb", borderRadius: "8px" },
    },
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center py-12 px-4">
      <div className="text-center mb-10">
        <Title text1="SECURE" text2="CHECKOUT" />
        <p className="text-gray-400 text-sm mt-1">Complete your payment securely below</p>
      </div>

      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-40">
          <span className="spinner scale-150" />
        </div>
      )}
    </div>
  );
}
