export const loginLocalStorage = (user: string, id: string) => {
  localStorage.setItem("user", user), localStorage.setItem("id", id);
};
