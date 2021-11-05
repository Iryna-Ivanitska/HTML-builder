const fs = require("fs");
const path = require("path");
const { stat, copyFile } = require("fs");
const {
  promises: { readFile },
} = require("fs");

function errorThrow(err) {
  if (err) throw err;
}

// Сopy styles

const distPath = path.join(__dirname, "project-dist");
fs.mkdir(distPath, { recursive: true }, errorThrow);

function readDirectory() {
  fs.writeFile(path.join(distPath, "style.css"), "", errorThrow);
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
        path.join(distPath, "style.css"),
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

// Copy assets folder

const newDir = path.join(__dirname, "project-dist/assets");
const oldDir = path.join(__dirname, "assets");

function clearFolder(p) {
  fs.readdir(p, (err, files) => {
    // if (err) throw err;
    for (const file of files) {
      stat(path.join(p, file), (err, stats) => {
        // if (err) throw err;
        if (stats.isDirectory()) {
          clearFolder(path.join(p, file));
        } else {
          fs.unlink(path.join(p, file), () => {});
        }
      });
    }
  });
}

fs.mkdir(newDir, { recursive: true }, errorThrow);

async function copyDir(oldDir, newDir) {
  await clearFolder(newDir);
  fs.readdir(oldDir, function (err, files) {
    if (err) throw err;

    for (const file of files) {
      // console.log(file)
      stat(path.join(oldDir, file), (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          fs.mkdir(path.join(newDir, file), { recursive: true }, errorThrow);
          copyDir(path.join(oldDir, file), path.join(newDir, file));
        } else {
          copyFile(
            path.join(oldDir, file),
            path.join(newDir, file),
            errorThrow
          );
        }
      });
    }
  });
}

// Create index.html

let content;
let comp = {};

function createNewHtml() {
  readFile(path.join(__dirname, "template.html"))
    .then((fileBuffer) => {
      content = fileBuffer.toString();
      readComponents(content);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

let compDir = path.join(__dirname, "components");

function readComponents(content) {
  let newContent = content;
  fs.readdir(compDir, (err, files) => {
    for (const file of files) {
      readFile(path.join(compDir, file))
        .then((fileBuffer) => {
          let name = path.parse(path.join(compDir, file)).name;
          // comp[`{{ ${name} }}`] = fileBuffer.toString();
          newContent = newContent.replace(`{{${name}}}`, fileBuffer.toString());
          creatIndexHtml(newContent);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  });
}

function creatIndexHtml(content) {
  // console.log(content);
  fs.writeFile(path.join(distPath, "index.html"), content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
readDirectory();
createNewHtml();

copyDir(oldDir, newDir);
