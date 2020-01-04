const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/send", (req, res) => {
  const htmlEmail = `
    <div>
    <h1 align="center"> HI , ${req.body.emailAdd} </h1>
    <div>
      <h2> YOUR SCORE </h2>
       <h3>${req.body.scoreMade}</h3>
     </div>
     <div>
       <h3> your Moves</h3>
       <p> ${req.body.movesMade} </p>
     </div>
  </div>
    `;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.emailAdd,
    from: "itquan710@gmail.com",
    subject: "Your HighScore",
    text: "Your session details are stated below",
    html: htmlEmail
  };
  sgMail.send(msg).catch(err => {
    console.log(err);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server listening on port");
});
