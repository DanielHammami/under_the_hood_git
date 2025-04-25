import { init } from "./init";

const command = process.argv[2];

switch (command) {
  case "init":
    init();
    break;

  default:
    console.log("Usage: node dist/index.js <command>");
    console.log("Available commands: init");
    break;
}
