import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import type { MenuProps } from "antd";
import { Typography } from "antd";
import { useRouter } from "next/router";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { HiMenu } from "react-icons/hi";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  type?: string;
}
const { Text } = Typography;

const SiderMenu = ({ activeButton, setActiveButton }: any) => {
  const router = useRouter();
  const path = router.pathname;
  const items: MenuItem[] = [
    {
      key: "/donor",
      icon: <MdDashboard size={20} />,
      label: "Dashboard",
    },
    {
      key: "/donor/donations",
      icon: <BiSolidDonateHeart size={20} />,
      label: "Your Donations",
    },
    {
      key: "/donor/account",
      icon: <FaUserCog size={20} />,
      label: "Account",
    },
  ];
  const [current, setCurrent] = useState(path);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className={` absolute bottom-0 left-0 top-0 z-50 flex w-1/2 flex-col gap-1 overflow-scroll bg-[#339598] p-2 text-white transition-all duration-300 sm:hidden ${
          activeButton ? "translate-x-0" : "-translate-x-[20rem]"
        }`}
      >
        <div className=" px-2 pt-2" onClick={() => setActiveButton(false)}>
          <HiMenu size={40} color="white" />
        </div>
        <div className=" flex flex-col items-center justify-center rounded-lg bg-[#65d0d3] p-2">
          <img src="/nwssu.png" alt="nwssu" className=" w-1/2 " />
          <div className=" rounded-lg text-center text-sm font-semibold text-white ">
            NWSSU Donation App
          </div>
        </div>
        {items.map((data) => {
          return (
            <div
              onClick={() => router.push(data.key)}
              className={`flex w-full cursor-pointer flex-row items-center gap-3 rounded p-2  text-sm font-semibold ${
                current === data.key
                  ? "bg-white text-[#297578]"
                  : "bg-[#3ba9ac] text-white hover:brightness-95"
              }`}
            >
              {data.icon}
              {data.label}
            </div>
          );
        })}
      </div>
      <div className=" hidden w-80 flex-col items-center gap-1 bg-[#3ba9ac] p-2  py-2 sm:flex">
        <div className=" flex flex-col items-center justify-center rounded-lg  p-2">
          <img src="/nwssu.png" alt="nwssu" className=" w-1/2 " />
          <div className=" -mt-3  rounded-lg text-center text-xl font-semibold text-white ">
            NWSSU Donation App
          </div>
        </div>
        {items.map((data) => {
          return (
            <div
              onClick={() => router.push(data.key)}
              className={`flex w-full cursor-pointer flex-row items-center gap-3 rounded p-2 px-6 text-base font-semibold ${
                current === data.key
                  ? "bg-white text-[#297578]"
                  : "bg-[#3ba9ac] text-white hover:brightness-95"
              }`}
            >
              {data.icon}
              {data.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiderMenu;
