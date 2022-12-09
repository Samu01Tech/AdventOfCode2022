import { getData } from "../helper.js";

interface TreeVisibility {
  row: number;
  col: number;
  value: number;
}

class TreeVisibility {
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
}

function findVisibility(tree, col, row, matrix) {
  let matrixMaxRow = matrix.length - 1;
  let matrixMaxCol = matrix[0].length - 1;
  let visibility = [];
  // looking up
  const up = () => {
    let currentRow = row - 1;
    let currentCol = col;
    let maxValue = -1;
    let treecount = 0;
    while (currentRow >= 0) {
      const tree = matrix[currentRow][currentCol];
      if (tree === matrix[row][col]) {
        treecount++;
        break;
      }
      if (tree > maxValue) {
        maxValue = tree;
        treecount++;
      } else if (tree === maxValue) {
        treecount++;
        break;
      } else {
        break;
      }
      currentRow--;
    }
    console.log("Up view: ", treecount);

    visibility.push(treecount);
  };

  // looking down
  const down = () => {
    let currentRow = row + 1;
    let currentCol = col;
    let maxValue = -1;
    let treecount = 0;
    while (currentRow <= matrixMaxRow) {
      const tree = matrix[currentRow][currentCol];
      if (tree === matrix[row][col]) {
        treecount++;
        break;
      }
      if (tree > maxValue) {
        maxValue = tree;
        treecount++;
      } else if (tree === maxValue) {
        treecount++;
        break;
      } else {
        break;
      }
      currentRow++;
    }
    console.log("Down view: ", treecount);

    visibility.push(treecount);
  };

  // looking left
  const left = () => {
    let currentRow = row;
    let currentCol = col - 1;
    let maxValue = -1;
    let treecount = 0;
    while (currentCol >= 0) {
      const tree = matrix[currentRow][currentCol];
      if (tree === matrix[row][col]) {
        treecount++;
        break;
      }
      if (tree > maxValue) {
        maxValue = tree;
        treecount++;
      } else if (tree === maxValue) {
        treecount++;
        break;
      } else {
        break;
      }
      currentCol--;
    }
    console.log("Left view: ", treecount);

    visibility.push(treecount);
  };

  // looking right
  const right = () => {
    let currentRow = row;
    let currentCol = col + 1;
    let maxValue = -1;
    let treecount = 0;
    while (currentCol <= matrixMaxCol) {
      const tree = matrix[currentRow][currentCol];
      if (tree === matrix[row][col]) {
        treecount++;
        break;
      }
      if (tree > maxValue) {
        maxValue = tree;
        treecount++;
      } else if (tree === maxValue) {
        treecount++;
        break;
      } else {
        break;
      }
      currentCol++;
    }
    console.log("Right view: ", treecount);
    visibility.push(treecount);
  };

  // console.log("---");
  // console.log("Tree: ", row, "-", col);
  up();
  down();
  left();
  right();
  // console.log(visibility);
  // console.log("---");

  // multiply all visibility
  let totalVisibility = 1;
  visibility.forEach((v) => {
    totalVisibility *= v;
  });

  return totalVisibility;
}

function main() {
  const data = getData("../data/8/data.txt");
  const rows = data.split("\n");

  // build a matrix
  const matrix = [];
  let row = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      row.push(rows[i][j]);
    }
    matrix.push(row);
    row = [];
  }

  // parse to Int all element in matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = parseInt(matrix[i][j]);
    }
  }

  const visibleTreesString: Set<string> = new Set();
  const matrixRowLenght = matrix.length;
  const matrixColumnLenght = matrix[0].length;

  // find visible trees
  // top view
  const top = () => {
    let currentRow = 0;
    let currentColumn = 0;
    let maxValue = -1;
    while (currentColumn < matrixColumnLenght) {
      while (currentRow < matrixRowLenght) {
        const tree = matrix[currentRow][currentColumn];
        if (tree > maxValue) {
          visibleTreesString.add(`${currentRow}-${currentColumn}`);
          maxValue = tree;
        }
        currentRow++;
      }
      currentColumn++;
      currentRow = 0;
      maxValue = -1;
    }
  };
  top();

  // bottom view
  const bottom = () => {
    let currentRow = matrixRowLenght - 1;
    let currentColumn = 0;
    let maxValue = -1;
    while (currentColumn < matrixColumnLenght) {
      while (currentRow >= 0) {
        const tree = matrix[currentRow][currentColumn];
        if (tree > maxValue) {
          visibleTreesString.add(`${currentRow}-${currentColumn}`);
          maxValue = tree;
        }
        currentRow--;
      }
      currentColumn++;
      currentRow = matrixRowLenght - 1;
      maxValue = -1;
    }
  };
  bottom();

  // left view
  const left = () => {
    let currentRow = 0;
    let currentColumn = 0;
    let maxValue = -1;
    while (currentRow < matrixRowLenght) {
      while (currentColumn < matrixColumnLenght) {
        const tree = matrix[currentRow][currentColumn];
        if (tree > maxValue) {
          visibleTreesString.add(`${currentRow}-${currentColumn}`);
          maxValue = tree;
        }
        currentColumn++;
      }
      currentColumn = 0;
      currentRow++;
      maxValue = -1;
    }
  };
  left();

  // right view
  const right = () => {
    let currentRow = 0;
    let currentColumn = matrixColumnLenght - 1;
    let maxValue = -1;
    while (currentRow < matrixRowLenght) {
      while (currentColumn >= 0) {
        const tree = matrix[currentRow][currentColumn];
        if (tree > maxValue) {
          visibleTreesString.add(`${currentRow}-${currentColumn}`);
          maxValue = tree;
        }
        currentColumn--;
      }
      currentColumn = matrixColumnLenght - 1;
      currentRow++;
      maxValue = -1;
    }
  };
  right();

  console.log("Visible Trees: ", visibleTreesString.size);

  const visibilityArray: TreeVisibility[] = [];

  matrix.forEach((stripe, row) => {
    stripe.forEach((tree, col) => {
      const v = new TreeVisibility(
        row,
        col,
        findVisibility(tree, col, row, matrix)
      );
      visibilityArray.push(v);
    });
  });

  // find the max visibility
  let maxVisibility = 0;
  visibilityArray.forEach((v) => {
    if (v.value > maxVisibility) {
      maxVisibility = v.value;
    }
  });

  console.log("Max visibility: ", maxVisibility);
}

main();
