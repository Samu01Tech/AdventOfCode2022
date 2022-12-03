import { getData } from "../helper.js";

function print(...args: any[]) {
  // if argument -d or --debug is passed in node
  if (process.argv.includes("-d") || process.argv.includes("--debug")) {
    console.log(...args);
  }
}

const opponentSignT = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const mySignT = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
};

const outcomeT = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
};

function getSignScore(sign: string) {
  if (sign === mySignT.ROCK) return 1;
  else if (sign === mySignT.PAPER) return 2;
  else if (sign === mySignT.SCISSORS) return 3;
  else return 0;
}

function getOutcome(opponentSign: string, mySign: string) {
  if (
    (mySign === mySignT.ROCK && opponentSign === opponentSignT.ROCK) ||
    (mySign === mySignT.PAPER && opponentSign === opponentSignT.PAPER) ||
    (mySign === mySignT.SCISSORS && opponentSign === opponentSignT.SCISSORS)
  ) {
    // draw
    return 3;
  }
  if (
    (mySign === mySignT.ROCK && opponentSign === opponentSignT.SCISSORS) ||
    (mySign === mySignT.PAPER && opponentSign === opponentSignT.ROCK) ||
    (mySign === mySignT.SCISSORS && opponentSign === opponentSignT.PAPER)
  ) {
    // win
    return 6;
  } else {
    // lose
    return 0;
  }
}

function calculateScore(lines: string[]) {
  let score = 0;
  lines.forEach((line) => {
    const [opponentSign, mySign] = line.split(" ");
    const outcome = getOutcome(opponentSign, mySign);
    score += outcome;
    const mySignScore = getSignScore(mySign);
    score += mySignScore;
    print(
      `Opponent sign: ${opponentSign}, My sign: ${mySign}, outcome: ${outcome}, my sign score: ${mySignScore}, partial score: ${score}`
    );
  });
  return score;
}

function transformSign(need: string, opponentSign: string) {
  if (need === outcomeT.LOSE) {
    if (opponentSign === opponentSignT.ROCK) {
      return mySignT.SCISSORS;
    } else if (opponentSign === opponentSignT.PAPER) {
      return mySignT.ROCK;
    } else if (opponentSign === opponentSignT.SCISSORS) {
      return mySignT.PAPER;
    }
  } else if (need === outcomeT.DRAW) {
    if (opponentSign === opponentSignT.ROCK) {
      return mySignT.ROCK;
    } else if (opponentSign === opponentSignT.PAPER) {
      return mySignT.PAPER;
    } else if (opponentSign === opponentSignT.SCISSORS) {
      return mySignT.SCISSORS;
    }
  } else if (need === outcomeT.WIN) {
    if (opponentSign === opponentSignT.ROCK) {
      return mySignT.PAPER;
    } else if (opponentSign === opponentSignT.PAPER) {
      return mySignT.SCISSORS;
    } else if (opponentSign === opponentSignT.SCISSORS) {
      return mySignT.ROCK;
    }
  }
}

function calculateScore2(lines: string[]) {
  let score: number = 0;
  lines.forEach((line) => {
    let [opponentSign, mySign] = line.split(" ");
    const needOutcome = mySign;
    mySign = transformSign(mySign, opponentSign);
    const outcome = getOutcome(opponentSign, mySign);
    score += outcome;
    const mySignScore = getSignScore(mySign);
    score += mySignScore;
    print(
      `Opponent sign: ${opponentSign}, My sign: ${mySign}, need outcome ${needOutcome}, outcome: ${outcome}, my sign score: ${mySignScore}, partial score: ${score}`
    );
  });
  return score;
}

function maina() {
  const data = getData("../data/2/data.txt");
  const lines = data.split("\n");
  print(lines);
  const score = calculateScore(lines);
  console.log(`Score: ${score}`);
}

function mainb() {
  const data = getData("../data/2/data.txt");
  const lines = data.split("\n");
  print(lines);
  const score = calculateScore2(lines);
  console.log(`Score: ${score}`);
}

maina();
mainb();
