import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Avatar, Image, List, Space, Table, Tag } from "antd";
import { ItemData } from "..";
import { ColumnsType } from "antd/es/table";
import { api } from "~/utils/api";
import { Dispatch, SetStateAction, useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";

const DonationLists = ({
  data,
  setData,
  tabActive,
  setTabActive,
}: {
  data: ItemData[];
  tabActive: string;
  setTabActive: any;
  setData: Dispatch<SetStateAction<ItemData[]>>;
}) => {
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
  const columns: ColumnsType<ItemData> = [
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => {
        return (
          <a className="">{dayjs(text, "MM-DD-YYYY").format("MMM DD, YYYY")}</a>
        );
      },
    },
    {
      title: "Item name",
      dataIndex: "item",
      width: 200,
      key: "item",
      render: (tag) => {
        return <>{tag?.toUpperCase()}</>;
      },
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      key: "imageUrl",
      width: 200,
      align: "center",
      dataIndex: "imageUrl",
      render: (_, data) => {
        console.log(_, data);
        return <Image src={_} height={50} />;
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
    <Table columns={columns} dataSource={data} />
  );
};

export default DonationLists;
