import { Image, Popconfirm, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const NotApprovedDonations = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { data: donations, refetch } = api.item.getItemsByStatusQuery.useQuery({
    status: "pending",
  });
  const { mutate: changeStatus } = api.item.setItemsStatus.useMutation({
    onSuccess: () => {
      refetch();
      openNotificationWithIcon(
        "success",
        "Approved",
        "Donation approved. Student can see this item in their dashboards",
      );
    },
  });
  const { mutate: cancelDonation } = api.item.setItemsStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  useEffect(() => {
    const dateNow = dayjs();
    const overTheTimeDonations = donations?.filter((data) => {
      return dayjs(dateNow).diff(data.updatedAt) / 1000 / 60 / 60 / 24 > 7;
    });
    if (overTheTimeDonations?.length) {
      overTheTimeDonations.map((data) =>
        cancelDonation({ id: data.id, status: "cancelled" }),
      );
    }
  }, [donations]);
  const columns = [
    {
      title: "Date Added",
      dataIndex: "updatedAt",
      width: 120,
      key: "date",
      render: (_: any) => {
        return <>{dayjs(_).format("DD/MM/YYYY")}</>;
      },
    },
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      width: 160,
      render: (donor: any) => (
        <div>
          {donor.firstName} {donor.lastName}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            description="Please confirm to approve this donation"
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() =>
              changeStatus({ id: record.id, status: "confirmed" })
            }
          >
            <button className=" cursor-pointer rounded-lg border-none bg-green-300 p-3 hover:brightness-105">
              Approve
            </button>
          </Popconfirm>
          <Popconfirm
            title="Confirm Cancel"
            description="Please confirm to cancel this donation"
            okText="Confirm Cancel"
            cancelText="Close"
            onConfirm={() =>
              changeStatus({ id: record.id, status: "cancelled" })
            }
          >
            <button className=" cursor-pointer rounded-lg border-none bg-red-300 p-3 hover:brightness-105">
              Cancel
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className=" flex w-full flex-col">
      <div className=" mb-2 rounded-lg bg-orange-200 p-2">
        Donations that exceed a 7-day period will be automatically cancelled.
      </div>
      <Table columns={columns} dataSource={donations} />
    </div>
  );
};

export default NotApprovedDonations;
