import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { api } from "~/utils/api";

const Layout = ({ children, student }: any) => {
  const router = useRouter();

  const [activeButton, setActiveButton] = useState<boolean>(false);

  const path = router.pathname;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className=" flex w-32 items-center justify-center gap-2 rounded-md bg-red-300 text-lg hover:brightness-95"
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
        >
          <AiOutlinePoweroff />
          Logout
        </div>
      ),
    },
  ];
  return (
    <div className=" flex min-h-screen flex-row">
      <div
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
          onClick={() => router.push("/student")}
          className={` w-full cursor-pointer rounded-full py-2  text-center  ${
            path === "/student"
              ? " bg-white text-slate-600"
              : "bg-[#ffffff38] hover:bg-[#ffffff67]"
          }`}
        >
          DONATIONS
        </div>
        <div
          onClick={() => router.push("/student/mined")}
          className={` w-full cursor-pointer rounded-full  py-2 text-center  ${
            path === "/student/mined"
              ? " bg-white text-slate-600"
              : "bg-[#ffffff38] hover:bg-[#ffffff67]"
          }`}
        >
          MINED ITEMS
        </div>
        <div
          onClick={() => router.push("/student/account")}
          className={` w-full cursor-pointer rounded-full  py-2 text-center  ${
            path === "/student/account"
              ? " bg-white text-slate-600"
              : "bg-[#ffffff38] hover:bg-[#ffffff67]"
          }`}
        >
          ACCOUNT
        </div>
      </div>
      <div className=" hidden h-screen w-72 flex-col items-center bg-[#0000001c] p-2 py-0 sm:flex">
        <img src={"/nwssu.png"} alt={"logo"} width={100} className=" pt-3" />
        <div className=" -mt-1 text-lg font-semibold text-white">
          NWSSU DONATION
        </div>
        <div className=" text-md flex h-full w-full flex-col items-center gap-2 px-2 py-5 font-semibold text-white">
          <div
            onClick={() => router.push("/student")}
            className={` w-64 cursor-pointer rounded-full  py-2 text-center  ${
              path === "/student"
                ? " bg-white text-slate-600"
                : "bg-[#ffffff38] hover:bg-[#ffffff67]"
            }`}
          >
            DONATIONS
          </div>
          <div
            onClick={() => router.push("/student/mined")}
            className={` w-64 cursor-pointer rounded-full  py-2 text-center  ${
              path === "/student/mined"
                ? " bg-white text-slate-600"
                : "bg-[#ffffff38] hover:bg-[#ffffff67]"
            }`}
          >
            MINED ITEMS
          </div>
          <div
            onClick={() => router.push("/student/account")}
            className={` w-64 cursor-pointer rounded-full  py-2 text-center  ${
              path === "/student/account"
                ? " bg-white text-slate-600"
                : "bg-[#ffffff38] hover:bg-[#ffffff67]"
            }`}
          >
            ACCOUNT
          </div>
        </div>
      </div>
      <div className=" flex w-full flex-col">
        <div className=" flex h-14 w-full flex-row items-center justify-between bg-[#0061582b] sm:h-20">
          <div className=" flex items-center p-5">
            <HiMenu
              className="text-4xl sm:hidden sm:text-5xl"
              color="white"
              onClick={() => setActiveButton(true)}
            />
            <span className=" p-5 px-2 text-sm text-white sm:block sm:text-2xl">
              Welcome <span className=" -mt-1">{student?.firstName}!</span>
            </span>
          </div>
          <div className=" mr-5 flex flex-row items-center gap-3">
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={"click"}
            >
              <div className=" flex cursor-pointer flex-row items-center gap-1 rounded  p-1 px-3 text-[#ffffff] hover:brightness-95">
                <FaUserCircle className="text-3xl sm:text-5xl" />
              </div>
            </Dropdown>
          </div>
        </div>
        <div
          onClick={() => setActiveButton(false)}
          className=" flex flex-1 justify-center bg-slate-100"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
