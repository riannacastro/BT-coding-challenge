const express = require('express');
const request = require('request');

const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3001;
const base_url = 'https://fusion.blocktrace.com/api/v1'

let corsOptions = {
  origin: 'https://bt-coding-challenge.herokuapp.com/'
};

app.use(express.static(path.join(__dirname + '/public')))
app.use(express.json(), cors(corsOptions))

app.post('/api', (req, res) => {
  let data = req.body
  console.log(`${data.apiKey}`)
  let options = {
    method: 'POST',
    uri: `${base_url}/bulk/detailed/all?type=${data.addressType}`,
    headers: {
      "api_key": data.apiKey,
      'Content-Type': 'application/json'
    },
    body: data,
    json: true
  };
  request(options, (error, body) => {
    console.log(options)
    if (error) {
      console.error(error);
      res.status(500).send('Error');
    } else {
      res.status(200).json(body);
    }
  })
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`)
});