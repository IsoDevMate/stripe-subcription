import { PaymentElement } from "@stripe/react-stripe-js"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createSubscription } from "./api";

const CheckoutForm = () => {
  return (
    <div>
      <PaymentElement />
        <button>SUBMIT</button>
    </div>
  )
}

export default CheckoutForm