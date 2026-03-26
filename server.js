const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/create-checkout-session', async (req, res) => {
  const { telegram_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: 'price_YOUR_PRICE_ID', quantity: 1 }],
      mode: 'subscription',
      metadata: { telegram_id: telegram_id },
      subscription_data: { metadata: { telegram_id: telegram_id } },
      success_url: `${process.env.RENDER_EXTERNAL_URL}/success.html`,
      cancel_url: `${process.env.RENDER_EXTERNAL_URL}/index.html`,
    });
    res.json({ id: session.id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(process.env.PORT || 4242, () => console.log('Server Active'));
