import { getData } from "../helper.js";

function findNumberFromChar(char: string) {
  if (char >= "A" && char <= "Z") {
    return char.charCodeAt(0) - 64 + 26;
  } else if (char >= "a" && char <= "z") {
    return char.charCodeAt(0) - 96;
  } else {
    return -1;
  }
}

function divideRucksack(rucksacks: string[]) {
  let result = [];
  rucksacks.forEach((rucksack) => {
    result.push([
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2, rucksack.length),
    ]);
  });
  return result;
}

function findSameObject(dividedRucksacs: string[][]) {
  let result = [];

  dividedRucksacs.forEach((rucksack) => {
    let firstPocket = rucksack[0];
    let secondPocket = rucksack[1];

    firstPocket.split("");
    for (let i = 0; i < firstPocket.length; i++) {
      if (secondPocket.includes(firstPocket[i])) {
        result.push(firstPocket[i]);
        break;
      }
    }
  });

  return result;
}

function calculateScore(sameObjects: string[]) {
  let result = 0;
  sameObjects.forEach((char) => {
    result += findNumberFromChar(char);
  });
  return result;
}

function findBadge(dividedRucksacs: string[]) {
  let result = [];

  for (let i = 0; i < dividedRucksacs.length; i += 3) {
    let firstRucksack = dividedRucksacs[i];
    let secondRucksack = dividedRucksacs[i + 1];
    let thirdRucksack = dividedRucksacs[i + 2];

    for (let j = 0; j < firstRucksack.length; j++) {
      if (
        secondRucksack.includes(firstRucksack[j]) &&
        thirdRucksack.includes(firstRucksack[j])
      ) {
        result.push(firstRucksack[j]);
        break;
      }
    }
  }
  return result;
}

function main1() {
  let rawData = getData("../data/3/data.txt");
  const data = rawData.split("\n");
  // divide each rucksack into 2 pockets
  const dividedRucksacs = divideRucksack(data);
  // find same objects in each rucksack
  const sameObject = findSameObject(dividedRucksacs);
  // calculate score
  const score = calculateScore(sameObject);
  console.log(score);
}

function main2() {
  let rawData = getData("../data/3/data.txt");
  const data = rawData.split("\n");
  // find same object in 3-group rucksack
  const sameObject = findBadge(data);
  // calculate score
  const score = calculateScore(sameObject);
  console.log(score);
}

main1();
main2();
