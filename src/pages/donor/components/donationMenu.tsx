import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
const DonationMenu = ({ tabActive, setTabActive }: any) => {
  const router = useRouter();
  return (
    <div className=" flex w-full flex-row items-center justify-between py-3">
      <div className=" flex flex-row items-center gap-1 rounded-full bg-[#dcefef] p-1 px-1">
        <div
          onClick={() => setTabActive("pending")}
          className={` cursor-pointer rounded-full p-2 px-5 text-lg transition-all ${
            tabActive === "pending"
              ? "bg-[#5073c3] text-white"
              : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
          }`}
        >
          To Donate{" "}
        </div>
        <div
          onClick={() => setTabActive("approved")}
          className={` cursor-pointer rounded-full p-2 px-5 text-lg transition-all ${
            tabActive === "approved"
              ? "bg-[#3ba9ac] text-white"
              : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
          }`}
        >
          Confirmed Donations{" "}
        </div>
        <div
          onClick={() => setTabActive("cancelled")}
          className={` cursor-pointer rounded-full p-2 px-5 text-lg transition-all ${
            tabActive === "cancelled"
              ? "bg-[#ee7575] text-white"
              : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
          }`}
        >
          Cancelled Donations{" "}
        </div>
      </div>
      <button
        onClick={() => router.push("/donor/addDonation")}
        className="flex cursor-pointer items-center justify-center gap-2 rounded bg-[#3ba9ac] p-2 px-8 text-lg font-bold text-white transition-all hover:brightness-105"
      >
        Add Donation <AiOutlinePlus />
      </button>
    </div>
  );
};

export default DonationMenu;
