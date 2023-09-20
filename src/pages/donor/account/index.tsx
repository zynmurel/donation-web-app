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
  useEffect(() => {
    console.log(donor);
  }, [donor]);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          className=" flex w-full items-center justify-center gap-2 rounded-md bg-red-100 p-2 py-1 text-lg hover:brightness-95"
          onClick={() => {
            localStorage.clear();
            router.push("/donorLogin");
          }}
        >
          <AiOutlinePoweroff />
          Logout
        </button>
      ),
    },
  ];
  return (
    <DonorLayout>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <span className=" p-3 text-3xl font-extrabold text-[#205b5d]"></span>

          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
              <div className=" flex flex-col items-end">
                <span className=" text-xl font-bold">Donor</span>
                <span className=" -mt-1">
                  {donor?.firstName} {donor?.lastName}
                </span>
              </div>
              <FaUserCircle size={45} />
            </div>
          </Dropdown>
        </div>
        <div className=" mx-auto w-2/5">
          <EditAccount />
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorPage;
