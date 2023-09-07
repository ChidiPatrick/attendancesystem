const getWeekNumber = (date) => {
  const inputtedDate = new Date(date);

  const startOfYear = new Date(inputtedDate.getFullYear(), 0, 1);

  const dayOfYear = Math.floor(
    (inputtedDate - startOfYear) / (24 * 60 * 60 * 1000)
  );

  const weekNumber = Math.ceil((dayOfYear + 1) / 7);

  return weekNumber;
};

export { getWeekNumber };
