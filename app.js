const express = require("express");
const app = express();

app.use(express.static("/home/chikim/Documents/leet/"));

app.listen(3020);
