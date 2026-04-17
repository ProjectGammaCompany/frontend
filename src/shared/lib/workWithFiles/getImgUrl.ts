export const getImgUrl = (url: string, type: "s" | "m") => {
  console.log(url);
  const imgExt = ["png", "jpeg", "jpg"];
  if (url.split(".").length === 2) {
    const [id, ext] = url.split(".");
    if (imgExt.includes(ext)) {
      const extra = type === "s" ? "_small." : "_medium.";
      return id + extra + ext;
    }
  }
  return url;
};
