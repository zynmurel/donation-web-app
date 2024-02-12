import { Image, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { api } from "~/utils/api";

const ApprovedDonations = () => {
  const { data: students, refetch } = api.item.getItemsByStatusQuery.useQuery({
    status: "approved",
  });
  const columns = [
    {
      title: "Item No.",
      dataIndex: "itemNo",
      key: "createdAt",
      width: 150,
      render: (text: any) => {
        return <>{pad(text, 5)}</>;
      },
    },
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      render: (donor: any) => <div>{donor.name}</div>,
    },
    {
      title: "Item",
      dataIndex: "itemName",
      key: "item",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (_: any) => {
        return <Image alt={"itemImage"} src={_} width={25} />;
      },
    },
  ];

  return <Table columns={columns} dataSource={students} />;
};

export default ApprovedDonations;
