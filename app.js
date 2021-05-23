const express = require("express");
const app = express();

app.use(express.static("/home/chikim/Documents/leet/"));

app.get("/", (req, res) => {
  res.send(`
  <h1>Leet code solutions</h1>

  <p>Type functionName.test.js</p>

  <p>For Example,</p>
  <p>
  <a href="/minInterval.test.js" target="_blank">minInterval.test.js</a>
  for 
<a href="https://leetcode.com/contest/weekly-contest-239/problems/minimum-interval-to-include-each-query/">1851: Minimum Interval to Include Each Query</a> Leetcode problem
  </p>
  `);
});

app.listen(3020);
