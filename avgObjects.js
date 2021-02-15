/*
**Challenge 3 - Recursive Averaging**

- The resulting object should be the combined shape of the objects in the 
function argument. _eg: for these objects..._

`[{a:1, b:2}, {a:3, b:4, c:5}]`

_...the result would be..._

`{a:2, b:3, c:5}`

- When getting the average of a value, divide the total by the number of 
times that value is found as opposed to the total number of objects. _In the above example, 
c is divided by 1, not 2 because it only appears once_

*/

function getAverageOfObjects(objects) {
  let result = {};

  // read abject and record frequency using recursion to read nested files
  function recursiveRead(o, r) {
    Object.keys(o).forEach(function (k) {
      // check for nested objects using recursion by re-run the function
      if (o[k] && typeof o[k] === "object") {
        return recursiveRead(o[k], (r[k] = r[k] || {}));
      }
      // if no nested objects, read and record results and fq inside result
      r[k] = r[k] || { values: 0, fq: 0 };
      r[k].values = r[k].values + o[k];
      r[k].fq = r[k].fq + 1;
    });
  }

  // function to calculate the avg based on key fq

  function recursiveAvrg(o) {
    // interate through and calculate avg
    Object.keys(o).forEach(function (k) {
      // check for nested objects using recursion by re-run the function
      if (o[k] && typeof o[k].values === "undefined") {
        return recursiveAvrg(o[k]);
      }
      o[k].values = o[k].values / o[k].fq;
      // reformat object by getting rid of fq counter
      o[k] = o[k].values;
    });
  }

  // run recursiveRead function on object arry - array containing objects
  objects.forEach(function (a) {
    recursiveRead(a, result);
  });
  // recursiveAvrg function - Accepts object result as argument
  recursiveAvrg(result);
  return result;
}

// TEST Object 1

const objects = [
  {
    hits: 100,
    misses: 30,
    chillies: {
      jalapeno: 2,
      birdsEye: 4
    }
  },
  {
    hits: 20,
    misses: 10,
    jumps: 5,
    chillies: {
      jalapeno: 8,
      birdsEye: 7
    }
  }
];

// Test Object2
const object2 = [
  { x: { x1: 1 }, y: { yt: 0, zt: 4, qa: 3, ft: 0 } },
  { x: { x1: 5 }, y: { yt: 10, zt: 2, ft: 0 } }
];

// Test firstInput
const firstInput = [
  { a: 1, b: 2 },
  { a: 3, b: 4, c: 5 }
]; // should return `{a:2, b:3, c:5}`

// Function calls

console.log(getAverageOfObjects(objects), "Result Objects");

/* Expect Result
hits: 60,
  misses: 20,
  chillies: { jalapeno: 5, birdsEye: 5.5 },
  jumps: 5
*/
console.log(getAverageOfObjects(object2), "Result in object 2");

/* Expect Result
x: { x1: 3 }, y: { yt: 5, zt: 3, qa: 3, ft: 0 }

*/

console.log(getAverageOfObjects(firstInput), "Result in of first Input Example");
/* Expect Result
a: 2, b: 3, c: 5
*/
