import express, { Request, Response } from 'express';
import ip from 'ip';

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

const app = express();

function handleRoot(req: Request, res: Response): void {
  res.send('hi from Finn');
}

app.get('/', handleRoot);

app.listen(9080, () => {
  console.log(`App is listening on http://${ip.address()}:${9080}`);
});

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
const underwoodVotes = getVotes(eUnderwood);
const olsonVotes = getVotes(rOlson);
const willisVotes = getVotes(lWillis);
const taylorVotes = getVotes(nTaylor);
const voteList = [underwoodVotes, olsonVotes, willisVotes, taylorVotes];
const candidates = [eUnderwood, rOlson, lWillis, nTaylor];
const totalVotes = underwoodVotes + olsonVotes + willisVotes + taylorVotes;
for (let i = 0; i < 4; i += 1) {
  console.log(
    `${candidates[i].name} -- ${voteList[i]} votes -- ${((voteList[i] / totalVotes) * 100).toFixed(
      2
    )}%`
  );
}
console.log();
for (let i = 0; i < 4; i += 1) {
  const precinct1: number =
    eUnderwood.votes[0] + rOlson.votes[0] + nTaylor.votes[0] + lWillis.votes[0];
  const precinct2: number =
    eUnderwood.votes[1] + rOlson.votes[1] + nTaylor.votes[1] + lWillis.votes[1];
  const precinct3: number =
    eUnderwood.votes[2] + rOlson.votes[2] + nTaylor.votes[2] + lWillis.votes[2];
  const precinct4: number =
    eUnderwood.votes[3] + rOlson.votes[3] + nTaylor.votes[3] + lWillis.votes[3];
  const precinct5: number =
    eUnderwood.votes[4] + rOlson.votes[4] + nTaylor.votes[4] + lWillis.votes[4];
  console.log(`${candidates[i].name}:
    Precinct 1 -- ${((candidates[i].votes[0] / precinct1) * 100).toFixed(2)}%
    Precinct 2 -- ${((candidates[i].votes[1] / precinct2) * 100).toFixed(2)}%
    Precinct 3 -- ${((candidates[i].votes[2] / precinct3) * 100).toFixed(2)}%
    Precinct 4 -- ${((candidates[i].votes[3] / precinct4) * 100).toFixed(2)}%
    Precinct 5 -- ${((candidates[i].votes[4] / precinct5) * 100).toFixed(2)}%`);
  console.log();
}
for (let i = 0; i < 4; i += 1) {
  console.log(
    `${candidates[i].name} spent $${(candidates[i].funding / voteList[i]).toFixed(2)} per vote`
  );
}
console.log();
let winner = 0;
for (let i = 0; i < 4; i += 1) {
  if (voteList[i] / totalVotes > 0.5) {
    console.log(`${candidates[i].name} is the Winner!`);
    winner = 1;
  }
}
if (winner === 0) {
  let mostVotes = 0;
  let firstPlace = '';
  let secondPlace = '';
  for (let i = 0; i < 4; i += 1) {
    if (voteList[i] > mostVotes) {
      mostVotes = voteList[i];
      firstPlace = candidates[i].name;
    }
  }
  mostVotes = 0;
  for (let i = 0; i < 4; i += 1) {
    if (voteList[i] > mostVotes && candidates[i].name !== firstPlace) {
      mostVotes = voteList[i];
      secondPlace = candidates[i].name;
    }
  }
  console.log(
    `There is no Winner! There will be a runoff between ${firstPlace} and ${secondPlace}!`
  );
}
