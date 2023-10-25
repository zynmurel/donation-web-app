import { Image, Input, Modal, Space, Table, Tag } from "antd";
import { useContext, useState } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const ApprovedDonations = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [donateTo, setDonateTo] = useState("");
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
      donateTo: donateTo,
    }).then(() => {
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setActiveId("");
    setDonateTo("");
  };
  const columns = [
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
        return (
          <>
            <span
              onClick={() => {
                showModal();
                setActiveId(_?.id);
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
        <span>Donate item to :</span>
        <Input
          placeholder="Donate item to"
          onChange={(e) => setDonateTo(e.target.value)}
        />
      </Modal>
      <Table columns={columns} dataSource={students} />
    </>
  );
};

export default ApprovedDonations;
