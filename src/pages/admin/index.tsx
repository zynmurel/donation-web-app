import { api } from "~/utils/api";
import { FaUserCircle } from "react-icons/fa";
import { Card, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/router";
import { AiOutlinePoweroff } from "react-icons/ai";
import { dropdownItems } from "./adminhelper/dropdownitems";
import AdminLayout from "./layout";
import MinedItems from "./mined/MindItems";
import { useState } from "react";
import ApprovedItems from "./mined/ApprovedItems";

const AdminPage = () => {
  const items = dropdownItems();
  const router = useRouter();
  const { data } = api.admin.findAdmin.useQuery();
  const [activeTab, setActiveTab] = useState<string>("mined");
  const tabList = [
    {
      key: "mined",
      tab: "Mined Items",
    },
    {
      key: "approved",
      tab: "To Claim Items",
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    mined: <MinedItems />,
    approved: <ApprovedItems />,
  };
  const onTab1Change = (key: string) => {
    setActiveTab(key);
  };
  return (
    <AdminLayout>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <span className=" p-3 text-3xl font-extrabold text-[#205b5d]">
            Mined Item/s
          </span>

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
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
