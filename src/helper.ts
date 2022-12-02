import * as fs from "fs";

export function getData(file: fs.PathOrFileDescriptor) {
  const data = fs.readFileSync(file, "utf8");
  return data;
}
