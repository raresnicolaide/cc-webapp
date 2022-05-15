const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const { sendMail } = require("../mailFunctions.js");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM universities", (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.post("/", (req, res) => {
  const { country, searchDate } = req.body;
  if (!country || !searchDate) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }

  const queryString = `INSERT INTO universities (country, searchDate) VALUES (${mysql.escape(
    country
  )}, ${mysql.escape(searchDate)})`;

  connection.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.post("/mail", async (req, res) => {
  const { senderName, senderMail, messageContent } = req.body;

  if (!senderName || !senderMail || !messageContent) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }

  try {
    //Send the message through the mail service
    await sendMail(
      senderMail,
      senderName + "" + " sent you a message",
      messageContent
    );

    return res.send();
  } catch (err) {
    console.log(err);
    return res.send("Something went wrong");
  }
});

module.exports = router;
