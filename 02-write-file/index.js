const { stdin: input, stdout: output } = require("process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const stream = fs.createWriteStream(path.join(__dirname, "text.txt"));

const rl = readline.createInterface({ input, output });
console.log("Enter your TODO list");

rl.on("line", (input) => {
  if (input === "exit") {
    rl.close();
  } else { 
    stream.write(`${input}\n`);
  }
});

rl.on("close", () => {
  console.log("Don't forget to do your tasks");
});
