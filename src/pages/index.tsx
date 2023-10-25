import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "./layout";
import { Carousel } from "antd";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user") === "student") {
      router.push("/student");
    } else if (localStorage.getItem("user") === "admin") {
      router.push("/admin");
    } else if (localStorage.getItem("user") === "donor") {
      router.push("/donor");
    }
  });
  const contentStyle: React.CSSProperties = {
    height: "500px",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Layout>
      <div className="  flex h-full w-full flex-col items-center">
        <div className=" px-2 pt-2 text-center text-2xl font-semibold text-white sm:pt-10 sm:text-5xl">
          NWSSU DONATION
        </div>
        <div className="mb-5 px-2 text-center font-normal text-white sm:text-xl">
          Contribute by donating to support our students.
        </div>
        <div
          className="carousel w-11/12 sm:w-10/12"
          style={{ maxHeight: "60vh", height: "60vh" }}
        >
          <div
            id="item1"
            className="carousel-item w-full"
            style={{
              backgroundImage: `url("/donate1.jpeg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            id="item2"
            className="carousel-item w-full"
            style={{
              backgroundImage: `url("/donate2.jpeg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            id="item3"
            className="carousel-item w-full"
            style={{
              backgroundImage: `url("/donate3.jpeg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            id="item4"
            className="carousel-item w-full"
            style={{
              backgroundImage: `url("/donate4.jpeg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
          <a href="#item4" className="btn btn-xs">
            4
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
