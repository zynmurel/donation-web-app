import { Image, Input, Modal, Space, Table, Tag } from "antd";
import { useContext, useState } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { api } from "~/utils/api";

const ApprovedDonations = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [donateTo, setDonateTo] = useState("");
  const [dataToApprove, setDataToApprove] = useState<any>(undefined);
  const { data: students, refetch } = api.item.getBulkDonationByStatus.useQuery(
    {
      status: "approved",
    },
  );
  const { mutateAsync } = api.item.donateBulkDonation.useMutation({
    onSuccess: (data) => {
      refetch();
      setActiveId("");
      setDonateTo("");
      openNotificationWithIcon(
        "success",
        "Donated",
        `Item donated to ${data.bulkDonatedTo}`,
      );
    },
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    mutateAsync({
      id: activeId,
    }).then(() => {
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setActiveId("");
    setDonateTo("");
    setDataToApprove(undefined);
  };
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
      render: (donor: any) => <div>{donor.name}</div>,
    },
    {
      title: "Item",
      dataIndex: "itemName",
      key: "item",
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
      key: "image",
      align: "center",
      width: 200,
      render: (_: any) => {
        console.log(_);
        return (
          <>
            <span
              onClick={() => {
                showModal();
                setActiveId(_?.id);
                setDataToApprove(_);
              }}
              className=" cursor-pointer rounded-full bg-green-500 p-2 px-3 text-white"
            >
              Donate Item
            </span>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title="Donate Bulk Item"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Donate"
        width={350}
      >
        <div>
          <div className=" -mb-1 text-xs text-gray-400">Item</div>
          <div className=" mb-1">{dataToApprove?.itemName}</div>
          <div className=" -mb-1 text-xs text-gray-400">Description</div>
          <div className=" mb-1">{dataToApprove?.description}</div>
          <div className=" -mb-1 text-xs text-gray-400">Benefeciary</div>
          <div className=" mb-1">{dataToApprove?.bulkDonatedTo}</div>
          <div className=" -mb-1 text-xs text-gray-400">Location</div>
          <div className=" mb-1">{dataToApprove?.location}</div>
        </div>
      </Modal>
      <Table columns={columns} dataSource={students} />
    </>
  );
};

export default ApprovedDonations;
