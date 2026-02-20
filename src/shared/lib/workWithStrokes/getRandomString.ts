export const getRandomString = (len: number) => {
  let str = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return str;
};
