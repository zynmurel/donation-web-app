import { Card } from "antd";
import { useState } from "react";
import NotApprovedDonationTable from "./NotApprovedDonationTable";
import ApprovedDonations from "./ApprovedDonationTable ";
import OwnedDonations from "./OwnedDonationTable";
import CancelledDonations from "./CancelledDonationTable";

const CardItemLists = () => {
  const [activeTab, setActiveTab] = useState<string>("approved");
  const tabList = [
    {
      key: "approved",
      tab: "Approved Items",
    },
    {
      key: "pending",
      tab: "Not Approved Items",
    },
    {
      key: "owned",
      tab: <div className=" text-green-500">Received Item/s</div>,
    },
    {
      key: "cancelled",
      tab: <div className=" text-red-400">Cancelled Item/s</div>,
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    pending: <NotApprovedDonationTable />,
    approved: <ApprovedDonations />,
    owned: <OwnedDonations />,
    cancelled: <CancelledDonations />,
  };
  const onTab1Change = (key: string) => {
    setActiveTab(key);
  };
  return (
    <Card
      style={{ width: "100%", height: "100%", flex: 1 }}
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={onTab1Change}
    >
      {contentList[activeTab]}
    </Card>
  );
};

export default CardItemLists;
