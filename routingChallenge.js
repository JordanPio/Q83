// Challenge  1
// Assuming you are taking an array as input and want to perform all operation on numbers inside it.
/* - Use a single route only.
- The equation must accept a variable number of operands _(i.e: 1+2+3, 1+2, 1+2+3+4+5, etc)_
- At a minimum, try to support at least 2 types of equations _(i.e: addition, subtraction, multiplication)_

assuming input as array of equations ["1+2+3","1+2", "5*3"] I will be performing the computation and send back the results also in an array


 */

const mathjs = require("mathjs"); // read equations
const express = require("express");
const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Challenge 1 Solution
app.post("/operations", (req, res) => {
  // assuming that the input is coming from req.body.items as an array of equations
  const dataArray = req.body.items;

  // initialize new array to save results after processing equations
  let results = [];

  dataArray.forEach(equation => {
    results.push(mathjs.evaluate(equation));
  });
  //return results in a jason object
  res.json({ results });
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
