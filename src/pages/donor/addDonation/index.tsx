import { api } from "~/utils/api";
import DonorLayout from "../layout";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AddDonationForm from "./components/addDonationForm";

const DonorPage = () => {
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

  return (
    <DonorLayout>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <span className=" p-3 text-3xl font-extrabold text-[#205b5d]">
            Add Donation
          </span>
          <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
            <div className=" flex flex-col items-end">
              <span className=" text-xl font-bold">Donor</span>
              <span className=" -mt-1">
                {donor?.firstName} {donor?.lastName}
              </span>
            </div>
            <FaUserCircle size={45} />
          </div>
        </div>
        <AddDonationForm />
      </div>
    </DonorLayout>
  );
};

export default DonorPage;
