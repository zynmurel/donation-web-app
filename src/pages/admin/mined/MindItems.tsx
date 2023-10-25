import { Image, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const MinedItems = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [dataToView, setDataToView] = useState<any>({});
  const [studentToDonate, setStudentToDonate] = useState<any>({});
  const { data, isLoading, refetch } = api.item.getMinedItems.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(studentToDonate);
  const { mutate: changeStatus } = api.item.confirmMined.useMutation({
    onSuccess: () => {
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
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStudentToDonate({});
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
                  <span>Name : </span>
                  {dataToView?.itemName}
                </span>
                <span className="text-base font-medium">
                  <span>Quantity : </span>
                  {dataToView?.quantity}
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
                <span className="mt-2 text-2xl font-medium">
                  <span>ID : </span>
                  {studentToDonate?.student?.studentId}
                </span>
                <span className=" -mb-1 text-gray-500">Name</span>
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
        {!isLoading ? (
          data && data.length ? (
            <div className="flex flex-1 flex-col">
              <span className=" p-3 px-5 text-xl text-white">
                Mined Item/s List
              </span>
              <div
                className="gap-1 overflow-scroll border-x-0 border-b-0 border-t border-solid border-[#a3bcbd] px-2"
                style={{ maxHeight: 700 }}
              >
                {data.map((dt) => {
                  return (
                    <div
                      onClick={() => setDataToView(dt)}
                      className={`bg-red flex cursor-pointer flex-row rounded-md border-x-0 border-b border-t-0 border-solid border-[#c1cecf] bg-white p-2 px-5 text-lg text-[#124647] hover:bg-[#e7f6f6] ${
                        dt.id === dataToView?.id ? "bg-[#f7ffed]" : ""
                      }`}
                    >
                      <div>
                        <span className=" text-2xl font-semibold">
                          {dt.itemName}{" "}
                        </span>
                        <div>
                          <span className=" text-base font-normal">
                            ( {dt.ItemToMine.length} student/s mined this item )
                          </span>
                        </div>
                        <div className=" text-[#508687]">
                          <span>Description : </span>
                          <span>{dt.description}</span>
                        </div>
                        <div className=" text-[#508687]">
                          <span>Qty : </span>
                          <span>{dt.quantity}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-1 flex-col">
              <span className="flex flex-1 items-center justify-center p-3 px-5 text-center text-xl text-white">
                No data mined
              </span>
            </div>
          )
        ) : (
          <div className="flex h-full flex-1 flex-col">
            <span className="flex flex-1 items-center justify-center p-3 px-5 text-center text-xl text-white">
              Loading...
            </span>
          </div>
        )}
      </div>
      <div className=" flex-1 rounded-lg border border-solid border-gray-100 bg-gray-100 p-10">
        {dataToView?.id ? (
          <>
            <div className=" item-center mb-5 flex flex-row">
              <Image src={dataToView?.imageUrl || ""} height={150} />
              <div className=" px-5">
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
    </div>
  );
};

export default MinedItems;
