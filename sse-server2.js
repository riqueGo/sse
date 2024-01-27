//SSE 6
const express = require('express');
const xml2js = require('xml2js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(cors());

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

//Exercise 1
app.get('/temperature', (req, res) => {
  const unit = req.query.unit === 'F' ? req.query.unit : 'C';
  const header = req.headers['accept']
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders()

  setInterval(function() {
    const responseData = { temperature: randomInt(1, 40), unit };

    if (header === 'application/xml') {
      const xmlBuilder = new xml2js.Builder();
      const xmlResponse = xmlBuilder.buildObject(responseData);
  
      res.write(`data: ${xmlResponse}\n\n`);
    } else {
      res.write(`data: ${JSON.stringify(responseData)}\n\n`);
    }
  }, 2000);
});

//Exercise 2
app.get('/temperature-from-server', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders()
    setInterval(async function() {
        try {
            const response = await fetch(
              'http://devices.webofthings.io/pi/sensors/temperature',
              {method: 'get', headers: {'accept': 'application/json'}}
            );
            const data = await response.json();
            res.write(`data: ${JSON.stringify(data)}\n\n`);
          } catch (error) {
            console.log(error);
          }
    }, 2000);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});