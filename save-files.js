const fs = require("fs");

const pluraliseFileCount = (fileCount) => {
  return (fileCount === 1) ? "file" : "files";
};

const prepareOutputDir = (dirPath) => {
  if (dirPath === null) { return null };
  const lastChar = dirPath.charAt(dirPath.length - 1);
  return (lastChar === "/") ?
    dirPath.substr(0, dirPath.length - 1) :
    dirPath;
};


module.exports = (parsedDataArr, outputDir) => {
  const fileCount = parsedDataArr.length;
  const plural = pluraliseFileCount(fileCount);
  console.log(`Saving ${fileCount} ${plural}...`);

  const dir = prepareOutputDir(outputDir);

  if (dir && dir !== ".") {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) { throw err };
    });
  };

  for (const item of parsedDataArr) {
    const name = item.url.match(/^.*\/(.*\.[a-z]*)/i)[1];
    const outputFilePath = dir ?
      `${dir}/${name}` : name;
    fs.writeFileSync(outputFilePath, item.text);
  };
};