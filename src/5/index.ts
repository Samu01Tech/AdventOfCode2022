import { getData } from "../helper.js";

// Stack class
class Stack {
  items: number[] = [];

  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  push(element) {
    // push element into the items
    this.items.push(element);
  }

  pushAll(...args) {
    for (let i = 0; i < args.length; i++) {
      this.items.push(args[i]);
    }
  }

  pop() {
    // return top most element in the stack
    // and removes it from the stack
    // Underflow if stack is empty
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }

  peek() {
    // return the top most element from the stack
    // but does'nt delete it.
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    // return true if stack is empty
    return this.items.length == 0;
  }

  printStack() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }

  reverse() {
    let stack = new Stack();
    while (!this.isEmpty()) {
      stack.push(this.pop());
    }
    return stack;
  }
}

class Move {
  from: number;
  to: number;
  nth: number;

  constructor(from: number, to: number, nth: number) {
    this.from = from;
    this.to = to;
    this.nth = nth;
  }
}

function move(warehouse: Stack[], from: number, to: number, nth: number) {
  for (let i = 0; i < nth; i++) {
    const x = warehouse[from].pop();
    warehouse[to].push(x);
  }
}

function moveTogether(
  warehouse: Stack[],
  from: number,
  to: number,
  nth: number
) {
  const temp = new Stack();
  for (let i = 0; i < nth; i++) {
    const x = warehouse[from].pop();
    temp.push(x);
  }
  for (let i = 0; i < nth; i++) {
    const x = temp.pop();
    warehouse[to].push(x);
  }
}

function parseWarehouse(warehouse: Stack[], graph: string) {
  // init warehouse

  /*
    [D]                     [N] [F]    
    [H] [F]             [L] [J] [H]    
    [R] [H]             [F] [V] [G] [H]
    [Z] [Q]         [Z] [W] [L] [J] [B]
    [S] [W] [H]     [B] [H] [D] [C] [M]
    [P] [R] [S] [G] [J] [J] [W] [Z] [V]
    [W] [B] [V] [F] [G] [T] [T] [T] [P]
    [Q] [V] [C] [H] [P] [Q] [Z] [D] [W]
    1   2   3   4   5   6   7   8   9 
  */

  const g = graph.split("\n");
  console.log("---Graph---");
  console.log(g);
  console.log("----------");
  for (let i = 0; i < g.length - 1; i++) {
    //last line is col number so -1
    const char = g[i];
    let c: string[] = new Array(9);

    // get char of each column
    c[0] = char[1];
    c[1] = char[5];
    c[2] = char[9];
    c[3] = char[13];
    c[4] = char[17];
    c[5] = char[21];
    c[6] = char[25];
    c[7] = char[29];
    c[8] = char[33];

    for (let w = 0; w < 9; w++) {
      if (c[w] != " ") {
        warehouse[w].push(c[w]);
      }
    }
  }
  for (let i = 0; i < 9; i++) {
    warehouse[i] = warehouse[i].reverse();
  }

  return warehouse;
}

function parseMoves(moves: string) {
  // parse moves
  const moves1 = moves.split("\n");

  const moves2: Move[] = [];
  for (let i = 0; i < moves1.length; i++) {
    const x = moves1[i].split(" ");

    const nth = parseInt(x[1]);
    const from = parseInt(x[3]) - 1;
    const to = parseInt(x[5]) - 1;

    moves2.push(new Move(from, to, nth));
  }

  return moves2;
}

function copyWarehouse(warehouse: Stack[]) {
  const newWarehouse: Stack[] = [];
  for (let i = 0; i < 9; i++) {
    newWarehouse[i] = new Stack();
    newWarehouse[i].pushAll(...warehouse[i].items);
  }
  return newWarehouse;
}

function main() {
  const data = getData("../data/5/data.txt");

  const [graph, moves] = data.split("\n\n");

  // create structures

  let warehouse = new Array(9);
  for (let i = 0; i < 9; i++) {
    warehouse[i] = new Stack();
  }

  let moveList: Move[] = [];

  // parse warehouse
  warehouse = parseWarehouse(warehouse, graph);

  // parse moves
  moveList = parseMoves(moves);

  // copy warehouse
  const warehouseCopy = copyWarehouse(warehouse);

  // move
  for (let i = 0; i < moveList.length; i++) {
    const moveObj = moveList[i];
    move(warehouse, moveObj.from, moveObj.to, moveObj.nth);
  }

  // print
  console.log("---After move---");
  for (let i = 0; i < 9; i++) {
    console.log(warehouse[i].printStack());
  }
  console.log("----------");

  // move together
  for (let i = 0; i < moveList.length; i++) {
    const moveObj = moveList[i];
    moveTogether(warehouseCopy, moveObj.from, moveObj.to, moveObj.nth);
  }

  // print
  console.log("---After move together---");
  for (let i = 0; i < 9; i++) {
    console.log(warehouseCopy[i].printStack());
  }
  console.log("----------");

  // print result 1
  let result1 = "";
  for (let i = 0; i < 9; i++) {
    result1 += warehouse[i].pop();
  }
  // print result 2
  let result2 = "";
  for (let i = 0; i < 9; i++) {
    result2 += warehouseCopy[i].pop();
  }

  console.log("Result 1: ", result1);
  console.log("Result 2: ", result2);
}

main();
