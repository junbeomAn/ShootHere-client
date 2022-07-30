export const getNewYearMonth = (curryear: number, nextMonth: number) => {
  const Jan = 0;
  const Dec = 11;

  if (nextMonth === -1) {
    return [curryear - 1, Dec];
  } else if (nextMonth === 12) {
    return [curryear + 1, Jan];
  }
  return [curryear, nextMonth];
};
