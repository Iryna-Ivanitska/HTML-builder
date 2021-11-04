const fs = require("fs");
const path = require("path");
const { copyFile } = require("fs");

function errorThrow(err) {
  if (err) throw err;
}

const newDir = path.join(__dirname, "files-copy");
const oldDir = path.join(__dirname, "files");

function clearFolder(p) {
  fs.readdir(p, (err, files) => {
    // if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(p, file), () => {});
    }
  });
}

fs.mkdir(newDir, { recursive: true }, errorThrow);

async function copyDir() {
  await clearFolder(newDir);
  fs.readdir(oldDir, function (err, files) {
    if (err) throw err;
    for (const file of files) {
      copyFile(path.join(oldDir, file), path.join(newDir, file), errorThrow);
    }
  });
}

copyDir();
