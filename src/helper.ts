import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getData(file: string) {
  const data = fs.readFileSync(path.join(__dirname, file), "utf8");
  return data;
}
