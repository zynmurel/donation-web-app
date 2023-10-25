import { Dropdown, Layout } from "antd";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AdminMenu from "./components/adminMenu";
// import SiderMenu from "./components/sidermenu";

const { Header, Content, Sider } = Layout;
const AdminLayout = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else if (user !== "admin") {
      if (router.pathname.includes("admin")) {
        router.push(`/${user}`);
      }
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

  const contentStyle: React.CSSProperties = {
    padding: "10px",
  };
  return (
    <div className=" min-h-screen">
      <Layout className=" min-h-screen bg-[#3ba9ac]">
        <div className="flex min-h-screen flex-row">
          <AdminMenu />
          <Content style={contentStyle} className=" w-full bg-white">
            {children}
          </Content>
        </div>
      </Layout>
    </div>
  );
};

export default AdminLayout;
