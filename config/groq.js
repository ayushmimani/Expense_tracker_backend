const groq = require("groq-sdk");

const Groq= new groq({apikey: process.env.groq_api_key});

module.exports = Groq; 