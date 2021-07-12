const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/help", (req, res) => {
  console.log("req.body", req.body);
  res.send({ ...req.body });
});

app.use(express.static("/home/chikim/Documents/leet/"));

app.listen(3020); // l33t.songz.dev or l33t.ameyz.dev
