const fs = require("fs").promises;

function createf(path, start, end) {
  if (start > end) return Promise.resolve();
  else {
    let filepath = `${path}/file${start}.json`;
    return fs
      .writeFile(filepath, "file" + start)
      .then(() => {
        console.log("successfully created" + start);
      })
      .catch(() => {
        console.log(err);
      });
  }
}

function deletef(path, start) {
  let filepath = `${path}/file${start}.json`;
  return fs
    .unlink(filepath)
    .then(() => console.log("successfully deleted"))
    .catch((err) => console.error(err));
}

function rec(path, start, end) {
  createf(path, start, end)
    .then(() => {
      return deletef(path, start);
    })
    .then(() => {
      if (start < end) {
        return rec(path, start + 1, end);
      }
    });
}

function base(path, number) {
  rec(path, 1, number);
}
module.exports = base;
