var express = require('express');
var router = express.Router();

const database = [];

router.post('/signup', (req, res) => {
  const details = req.body;
  const user = database.filter(({ email }) => email === details.email);
  if (user.length > 0) res.send(null);
  else {
    database.push(details);
    res.send(details);
  }
});

router.post('/login', (req, res) => {
  const details = req.body;
  const user = database.filter(({ email }) => email === details.email);
  console.log("entered app.post user: ", user, "database", database);
  if (user.length > 0 && details.password === user[0].password) res.send(user[0]);
  else res.send(null);
});

module.exports = router;
