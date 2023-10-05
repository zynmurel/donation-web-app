import { Image, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const ApprovedDonations = () => {
  const { data: students, refetch } = api.item.getItemsByStatusQuery.useQuery({
    status: "confirmed",
  });
  const columns = [
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      render: (donor: any) => (
        <div>
          {donor.firstName} {donor.lastName}
        </div>
      ),
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
