import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
const DonationMenu = ({ tabActive, setTabActive }: any) => {
  const router = useRouter();
  return (
    <>
      <div className=" mt-2 flex flex-row items-center justify-between px-3 text-base text-gray-600 sm:hidden">
        <span>Your Donations</span>

        <button
          onClick={() => router.push("/donor/addDonation")}
          className="flex cursor-pointer items-center justify-center gap-2 rounded border-none bg-[#3ba9ac] p-2 px-4 text-xs font-bold text-white transition-all hover:brightness-105 sm:hidden"
        >
          Add Donation <AiOutlinePlus />
        </button>
      </div>
      <div className=" my-2 flex w-full flex-row items-center justify-between p-2 sm:mt-0 sm:py-3">
        <div className=" flex flex-1 flex-row items-center gap-1 rounded-full px-1 sm:w-min sm:p-1 sm:px-1">
          <div
            onClick={() => setTabActive("pending")}
            className={` flex-1 cursor-pointer  rounded-full p-1 text-center text-base transition-all sm:flex-none sm:p-2 sm:px-5 sm:text-lg ${
              tabActive === "pending"
                ? "bg-[#5073c3] text-white"
                : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
            }`}
          >
            To Donate{" "}
          </div>
          <div
            onClick={() => setTabActive("cancelled")}
            className={` flex-1 cursor-pointer rounded-full  p-1 text-center text-base transition-all sm:flex-none sm:p-2 sm:px-5 sm:text-lg ${
              tabActive === "cancelled"
                ? "bg-[#ee7575] text-white"
                : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
            }`}
          >
            Cancelled <span className=" hidden sm:inline">Donations</span>
          </div>
          <div
            onClick={() => setTabActive("confirmed")}
            className={` flex-1 cursor-pointer rounded-full  p-1 text-center text-base transition-all sm:flex-none sm:p-2 sm:px-5 sm:text-lg ${
              tabActive === "confirmed"
                ? "bg-[#3ba9ac] text-white"
                : " bg-slate-50 text-[#3ba9ac] hover:brightness-95"
            }`}
          >
            Confirmed <span className=" hidden sm:inline">Donations</span>
          </div>
        </div>
        <button
          onClick={() => router.push("/donor/addDonation")}
          className="hidden cursor-pointer items-center justify-center gap-2 rounded border-none bg-[#3ba9ac] p-2 px-8 text-lg font-bold text-white transition-all hover:brightness-105 sm:flex"
        >
          Add Donation <AiOutlinePlus />
        </button>
      </div>
    </>
  );
};

export default DonationMenu;
