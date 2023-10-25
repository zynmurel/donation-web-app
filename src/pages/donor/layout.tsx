import { Dropdown, Layout } from "antd";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import SiderMenu from "./components/sidermenu";

const { Header, Content, Sider } = Layout;
const DonorLayout = ({ children, activeButton, setActiveButton }: any) => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else if (user !== "donor") {
      router.push(`/${user}`);
    }
  });
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    height: 70,
    paddingInline: 50,
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: "64px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  const logOutFunction = () => {};
  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    background: "#3ba9ac",
  };
  const items = [
    {
      key: "1",
      label: <span className=" text-lg">Hello, {`Admin`}!</span>,
    },
    {
      key: "3",
      label: (
        <button
          //   onClick={logOutFunction()}
          className=" w-48 cursor-pointer rounded-full border border-red-600 bg-red-200 p-2 text-red-500 hover:bg-red-300"
        >
          Sign Out
        </button>
      ),
    },
  ];
  return (
    <div className=" min-h-screen">
      <Layout className=" min-h-screen bg-[#3ba9ac]">
        <div className="flex min-h-screen flex-row">
          <SiderMenu
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <Content className=" w-full bg-white p-2 sm:p-0">{children}</Content>
        </div>
      </Layout>
    </div>
  );
};

export default DonorLayout;
