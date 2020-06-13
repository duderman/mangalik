"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const port = 8080;
const host = '0.0.0.0';

const app = express();

app.use(bodyParser.urlencoded());

app.post('/', (req, res) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log('BODY IS: ', req.body)

  let name = req.body.name
  let email = req.body.email
  let msg = req.body.msg
  let body = "Заказик от " + name + " <" + email + ">: " + msg

  transporter.sendMail({
    from: '"Заказик" <заказик@мангалик.рф>',
    to: process.env.EMAILS_RECEIVER,
    subject: "Ого! Новый заказик!",
    text: body,
    html: "<b>"+body+"</b>",
  }).then(function() {
    res.status(201).send('Принял');
  }).catch(function(){
    res.status(500).send('Не смогла :(');
  })
});

console.log(`Listening on port ${port}`);
app.listen(port);
