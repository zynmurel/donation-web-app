import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
const DonationMenu = ({ tabActive, setTabActive }: any) => {
  const router = useRouter();
  return (
    <div className=" my-2 flex w-full flex-row items-center justify-between p-2 sm:mt-0 sm:py-3">
      <div className=" flex flex-row items-center gap-1 rounded-full bg-[#dcefef] px-1 sm:p-1 sm:px-1">
        <div
          onClick={() => setTabActive("pending")}
          className={` cursor-pointer rounded p-1 text-xs transition-all sm:rounded-full sm:p-2 sm:px-5 sm:text-lg ${
            tabActive === "pending"
              ? "bg-[#5073c3] text-white"
              : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
          }`}
        >
          To Donate{" "}
        </div>
        <div
          onClick={() => setTabActive("cancelled")}
          className={` cursor-pointer rounded p-1 text-xs transition-all sm:rounded-full sm:p-2 sm:px-5 sm:text-lg ${
            tabActive === "cancelled"
              ? "bg-[#ee7575] text-white"
              : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
          }`}
        >
          Cancelled Donations{" "}
        </div>
        <div
          onClick={() => setTabActive("confirmed")}
          className={` cursor-pointer rounded p-1 text-xs transition-all sm:rounded-full sm:p-2 sm:px-5 sm:text-lg ${
            tabActive === "confirmed"
              ? "bg-[#3ba9ac] text-white"
              : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
          }`}
        >
          Confirmed Donations{" "}
        </div>
      </div>
      <button
        onClick={() => router.push("/donor/addDonation")}
        className="hidden cursor-pointer items-center justify-center gap-2 rounded border-none bg-[#3ba9ac] p-2 px-8 text-lg font-bold text-white transition-all hover:brightness-105 sm:flex"
      >
        Add Donation <AiOutlinePlus />
      </button>
    </div>
  );
};

export default DonationMenu;
