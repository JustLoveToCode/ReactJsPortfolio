const dotenv = require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.REACT_APP_AUTH_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (event.body) {
     // We use the JSON.parse because it is a String
    // We also use the Object Destructuring Method to extract 
    // the cart, shipping_fee and the total_amount properties:
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    // Create a Function that calculate shipping_fee + total_amount Here:
    const calculateOrderAmount = () => {
    // Replace this constant with the Calculation of the Order
    // amount, Calculate the Order Total on the Server to Prevent
    // people from Directly Manipulating them.
      return shipping_fee + total_amount;
    };

    try {
     // Create a Payment Intent with the Order Amount and the Currency:
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
        payment_method_types:['card']
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret:paymentIntent.client_secret}),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg:error.message }),
      };
    }
  }
};