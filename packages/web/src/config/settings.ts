export const sellNow__getYears = () => {
  const sellNowYears = [];
  const sellNow_minYear = 1900;

  for (let i = sellNow_minYear; i <= new Date().getFullYear(); i++) {
    sellNowYears.push(i);
  }

  return sellNowYears;
};

export const sellNowYearsSorted = sellNow__getYears()
  .map((data) => ({ value: String(data), label: String(data) }))
  .reverse();

const buildNoOfDors = () => {
  const source = [];
  for (let i = 2; i <= 6; i++) {
    source.push({ value: i, label: String(i) });
  }
  return source;
};

export const noOfDorsDictionary = buildNoOfDors();

const buildNoOfSeats = () => {
  const source = [];
  for (let i = 1; i <= 9; i++) {
    source.push({ value: i, label: String(i) });
  }
  return source;
};

export const noOfSeatsDictionary = buildNoOfSeats();
