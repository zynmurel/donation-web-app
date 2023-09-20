import { api } from "~/utils/api";
import DonorLayout from "../layout";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import DonationMenu from "../components/donationMenu";
import DonationLists from "./components/donationnLists";
import { Dropdown, MenuProps } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useRouter } from "next/router";

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
    });
  }, [tabActive, user]);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
        <div className=" flex justify-between">
          <div className="flex w-4/5 flex-col">
            <span className=" p-3 text-3xl font-extrabold text-[#205b5d]">
              Your Donations
            </span>
            <span className=" ml-3 rounded bg-blue-100 p-2 px-5  text-blue-900">
              Notice: Your submission for "To Donate Items" will be moved to the
              "Cancelled" category if the school does not receive the donated
              items within 7 days prior to the inclusion of your item in the "To
              Donate Items" list. You will have the option to resubmit the
              "Cancelled Item" if you meet the deadline.{" "}
            </span>
          </div>

          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex h-16 cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
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
        <DonationMenu tabActive={tabActive} setTabActive={setTabActive} />
        <DonationLists
          setData={setData}
          data={data}
          tabActive={tabActive}
          setTabActive={setTabActive}
        />
      </div>
    </DonorLayout>
  );
};

export default DonorPage;
