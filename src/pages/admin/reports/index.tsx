import { Card, Dropdown } from "antd";
import AdminLayout from "../layout";
import { useState } from "react";
import ClaimedCard from "./components/ClaimedCard";
import DonatedCard from "./components/DonatedCard";
import { FaUserCircle } from "react-icons/fa";
import { dropdownItems } from "../adminhelper/dropdownitems";

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
  const items = dropdownItems();
  return (
    <AdminLayout>
      <div className=" flex items-center justify-between">
        <div className=" p-3 text-3xl font-extrabold text-[#205b5d]">
          Reports
        </div>
        <Dropdown menu={{ items }} placement="bottomRight">
          <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
            <div className=" flex flex-col items-end">
              <span className=" text-xl font-bold">Admin</span>
            </div>
            <FaUserCircle size={45} />
          </div>
        </Dropdown>
      </div>
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
