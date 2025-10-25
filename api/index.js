const express = require('express')
const cors = require('cors')
const { sql } = require('@vercel/postgres')
const { generateMeta, folioKnowledge } = require('../controllers/openaiController')
//const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
//app.listen(8080, () => console.log('listening for requests on port 8080'))

app.post('/api/openai/meta', generateMeta)
app.post('/api/openai/folio', folioKnowledge)

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/api/submit', async (req, res) => {
  if (req.method === 'POST') {
    const { input } = req.body;

    try {
      await sql`INSERT INTO user_inputs (input_value) VALUES (${input})`;
      res.status(200).send('Input saved');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving input');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

//app.use(express.json())
//app.use(express.static('public'))  // Make sure your HTML file is in the 'public' directory