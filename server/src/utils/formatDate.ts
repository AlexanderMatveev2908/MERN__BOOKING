export const formatDateForUser = (check: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(new Date(check));

export const formatDateForUTC = (date: string) =>
  new Date(new Date(date).setUTCHours(10, 0, 0, 0));
