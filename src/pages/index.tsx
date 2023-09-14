import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user") === "student") {
      router.push("/student");
    } else if (localStorage.getItem("user") === "admin") {
      router.push("/admin");
    } else if (localStorage.getItem("user") === "donor") {
      router.push("/donor");
    } else {
      router.push("/login");
    }
  });

  return;
};

export default Home;
