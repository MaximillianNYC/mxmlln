const express = require('express')
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')
const { generateMeta } = require('./controllers/openaiController')

const app = express()
app.use(cors());
app.listen(8080, () => console.log('listening for requests on port 8080'))

app.use(express.json())
app.use(express.static('public'))  // Make sure your HTML file is in the 'public' directory

app.post('/openai/meta', generateMeta)

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile('path_to_your_html_file.html', { root: __dirname });
});