const fs = require("fs");
const path = require("path");
const { stat } = require("fs");
const {
  promises: { readFile },
} = require("fs");

const distPath = path.join(__dirname, "project-dist");

function readDirectory() {
    fs.writeFile(path.join(distPath, "bundle.css"), "", (err) => {
        if (err) throw err;
      });
  fs.readdir(path.join(__dirname, "styles"), function (err, files) {
    if (err) throw err;
    for (const file of files) {
      checkFile(file);
    }
  });
}

function checkFile(file) {
  
  const filePath = path.join(__dirname, `styles/${file}`);
  stat(filePath, (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) {
      if (path.extname(file) === ".css") {
        readFromFile(filePath);
      }
    }
  });
}
function readFromFile(file) {
  readFile(file)
    .then((content) => {
      fs.appendFile(
        path.join(distPath, "bundle.css"),
        `${content.toString()}\n`,
        (err) => {
          if (err) throw err;
        }
      );
    })
    .catch((error) => {
      console.error(error.message);
    });
}

readDirectory();
