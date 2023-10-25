import { Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const ApprovedItems = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { data, isLoading, refetch } = api.item.getConfirmedItems.useQuery();
  const { mutate: changeStatus } = api.item.claimMined.useMutation({
    onSuccess: () => {
      refetch();
      openNotificationWithIcon(
        "success",
        "Claimed",
        "The claimed item will be visible on the small donation page under the 'donated items' section.",
      );
    },
  });
  const columns = [
    {
      title: "ID",
      key: "id",
      render: (data: any) => <div>{data?.student?.studentId}</div>,
    },
    {
      title: "Name",
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
      render: (data: any) => <div>{data?.item?.quantity}</div>,
    },
    {
      title: "Date & Time",
      key: "dt",
      render: (data: any) => (
        <div>{dayjs(data?.createdAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (data: any) => (
        <Popconfirm
          title="Confirmation"
          description="Confirm if this item is already claimed"
          okText="Confirm"
          cancelText="No"
          onConfirm={() =>
            changeStatus({
              itemId: data?.item?.id || "",
              studentId: data?.student?.id || "",
              itemToMineId: data.id,
            })
          }
        >
          <button className=" cursor-pointer rounded border-none bg-green-400 p-2 py-1 hover:brightness-95">
            Item Claimed
          </button>
        </Popconfirm>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default ApprovedItems;
