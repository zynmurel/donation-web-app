import { Card } from "antd";
import { useState } from "react";
import PendingStudents from "./PendingTable";
import ApprovedStudents from "./ApprovedTable ";

const CardStudentLists = () => {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const tabList = [
    {
      key: "pending",
      tab: "Not Approved Students",
    },
    {
      key: "approved",
      tab: "Approved Students",
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    pending: <PendingStudents />,
    approved: <ApprovedStudents />,
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

export default CardStudentLists;
