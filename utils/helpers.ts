function getAllDaysInMonth(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);

  const dates: Date[] = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
