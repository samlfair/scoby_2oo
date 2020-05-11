const express = require("express");
const router = express.Router();
const Item = require("./../models/Item");

// Show all characters

router.get("/", function (req, res, next) {
  Item.find({})
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Show one character

router.get("/:id", function (req, res, next) {
  Item.findById(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Create one character

router.post("/", function (req, res, next) {
  console.log(req.body);
  Item.create(req.body)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Update one character

router.patch("/:id", function (req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Delete one character

router.delete("/:id", function (req, res, next) {
  Item.findByIdAndRemove(req.params.id)
    .then((dbRes) => {
      if (characterDocument === null) {
        res.status(404).json({ message: "Character not found" });
      } else {
        res.status(204).json(characterDocument);
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
