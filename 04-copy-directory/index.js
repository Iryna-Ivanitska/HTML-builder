const fs = require("fs");
const path = require("path");
const { copyFile } = require("fs");

function errorThrow(err) {
    if (err) throw err;
}

(function copyDir() {
  const newDir = path.join(__dirname, "files-copy");
  const oldDir = path.join(__dirname, "files");
  fs.mkdir(newDir, { recursive: true }, errorThrow);

  fs.readdir(oldDir, function (err, files) {
    if (err) throw err;
    for (const file of files) {
      copyFile(path.join(oldDir, file), path.join(newDir, file), errorThrow);
    }
  });
})();

