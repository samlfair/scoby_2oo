const express = require("express");
const router = express.Router();
const Item = require("./../models/Item");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinaryConfig.js");

// Show all characters

router.get("/", function (req, res, next) {
  const mongoQuery = {};
  if (req.query.user_id) {
    mongoQuery.id_user = req.query.user_id;
  }
  Item.find(mongoQuery)
    .then((dbRes) => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    })
    .catch((err) => res.status(500).json(err));
});

// Show one character

router.get("/:id", function (req, res, next) {
  Item.findById(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Create one character

router.post(`/`, uploadCloud.single("image"), (req, res, next) => {
  console.log(req.body);
  if (req.file) {
    req.body.image = req.file.secure_url;
  } else {
    console.log("no image");
    delete req.body.image;
  }
  req.body.location = req.body.location.split(",");
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
  console.log("Delete");
  Item.findByIdAndRemove(req.params.id)
    .then((dbRes) => {
      if (dbRes === null) {
        res.status(404).json({ message: "Character not found" });
      } else {
        console.log("Deleted");
        res.status(204).json(dbRes);
      }
    })
    .catch((err) => console.log(err));
  // .catch((err) => res.status(500).json(err));
});

module.exports = router;
