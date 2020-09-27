const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../models/Url");
const { json } = require("express");

router.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      Url.findOne({ longUrl })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            const shortUrl = baseUrl + "/" + urlCode;
            const newdata = new Url({
              longUrl,
              shortUrl,
              urlCode,
              date: new Date(),
            });

            newdata
              .save()
              .then((url) => res.json(url))
              .catch((err) => json.send(err));
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
