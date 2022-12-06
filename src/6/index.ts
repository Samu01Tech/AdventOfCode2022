import { getData } from "../helper.js";
const MULTIPLE_CHECK = 14;

function main() {
  const data = getData("../data/6/data.txt");

  for (let i = 0; i < data.length; i++) {
    const set = new Set();
    set.add(data[i]);
    set.add(data[i + 1]);
    set.add(data[i + 2]);
    set.add(data[i + 3]);

    if (set.size === 4) {
      console.log("Position 4: ", i + 4);
      break;
    }
  }

  for (let i = 0; i < data.length; i++) {
    const set = new Set();

    for (let j = 0; j < MULTIPLE_CHECK; j++) {
      set.add(data[i + j]);
    }

    if (set.size === MULTIPLE_CHECK) {
      console.log(`Position ${MULTIPLE_CHECK}: `, i + MULTIPLE_CHECK);
      break;
    }
  }
}

main();
