import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

const MINI_GIT_DIR = path.join(process.cwd(), ".mini-git");
const HEAD_FILE = path.join(MINI_GIT_DIR, "HEAD");
const REFS_HEADS_DIR = path.join(MINI_GIT_DIR, "refs", "heads");
const OBJECTS_DIR = path.join(MINI_GIT_DIR, "objects");
const INDEX_FILE = path.join(MINI_GIT_DIR, "index.json");

function createCommit(
  treeHash: string,
  message: string,
  author: string
): string {
  const timestamp = Math.floor(Date.now() / 1000);

  const commitContent =
    `tree ${treeHash}\n` +
    `author ${author} <${author}> ${timestamp} +0200\n` +
    `committer ${author} <${author}> ${timestamp} +0200\n\n` +
    message;

  const commitHash = crypto
    .createHash("sha1")
    .update(commitContent)
    .digest("hex");

  // Enregistrer l'objet commit
  const commitPath = path.join(
    OBJECTS_DIR,
    commitHash.slice(0, 2),
    commitHash.slice(2)
  );

  if (!fs.existsSync(commitPath)) {
    fs.mkdirSync(path.dirname(commitPath), { recursive: true });
    fs.writeFileSync(commitPath, commitContent);
  }

  return commitHash;
}

function createTree(index: Record<string, { hash: string }>): string {
  const treeContent = Object.entries(index)
    .map(([filePath, { hash }]) => `${hash} ${filePath}`)
    .join("\n");

  const treeHash = crypto.createHash("sha1").update(treeContent).digest("hex");

  // Enregistrer l'objet tree
  const treePath = path.join(
    OBJECTS_DIR,
    treeHash.slice(0, 2),
    treeHash.slice(2)
  );

  if (!fs.existsSync(treePath)) {
    fs.mkdirSync(path.dirname(treePath), { recursive: true });
    fs.writeFileSync(treePath, treeContent);
  }

  return treeHash;
}

export function commit(message: string, author: string): void {
  // Lire l'index existant
  const indexRaw = fs.readFileSync(INDEX_FILE, "utf-8").trim();
  
  let index = {};
  if (indexRaw) index = JSON.parse(indexRaw);

  // Calculer le hash de l'arbre des fichiers (tree)
  const treeHash = createTree(index);

  // Créer un objet commit
  const commitHash = createCommit(treeHash, message, author);

  // Mettre à jour HEAD pour pointer vers le nouveau commit
  fs.writeFileSync(HEAD_FILE, `ref: refs/heads/main\n`);

  // Mettre à jour le fichier main pour qu'il pointe vers le commit
  fs.writeFileSync(path.join(REFS_HEADS_DIR, "main"), commitHash);

  console.log(`Commit ${commitHash} created and branch 'main' updated.`);
}
