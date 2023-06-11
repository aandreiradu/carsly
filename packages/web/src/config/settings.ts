export const sellNow__getYears = () => {
  const sellNowYears = [];
  const sellNow_minYear = 1900;

  for (let i = sellNow_minYear; i <= new Date().getFullYear(); i++) {
    sellNowYears.push(i);
  }

  return sellNowYears;
};
