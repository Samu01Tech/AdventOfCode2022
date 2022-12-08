import { dir } from "console";
import { randomBytes, randomUUID } from "crypto";
import { serialize } from "v8";
import { getData } from "../helper.js";

interface File {
  name: string;
  size: number;
  directory: string;
}

interface Directory {
  nesting: number;
  name: string;
  files: string[];
  directories: string[];
  upperDir: string;
  size: number;
}

class File {
  constructor(name, weight, directory) {
    this.name = name;
    this.size = weight;
    this.directory = directory;
  }

  show(nesting: number) {
    let space = "  ";
    for (let i = 0; i < nesting; i++) {
      space += "  ";
    }
    console.log(`${space}🖹 ${this.name} [${this.size} bytes]`);
  }
}

class Directory {
  constructor(name, nesting, upperDir) {
    this.nesting = nesting;
    this.name = name;
    this.files = [];
    this.directories = [];
    this.upperDir = upperDir;
    this.size = 0;
  }

  show(nesting: number) {
    let space = "  ";
    for (let i = 0; i < nesting; i++) {
      space += "  ";
    }
    console.log(`${space}🗀 ${this.name}`);
    this.files.forEach((file) => fileList.get(file).show(nesting + 1));
  }
}

// 29116+2557+62596=57869

const dirList: Map<string, Directory> = new Map();
const fileList: Map<string, File> = new Map();
let currentNesting: number = 0;
let currentWorkingDir: string = "/";

function main() {
  const data = getData("../data/7/data.txt");

  const operations = data.split("\n");
  console.log(operations);

  operations.forEach((operation, id) => {
    const [...args] = operation.split(" ");

    if (args[0] === "$") {
      // "$ <command>"
      if (args[1] === "cd") {
        // "$ cd <directory name>"
        if (args[2] === "..") {
          // "$ cd .."
          currentNesting--;
          currentWorkingDir = dirList.get(currentWorkingDir).upperDir;
        } else {
          // "$ cd <directory name>"
          if (!dirList.has(args[2])) {
            // if directory does not exist, create it
            const newDir = new Directory(
              args[2],
              currentNesting,
              currentWorkingDir
            );
            dirList.set(newDir.name, newDir); // add to dirList
            dirList.get(currentWorkingDir).directories.push(args[2]); // add to current directory
          }
          currentNesting++;
          currentWorkingDir = args[2];
        }
      } else if (args[1] === "ls") {
        // "$ ls"
      }
    } else if (args[0] === "dir") {
      // "dir <directory name>"
      // if directory does not exist, create it
      if (!dirList.has(args[1])) {
        const newDir = new Directory(
          args[1],
          currentNesting,
          currentWorkingDir
        );
        dirList.set(newDir.name, newDir); // add to dirList
        dirList.get(currentWorkingDir).directories.push(args[1]); // add to current directory
      }
    } else {
      // "<file weight> <file name>"
      if (!fileList.has(args[1])) {
        const newFile = new File(args[1], parseInt(args[0]), currentWorkingDir);
        fileList.set(newFile.name, newFile); // add to fileList
        dirList.get(currentWorkingDir).files.push(args[1]); // add to current directory
        dirList.get(currentWorkingDir).size += newFile.size; // increase size current directory

        // increase size of upper directories
        let tmpUpperDir = dirList.get(currentWorkingDir).upperDir;
        while (tmpUpperDir !== "/") {
          dirList.get(tmpUpperDir).size += newFile.size;
          tmpUpperDir = dirList.get(tmpUpperDir).upperDir;
        }
      }
    }
  });

  // calculate size of root directory
  let rootSum = 0;
  dirList.get("/").directories.forEach((dir) => {
    rootSum += dirList.get(dir).size;
  });
  dirList.get("/").size = rootSum;

  console.log("dirList", dirList);
  console.log("fileList", fileList);

  let filteredDirSum = 0;
  dirList.forEach((d) => {
    d.size <= 100000 && (filteredDirSum += d.size);
  });
  console.log(filteredDirSum);

  // filter directories
  // let filteredDirSum = 0;
  // dirList.forEach((d) => {
  //   const x = dirList.get(d.name).size;
  //   if (x <= 100000) {
  //     filteredDirSum += x;
  //   }
  // });

  // console.log("filteredDirSum: ", filteredDirSum);
}

main();
