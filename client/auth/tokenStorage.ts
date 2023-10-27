export const setAccessToken = (token: any) => {
  localStorage.setItem("access_token", token);
};
export const getAccessToken = () => {
  const token = localStorage.getItem("access_token")
  return token;
};
export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const setRefreshToken = (token: any) => {
    localStorage.setItem('refresh_token', token)
}
export const getRefreshToken = () => {
  const token = localStorage.getItem('refresh_token')
    return token 
}
export const removeRefreshToken = () => {
    localStorage.removeItem('refresh_token')
}