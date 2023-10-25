import { Image, Tag } from "antd";
import dayjs from "dayjs";

export const confirmedColumns = [
  {
    title: "Item",
    dataIndex: "itemName",
    key: "item",
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: string, data: any) => {
      if (_ === "donated") {
        return <Tag color="yellowgreen">Donated</Tag>;
      } else return <Tag>In Stock</Tag>;
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
    dataIndex: "itemName",
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
