import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const publishable_key=import.meta.env.PERISHABALE_KEY
const stripePromise = loadStripe(publishable_key)
import { CheckoutForm } from "./checkoutform"
/* To use the Elements provider, call loadStripe from @stripe/stripe-js with your publishable key. 
The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object.
 Pass the returned Promise to Elements. */

const checkout = () => {
    const options= {
          // passing the client secret obtained from the server
    clientSecret:clientsecret,
    }
  
  return (
    <>
    <section  style={{height:"100vh",display:"flex"}} >
      <div style={{width:"100%"}}>
      <Elements stripe={stripePromise} options={options}>
       < CheckoutForm/>
      </Elements>
      </div>
    </section>
   
    </>
  
  )
}

export default checkout
