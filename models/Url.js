const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode: {
    type: String,
  },
  longUrl: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
