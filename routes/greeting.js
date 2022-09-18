const express = require('express');

// router
const greetingRoutes = express.Router();

//connect to the database
const dbo = require('../db/conn');

// list of all the greetings.
greetingRoutes.route('/greetings').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('greetings')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});





module.exports = greetingRoutes;
