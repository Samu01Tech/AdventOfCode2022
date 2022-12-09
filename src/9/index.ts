import { getData } from "../helper.js";

interface Knot {
  x: number;
  y: number;
}

class Knot {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function main() {
  const data = getData("../data/9/data.txt");

  const moves = data.split("\n").map((line) => {
    const [direction, spaces] = line.split(" ");
    return { direction, spaces: parseInt(spaces) };
  });

  console.log(moves);

  const head = new Knot(0, 0);
  const tail = new Knot(0, 0);
  let instructions: string[] = [];

  moves.forEach((move) => {
    for (let i = 0; i < move.spaces; i++) {
      instructions.push(move.direction);
    }
  });

  console.log(instructions);

  let currentInstruction = 0;
  let mapHead: Set<Knot> = new Set();
  // let mapTail: Set<Knot> = new Set();
  mapHead.add(head);
  // mapTail.add(tail);
  let step = 0;
  let previousPosition: Knot;

  while (instructions[currentInstruction] !== undefined) {
    const instruction = instructions[currentInstruction];

    if (step % 2 === 0) {
      console.log("Update head");
      previousPosition = new Knot(head.x, head.y);

      if (instruction === "U") head.y++;
      else if (instruction === "D") head.y--;
      else if (instruction === "L") head.x--;
      else if (instruction === "R") head.x++;
      mapHead.add(new Knot(head.x, head.y));
    }
    currentInstruction++;
  }

  console.log(mapHead);
  // find max value in
  let maxX = 0;
  let maxY = 0;
  mapHead.forEach((knot) => {
    if (knot.x > maxX) maxX = knot.x;
  });

  mapHead.forEach((knot) => {
    if (knot.y > maxY) maxY = knot.y;
  });

  // build matrix based on max values
  const matrix: string[][] = [];
  for (let i = 0; i < maxY + 1; i++) {
    matrix.push([]);
    for (let j = 0; j < maxX + 1; j++) {
      matrix[i].push("0");
    }
  }

  // fill matrix with values
  mapHead.forEach((knot) => {
    matrix[knot.y][knot.x] = "X";
  });

  console.log(matrix);

  // count X's
  let count = 0;
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "X") count++;
    });
  });

  console.log(count);

  // find max value in mapTail
  // console.log(mapTail);
}

main();
