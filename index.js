const handleArgs = require("./handle-args");
const parser = require("./parse-data");
const saveFiles = require("./save-files");
const fs = require("fs");

const args = process.argv.slice(2);
const scriptArgs = handleArgs(args);

const data = fs.readFileSync(scriptArgs.filePath, "utf8");
const jsonData = JSON.parse(data);

let parsedDataArr;

if (scriptArgs.selectedUrl) {
  const resourceIndex = jsonData
  .findIndex(r => r.url == scriptArgs.selectedUrl);
  parsedDataArr = parser([jsonData[resourceIndex]]);
} else {
  parsedDataArr = parser(jsonData);
};

if (parsedDataArr.length > 0) {
  const outputDir = scriptArgs.outputDir ?
    scriptArgs.outputDir : null;
  saveFiles(parsedDataArr, outputDir);
  console.log("Finished saving all files 🥳🤙");
  process.exit(0);
};

console.error("Hmm, something went wrong 😕");