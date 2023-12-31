import { Card, Dropdown } from "antd";
import AdminLayout from "../layout";
import { FaUserCircle } from "react-icons/fa";
import { dropdownItems } from "../adminhelper/dropdownitems";
import AdminAccount from "./account/Account";

const Settings = () => {
  const tabList = [
    {
      key: "Account",
      tab: "Account",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    Account: <AdminAccount />,
  };

  const items = dropdownItems();
  return (
    <AdminLayout>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <div className=" invisible">s</div>
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
              <div className=" flex flex-col items-end">
                <span className=" text-xl font-bold">Admin</span>
              </div>
              <FaUserCircle size={45} />
            </div>
          </Dropdown>
        </div>
        <div className=" mx-auto w-3/5 flex-1 py-5">
          {contentList["Account"]}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
