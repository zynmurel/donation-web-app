import { Image, Popconfirm } from "antd";
import dayjs from "dayjs";
import { api } from "~/utils/api";

export const pad = (num: any, size: any) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
};
const ClaimedItems = ({ student }: any) => {
  const {
    data: item,
    refetch,
    isLoading,
  } = api.item.minedItemListByStatus.useQuery({
    studentId: student?.id,
    status: "claimed",
  });
  return (
    <div
      style={{ maxHeight: "80vh", height: "80vh" }}
      className=" flex flex-col items-center gap-3"
    >
      <div
        className=" hidden flex-1 flex-col gap-1 overflow-scroll rounded-md border border-solid border-gray-100 p-5 shadow-xl sm:flex"
        style={{ maxWidth: 700, width: 700 }}
      >
        <div className=" pb-2 text-gray-600">Claimed Item/s</div>
        {isLoading ? (
          <div className=" flex h-full w-full  items-center justify-center text-lg text-gray-500">
            Loading ...
          </div>
        ) : !item?.length ? (
          <div className=" flex h-full w-full  items-center justify-center text-lg text-gray-500">
            No Claimed Items
          </div>
        ) : (
          [...item].map((data) => {
            return (
              <div className=" flex flex-row items-center justify-between rounded border border-solid border-gray-100 p-2">
                <div className=" flex flex-1 flex-row items-center">
                  <div className=" flex flex-1 flex-col px-3">
                    <div className=" text-xl font-semibold">
                      {`#${pad(data.item?.itemNo, 5)} - `}
                      {data.item?.itemName}
                    </div>
                    <div className=" text-sm">
                      Quantity : {data.item?.quantity}
                    </div>
                    <div className=" text-sm">
                      Description : {data.item?.description}
                    </div>
                  </div>
                </div>
                <div className=" flex cursor-pointer flex-col items-center justify-center rounded border border-solid border-blue-400 p-1 px-5 text-blue-400">
                  <div>Claimed at </div>
                  {dayjs(data.item.updatedAt).format("MMMM D, YYYY")}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className=" flex w-full flex-1 flex-col gap-1 overflow-scroll rounded-md border border-solid border-gray-100 shadow-xl sm:hidden">
        <div className=" p-2 text-gray-600">Claimed Item/s</div>
        {isLoading ? (
          <div className=" flex h-full w-full  items-center justify-center text-sm text-gray-500">
            Loading ...
          </div>
        ) : !item?.length ? (
          <div className=" flex h-full w-full  items-center justify-center text-sm text-gray-500">
            No Claimed Items
          </div>
        ) : (
          [...item].map((data) => {
            return (
              <div className=" flex flex-row items-center justify-between rounded border border-solid border-gray-100 p-2">
                <div className=" flex flex-1 flex-row items-center">
                  <Image
                    alt="image"
                    src={data.item?.imageUrl}
                    height={60}
                    width={60}
                  />
                  <div className=" flex flex-1 flex-col px-3">
                    <div className=" text-sm font-semibold">
                      {data.item?.itemName}
                    </div>
                    <div className=" text-xs">
                      Quantity : {data.item?.quantity}
                    </div>
                    <div className=" text-xs">
                      Description : {data.item?.description}
                    </div>
                  </div>
                </div>
                <div className=" flex cursor-pointer flex-col items-center justify-center rounded border border-solid border-blue-400 p-1 text-xs text-blue-400">
                  <div>Claimed at </div>
                  {dayjs(data.item.updatedAt).format("MMMM D, YYYY")}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ClaimedItems;
