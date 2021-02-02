const fs = require("fs");

const read = (fileName) => {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/${fileName}.json`, { encoding: "utf8" })
  );
};

const write = (fileName, newContent) => {
  fs.writeFileSync(
    `${__dirname}/${fileName}.json`,
    JSON.stringify(newContent, 1, 2)
  );
};

module.exports = {
  read,
  write,
};
