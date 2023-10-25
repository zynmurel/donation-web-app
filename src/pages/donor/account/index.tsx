import { api } from "~/utils/api";
import DonorLayout from "../layout";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import DonationMenu from "../components/donationMenu";
import DonationLists from "../components/donationLists";
import { Dropdown, MenuProps } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useRouter } from "next/router";
import EditAccount from "./components/editAccount";
import { HiMenu } from "react-icons/hi";

const DonorPage = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState("approved");
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const { data: donor } = api.donor.findDonor.useQuery({
    id: user || "",
  });
  const [activeButton, setActiveButton] = useState<boolean>(false);
  useEffect(() => {
    console.log(donor);
  }, [donor]);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className=" flex w-full items-center justify-center gap-2 rounded-md bg-red-300 p-2 py-1 text-lg hover:brightness-95"
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
          <HiMenu
            className="text-4xl sm:invisible sm:text-5xl"
            color="green"
            onClick={() => setActiveButton(!activeButton)}
          />

          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
              <div className=" flex flex-col items-end">
                <span className=" text-xl font-bold">Donor</span>
                <span className=" -mt-1">{donor?.name}</span>
              </div>
              <FaUserCircle size={45} />
            </div>
          </Dropdown>
        </div>
        <div
          className=" mx-5 sm:mx-auto sm:w-2/5"
          onClick={() => setActiveButton(false)}
        >
          <EditAccount />
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorPage;
