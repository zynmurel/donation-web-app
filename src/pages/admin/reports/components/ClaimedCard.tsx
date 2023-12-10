import { Card, DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "~/utils/api";
import BulkDonations from "./components/BulkDonations";
import SmallDonations from "./components/SmallDonations";

const ClaimedCard = () => {
  const [month, setMonth] = useState(dayjs());
  const [activeTab, setActiveTab] = useState<string>("small");
  const tabList = [
    {
      key: "small",
      tab: "Small Donations",
    },
    {
      key: "bulk",
      tab: "Bulk Donations",
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    bulk: <BulkDonations date={dayjs(month).toDate()} />,
    small: <SmallDonations date={dayjs(month).toDate()} />,
  };
  const onTab1Change = (key: string) => {
    setActiveTab(key);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setMonth(dayjs(date));
  };
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
      <Card
        style={{ width: "100%", height: "100%", flex: 1 }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTab1Change}
      >
        {contentList[activeTab]}
      </Card>
    </div>
  );
};

export default ClaimedCard;
