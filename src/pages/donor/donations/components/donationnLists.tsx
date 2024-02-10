import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Avatar, Image, List, Space, Table, Tag } from "antd";
import { ItemData } from "..";
import { ColumnsType } from "antd/es/table";
import { api } from "~/utils/api";
import { Dispatch, SetStateAction, useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { useRouter } from "next/router";

const DonationLists = ({
  data,
  setData,
  tabActive,
  setTabActive,
  mutate: mutateInMenu,
}: {
  data: ItemData[];
  tabActive: string;
  setTabActive: any;
  setData: Dispatch<SetStateAction<ItemData[]>>;
  mutate: any;
}) => {
  const router = useRouter();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate, isLoading } = api.item.setItemsStatus.useMutation({
    onSuccess: (data) => {
      if (data.status === "cancelled") {
        openNotificationWithIcon("info", "Item moved to cancelled items");
        setTabActive("cancelled");
      } else if (data.status === "pending") {
        openNotificationWithIcon("success", "Item reprocessed");
        setTabActive("pending");
      }
    },
  });
  const { mutate: deleteItem } = api.item.deleteItem.useMutation({
    onSuccess: (data) => {
      openNotificationWithIcon("info", "Item Deleted");
      setData(data);
    },
  });
  let color = "";
  switch (tabActive) {
    case "pending":
      color = "bg-[#e6eeff]";
      break;
    case "cancelled":
      color = "bg-[#ffe6e6]";
      break;
    case "approved":
      color = "bg-[#e6fff6]";
      break;
  }
  const pad = (num: any, size: any) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };
  const columns: ColumnsType<ItemData> = [
    {
      title: "Item No.",
      dataIndex: "itemNo",
      key: "createdAt",
      width: 150,
      render: (text) => {
        return <>{pad(text, 5)}</>;
      },
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => {
        return <>{dayjs(text, "MM-DD-YYYY").format("MMM DD, YYYY")}</>;
      },
    },
    {
      title: "Item name",
      dataIndex: "itemName",
      width: 200,
      key: "item",
      render: (tag) => {
        return <>{tag?.toUpperCase()}</>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 200,
      key: "type",
      render: (tag) => {
        return (
          <Tag className={` ${color} text-sm `} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    // {
    //   title: "Image",
    //   key: "imageUrl",
    //   width: 200,
    //   align: "center",
    //   dataIndex: "imageUrl",
    //   render: (_, data) => {
    //     return <Image src={_} height={50} />;
    //   },
    // },
    {
      title: "View Item",
      key: "imageUrl",
      width: 200,
      align: "center",
      dataIndex: "id",
      render: (_, data) => {
        return (
          <div className=" flex flex-row items-center justify-center">
            <div
              onClick={() => router.push("/donor/" + _)}
              className=" cursor-pointer rounded-full bg-green-300 px-4 py-1"
            >
              View
            </div>
          </div>
        );
      },
    },
  ];
  if (tabActive === "cancelled") {
    columns.push({
      title: "Action",
      key: "action",
      width: 300,
      align: "center",
      dataIndex: "imageUrl",
      render: (_, data) => {
        return (
          <div className=" flex flex-row items-center justify-center gap-2">
            <button
              onClick={() => mutate({ id: data.id, status: "pending" })}
              className=" rounded border-none bg-[#5073c3] p-2 text-white hover:brightness-105"
            >
              Reprocess Item
            </button>
            <button
              onClick={() => deleteItem({ id: data.id, donorId: data.donorId })}
              className=" rounded border-none bg-[#ff1414] p-2 text-white hover:brightness-105"
            >
              Delete Item
            </button>
          </div>
        );
      },
    });
  } else if (tabActive === "pending") {
    columns.push({
      title: "Actions",
      key: "action",
      width: 200,
      align: "center",
      dataIndex: "imageUrl",
      render: (_, data) => {
        return (
          <button
            onClick={() => mutate({ id: data.id, status: "cancelled" })}
            className=" rounded border-none bg-[#ea6b6b] p-2 text-white hover:brightness-105"
          >
            Cancel Item
          </button>
        );
      },
    });
  }
  return isLoading ? (
    <>Loading...</>
  ) : (
    <div>
      <div className=" hidden sm:block">
        <Table columns={columns} dataSource={data} className=" px-5" />
      </div>
      <div className=" flex flex-col gap-1   sm:hidden">
        {data.map((data) => {
          return (
            <div className=" flex flex-row justify-between gap-1 rounded border border-solid border-gray-100 p-2  shadow-lg ">
              <div className=" flex w-3/4 flex-col">
                <span className=" text-lg font-semibold uppercase text-gray-900">
                  {data.itemName}
                </span>
                <span className=" text-sm text-gray-700">
                  Quantity : {data.quantity}
                </span>
                <span className=" text-sm text-gray-700">
                  Description : {data.description}
                </span>

                {tabActive === "pending" && (
                  <button
                    onClick={() => mutate({ id: data.id, status: "cancelled" })}
                    className="mt-1 w-28 rounded border-none bg-[#ea6b6b] p-1 text-white hover:brightness-105 sm:hidden"
                  >
                    Cancel Item
                  </button>
                )}
                {tabActive === "cancelled" && (
                  <div className=" mt-1 flex flex-row items-center gap-2">
                    <button
                      onClick={() => mutate({ id: data.id, status: "pending" })}
                      className=" rounded border-none bg-[#5073c3] p-1 px-2 text-white hover:brightness-105"
                    >
                      Reprocess Item
                    </button>
                    <button
                      onClick={() =>
                        deleteItem({ id: data.id, donorId: data.donorId })
                      }
                      className=" rounded border-none bg-[#ff4646] p-1 px-2 text-white hover:brightness-105"
                    >
                      Delete Item
                    </button>
                  </div>
                )}
              </div>
              <Image
                alt="item-image"
                src={data.imageUrl}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationLists;
