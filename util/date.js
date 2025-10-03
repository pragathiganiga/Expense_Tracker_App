export function getFormattedDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return ''; // return empty string if invalid
  }
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export function getDateMinusDays(date, days) {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return new Date(); // fallback to today if invalid
  }
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}
