module.exports = ranges => {
  let filteredRanges = [];
  
  for (const range of ranges) {
    const start = range.start;
  
    // Skip any ranges with a start value we've already added to filteredRanges.
    if (filteredRanges.some(r => r.start === start)) { continue };
  
    // Find all ranges that have same start value as current range iteration.
    const allMatches = ranges.filter(range => range.start === start);
  
    // If it's a unique start value, add the range to filteredRanges. If not,
    // find the maximum end value of ranges with the same start value, and
    // add that to filteredRanges.
    if (allMatches.length === 1) {
      filteredRanges.push(range);
    } else {
      const maxEnd = Math.max(...allMatches.map(match => match.end));
      filteredRanges.push({"start": start, "end": maxEnd});
    };
  };
  
  // Sort filteredRanges by start values in ascending order.
  const sortedFilteredRanges = filteredRanges.sort((a, b) => a.start - b.start);

  let formattedRanges = [];
  for (const range of sortedFilteredRanges) {

    if (formattedRanges.length === 0) {
      formattedRanges.push(range);
      continue;
    };

    // Skip current iteration if it has an end value lower than last end value
    // in formattedRanges array.
    const lastFormattedRange = formattedRanges[formattedRanges.length - 1];
    if (range.end < lastFormattedRange.end) {
      continue;
    };

    // If current iteration has a lower start value than the end value of the
    // last element in formattedRanges array, change the end value of last
    // formattedRanges array element to expand the coverage of that range.
    if (range.start < lastFormattedRange.end) {
      lastFormattedRange.end = range.end;
      continue;
    };

    // If none of the above condition were met (ie. range didn't overlap with
    // previous formattedRange), add current range to formattedRanges array.
    formattedRanges.push(range);
  };

  return formattedRanges;
};