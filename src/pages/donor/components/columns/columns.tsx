import { Image, Tag } from "antd";
import dayjs from "dayjs";

export const confirmedColumns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: string, data: any) => {
      if (_ === "confirmed") {
        return <Tag>Item is in Stock</Tag>;
      } else return <Tag color="yellowgreen">Donated to our Student</Tag>;
    },
  },
  {
    title: "Image",
    dataIndex: "imageUrl",
    key: "image",
    align: "center",
    render: (_: string) => {
      return <Image src={_} height={20} />;
    },
  },
];
export const pendingColumns = [
  {
    title: "Date Added",
    dataIndex: "updtedAt",
    key: "item",
    render: (_: string) => {
      return <>{dayjs(_).format("DD/MM/YYYY")}</>;
    },
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Image",
    dataIndex: "imageUrl",
    key: "image",
    align: "center",
    render: (_: string) => {
      return <Image src={_} height={20} />;
    },
  },
];
