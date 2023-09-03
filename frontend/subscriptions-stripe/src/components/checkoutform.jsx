import { PaymentElement } from "@stripe/react-stripe-js"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createSubscription } from "../apis/apis.jsx";
import { useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
//added a keleton loader
/* const loader = 'auto'; */
const CheckoutForm = () => {
// Enable the skeleton loader UI for the optimal loading experience.
//collect data from the user 
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [priceId, setPriceId] = useState("");
const [ setError] = useState(null);
const [ setSuccess] = useState(false);

//stripe items 
const stripe = useStripe();
const elements = useElements();
const cardElement = elements.getElement(CardElement);

//useEffect to handle the user and item using their browser local storage
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const item = JSON.parse(localStorage.getItem("item"));

  if (user && item) {
    setName(user.name);
    setEmail(user.email);
    setPriceId(item.priceId);
  }else{
    Navigate("/login")
  }
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();
//create a payment method 
try {
  const { error, paymentMethod }
  = await stripe.createPaymentMethod({
    elements,
  type: "card",
  card: cardElement,
  billing_details: {
    name: name,
    email:email
  },
  });

  //disable form submission until stripe.js has loaded 
  if (!stripe || !elements){
return;
  }

  //handle errors
  if (error) {
    setError(error.message);
    setSuccess(false);
    return;
  }

  //create subscription
  
  const response = await createSubscription({
    payment_method: paymentMethod?.paymentMethod?.id,
    name,
    email,
    priceId,
  });

  //handle response errors
  if (response?.error) {
    setError(response.error);
    return;
  }

  setSuccess(true);

//hit the api route pass in create subscription

//confirm payment
const confirmPayment =await stripe?.confirmCardPayment(
response.data.data.client_secret,
);
 if (confirmPayment?.error) {
  toast("Payment failed.Thus no subscription Activated")
    setError(confirmPayment.error.message);
    setSuccess(false);
    return;
  }else{
    toast("Payment Successful.Subscription Activated")
    setSuccess(true);
    const subscription_id=response.data.data.subscription.id
    console.log(subscription_id)
    window.location.href=`/`
  }
} catch (error) {
  toast(error.message)
}
 
}
  return (
    <div>
      <div>
        <form action={ handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price ID"
            value={priceId}
            onChange={(e) => setPriceId(e.target.value)}
          />
          <button type="submit" disabled={!stripe}>SUBMIT</button>
        </form>
      </div>
      <ToastContainer />
      <CardElement />
      <PaymentElement />
    </div>
  )
}

export default CheckoutForm