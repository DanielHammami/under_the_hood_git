import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

const INDEX_FILE = path.join(process.cwd(), ".mini-git", "index.json");

function calculateHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha1");
  hash.update(fileBuffer);

  return hash.digest("hex");
}

export function add(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let index: any = {};
  if (fs.existsSync(INDEX_FILE)) {
    const raw = fs.readFileSync(INDEX_FILE, "utf-8").trim();
    if (raw) index = JSON.parse(raw);
  }

  const fileHash = calculateHash(filePath);

  index[filePath] = { hash: fileHash };

  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2) + "\n");

  console.log(`File added to index: ${filePath}`);
}
