import { Table } from "antd";
import dayjs from "dayjs";
import { api } from "~/utils/api";

const BulkDonations = ({ date }: { date: Date }) => {
  const { data, isLoading, refetch } = api.item.getDonatedBulk.useQuery({
    date: date,
  });
  console.log(data);
  const columns = [
    {
      title: "Benefeciary",
      dataIndex: "bulkDonatedTo",
      key: "id",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Item Claimed",
      dataIndex: "itemName",
      key: "name",
      render: (data: any) => <div> {data}</div>,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "id",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Donated by",
      dataIndex: "donor",
      key: "id",
      render: (data: any) => <div>{data?.name}</div>,
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default BulkDonations;
