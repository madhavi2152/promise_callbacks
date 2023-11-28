const fs = require("fs").promises;

function readf(path) {
  return fs.readFile(path, "utf-8");
}

function writef(path, data) {
  fs.writeFile(path, data, "utf-8", (err) => {
    if (err) console.error(err);
    else console.log("successfully writen");
  });
}

function appendf(path, filename) {
  fs.appendFile(path, filename, "utf-8");
}

function base(file) {
  readf(file)
    .then((data) => {
      console.log("read data from lipsum.txt succesfuly");
      return writef(
        "/home/madvi/Documents/promises/upper.txt",
        data.toUpperCase()
      );
    })
    .then((data) => {
      console.log("upper.txt created succesfully");
      return writef(
        "/home/madvi/Documents/promises/filenames.txt",
        "upper.txt"
      );
    })
    .then((data) => {
      console.log("upper.txt written in filenames.txt");
      return readf("/home/madvi/Documents/promises/upper.txt");
    })
    .then((data) => {
      data = data.toLowerCase();
      data = data.replaceAll(". ", ".\n");
      return writef("/home/madvi/Documents/promises/newline.txt", data);
    })
    .then((data) => {
      return appendf(
        "/home/madvi/Documents/promises/filenames.txt",
        "\n" + "newline.txt"
      );
    })
    .then((data) => {
      console.log("newline.txt added to filenames.txt");
      return readf("/home/madvi/Documents/promises/upper.txt");
    })
    .then((data) => {
      return writef("/home/madvi/Documents/promises/sort.txt", data);
    })
    .then(() => {
      return readf("/home/madvi/Documents/promises/newline.txt");
    })
    .then((data) => {
      return appendf("/home/madvi/Documents/promises/sort.txt", data);
    })
    .then(() => {
      return readf("/home/madvi/Documents/promises/sort.txt");
    })
    .then((data) => {
      data = data.split(" ").sort().join(" ");
      return writef("/home/madvi/Documents/promises/sort.txt", data);
    })
    .then(() => {
      return appendf(
        "/home/madvi/Documents/promises/filenames.txt",
        "\n" + "sort.txt"
      );
    })
    .then(() => {
      return readf("/home/madvi/Documents/promises/filenames.txt");
    })
    .then((data) => {
      data = data.split("\n");
      for (i in data) {
        let filename = `/home/madvi/Documents/promises/${data[i]}`;
        console.log(`${data[i]} deleted successfully`);
        let a = fs.unlink(filename);
      }
    });
}
module.exports = base;
