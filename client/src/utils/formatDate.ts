export const formatDate = (date: Date) => {
  const dateObj = new Date(date);

  return `${dateObj.getDate().toString().padStart(2, "0")}/${(
    dateObj.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateObj.getFullYear()}`;
};

export const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

export const formatDateForUser = (check: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(check);

export const formatDateForUTC = (date: string | Date) =>
  typeof date === "string"
    ? new Date(new Date(date).setUTCHours(10, 0, 0, 0))
    : new Date(date.setUTCHours(10, 0, 0, 0));
