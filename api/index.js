const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { sql } = require('@vercel/postgres')

// Optional OpenAI imports - only load if API key is available
let generateMeta, folioKnowledge;
try {
  const openaiController = require('../controllers/openaiController');
  generateMeta = openaiController.generateMeta;
  folioKnowledge = openaiController.folioKnowledge;
} catch (error) {
  console.log('OpenAI controller not available - API key missing');
}

//const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
//app.listen(8080, () => console.log('listening for requests on port 8080'))

// OpenAI endpoints - only register if functions are available
if (generateMeta) {
  app.post('/api/openai/meta', generateMeta)
}
if (folioKnowledge) {
  app.post('/api/openai/folio', folioKnowledge)
}

// Reading List API endpoints
app.get('/api/reading-list', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/reading-list.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const readingList = JSON.parse(data);
    res.json(readingList);
  } catch (error) {
    console.error('Error reading reading list:', error);
    res.status(500).json({ error: 'Failed to load reading list' });
  }
});

// Future endpoints for CRUD operations
app.post('/api/reading-list', (req, res) => {
  // TODO: Implement add new link
  res.status(501).json({ error: 'Not implemented yet' });
});

app.put('/api/reading-list/:id', (req, res) => {
  // TODO: Implement update link
  res.status(501).json({ error: 'Not implemented yet' });
});

app.delete('/api/reading-list/:id', (req, res) => {
  // TODO: Implement delete link
  res.status(501).json({ error: 'Not implemented yet' });
});

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