import dayjs from "dayjs";

export const getCurrentStringDate = () => {
  return dayjs(new Date()).format("DD.MM.YYYY HH:mm:ss.SSS");
};
