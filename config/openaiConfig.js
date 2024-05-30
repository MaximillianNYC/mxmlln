const OpenAI = require("openai");
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

module.exports = openai