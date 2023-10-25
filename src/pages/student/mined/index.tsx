import { useState } from "react";
import Layout from "../layout";
import { api } from "~/utils/api";
import { Card } from "antd";
import MinedItemsList from "./components/MinedItems";
import ClaimedItems from "./components/ClaimedItems";

const MinedItems = () => {
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const [viewItem, setViewItem] = useState<any>(null);
  const { data: student } = api.student.findStudent.useQuery({
    id: user || "some",
  });
  const [activeTab, setActiveTab] = useState<string>("mined");
  const tabList = [
    {
      key: "mined",
      tab: <div className=" text-blue-400">Request/s</div>,
    },
    {
      key: "claimed",
      tab: <div className=" text-green-500">Claimed Item/s</div>,
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    mined: <MinedItemsList student={student} />,
    claimed: <ClaimedItems student={student} />,
  };

  const onTab1Change = (key: string) => {
    setActiveTab(key);
  };
  return (
    <Layout student={student}>
      <Card
        style={{ width: "100%", height: "100%", flex: 1 }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTab1Change}
        className=" hidden sm:block"
      >
        {contentList[activeTab]}
      </Card>
      <Card
        style={{ width: "100%", height: "100%", flex: 1 }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTab1Change}
        size="small"
        className=" block sm:hidden"
      >
        {contentList[activeTab]}
      </Card>
    </Layout>
  );
};

export default MinedItems;
