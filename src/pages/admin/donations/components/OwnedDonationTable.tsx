import { Image, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { api } from "~/utils/api";

const OwnedDonations = () => {
  const { data: students, refetch } = api.item.getItemsByStatusQuery.useQuery({
    status: "donated",
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
      title: "New Owner (Student)",
      dataIndex: "student",
      key: "student",
      render: (student: any) => (
        <div>
          {student?.firstName} {student?.lastName}
        </div>
      ),
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
      title: "Donated to Students",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, data: any) => {
        return (
          <div>{`${data.donatedCount} of ${data.quantity} ${data.unit}`}</div>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      width: 20,
      render: (_: any) => {
        return <Image alt={"itemImage"} src={_} width={25} />;
      },
    },
  ];

  return <Table columns={columns} dataSource={students} />;
};

export default OwnedDonations;
