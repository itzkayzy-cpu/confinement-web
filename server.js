const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/create-checkout-session', async (req, res) => {
  const { telegram_id } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        { 
          
          price: 'price_1TF5oLQnSk4ZgFc6MvgQnU40', 
          quantity: 1 
        }
      ],
      mode: 'subscription',
      metadata: { telegram_id: telegram_id },
      subscription_data: { 
        metadata: { telegram_id: telegram_id } 
      },
      
      success_url: `https://confinement-web.onrender.com/success.html`,
      cancel_url: `https://confinement-web.onrender.com/index.html`,
    });

    res.json({ id: session.id });
  } catch (e) {
    console.error("Stripe Error:", e.message); 
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server Active on port ${PORT}`));
