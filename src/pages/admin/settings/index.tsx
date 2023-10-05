import { Card, Dropdown } from "antd";
import AdminLayout from "../layout";
import { FaUserCircle } from "react-icons/fa";
import { dropdownItems } from "../adminhelper/dropdownitems";
import Departments from "./department/departmentList";
import { useState } from "react";
import AdminAccount from "./account/Account";

const Settings = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("Department");
  const [activeTabKey2, setActiveTabKey2] = useState<string>("app");
  const tabList = [
    {
      key: "Department",
      tab: "Department",
    },
    {
      key: "Account",
      tab: "Account",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    Account: <AdminAccount />,
    Department: <Departments />,
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };
  const items = dropdownItems();
  return (
    <AdminLayout>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <span className=" p-3 text-3xl font-extrabold text-[#205b5d]">
            Account & Settings
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
        <div className=" mx-auto w-4/5 flex-1 py-5">
          <Card
            style={{ width: "100%", height: 800, overflow: "scroll" }}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
          >
            {contentList[activeTabKey1]}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
