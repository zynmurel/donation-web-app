import { Table } from "antd";
import dayjs from "dayjs";
import { api } from "~/utils/api";

const SmallDonations = ({ date }: { date: Date }) => {
  const { data, isLoading, refetch } = api.item.getSmallDonations.useQuery({
    date: date,
  });
  console.log(data);
  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "id",
      render: (data: any) => (
        <div>{data?.firstName + " " + data?.lastName}</div>
      ),
    },
    {
      title: "Item Claimed",
      dataIndex: "item",
      key: "name",
      render: (data: any) => <div> {data?.itemName}</div>,
    },
    {
      title: "Qty",
      dataIndex: "item",
      key: "quantity",
      render: (data: any) => <div>{data?.quantity}</div>,
    },
    {
      title: "Unit",
      dataIndex: "item",
      key: "id",
      render: (data: any) => <div>{data?.unit}</div>,
    },
    {
      title: "Donated by",
      dataIndex: "item",
      key: "id",
      render: (data: any) => <div>{data?.donor?.name}</div>,
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default SmallDonations;
