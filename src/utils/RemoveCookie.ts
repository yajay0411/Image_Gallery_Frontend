const removeCookie = (
  name: string,
  path: string = "/",
  domain?: string
): void => {
  let cookieString =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
  if (domain) {
    cookieString += " domain=" + domain + ";";
  }
  document.cookie = cookieString;
};

export default removeCookie;
