import { Dropdown } from "antd";
import AdminLayout from "../layout";
import { dropdownItems } from "../adminhelper/dropdownitems";
import { FaUserCircle } from "react-icons/fa";
import CardItemLists from "./components/CardItemList";

const StudentPage = () => {
  const items = dropdownItems();
  return (
    <AdminLayout>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <span className=" p-3 text-3xl font-extrabold text-[#205b5d]">
            Donations
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
        <CardItemLists />
      </div>
    </AdminLayout>
  );
};

export default StudentPage;
