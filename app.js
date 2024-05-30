const express = require('express')
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')
const { generateMeta } = require('./controllers/openaiController')

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
//app.listen(8080, () => console.log('listening for requests on port 8080'))

app.post('/openai/meta', generateMeta)

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

//app.use(express.json())
//app.use(express.static('public'))  // Make sure your HTML file is in the 'public' directory

