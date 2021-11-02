// import { readdir } from 'fs/promises';
const fs = require("fs");
const path = require("path");
const { stat } = require("fs");

const dirpath = path.join(__dirname, "secret-folder");

fs.readdir(dirpath, function (err, files) {
  if (err) throw err;
  for (const file of files) {
    let filePath = path.join(dirpath, file);
    stat(filePath, (err, stats) => {
      if (err) throw err;
      if (!stats.isDirectory()) {
        let name = path.parse(filePath).name;
        let ext = path.extname(filePath).replace(".", "");
        console.log(`${name} - ${ext} - ${stats.size / 1024}kb`);
      }
    });
  }
});
