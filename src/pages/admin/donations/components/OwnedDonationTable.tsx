import { Image, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const OwnedDonations = () => {
  const { data: students, refetch } = api.item.getItemsByStatusQuery.useQuery({
    status: "donated",
  });
  const columns = [
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
