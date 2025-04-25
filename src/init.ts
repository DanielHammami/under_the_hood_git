import * as fs from "fs";
import * as path from "path";

const MINI_GIT_DIR = path.join(process.cwd(), ".mini-git");
const HEAD_FILE = path.join(MINI_GIT_DIR, "HEAD");
const REFS_HEADS_DIR = path.join(MINI_GIT_DIR, "refs", "heads");
const OBJECTS_DIR = path.join(MINI_GIT_DIR, "objects");
const REFS_TAGS_DIR = path.join(MINI_GIT_DIR, "refs", "tags");

export function init(): void {
  if (fs.existsSync(MINI_GIT_DIR)) {
    console.log("This repository has already been initialized.");
    return;
  }

  fs.mkdirSync(MINI_GIT_DIR, { recursive: true });
  fs.mkdirSync(REFS_HEADS_DIR, { recursive: true });
  fs.mkdirSync(OBJECTS_DIR, { recursive: true });
  fs.mkdirSync(REFS_TAGS_DIR, { recursive: true });

  fs.writeFileSync(HEAD_FILE, "ref: refs/heads/main\n");

  const mainBranchFile = path.join(REFS_HEADS_DIR, "main");
  fs.writeFileSync(mainBranchFile, "");

  console.log("Initialized an empty Git repository in " + MINI_GIT_DIR);
}
