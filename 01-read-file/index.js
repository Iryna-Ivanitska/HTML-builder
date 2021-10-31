const fs = require("fs");
const path = require("path");

// var stream = new fs.ReadStream(path.join(__dirname, "/text.txt"), {encoding: "utf-8" });

// stream.on('readable', function(){
//     var data = stream.read();
//     console.log(data);
// });

let stream = fs.createReadStream(path.join(__dirname, "/text.txt"));

stream.on("data", (data) => console.log(data.toString()));
