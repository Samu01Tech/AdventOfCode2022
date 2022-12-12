import { getData } from "../helper.js";

function calcluateSignalStrenght(cycle: number, regX: number) {
  let signalStrenght = 0;
  if (cycle === 20) {
    console.log("🔔 20 cycles reached");
    signalStrenght += regX * cycle;
  }
  if (cycle === 60) {
    console.log("🔔 60 cycles reached");
    signalStrenght += regX * cycle;
  }
  if (cycle === 100) {
    console.log("🔔 100 cycles reached");
    signalStrenght += regX * cycle;
  }
  if (cycle === 140) {
    console.log("🔔 140 cycles reached");
    signalStrenght += regX * cycle;
  }
  if (cycle === 180) {
    console.log("🔔 180 cycles reached");
    signalStrenght += regX * cycle;
  }
  if (cycle === 220) {
    console.log("🔔 220 cycles reached");
    signalStrenght += regX * cycle;
  }
  console.log("☇ Signal Strenght: ", signalStrenght);
  return signalStrenght;
}

function draw(
  display: string[][],
  x: number,
  y: number,
  regX: number,
  cycle: number
) {
  const l = regX - 1;
  const c = regX;
  const r = regX + 1;

  if (display[y] === undefined) {
    display[y] = [];
  }
  if (display[y][x] === undefined) {
    display[y][x] = "";
  }

  if (x === l || x === c || x === r) {
    display[y][x] = "⬜";
  } else {
    display[y][x] = "⬛";
  }
}

function main() {
  const data = getData("../data/10/data.txt");
  const instructions = data.split("\n");

  let cycle = 1;
  let currentInstruction = 0;
  let regX = 1;
  let signalStrenght = 0;
  let waintingForAddx = 0;
  let displayY = 0;
  let displayX = 0;
  const display = [];

  while (instructions[currentInstruction] !== undefined) {
    // before cycle
    console.log("⇨ Before Cycle", cycle, " X:", regX);
    const instruction = instructions[currentInstruction].split(" ");

    if (instruction[0] === "addx") {
      waintingForAddx++;
    }

    // during cycle
    signalStrenght += calcluateSignalStrenght(cycle, regX);
    draw(display, displayX, displayY, regX, cycle);
    displayX++;
    if (displayX % 40 === 0) {
      displayY++;
      displayX = 0;
    }
    cycle++;

    // after cycle
    if (instruction[0] === "noop") {
      currentInstruction++;
    }
    if (instruction[0] === "addx") {
      if (waintingForAddx === 2) {
        regX += parseInt(instruction[1]);
        currentInstruction++;
        waintingForAddx = 0;
      }
    }
    console.log("⇦ After Cycle", cycle - 1, " X:", regX);
    console.log("-----------------");
  }

  console.log("Final Values ", "cycle: ", cycle, " X: ", regX);
  console.log("☇ Signal Strenght: ", signalStrenght);

  display.forEach((row) => {
    console.log(row.join(""));
  });
}

main();
