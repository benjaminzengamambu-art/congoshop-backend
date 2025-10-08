const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint to init a Flutterwave payment (sandbox/test)
router.post('/flutterwave/init', async (req, res) => {
  try {
    const { amount, currency, customer_email, tx_ref } = req.body;
    const data = {
      tx_ref: tx_ref || `congoshop_${Date.now()}`,
      amount: amount,
      currency: currency || process.env.CURRENCY || 'CDF',
      redirect_url: process.env.FLW_REDIRECT_URL,
      customer: { email: customer_email || 'test@example.com' },
      meta: { platform: 'CongoShop' }
    };
    const resp = await axios.post('https://api.flutterwave.com/v3/payments', data, {
      headers: { Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` }
    });
    return res.json({ ok: true, data: resp.data });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ ok: false, error: 'Erreur initiation paiement' });
  }
});

module.exports = router;
