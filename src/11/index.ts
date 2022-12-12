import { getData } from "../helper.js";
const DEBUG = false;
const ROUNDS = 20;
// const ROUNDS = 10000;

interface Monkey {
  id: string;
  items: number[];
  action1: string | number;
  action2: string | number;
  actionOperator: string;
  testCondition: number;
  trueAction: number;
  falseAction: number;
  inspectedItems: number;
}

class Monkey {
  constructor(
    id: string,
    items: number[],
    action1: string | number,
    action2: string | number,
    actionOperator: string,
    testCondition: number,
    trueAction: number,
    falseAction: number
  ) {
    this.id = id;
    this.items = items;
    this.action1 = action1;
    this.action2 = action2;
    this.actionOperator = actionOperator;
    this.testCondition = testCondition;
    this.trueAction = trueAction;
    this.falseAction = falseAction;
    this.inspectedItems = 0;
  }
}

function p(...args: any[]) {
  if (DEBUG) {
    console.log(...args);
  }
}

function inspectMonkey(monkey: Monkey) {
  p("Monkey", monkey.id);
  // for each item
  for (let i in monkey.items) {
    p("Monkey inspects item with worry level", monkey.items[i]);
    // increase worry level
    if (monkey.actionOperator == "+") {
      monkey.items[i] += Number(monkey.action2);
      p("Worry level increased by", monkey.action2, "to", monkey.items[i]);
    } else if (monkey.actionOperator == "*") {
      let action2 = parseInt(monkey.action2 as string);
      if (action2) {
        monkey.items[i] *= action2;
        p("Worry level multiplied by", monkey.action2, "to", monkey.items[i]);
      } else {
        monkey.items[i] *= monkey.items[i];
        p("Worry level multiplied by itself to", monkey.items[i]);
      }
    }

    // round down worry level
    monkey.items[i] = Math.floor(monkey.items[i] / 3);
    p("Worry level divided by 3 to", monkey.items[i]);

    // check test
    if (monkey.items[i] % monkey.testCondition === 0) {
      p("Current worry level is divisible by", monkey.testCondition);
      monkeys[monkey.trueAction].items.push(monkey.items[i]);
      monkey.items[i] = null;
      p(
        "Item with worry level",
        monkey.items[i],
        "is thrown to monkey",
        monkey.trueAction
      );
    } else {
      p("Current worry level is NOT divisible by", monkey.testCondition);
      monkeys[monkey.falseAction].items.push(monkey.items[i]);
      monkey.items[i] = null;
      p(
        "Item with worry level",
        monkey.items[i],
        "is thrown to monkey",
        monkey.falseAction
      );
    }
    monkey.inspectedItems++;
  }
  monkey.items = monkey.items.filter((x) => x !== null);
}

let monkeys: Monkey[] = [];

function main() {
  const data = getData("../data/11/data.txt");
  const monkeysNotes = data.split("\n\n").map((x) => x.split("\n"));

  for (let m in monkeysNotes) {
    let [
      idString,
      itemsString,
      actionString,
      testString,
      trueActionString,
      falseActionString,
    ] = monkeysNotes[m];

    let id: string,
      items: number[] = [],
      action1: string,
      action2: string,
      actionOperator: string,
      testCondition: number,
      trueAction: number,
      falseAction: number;

    id = idString.split(" ")[1];

    itemsString
      .split(":")[1]
      .trim()
      .split(",")
      .forEach((x) => items.push(parseInt(x)));

    let actions = actionString.split(":")[1].split(" ");
    action1 = actions[3];
    actionOperator = actions[4];
    action2 = actions[5];

    testCondition = parseInt(testString.split(":")[1].trim().split(" ").pop());

    trueAction = parseInt(
      trueActionString.split(":")[1].trim().split(" ").pop()
    );

    falseAction = parseInt(
      falseActionString.split(":")[1].trim().split(" ").pop()
    );

    monkeys.push(
      new Monkey(
        id,
        items,
        action1,
        action2,
        actionOperator,
        testCondition,
        trueAction,
        falseAction
      )
    );
  }

  for (let i = 0; i < ROUNDS; i++) {
    for (let m in monkeys) {
      inspectMonkey(monkeys[m]);
    }
    if (i === ROUNDS) {
      console.log("Round", i);
      for (let m in monkeys) {
        console.log(
          "Monkey",
          m,
          "inspected",
          monkeys[m].inspectedItems,
          "items"
        );
      }
    }
  }

  let totalInspectedItems = new Map();
  for (let m in monkeys) {
    totalInspectedItems.set(m, monkeys[m].inspectedItems);
  }

  //   get the 2 monkeys with the most inspected items
  let sorted = new Map(
    [...totalInspectedItems.entries()].sort((a, b) => b[1] - a[1])
  );

  let [first, second] = [...sorted.values()];

  console.log("Monkey Business", first * second);
  p("Monkeys", monkeys);
}

main();
