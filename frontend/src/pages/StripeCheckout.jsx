import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";

// Initialize Stripe outside of component render to avoid recreating Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const CheckoutForm = ({ clientSecret, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Change to your actual success return URL
        return_url: `${window.location.origin}/orders`,
      },
      redirect: "if_required", // Prevent automatic redirect so we can handle it manually or show success
    });

    if (error) {
      toast.error(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      navigate("/orders");
    } else {
      toast.error("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="w-full bg-black text-white py-3 px-4 rounded mt-6 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay Now"}
        </span>
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
    // Retrieve the client secret from the location state passed from PlaceOrder
    if (location.state && location.state.clientSecret) {
      setClientSecret(location.state.clientSecret);
      setOrderId(location.state.orderId);
    } else {
      // If none, redirect back
      toast.error("Payment session invalid. Please try again.");
      navigate("/cart");
    }
  }, [location, navigate]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#000000',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pt-10 mb-20 min-h-[60vh]">
      <div className="text-2xl text-center mb-8">
        <Title text1={"SECURE"} text2={"CHECKOUT"} />
      </div>
      
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      )}
    </div>
  );
}
