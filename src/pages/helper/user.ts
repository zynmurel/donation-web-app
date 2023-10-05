export const user = () => {
  const userId =
    typeof window !== "undefined" &&
    window.localStorage &&
    localStorage.getItem("id");
  const userType =
    typeof window !== "undefined" &&
    window.localStorage &&
    localStorage.getItem("user");
  return {
    userId,
    userType,
  };
};
