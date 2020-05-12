const express = require("express");
const router = express.Router();
const User = require("./../models/User");

console.log("Users routes!");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", function (req, res, next) {
  console.log("Get user route!");
  User.findById(req.params.id)
    .then((dbRes) => {
      res.status(201).send(dbRes);
    })
    .catch((err) => console.log(err));
});

router.patch("/:id", function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((dbRes) => {
      console.log(dbRes);
      res.status(201).send(dbRes);
    })
    .catch((err) => console.log(err));
  // console.log(req.params.id);
  // console.log(req.body);
});

module.exports = router;
