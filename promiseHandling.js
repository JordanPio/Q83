/*

**Challenge 4 - Promise Handling**
As with the above challenge, your code will go in the `src/app.ts` file. Complete the `recursivelyExecutePromises` function to accept an array of promises and resolve them in the order they appear in the array. _(Normally promises are executed asynchronously and simultaneously)_

- The name of the function is "`recursivelyExecutePromises`" but that doesn't mean it's mandatory for you to use recursion in your solution - it's just a hint!

*/

let resultsInOrder = [];

const recursivelyExecutePromises = async promises => {
  // Baseline for Recursion, if promiseArray = empty then finish and print resultsInOrder
  if (!promises || promises.length <= 0) {
    return console.log("You've finished run all the promises in the array", resultsInOrder);
  }
  // Resolve the first promise and wait until it complete to push the results to resultsInOrder list
  await Promise.resolve(promises[0]).then(results => resultsInOrder.push(results)); // sol 1
  // Remove the first item from array and recursively re-run executePromises
  await recursivelyExecutePromises(promises.slice(1)); // work for printinng out to console
};

/*
Test
I've built a small test case below since I couldnt run your test in my machine.

*/
const promise0 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "Promise0 with 5s delay");
});
const promise1 = Promise.resolve("Promise 1 with no delay");
const promise2 = "just a string";
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "Final Promise 1s delay");
});

let arr1 = [promise0, promise1, promise2, promise3]; // array of Promise

recursivelyExecutePromises(arr1); // Show results in sequence
