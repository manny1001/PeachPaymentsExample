const
  https = require("https");
const querystring = require("querystring");
const express = require("express");

const app = express();


app.get("/checkout", function (req, res) {
  const path = '/v1/checkouts';
  const data = querystring.stringify({
    'entityId': '8a8294174e735d0c014e78cf26461790',
    'amount': req.query.checkoutAmount,
    'currency': 'ZAR',
    'paymentType': 'DB'
  });


  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  const options = {
    port: 443,
    host: 'test.oppwa.com',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
      'Authorization': 'Bearer OGE4Mjk0MTc0ZTczNWQwYzAxNGU3OGNmMjY2YjE3OTR8cXl5ZkhDTjgzZQ=='
    }
  };
  const request = async () => {
    return new Promise((resolve, reject) => {
      const postRequest = https.request(options, function (res) {
        const buf = [];
        res.on('data', chunk => {
          buf.push(Buffer.from(chunk));
        });
        res.on('end', () => {
          const jsonString = Buffer.concat(buf).toString('utf8');
          try {
            resolve(JSON.parse(jsonString));
          } catch (error) {
            reject(error);
          }
        });
      });
      postRequest.on('error', reject);
      postRequest.write(data);
      postRequest.end();
    });
  };
  request().then(value => {
    res.send(value.id)
  }).catch(console.error);

});

console.log("App has started")

app.listen(3000);