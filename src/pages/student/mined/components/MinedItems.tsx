import { Image, Popconfirm } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { pad } from "./ClaimedItems";

const MinedItemsList = ({ student }: any) => {
  const [activeTab, setActiveTab] = useState<any>(null);
  const {
    data: item,
    refetch,
    isLoading,
  } = api.item.minedItemListByStatus.useQuery({
    studentId: student?.id,
    status: activeTab,
  });
  const { mutate: deleteMined } = api.item.deleteMined.useMutation({
    onSuccess: () => {
      toast.success("Request Cancelled");
      refetch();
    },
  });
  return (
    <div
      style={{ maxHeight: "80vh", height: "80vh" }}
      className=" flex flex-col items-center gap-3"
    >
      <div className=" flex w-full flex-row items-center  justify-center gap-2 sm:w-min">
        <div
          onClick={() => setActiveTab(null)}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-full  p-1 text-sm sm:w-52 sm:flex-none sm:text-lg ${
            activeTab === null
              ? "bg-blue-400 text-white"
              : " border border-solid border-blue-400 text-blue-400"
          }`}
        >
          Mined
        </div>
        <div
          onClick={() => setActiveTab("confirmed")}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-full  p-1 text-sm sm:w-52 sm:flex-none sm:text-lg ${
            activeTab === "confirmed"
              ? "bg-green-400 text-white"
              : " border border-solid border-green-400 text-green-400"
          }`}
        >
          Approved
        </div>
        <div
          onClick={() => setActiveTab("denied")}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-full  p-1 text-sm sm:w-52 sm:flex-none sm:text-lg ${
            activeTab === "denied"
              ? "bg-orange-400 text-white"
              : " border border-solid border-orange-400 text-orange-400"
          }`}
        >
          Denied
        </div>
      </div>
      <div
        className=" hidden flex-1 flex-col gap-1 overflow-scroll rounded-md border border-solid border-gray-100 p-5 shadow-xl sm:flex"
        style={{ maxWidth: 700, width: 700 }}
      >
        {isLoading ? (
          <div className=" flex h-full w-full  items-center justify-center text-lg text-gray-500">
            Loading ...
          </div>
        ) : !item?.length ? (
          <div className=" flex h-full w-full  items-center justify-center text-lg text-gray-500">
            No request
          </div>
        ) : (
          [...item].map((data) => {
            return (
              <div className=" flex flex-row items-center justify-between rounded border border-solid border-gray-100 p-2">
                <div className=" flex flex-1 flex-row items-center">
                  <Image
                    alt="image"
                    src={data.item?.imageUrl}
                    height={80}
                    width={120}
                  />
                  <div className=" flex flex-1 flex-col px-3">
                    <div className=" text-base font-semibold">
                      {`#${pad(data.item?.itemNo, 5)} - `}
                      {data.item?.itemName}
                    </div>
                    <div className=" text-sm">Quantity : {data?.quantity}</div>
                    <div className=" text-sm">
                      Description : {data.item?.description}
                    </div>
                  </div>
                </div>
                {activeTab === null ? (
                  <Popconfirm
                    title="Cancel Request"
                    description="Do you cancel this request?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteMined({ id: data.id })}
                  >
                    <div className=" cursor-pointer rounded bg-red-400 p-1 px-5 text-white">
                      Cancel
                    </div>
                  </Popconfirm>
                ) : activeTab === "confirmed" ? (
                  <div className=" cursor-pointer rounded border border-solid border-green-400 p-1 px-5 text-green-400">
                    You can now claim the Item
                  </div>
                ) : (
                  activeTab === "denied" && (
                    <div className=" cursor-pointer rounded border border-solid border-red-400 p-1 px-5 text-red-400">
                      Item given to another student
                    </div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>
      <div className=" flex w-full flex-1 flex-col gap-1 overflow-scroll rounded-md border border-solid border-gray-100 shadow-xl sm:hidden">
        {isLoading ? (
          <div className=" flex h-full w-full  items-center justify-center text-sm text-gray-500">
            Loading ...
          </div>
        ) : !item?.length ? (
          <div className=" flex h-full w-full  items-center justify-center text-sm text-gray-500">
            No request
          </div>
        ) : (
          [...item].map((data) => {
            return (
              <div className=" flex flex-row items-center justify-between rounded border border-solid border-gray-100 p-2">
                <div className=" flex flex-1 flex-row items-center">
                  <div className=" flex flex-1 flex-col px-3">
                    <div className=" text-sm font-semibold">
                      {`#${pad(data.item?.itemNo, 5)} - `}
                      {data.item?.itemName}
                    </div>
                    <div className=" text-sm">Quantity : {data?.quantity}</div>
                    <div className=" text-xs">
                      Description : {data.item?.description}
                    </div>
                  </div>
                </div>
                {activeTab === null ? (
                  <Popconfirm
                    title="Cancel Request"
                    description="Do you cancel this request?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteMined({ id: data.id })}
                  >
                    <div className=" cursor-pointer rounded bg-red-400 p-1 px-5 text-xs text-white">
                      Cancel
                    </div>
                  </Popconfirm>
                ) : activeTab === "confirmed" ? (
                  <div className=" w-1/4 cursor-pointer rounded border border-solid border-green-400 p-1 text-center text-xs text-green-400">
                    You can now claim the Item
                  </div>
                ) : (
                  activeTab === "denied" && (
                    <div className=" w-1/4 cursor-pointer rounded border border-solid border-red-400 p-1 text-center text-xs text-red-400">
                      Item given to another student
                    </div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MinedItemsList;
