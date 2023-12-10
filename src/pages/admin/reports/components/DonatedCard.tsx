import { Card, DatePicker, DatePickerProps, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "~/utils/api";
import BulkDonations from "./components/BulkDonations";
import SmallDonations from "./components/SmallDonations";

const DonatedCard = () => {
  const [month, setMonth] = useState(dayjs());
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setMonth(dayjs(date));
  };
  const { data, isLoading, refetch } = api.item.getDonatedItemsByMonth.useQuery(
    {
      date: dayjs(month).toDate(),
    },
  );
  console.log(data);
  const columns = [
    {
      title: "Donor",
      dataIndex: "donor",
      key: "id",
      render: (data: any) => <div>{data?.name}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "name",
      render: (data: any) => <div> {data}</div>,
    },
    {
      title: "Item",
      dataIndex: "itemName",
      key: "quantity",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "id",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "id",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Date & Time",
      dataIndex: "updatedAt",
      key: "id",
      render: (data: any) => (
        <div>{dayjs(data).format("MMM D, YYYY h:mm A")}</div>
      ),
    },
  ];
  return (
    <div className=" ">
      <div className=" mb-5 flex flex-row gap-4">
        <DatePicker
          className=" flex-none"
          defaultValue={dayjs()}
          onChange={onChange}
          picker="month"
        />
        <div className=" text-lg">
          <span className=" text-gray-600">Month of </span>
          <span className=" font-semibold">{month.format("MMMM YYYY")}</span>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DonatedCard;
