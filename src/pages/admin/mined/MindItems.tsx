import { Image, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { NotificationContext } from "~/pages/context/contextproviders";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { api } from "~/utils/api";

const MinedItems = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [dataToView, setDataToView] = useState<any>(null);
  const [studentToDonate, setStudentToDonate] = useState<any>({});
  const { data, isLoading, refetch } = api.item.getMinedItems.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(studentToDonate);
  const { mutate: changeStatus } = api.item.confirmMined.useMutation({
    onSuccess: (data) => {
      refetch();
      setIsModalOpen(false);
      setDataToView(null);
      openNotificationWithIcon(
        "success",
        "Approved",
        "Student are now eligible to claim the item. ",
      );
    },
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    changeStatus({
      id: dataToView?.id || "",
      studentId: studentToDonate?.student?.id,
      itemToMineId: studentToDonate?.id,
      quantity: dataToView?.ItemToMine?.[0]?.quantity || 0,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStudentToDonate({});
  };
  const handleClose = () => {
    setDataToView(null);
  };

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
      title: "Qty",
      key: "quantity",
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
        <div>{dayjs(data?.updatedAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (data: any) => (
        <button
          onClick={() => {
            setStudentToDonate(data);
            showModal();
          }}
          className=" cursor-pointer rounded border-none bg-green-400 p-2 py-1 hover:brightness-95"
        >
          Approve
        </button>
      ),
    },
  ];
  const columns2 = [
    {
      title: "Item No.",
      key: "itemNo",
      width: 100,
      render: (data: any) => <div>#{pad(data.itemNo, 5)}</div>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "itemName",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Description",
      key: "Description",
      dataIndex: "description",
      render: (data: any) => <div>{data}</div>,
    },
    {
      title: "Quantity",
      key: "Quantity",
      dataIndex: "quantity",
      width: 100,
      render: (data: any, _: any) => (
        <div>
          {data} {_.unit}
        </div>
      ),
    },
    {
      title: "View Student/s",
      key: "Quantity",
      align: "center",
      render: (data: any) => (
        <button
          className=" cursor-pointer rounded border-none bg-cyan-500 px-3 py-1"
          onClick={() => setDataToView(data)}
        >
          View
        </button>
      ),
    },
  ];
  return (
    <div className=" flex flex-row gap-1" style={{ minHeight: 700 }}>
      <Modal
        title="Donate Item"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okText="Approve"
      >
        <div className=" flex flex-col items-center justify-center px-5 text-base">
          <span className=" text-3xl font-bold">Donate</span>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className=" my-3 flex w-full flex-1 flex-row gap-2 rounded bg-gray-100 px-4 py-2">
              <img src={dataToView?.imageUrl} height={100} alt="item-image" />
              <div className=" flex flex-col">
                <span className="text-base font-medium">
                  <span>Item #</span>
                  {pad(dataToView?.itemNo, 5)}
                </span>
                <span className="text-base font-medium">
                  <span>Name : </span>
                  {dataToView?.itemName}
                </span>
                <span className="text-base font-medium">
                  <span>Quantity : </span>
                  {dataToView?.ItemToMine?.[0]?.quantity}
                </span>
                <span className="text-base font-medium">
                  <span>Description : </span>
                  {dataToView?.description}
                </span>
              </div>
            </div>
            <FaArrowDown size={30} />
            <div className=" my-3 flex w-full flex-1 flex-row gap-2 rounded bg-gray-100 px-4 py-2">
              <div className=" flex w-full flex-col items-center">
                <span className=" text-xl font-bold text-gray-500">
                  Student
                </span>
                <span className="-mb-2 text-base font-medium text-gray-700">
                  <span>ID #</span>
                  {studentToDonate?.student?.studentId}
                </span>
                {/* <span className=" -mb-1 text-gray-500">Name</span> */}
                <span className="text-center text-2xl font-medium">
                  {studentToDonate?.student?.firstName}{" "}
                  {studentToDonate?.student?.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="  flex-1  overflow-hidden rounded-lg border border-solid border-[#6abcbf] bg-[#6abcbf]">
        <div className=" p-5 py-2 text-lg text-white">
          List of Item Mined By Students :{" "}
        </div>
        {!isLoading ? (
          <div className="flex flex-1 flex-col p-2">
            <div className=" overflow-hidden rounded bg-white">
              <Table columns={columns2} dataSource={data || []} />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-1 flex-col">
            <span className="flex flex-1 items-center justify-center p-3 px-5 text-center text-xl text-white">
              Loading...
            </span>
          </div>
        )}
      </div>
      <Modal
        title="Donate Item"
        open={!!dataToView}
        footer={[]}
        width={600}
        onCancel={handleClose}
        okText="Approve"
      >
        {" "}
        <div className=" flex-1 rounded-lg border border-solid border-gray-100 bg-gray-100 p-2">
          {dataToView?.id ? (
            <>
              <div className=" item-center mb-5 flex flex-row">
                <Image
                  src={dataToView?.imageUrl || ""}
                  height={150}
                  className=" rounded-lg"
                />
                <div className=" px-5">
                  <div className="text-base font-medium">
                    <span>Item #</span>
                    {pad(dataToView?.itemNo, 5)}
                  </div>
                  <div className=" text-xl font-semibold text-gray-800">
                    {dataToView?.itemName}
                  </div>
                  <div className=" text-base text-gray-600">{`Qty : ${dataToView?.quantity}`}</div>
                  <div className=" text-base text-gray-600">{`Description : ${dataToView?.description}`}</div>
                </div>
              </div>
              <span className=" text-base text-gray-500">
                Students who mined the item ({dataToView?.ItemToMine.length}):
              </span>
              <Table columns={columns} dataSource={dataToView?.ItemToMine} />
            </>
          ) : (
            <div className=" flex h-full flex-1 items-center justify-center text-xl">
              No Selected Item
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MinedItems;
