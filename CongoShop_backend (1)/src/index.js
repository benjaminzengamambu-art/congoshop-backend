require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const payments = require('./routes/payments');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/payments', payments);

app.get('/', (req, res) => res.send({ ok: true, msg: 'CongoShop Backend (MVP)'}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
