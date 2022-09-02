export const getAllDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);

  const dates: Date[] = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getNumberOfWeek = (dates: Date[]) => {
  const lastDateOfMonth = dates[dates.length - 1];

  const numberOfWeeks = Math.ceil(
    (lastDateOfMonth.getDate() + 6 - lastDateOfMonth.getDay()) / 7
  );

  return numberOfWeeks;
};

export const getWeeks = (dates: Date[]) => {
  return Array.from({ length: getNumberOfWeek(dates) }, (_, i) => i + 1);
};
