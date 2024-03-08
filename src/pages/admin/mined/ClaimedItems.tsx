import { Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { api } from "~/utils/api";

const ClaimedItems = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [claimed, setClaimed] = useState<any>(null)
  const { data, isLoading, refetch } = api.item.getClaimedItems.useQuery();
  // const { mutate: changeStatus } = api.item.claimMined.useMutation({
  //   onSuccess: () => {
  //     refetch();
  //     openNotificationWithIcon(
  //       "success",
  //       "Claimed",
  //       "The claimed item will be visible on the small donation page under the 'donated items' section.",
  //     );
  //   },
  // });
  useEffect(() => {
    if (data) {
      setClaimed(data)
    }
  }, [data])
  const columns = [
    {
      title: "Item No.",
      dataIndex: "item",
      key: "createdAt",
      width: 150,
      render: (text: any) => {
        return <>{pad(text.itemNo, 5)}</>;
      },
    },

    {
      title: "Student ID",
      key: "id",
      render: (data: any) => <div>{data?.student?.studentId}</div>,
    },
    {
      title: "Claimant",
      key: "name",
      render: (data: any) => (
        <div>
          {data?.student?.firstName} {data?.student?.lastName}
        </div>
      ),
    },
    {
      title: "Item",
      key: "id",
      render: (data: any) => <div>{data?.item?.itemName}</div>,
    },
    {
      title: "Qty",
      key: "id",
      render: (data: any) => <div>{data?.quantity}</div>,
    },
    {
      title: "Unit",
      key: "unit",
      render: (data: any) => <div>{data?.item?.unit}</div>,
    },
    {
      title: "Date & Time",
      key: "dt",
      render: (data: any) => (
        <div>{dayjs(data?.createdAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (data: any) => (
    //     <Popconfirm
    //       title="Confirmation"
    //       description="Confirm if this item is already claimed"
    //       okText="Confirm"
    //       cancelText="No"
    //       onConfirm={() =>
    //         changeStatus({
    //           itemId: data?.item?.id || "",
    //           studentId: data?.student?.id || "",
    //           itemToMineId: data.id,
    //         })
    //       }
    //     >
    //       <button className=" cursor-pointer rounded border-none bg-green-400 p-2 py-1 hover:brightness-95">
    //         Item Claimed
    //       </button>
    //     </Popconfirm>
    //   ),
    // },
  ];
  return <Table columns={columns} dataSource={claimed} />;
};

export default ClaimedItems;
