export default function setCookieOnReq(cookies) {
  // in function miyad cokkiehayi karbar rooye browseresh dare va in cookieha rooye request zamime nashode az samte server< be soorate dasti zamimash mikone
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };

  return options;
}
