import { useRouter } from "next/router";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Layout = ({ children }: any) => {
  const router = useRouter();

  const [activeButton, setActiveButton] = useState<boolean>(false);

  const path = router.pathname;
  return (
    <div className=" flex min-h-screen flex-row">
      <div
        style={{ minHeight: "100vh" }}
        className={` absolute bottom-0 left-0 top-0 z-50 flex w-1/2 flex-col gap-1 overflow-scroll bg-[#339598] p-2 text-white transition-all duration-300 sm:hidden ${
          activeButton ? "translate-x-0" : "-translate-x-[20rem]"
        }`}
      >
        <div className=" px-2 pt-2" onClick={() => setActiveButton(false)}>
          <HiMenu size={40} color="white" />
        </div>
        <img src={"/nwssu.png"} alt={"logo"} width={100} className=" mx-auto" />
        <div className=" -mt-3 mb-3 text-center text-lg font-semibold text-white">
          NWSSU DONATION
        </div>
        <div
          onClick={() => router.push("/")}
          className={` w-full cursor-pointer rounded-full py-2  text-center text-sm  ${
            path === "/"
              ? " bg-white text-slate-600"
              : "bg-[#ffffff38] hover:bg-[#ffffff67]"
          }`}
        >
          HOME
        </div>
        <div
          onClick={() => router.push("/aboutus")}
          className={` w-full cursor-pointer rounded-full  py-2 text-center text-sm  ${
            path === "/aboutus"
              ? " bg-white text-slate-600"
              : "bg-[#ffffff38] hover:bg-[#ffffff67]"
          }`}
        >
          ABOUT US
        </div>
        <div
          onClick={() => router.push("/services")}
          className={` w-full cursor-pointer rounded-full  py-2 text-center text-sm  ${
            path === "/services"
              ? " bg-white text-slate-600"
              : "bg-[#ffffff38] hover:bg-[#ffffff67]"
          }`}
        >
          SERVICES
        </div>
        <div className="mt-20  text-sm font-normal">Donate Now :</div>
        <div
          onClick={() => router.push("/donorLogin")}
          className="  cursor-pointer rounded-full bg-[#3ec4c8] py-2 text-center text-lg font-semibold text-white hover:brightness-110 sm:w-64 sm:bg-[#039296]"
        >
          Donate
        </div>
      </div>
      <div className=" hidden h-screen w-72 flex-col items-center bg-[#0000001c] p-2 py-3 sm:flex">
        <img src={"/nwssu.png"} alt={"logo"} width={180} />
        <div className=" -mt-3 text-lg font-semibold text-white">
          NWSSU DONATION
        </div>
        <div className=" text-md flex h-full w-full flex-col items-center gap-2 px-2 py-5 font-semibold text-white">
          <div
            onClick={() => router.push("/")}
            className={` w-64 cursor-pointer rounded-full  py-2 text-center  ${
              path === "/"
                ? " bg-white text-slate-600"
                : "bg-[#ffffff38] hover:bg-[#ffffff67]"
            }`}
          >
            HOME
          </div>
          <div
            onClick={() => router.push("/aboutus")}
            className={` w-64 cursor-pointer rounded-full  py-2 text-center  ${
              path === "/aboutus"
                ? " bg-white text-slate-600"
                : "bg-[#ffffff38] hover:bg-[#ffffff67]"
            }`}
          >
            ABOUT US
          </div>
          <div
            onClick={() => router.push("/services")}
            className={` w-64 cursor-pointer rounded-full  py-2 text-center  ${
              path === "/services"
                ? " bg-white text-slate-600"
                : "bg-[#ffffff38] hover:bg-[#ffffff67]"
            }`}
          >
            SERVICES
          </div>
          <div className="mt-20 w-56 text-sm font-normal">Donate Now :</div>
          <div
            onClick={() => router.push("/donorLogin")}
            className="  w-64 cursor-pointer rounded-full bg-[#039296] py-2 text-center text-lg font-semibold text-white hover:brightness-110"
          >
            Donate
          </div>
        </div>
      </div>
      <div className=" flex w-full flex-col">
        <div className=" flex h-14 w-full flex-row items-center justify-between bg-[#0061582b] sm:h-20">
          <div
            className=" flex p-5 sm:invisible"
            onClick={() => setActiveButton(true)}
          >
            <HiMenu color="white" className="text-4xl sm:hidden sm:text-5xl" />
          </div>
          <div className=" mr-5 flex flex-row items-center gap-3">
            <div className=" flex w-full flex-row items-center gap-1 text-white">
              <div className="mr-3 text-xs font-normal sm:text-base">
                Login as
              </div>
              <div
                onClick={() => router.push("/login")}
                className=" flex-1 cursor-pointer rounded-full bg-[#339598] px-5 py-2 text-center text-xs font-medium hover:brightness-95 sm:text-base"
              >
                Student
              </div>
              <div
                onClick={() => router.push("/donorLogin")}
                className=" flex-1 cursor-pointer rounded-full bg-[#339598] px-5 py-2 text-center text-xs font-medium hover:brightness-95 sm:text-base"
              >
                Donor
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-1 bg-[#ffffff11]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
