import * as fs from "fs";

function print(...args) {
  // if argument -d or --debug is passed in node
  if (process.argv.includes("-d") || process.argv.includes("--debug")) {
    console.log(...args);
  }
}

function getData(file) {
  const data = fs.readFileSync(file, "utf8");
  return data;
}

function parseData(data) {
  const elfs = data.split("\n\n");
  print(elfs);
  return elfs;
}

function parseAndAccumulate(elfs) {
  let elfsCalories = [];
  elfs.forEach((elf) => {
    const food = elf.split("\n");
    const foodInNumbers = food.map((food) => parseInt(food));
    const totalCalories = foodInNumbers.reduce((a, b) => a + b, 0);
    elfsCalories.push(totalCalories);
  });
  return elfsCalories;
}

function findMaxNth(elfs, n) {
  let sumNth = 0;
  for (let i = 0; i < n; i++) {
    const max = Math.max(...elfs);
    const maxIndex = elfs.indexOf(max);
    print(`Elf ${maxIndex} has ${max} calories`);
    sumNth += max;
    elfs[maxIndex] = 0;
  }
  return sumNth;
}

function maina() {
  const data = getData("data.txt");
  const elfsRaw = parseData(data);
  const elfSum = parseAndAccumulate(elfsRaw);
  const max = Math.max(...elfSum);
  console.log(`Max calories from elf ${elfSum.indexOf(max)}: ${max}`);
}

function mainb() {
  const data = getData("data.txt");
  const elfsRaw = parseData(data);
  const elfSum = parseAndAccumulate(elfsRaw);
  const max3 = findMaxNth(elfSum, 3);
  console.log(`Total calories of 3 most packed elfs: ${max3}`);
}

maina();
mainb();
