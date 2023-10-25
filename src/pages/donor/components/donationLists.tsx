import { user } from "~/pages/helper/user";
import { api } from "~/utils/api";
import ItemTable from "./tables/DashboardTable";
import { confirmedColumns, pendingColumns } from "./columns/columns";

const DonationLists = () => {
  const { userId, userType } = user();
  const { data, refetch } = api.item.getAllItems.useQuery({
    donorId: userId || "",
  });
  const confirmedItems = data?.filter(
    (data) =>
      data.status === "confirmed" ||
      data.status === "donated" ||
      data.status === "approved",
  );
  const confirmedCount = confirmedItems?.filter(
    (data) =>
      data.status === "confirmed" ||
      data.status === "approved" ||
      data.status === "donated",
  ).length;
  const donatedCount = confirmedItems?.filter(
    (data) => data.status === "donated",
  ).length;
  const cancelledItems = data?.filter((data) => data.status === "cancelled");
  const pendingItems = data?.filter((data) => data.status === "pending");
  return (
    <div className=" flex w-full flex-1 flex-col gap-2 bg-slate-50 pt-3 sm:flex-row sm:p-5">
      <div className="flex flex-1 flex-col rounded-xl bg-[#3ba9ac]">
        <div className=" flex flex-col p-1 text-lg text-white sm:p-4 sm:px-5">
          <span className=" ml-2 text-base font-medium sm:ml-0 sm:text-xl">
            Your Donated Item/s:
          </span>
          {donatedCount ? (
            <span className=" mt-2 rounded bg-[#95eaed] p-1 py-1 text-xs text-[#236d6e] sm:p-2 sm:text-sm ">
              You've generously contributed to us, and as of now,
              {donatedCount} of the items is already donated.
            </span>
          ) : (
            ""
          )}
        </div>
        <ItemTable
          data={confirmedItems}
          columns={confirmedColumns}
          scroll={500}
        />
      </div>
      <div className=" flex flex-1 flex-col gap-2 ">
        <div className=" flex flex-1 flex-col rounded-xl bg-[#5073c3] pb-0  sm:py-5">
          <div className=" flex flex-col p-1 text-lg text-white sm:p-4 sm:px-5">
            <span className=" ml-2 text-base font-medium sm:ml-0 sm:text-xl">
              Pending Donation/s:
            </span>
            <span className=" mt-2 rounded bg-[#afc7ff] p-1 py-1 text-xs text-[#233e7c] sm:p-2 sm:text-sm ">
              Your pending donation may be canceled by the administrator if the
              school does not receive the item within 7 days before its
              addition. This process helps us maintain data accuracy.
            </span>
          </div>
          <ItemTable
            data={pendingItems}
            columns={pendingColumns}
            scroll={150}
          />
        </div>
        <div className=" flex flex-1 flex-col rounded-xl bg-[#ee7575] pb-0  sm:py-5">
          <div className=" mt-1 flex flex-col p-1 pt-0 text-lg text-white sm:p-4 sm:px-5">
            <span className=" ml-2 text-base font-medium sm:ml-0 sm:text-xl">
              Cancelled Donation/s:
            </span>
            <span className=" mt-2 rounded bg-[#ffd2d2] p-1 py-1 text-xs text-[#822727] sm:p-2 sm:text-sm ">
              Donations marked as 'Cancelled' can be reprocessed on the donation
              pages. Kindly note that we cancel donations not received within a
              week as part of our data management approach.
            </span>
          </div>
          <ItemTable
            data={cancelledItems}
            columns={pendingColumns}
            scroll={150}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationLists;
