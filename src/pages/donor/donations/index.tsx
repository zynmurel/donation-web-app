import { api } from "~/utils/api";
import DonorLayout from "../layout";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import DonationMenu from "../components/donationMenu";
import DonationLists from "./components/donationnLists";
import { Dropdown, MenuProps } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useRouter } from "next/router";
import { HiMenu } from "react-icons/hi";

export interface ItemData {
  id: string;
  description: string | null;
  type: string;
  status: string;
  imageUrl: string;
  studentId: string | null;
  donorId: string;
  createdAt: Date;
  updatedAt: Date;
}
const DonorPage = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState("pending");
  const [data, setData] = useState<ItemData[]>([]);
  let user = "";
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id") || "";
  }
  const { data: donor } = api.donor.findDonor.useQuery({
    id: user || "",
  });
  const { mutate, isLoading } = api.item.getItemsByStatus.useMutation({
    onSuccess: (data) => setData(data),
  });
  useEffect(() => {
    console.log(donor);
  }, [donor]);
  useEffect(() => {
    mutate({
      donorId: user,
      status: tabActive,
      alsoDonated: tabActive === "confirmed" ? true : false,
    });
  }, [tabActive, user]);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
  const [activeButton, setActiveButton] = useState<boolean>(false);
  return (
    <DonorLayout activeButton={activeButton} setActiveButton={setActiveButton}>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between sm:items-start">
          <div className=" hidden w-4/5 flex-col sm:flex">
            <span className=" text-xl font-extrabold text-[#205b5d] sm:p-3 sm:text-3xl">
              Your Donations
            </span>
          </div>
          <HiMenu
            className="text-4xl sm:hidden sm:text-5xl"
            color="green"
            onClick={() => setActiveButton(!activeButton)}
          />

          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex h-16 cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
              <div className=" flex flex-col items-end">
                <span className=" text-xl font-bold">Donor</span>
                <span className=" -mt-1">{donor?.name}</span>
              </div>
              <FaUserCircle size={45} />
            </div>
          </Dropdown>
        </div>
        <div
          onClick={() => setActiveButton(false)}
          style={{ maxHeight: "100vh", height: "100vh" }}
        >
          <DonationMenu tabActive={tabActive} setTabActive={setTabActive} />
          <DonationLists
            setData={setData}
            data={data}
            tabActive={tabActive}
            setTabActive={setTabActive}
          />
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorPage;
