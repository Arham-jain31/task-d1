const express = require("express");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

const app = express();

const PORT = 3000;


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());
app.use(express.static("public"));

const subscribers = [];


app.post("/subscribe", async (req, res) => {

try {

const { email } = req.body;




if (!email) {

return res.status(400).json({
message: "please enter email"
});

}

subscribers.push(email);

const message = {

to: email,

from: process.env.SENDER_EMAIL,

subject: "Welcome to DEV@deakin",

text:
`

Thank you for subscribing.

`,

};

const result = await sgMail.send(message);

console.log(
"Email API Status Code:",
result[0].statusCode
);


return res.status(202).json({

message:
"Thank you for subscribing! A welcome email has been sent."

});


} catch (error) {

console.error(
"Email sending error:",
error.response?.body || error.message
);


return res.status(500).json({

message:
"Unable to send the welcome email."

});

}

});


app.listen(PORT, () => {

console.log(
`Server running at http://localhost:${PORT}`
);

});
