import { Image, Modal, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const OwnedDonations = () => {
  const [dataToView, setDataToView] = useState<any>(undefined);
  const { data: students, refetch } = api.item.getBulkDonationByStatus.useQuery(
    {
      status: "donated",
    },
  );
  const columns = [
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      render: (donor: any) => <div>{donor.name}</div>,
    },
    {
      title: "Benefeciary",
      dataIndex: "bulkDonatedTo",
      key: "donated",
      render: (bulk: any) => <div>{bulk}</div>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
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
      width: 20,
      render: (_: any) => {
        return <Image alt={"itemImage"} src={_} width={25} />;
      },
    },
    {
      title: "View",
      key: "view",
      align: "center",
      render: (_: any) => {
        return (
          <div
            className=" cursor-pointer rounded-full bg-green-500 p-2 px-4 text-xs text-white"
            onClick={() => setDataToView(_)}
          >
            View Details
          </div>
        );
      },
    },
  ];
  const handleCancel = () => {
    setDataToView(undefined);
  };
  console.log(dayjs(dataToView?.updatedAt).format("MMM DD YYYY"));
  return (
    <>
      <Modal
        width={400}
        onCancel={handleCancel}
        footer={[]}
        open={!!dataToView}
      >
        <div>
          <div className=" mb-5 w-full text-center text-lg font-bold">
            Donation Details
          </div>
          <img src={dataToView?.imageUrl} alt="pic" className=" mb-3 w-full" />
          <div>
            <span className=" text-gray-700">Item Donated : </span>
            <span className=" font-medium">{dataToView?.itemName}</span>
          </div>
          <div>
            <span className=" text-gray-700">Description : </span>
            <span className=" font-medium">{dataToView?.description}</span>
          </div>
          <div>
            <span className=" text-gray-700">Quantity : </span>
            <span className=" font-medium">
              {dataToView?.quantity + " " + dataToView?.unit}
            </span>
          </div>
          <div>
            <span className=" text-gray-700">Benefeciary : </span>
            <span className=" font-medium">{dataToView?.bulkDonatedTo}</span>
          </div>
          <div>
            <span className=" text-gray-700">Location : </span>
            <span className=" font-medium">{dataToView?.location}</span>
          </div>
          <div>
            <span className=" text-gray-700">Donor : </span>
            <span className=" font-medium">{dataToView?.donor?.name}</span>
          </div>
          <div>
            <span className=" text-gray-700">Date : </span>
            <span className=" font-medium">
              {dayjs(dataToView?.updatedAt).format("MMM DD YYYY")}
            </span>
          </div>
        </div>
      </Modal>
      <Table columns={columns} dataSource={students} />
    </>
  );
};

export default OwnedDonations;
