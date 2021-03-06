# Coverage Parcsser
github: [@isAdrisal/coverage-parcsser](https://github.com/isAdrisal/coverage-parcsser)

## Overview
This utility parses the JSON output from Chrome DevTools' coverage
reports and outputs the covered CSS code on a per-file basis.

## Getting Started

### Installation
Install the package with npm:
```
npm i coverage-parcsser -g
```

### Usage
```
coverage-parcsser --file coverage.json
```
This will run the parser on all `.css` files contained within the coverage.json report, and output each of the parsed `.css` files to the current directory.

#### Arguments:
| Argument | Description                                                                                                                  |
|----------|------------------------------------------------------------------------------------------------------------------------------|
| --file   | Path of the input .json file (REQUIRED)                                                                                      |
| --select | If provided, parses only the report for this URL (OPTIONAL).<br>Defaults to all resource URLs. Wrap url in quotes, eg. "url" |
| --outdir | Output directory of the exported file(s) (OPTIONAL).<br>Defaults to current directory.                                       |
```
coverage-parcsser --file coverage.json --select "https://foo.bar/example.css" --outdir ./output
```