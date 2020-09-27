const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

router.get("/:code", (req, res) => {
  Url.findOne({ urlCode: req.params.code })
    .then((data) => {
      if (data) {
        res.redirect(data.longUrl);
      } else {
        res.status(404).json("No url found");
      }
    })
    .catch((err) => res.status(500).json("Server Error"));
});

module.exports = router;
