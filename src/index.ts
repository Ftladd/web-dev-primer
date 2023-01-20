/*
 *  index.ts
 *  Project: First Exercise
 *
 *  Author: Finlay Ladd
 *  Created on: Jan 19, 2023
 */
import express, { Request, Response } from 'express';
import ip from 'ip';

function handleRoot(req: Request, res: Response): void {
  res.send('hi from Finn');
}
const app = express();
app.get('/', handleRoot);
app.listen(9080, () => {
  console.log(`App is listening on http://${ip.address()}:${9080}`);
});

// Exercise 1
function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const mergedArr: Array<number> = [];
  for (let i = 0; i < arr1.length || i < arr2.length; i += 1) {
    if (i < arr1.length) {
      mergedArr.push(arr1[i]);
    }
    if (i < arr2.length) {
      mergedArr.push(arr2[i]);
    }
  }
  return mergedArr;
}
// Exercise 2
function checkWord(attempt: string, secret: string): string {
  const answer: Array<string> = [];
  for (let i = 0; i < 5; i += 1) {
    if (secret.includes(attempt[i])) {
      if (secret[i] === attempt[i]) {
        answer.push('c');
      } else {
        answer.push('p');
      }
    } else {
      answer.push('a');
    }
  }
  return `${answer[0]}${answer[1]}${answer[2]}${answer[3]}${answer[4]}`;
}
// Exercise 3
function getVotes(candidate: Candidate): number {
  let indVotes = 0;
  for (let i = 0; i < 5; i += 1) {
    indVotes += candidate.votes[i];
  }
  return indVotes;
}
function sumVotes(candidates: Array<Candidate>): number {
  let totalVotes = 0;
  for (let i = 0; i < 4; i += 1) {
    totalVotes += getVotes(candidates[i]);
  }
  return totalVotes;
}
function getPrecinct(precinctNum: number, candidates: Array<Candidate>): number {
  let precinctVotes = 0;
  for (let i = 0; i < 4; i += 1) {
    precinctVotes += candidates[i].votes[precinctNum - 1];
  }
  return precinctVotes;
}
type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};
const eUnderwood: Candidate = {
  name: 'Edward Underwood',
  votes: [192, 147, 186, 114, 267],
  funding: 58182890,
};
const rOlson: Candidate = {
  name: 'Rose Olson',
  votes: [48, 90, 12, 21, 13],
  funding: 78889263,
};
const lWillis: Candidate = {
  name: 'Leonard Willis',
  votes: [206, 312, 121, 408, 382],
  funding: 36070689,
};
const nTaylor: Candidate = {
  name: 'Nathaniel Taylor',
  votes: [37, 21, 38, 39, 29],
  funding: 6317921937,
};
// Exercise 1
const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array2: Array<number> = [18, 74, 88, 3];
const mergedArray: Array<number> = merge(array2, array1);
console.log(mergedArray);
console.log();

// Exercise 2
const attempts = ['rains', 'shout', 'scope', 'spoke'];
for (const word of attempts) {
  const result = checkWord(word, 'spoke');
  console.log(result);
}
console.log();

// Exercise 3
const candidates = [eUnderwood, rOlson, lWillis, nTaylor];
for (let i = 0; i < 4; i += 1) {
  console.log(
    `${candidates[i].name} -- ${getVotes(candidates[i])} votes -- ${(
      (getVotes(candidates[i]) / sumVotes(candidates)) *
      100
    ).toFixed(2)}%`
  );
}
console.log();
for (let i = 0; i < 4; i += 1) {
  console.log(`${candidates[i].name}:
    Precinct 1 -- ${((candidates[i].votes[0] / getPrecinct(1, candidates)) * 100).toFixed(2)}%
    Precinct 2 -- ${((candidates[i].votes[1] / getPrecinct(2, candidates)) * 100).toFixed(2)}%
    Precinct 3 -- ${((candidates[i].votes[2] / getPrecinct(3, candidates)) * 100).toFixed(2)}%
    Precinct 4 -- ${((candidates[i].votes[3] / getPrecinct(4, candidates)) * 100).toFixed(2)}%
    Precinct 5 -- ${((candidates[i].votes[4] / getPrecinct(5, candidates)) * 100).toFixed(2)}%`);
  console.log();
}
for (let i = 0; i < 4; i += 1) {
  console.log(
    `${candidates[i].name} spent $${(candidates[i].funding / getVotes(candidates[i])).toFixed(
      2
    )} per vote`
  );
}
console.log();
let winner = 0;
for (let i = 0; i < 4; i += 1) {
  if (getVotes(candidates[i]) / sumVotes(candidates) > 0.5) {
    console.log(`${candidates[i].name} is the Winner!`);
    winner = 1;
  }
}
if (winner === 0) {
  let mostVotes = 0;
  let firstPlace = '';
  let secondPlace = '';
  for (let i = 0; i < 4; i += 1) {
    if (getVotes(candidates[i]) > mostVotes) {
      mostVotes = getVotes(candidates[i]);
      firstPlace = candidates[i].name;
    }
  }
  mostVotes = 0;
  for (let i = 0; i < 4; i += 1) {
    if (getVotes(candidates[i]) > mostVotes && candidates[i].name !== firstPlace) {
      mostVotes = getVotes(candidates[i]);
      secondPlace = candidates[i].name;
    }
  }
  console.log(
    `There is no Winner! There will be a runoff between ${firstPlace} and ${secondPlace}!`
  );
}
console.log();
