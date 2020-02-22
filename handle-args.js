module.exports = args => {
  const errorText = {
    "noPath": `
    Try again with the input file path, eg. 'npm run coverage-parser --file coverage.json'
    Use 'coverage-parser --help' for more information.
    `,

    "badArgs": `
    Malformed arguments provided 😭😭
    Use 'coverage-parser --help' for more information and try again.
    `,

    "noArgs": `
    Try again with the input file path, eg. 'coverage-parser --file coverage.json'
    Use 'coverage-parser --help' for more information.
    `,

    "noTests": `No tests created.`
  };


  if (args.length === 0) {
    console.error(errorText.noArgs);
    process.exit(0);
  };
  
  if (args.length === 1) {
    if (args.includes("--help") || args.includes("--h")) {
      const helpText = `
      /* ======================================================================== */
      /* ====================   🔥  COVERAGE REPORT PARSER 🔥   =================== */
      /* ======================================================================== */
      github: @isAdrisal 
      
      This utility parses the raw JSON output from Chrome DevTools' coverage
      reports and outputs the covered code to a file.
      
      Arguments:
      --file   ==> Path of the input .json file (REQUIRED)
    
      --select ==> If provided, parses only the report for this URL (OPTIONAL).
                   Defaults to all resource URLS. Enter as string eg. "url"
    
      --outdir ==> Output directory of the exported file(s) (OPTIONAL).
                   Defaults to current directory.
    
      eg. npm run coverage-parser --file ./input.json --select "https://foo.bar/example.js" --outdir ./output
      `
      console.log(helpText);
      process.exit(0);
    };
    
    if (args.includes("--test")) {
      console.log(errorText.noTests);
      process.exit(0);
    };
  };

  if (args.length < 2) {
    console.error(errorText.noPath);
    process.exit(0);
  };

  if (args.length % 2 > 0) {
    console.error(errorText.badArgs);
    process.exit(0);
  };

  if (args.includes("--file")) {
    let scriptArgs = {};

    const fileIndex = args.indexOf("--file");
    scriptArgs.filePath = args[fileIndex + 1];

    if (args.includes("--select")) {
      const selectIndex = args.indexOf("--select");
      scriptArgs.selectedUrl = args[selectIndex + 1];
    };

    if (args.includes("--outdir")) {
      const selectIndex = args.indexOf("--outdir");
      scriptArgs.outputDir = args[selectIndex + 1];
    };

    return scriptArgs;
  } else {
    console.error(errorText.noPath);
    process.exit(0);
  };
};