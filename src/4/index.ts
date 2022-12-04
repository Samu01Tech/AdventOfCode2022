import { getData } from "../helper.js";

class Elf {
  workStart: number;
  workEnd: number;
  constructor(workStart: number, workEnd: number) {
    this.workStart = workStart;
    this.workEnd = workEnd;
  }
}

function getWorkTime(data: string[]) {
  const elves: Elf[] = [];
  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const elfs = line.split(",");
    for (let j = 0; j < elfs.length; j++) {
      const elf = elfs[j];
      const [workStart, workEnd] = elf.split("-");
      const elfObj = new Elf(+workStart, +workEnd);
      elves.push(elfObj);
    }
  }
  return elves;
}

function elfContainsWorks(elves: Elf[]): number {
  let contained = 0;
  for (let i = 0; i < elves.length; i += 2) {
    const elf1 = elves[i];
    const elf2 = elves[i + 1];
    if (elf1.workStart <= elf2.workStart && elf1.workEnd >= elf2.workEnd) {
      contained++;
    } else if (
      elf2.workStart <= elf1.workStart &&
      elf2.workEnd >= elf1.workEnd
    ) {
      contained++;
    }
  }
  return contained;
}

function elfOverlapsWorks(elves: Elf[]): number {
  let overlaps = 0;
  for (let i = 0; i < elves.length; i += 2) {
    const elf1 = elves[i];
    const elf2 = elves[i + 1];
    if (elf1.workStart <= elf2.workStart && elf1.workEnd >= elf2.workStart) {
      overlaps++;
    } else if (
      elf2.workStart <= elf1.workStart &&
      elf2.workEnd >= elf1.workStart
    ) {
      overlaps++;
    } else if (elf1.workStart <= elf2.workEnd && elf1.workEnd >= elf2.workEnd) {
      overlaps++;
    } else if (elf2.workStart <= elf1.workEnd && elf2.workEnd >= elf1.workEnd) {
      overlaps++;
    }
  }
  return overlaps;
}

function main1() {
  const data = getData("../data/4/data.txt");
  const s = data.split("\n");

  const elves = getWorkTime(s);
  console.log(elves);

  const contained = elfContainsWorks(elves);
  console.log("Contained: ", contained);
}

function main2() {
  const data = getData("../data/4/data.txt");
  const s = data.split("\n");

  const elves = getWorkTime(s);

  const contained = elfOverlapsWorks(elves);
  console.log("Overlaps: ", contained);
}

main1();
main2();
