import { init } from "./init";
import { add } from "./add";

const command = process.argv[2];
const filePath = process.argv[3];

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

  default:
    console.log("Usage: node dist/index.js <command>");
    console.log("Available commands: init");
    break;
}
