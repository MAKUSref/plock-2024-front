import dayjs from "dayjs";

export const formatDate = (date: string) =>
  dayjs(date).format("DD MMMM YYYY | HH:mm");
