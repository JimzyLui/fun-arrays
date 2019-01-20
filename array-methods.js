var dataset = require("./dataset.json");
// console.log(dataset);
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
const getHigherAmt = x => x.amount > 100000;
const hundredThousandairs = dataset.bankBalances.filter(getHigherAmt);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
// const sumOfBankBalances = dataset.bankBalances.reduce((acc, obj) => {
//   // console.log(obj.amount / 100, Math.round(obj.amount));
//   acc + parseInt(obj.amount, 10);
// }, 0);
// debugger;
// console.log(sumOfBankBalances);
const arrBalances = dataset.bankBalances.map(x => {
  return parseInt(x.amount, 10);
});

const sumOfBankBalances = arrBalances.reduce((acc, cur) => acc + cur, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
const arrHighStates = ["WI", "IL", "WY", "OH", "GA", "DE"];
const getSumOfInterests = () => {
  return dataset.bankBalances
    .filter(x => arrHighStates.includes(x.state))
    .map(x => {
      const amt = parseInt(x.amount, 10);
      return Math.round(amt * 0.189);
    })
    .reduce((acc, cur) => acc + cur, 0);
};
const sumOfInterests = getSumOfInterests();
/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
const getStateSums = () => {
  const obj = {};
  dataset.bankBalances.forEach(x => {
    if (obj.hasOwnProperty(x.state)) {
      obj[x.state] += parseInt(x.amount, 10);
    } else {
      obj[x.state] = parseInt(x.amount, 10);
    }
  });
  return obj;
};
const stateSums = getStateSums();

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point during your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
const getSumOfHighInterests = () => {
  const obj = {};
  dataset.bankBalances
    .filter(x => !arrHighStates.includes(x.state))
    .forEach(x => {
      if (obj.hasOwnProperty(x.state)) {
        obj[x.state] += parseInt(x.amount, 10);
      } else {
        obj[x.state] = parseInt(x.amount, 10);
      }
    });
  console.log(obj);
  const sum = Object.entries(obj)
    .map(x => {
      // console.log("x: ", x);
      // console.log("x: ", x, Math.round(parseInt(x[1], 10) * 0.189));
      return Math.round(parseInt(x[1], 10) * 0.189);
    })
    // console.log(arrVal);
    .filter(x => x > 50000)
    .reduce((acc, cur) => acc + cur, 0);
  // console.log(sum);
  return sum;
};
const sumOfHighInterests = getSumOfHighInterests();

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
const getLowerSumStates = () => {
  obj = getStateSums();
  return Object.entries(obj)
    .filter(x => x[1] < 1000000)
    .map(x => x[0]);
};
const lowerSumStates = getLowerSumStates();

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
const getHigherStateSums = () => {
  const objAll = getStateSums();
  return Object.entries(objAll)
    .filter(x => x[1] > 1000000)
    .map(x => x[1])
    .reduce((acc, cur) => acc + cur, 0);
};
const higherStateSums = getHigherStateSums();

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
const getSumOfHighStates = () => {
  return dataset.bankBalances
    .filter(x => arrHighStates.includes(x.state))
    .map(x => {
      const amt = parseInt(x.amount, 10);
      // return Math.round(amt * 0.189);
    })
    .reduce((acc, cur) => acc + cur, 0);
};
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
