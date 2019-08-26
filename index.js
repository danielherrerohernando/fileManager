const fs = require("fs");
const path = require("path");

const getAllFiles = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? getAllFiles(path.join(dir, file), fileList)
      : fileList.concat(path.join(dir, file));
  });
  return fileList;
};

const getAllFilesByPattern = (type = /.*/, dir) =>
  getAllFiles(dir).filter(fileName => type.test(fileName));

module.exports = { getAllFilesByPattern };
