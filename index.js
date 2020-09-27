const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const index = require("./routes/index");
const url = require("./routes/url");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..........."))
  .catch((err) => console.log(err));

const PORT = 5000 || process.env.PORT;

app.use("/", index);
app.use("/api/url", url);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
