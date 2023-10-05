import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import type { MenuProps } from "antd";
import { Typography } from "antd";
import { useRouter } from "next/router";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  type?: string;
}
const { Text } = Typography;

const AdminMenu: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  const items: MenuItem[] = [
    {
      key: "/admin",
      icon: <MdDashboard size={20} />,
      label: "Dashboard",
    },
    {
      key: "/admin/donations",
      icon: <BiSolidDonateHeart size={20} />,
      label: "Donations",
    },
    {
      key: "/admin/students",
      icon: <AiOutlineUsergroupAdd size={20} />,
      label: "Students",
    },
    {
      key: "/admin/reports",
      icon: <TbReportSearch size={20} />,
      label: "Reports",
    },
    {
      key: "/admin/settings",
      icon: <FaUserCog size={20} />,
      label: "Account & Settings",
    },
  ];
  const [current, setCurrent] = useState(path);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    console.log(e.key);
  };

  return (
    <div className=" flex w-80 flex-col items-center gap-1 bg-[#3ba9ac] p-2 py-2">
      <div className=" flex flex-col items-center justify-center rounded-lg bg-[#65d0d3] p-2">
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
  );
};

export default AdminMenu;
