import { api } from "~/utils/api";
import DonorLayout from "./layout";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import DonationMenu from "./components/donationMenu";
import DonationLists from "./components/donationLists";
import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/router";
import { AiOutlinePlus, AiOutlinePoweroff } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";

const DonorPage = () => {
  const router = useRouter();
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const { data: donor } = api.donor.findDonor.useQuery({
    id: user || "",
  });
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className=" flex w-full items-center justify-center gap-2 rounded-md bg-red-300 py-1 text-sm hover:brightness-95 sm:text-lg"
          onClick={() => {
            localStorage.clear();
            router.push("/donorLogin");
          }}
        >
          <AiOutlinePoweroff />
          Logout
        </div>
      ),
    },
  ];
  return (
    <DonorLayout activeButton={activeButton} setActiveButton={setActiveButton}>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          {
            <span className="hidden p-3 text-3xl font-extrabold text-[#205b5d] sm:flex">
              Welcome {donor?.name} !
            </span>
          }
          <HiMenu
            className="text-4xl sm:hidden sm:text-5xl"
            color="green"
            onClick={() => setActiveButton(true)}
          />
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
              <div className=" flex flex-col items-end">
                <span className=" text-sm font-bold sm:text-xl">Donor</span>
                <span className=" -mt-1 text-xs sm:text-base">
                  {donor?.name}
                </span>
              </div>
              <FaUserCircle size={45} />
            </div>
          </Dropdown>
        </div>
        <div onClick={() => setActiveButton(false)}>
          <div className="mt-4 flex flex-row items-center justify-between sm:mt-2">
            <div className="  rounded-md bg-[#d5edef] p-1 text-xs text-[#205b5d] sm:mx-5 sm:p-2 sm:px-5 sm:text-lg">
              Welcome, valued donor!
            </div>
            <button
              onClick={() => router.push("/donor/addDonation")}
              className=" flex cursor-pointer items-center justify-center gap-2 rounded border-none bg-[#3ba9ac] p-2 px-8 font-bold text-white transition-all hover:brightness-105 sm:mr-5 sm:text-lg"
            >
              Add Donation <AiOutlinePlus />
            </button>
          </div>
          <DonationLists />
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorPage;
