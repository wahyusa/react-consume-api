function getFormattedDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { getFormattedDate };
