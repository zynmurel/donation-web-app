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
    (data) => data.status === "confirmed" || data.status === "donated",
  );
  const confirmedCount = confirmedItems?.filter(
    (data) => data.status === "confirmed",
  ).length;
  const donatedCount = confirmedItems?.filter(
    (data) => data.status === "donated",
  ).length;
  const cancelledItems = data?.filter((data) => data.status === "cancelled");
  const pendingItems = data?.filter((data) => data.status === "pending");
  return (
    <div className=" flex w-full flex-1 flex-row gap-2 bg-slate-50 p-5 pt-3">
      <div className="flex flex-1 flex-col rounded-xl bg-[#3ba9ac]">
        <div className=" flex flex-col p-4 px-5 text-lg text-white">
          <span className=" text-xl font-medium">Your Donated Item/s:</span>
          {donatedCount ? (
            <span className=" mt-2 rounded bg-[#95eaed] p-2 py-1 text-sm text-[#236d6e] ">
              You've generously contributed {confirmedCount} items, and as of
              now,
              {donatedCount} of them have been given to the students of NWSSU.
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
        <div className=" flex flex-1 flex-col rounded-xl bg-[#5073c3] py-5  pb-0">
          <div className=" flex flex-col p-4 px-5 pt-0 text-lg text-white">
            <span className=" text-xl font-medium">Pending Donation/s:</span>
            <span className=" mt-2 rounded bg-[#afc7ff] p-2 py-1 text-sm text-[#233e7c] ">
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
        <div className=" flex flex-1 flex-col rounded-xl bg-[#ee7575] py-5  pb-0">
          <div className=" flex flex-col p-4 px-5 pt-0 text-lg text-white">
            <span className=" text-xl font-medium">Cancelled Donation/s:</span>
            <span className=" mt-2 rounded bg-[#ffd2d2] p-2 py-1 text-sm text-[#822727] ">
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
