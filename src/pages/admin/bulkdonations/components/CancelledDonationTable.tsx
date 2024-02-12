import { Image, Popconfirm, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { api } from "~/utils/api";

const CancelledDonations = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { data: donations, refetch } =
    api.item.getBulkDonationByStatus.useQuery({
      status: "cancelled",
    });
  const { mutate: changeStatus } = api.item.setItemsStatus.useMutation({
    onSuccess: () => {
      refetch();
      openNotificationWithIcon("info", "Reprocess Donation");
    },
  });
  const columns = [
    {
      title: "Item No.",
      dataIndex: "itemNo",
      key: "createdAt",
      width: 150,
      render: (text: any) => {
        return <>{pad(text, 5)}</>;
      },
    },
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      width: 160,
      render: (donor: any) => <div>{donor.name}</div>,
    },
    {
      title: "Contact",
      dataIndex: "donor",
      key: "contact",
      render(_: any) {
        return <div>{_.contact}</div>;
      },
    },
    {
      title: "Qty & Unit",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, data: any) => {
        return <div>{`${data.quantity} ${data.unit}`}</div>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (_: any) => {
        return <Image alt={"itemImage"} src={_} width={25} />;
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <div className=" flex items-center justify-center gap-1">
          <Popconfirm
            title="Confirmation"
            description="Do you want to reprocess this donation?"
            okText="Confirm"
            cancelText="No"
            onConfirm={() => changeStatus({ id: record.id, status: "pending" })}
          >
            <button className=" cursor-pointer rounded-lg border-none bg-blue-400 p-3 hover:brightness-105">
              Reprocess Donation
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className=" flex w-full flex-col">
      <Table columns={columns} dataSource={donations} />
    </div>
  );
};

export default CancelledDonations;
