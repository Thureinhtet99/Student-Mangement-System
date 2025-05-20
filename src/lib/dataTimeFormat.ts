export const dateTimeFormat = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};
export const dateFormat = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  }).format(new Date(date));
};
