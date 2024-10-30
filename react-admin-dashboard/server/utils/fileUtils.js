const fs = require("fs").promises;
const path = require("path");

const readJsonFile = async (filename) => {
  const filePath = path.join(__dirname, "..", filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeJsonFile = async (filename, data) => {
  const filePath = path.join(__dirname, "..", filename);
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData, "utf-8");
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};
