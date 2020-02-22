const formatRanges = require("./format-ranges");

module.exports = reportsData => {
  let output = [];

  for (const report of reportsData) {
    let reportType = report.url.match(/^.*\.([a-z]*)/i)[1];
    if (reportType !== "css") { continue };

    let temp = {
      "url": report.url
    };
    
    // Some ranges in the data have duplicate start or end values,
    // and some may overlap with other ranges. Handle these first.
    const ranges = formatRanges(report.ranges);
    let text = String(report.text);
    
    let strings = [];
    for (const range of ranges) {
      strings.push(text.substr(range.start, range.end - range.start));
    };

    if (strings.length > 0) {
      temp.text = strings.join('\n\n');
    };
    output.push(temp);
  };
  
  return output;
};