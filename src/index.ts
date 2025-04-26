import { init } from "./init";
import { add } from "./add";
import { commit } from "./commit";

const command = process.argv[2];
const filePath = process.argv[3];
const message = process.argv[3];
const author = "Daniel";

switch (command) {
  case "init":
    init();
    break;

  case "add":
    if (!filePath) {
      console.log("Usage: node dist/index.js add <file-path>");
    } else {
      add(filePath);
    }
    break;

  case "commit":
    if (!message) {
      console.log("Usage: node dist/index.js commit <message>");
    } else {
      commit(message, author);
    }
    break;

  default:
    console.log("Usage: node dist/index.js <command>");
    console.log("Available commands: init");
    break;
}
