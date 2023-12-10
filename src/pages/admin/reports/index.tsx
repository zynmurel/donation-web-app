import { Card } from "antd";
import AdminLayout from "../layout";
import { useState } from "react";
import ClaimedCard from "./components/ClaimedCard";
import DonatedCard from "./components/DonatedCard";

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState<string>("claimed");
  const tabList = [
    {
      key: "claimed",
      tab: "Claimed Items",
    },
    {
      key: "donated",
      tab: "Donated Items",
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    claimed: <ClaimedCard />,
    donated: <DonatedCard />,
  };
  const onTab1Change = (key: string) => {
    setActiveTab(key);
  };
  return (
    <AdminLayout>
      <div className=" p-3 text-3xl font-extrabold text-[#205b5d]">Reports</div>
      <Card
        style={{ width: "100%", height: "100%", flex: 1 }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTab1Change}
      >
        {contentList[activeTab]}
      </Card>
    </AdminLayout>
  );
};

export default StudentPage;
