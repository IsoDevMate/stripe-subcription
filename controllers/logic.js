const asyncHandler = require('express-async-handler');

exports.checkout = asyncHandler(async (req, res) => {
  const { products } = req.body;
  // Create line items
  const lineItems = products.map((product) => ({
    price: product.price,
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?cancel=true`,
    });

    // Return session ID
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error during payment:', error);
    return res.status(500).json({ message: 'Error during payment' });
  }

});
//create a new customer and a new subscription in Stripe when a POST request is made to this endpoint.
 
exports.customer= asyncHandler(async (req, res) => {
//create a 
  const {name,email,source,paymentMethod,priceId,plan}=req.body

//create a new customer for subscription

const customer = await stripe.customers.create({

email:email,
source: source.stripeToken,
name:name,
invoice_settings: {
  default_payment_method:paymentMethod
}
});

const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [
    {/* price:priceId */
  plan:plan
  }
  ],
  payment_settings: {
    payment_method_options:{

    } ,
    payment_method_types: ['card'],
    save_default_payment_method: 'on-subscription'
  },
  payment_behavior:collection_method=charge_automatically
});

res.json({ subscription });
});


//am to create a web hook to monitor subscriptions

//exports.subscription = asyncHandler
 
/* exports.portal= asyncHandler(async (req, res) => {

  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });
  res.redirect(303, portalSession.url);
});
 */
