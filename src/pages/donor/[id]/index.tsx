/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { api } from "~/utils/api";
import DonorLayout from "../layout";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaUserCog } from "react-icons/fa";
import DonationMenu from "../components/donationMenu";
import DonationLists from "../components/donationLists";
import { Dropdown, Image, MenuProps, Table } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useRouter } from "next/router";
import EditAccount from "../account/components/editAccount";
import { IoArrowBack } from "react-icons/io5";

import { HiMenu } from "react-icons/hi";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { NotificationContext } from "~/pages/context/contextproviders";
import dayjs from "dayjs";

const DonatedItem = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const router = useRouter();
  const [tabActive, setTabActive] = useState("approved");
  let user;
  // const params = useParams()
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const { data: donor } = api.donor.findDonor.useQuery({
    id: user || "",
  });
  const { data: item, refetch } = api.item.getSingleItem.useQuery({
    id: (router.query.id as string) || "",
  });
  const { mutate, isLoading } = api.item.setItemsStatus.useMutation({
    onSuccess: (data) => {
      refetch();
      if (data.status === "cancelled") {
        openNotificationWithIcon("info", "You cancelled your Donation");
        setTabActive("cancelled");
      } else if (data.status === "pending") {
        openNotificationWithIcon("success", "Item Reprocessed");
        setTabActive("pending");
      }
    },
  });
  const { mutate: deleteItem } = api.item.deleteItem.useMutation({
    onSuccess: (data) => {
      router.back();
      openNotificationWithIcon("info", "Donation Deleted");
    },
  });
  const [activeButton, setActiveButton] = useState<boolean>(false);
  useEffect(() => {
    console.log(donor);
  }, [donor]);

  const status = (status?: string) => {
    if (status) {
      switch (status) {
        case "cancelled":
          return (
            <div className=" rounded border border-solid border-red-300 px-4 text-base font-light text-red-500">
              {"Cancelled Donation"}
            </div>
          );
        case "pending":
          return (
            <div className=" rounded border border-solid border-gray-300 px-4 text-base font-light text-gray-500">
              <span>{"Undelivered"}</span>
            </div>
          );
        case "confirmed":
          return (
            <div className=" rounded border border-solid border-cyan-300 px-4 text-base font-light text-cyan-500">
              {"Delivered Donation (Confirmed)"}
            </div>
          );
        case "donated":
          return (
            <div className=" rounded border border-solid border-green-300 px-4 text-base font-light text-green-500">
              {"Claimed Donation (Donated)"}
            </div>
          );
      }
    } else {
      return <></>;
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <div
          className=" flex w-full items-center justify-center gap-2 rounded-md  py-1 text-sm hover:brightness-95 sm:text-lg"
          onClick={() => {
            router.push("/donor/account");
          }}
        >
          <FaUserCog />
          Account
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div
          className=" flex w-full items-center justify-center gap-2 rounded-md bg-red-300 py-1 text-sm hover:brightness-95 sm:text-lg"
          onClick={() => {
            localStorage.clear();
            router.push("/donorLogin");
          }}
        >
          <AiOutlinePoweroff />
          Logout
        </div>
      ),
    },
  ];
  const col = [
    {
      title: "ID",
      dataIndex: "student",
      key: "studentId",
      width: 50,
      render: (data: any) => {
        return <>{data.studentId}</>;
      },
    },
    {
      title: "Name",
      dataIndex: "student",
      key: "studentId",
      render: (data: any) => {
        return (
          <>
            {data.firstName} {data.lastName}
          </>
        );
      },
    },
    {
      title: "Claimed",
      dataIndex: "quantity",
      key: "studentId",
      render: (data: any, _: any) => {
        return (
          <>
            {data} {_?.item?.unit}
          </>
        );
      },
    },
  ];
  return (
    <DonorLayout activeButton={activeButton} setActiveButton={setActiveButton}>
      <div className=" flex min-h-full w-full flex-col">
        <div className=" flex items-center justify-between">
          <HiMenu
            className="text-4xl sm:invisible sm:text-5xl"
            color="green"
            onClick={() => setActiveButton(!activeButton)}
          />

          <Dropdown menu={{ items }} placement="bottomRight">
            <div className=" flex cursor-pointer flex-row items-center gap-1 rounded bg-[#f1ffff] p-1 px-3 text-[#205b5d] hover:brightness-95">
              <div className=" flex flex-col items-end">
                <span className=" text-xl font-bold">Donor</span>
                <span className=" -mt-1">{donor?.name}</span>
              </div>
              <FaUserCircle size={45} />
            </div>
          </Dropdown>
        </div>
        <div
          className=" mx-5 sm:mx-auto sm:w-2/5"
          onClick={() => setActiveButton(false)}
        >
          <div className=" flex w-full flex-col items-start text-gray-500">
            <div
              onClick={() => router.back()}
              className=" flex cursor-pointer items-center justify-center gap-2 text-lg hover:text-gray-700"
            >
              <IoArrowBack />
              Back
            </div>
            <div className=" flex w-full flex-row justify-between text-2xl font-semibold">
              <div>#{pad(item?.itemNo || 0, 5)}</div>
              <div>{status(item?.status)}</div>
            </div>{" "}
            {item?.status === "pending" && (
              <div className=" mb-2 w-full rounded border border-solid border-orange-300 px-4 text-center text-sm font-light text-orange-500">
                {
                  "Please deliver your item to alumni office to avoid cancellation"
                }
              </div>
            )}
            <div className=" flex w-full items-center justify-center">
              {" "}
              <div className=" overflow-hidden rounded border-2 border-red-600 shadow-md">
                <Image src={item?.imageUrl} height={100} />
              </div>
            </div>
            <div className=" mt-2 text-sm text-blue-600">
              Date Added -{" "}
              {dayjs(item?.createdAt, "MM-DD-YYYY").format("MMM DD, YYYY")}
            </div>
            <div className=" text-4xl font-bold">
              {item?.itemName?.toUpperCase()}
            </div>
            <div className=" font-base text-2xl">{item?.description}</div>
            <div className=" font-base text-lg capitalize">
              Type : {item?.type}
            </div>
            <div className=" font-base text-lg capitalize">
              Quantity : {item?.quantity} {item?.unit}
            </div>
            {item?.id && item.status === "cancelled" && (
              <div className=" mt-4 flex w-full flex-row items-center justify-center gap-2">
                <button
                  onClick={() => mutate({ id: item.id, status: "pending" })}
                  className=" cursor-pointer rounded border-none bg-[#5073c3] px-4 text-lg text-white hover:brightness-105"
                >
                  Reprocess Item
                </button>
                <button
                  onClick={() =>
                    deleteItem({ id: item.id, donorId: item.donorId })
                  }
                  className=" cursor-pointer rounded border-none bg-[#ff1414] px-4 text-lg text-white hover:brightness-105"
                >
                  Delete Item
                </button>
              </div>
            )}
            {item?.id && item.status === "pending" && (
              <div className=" mt-4 flex w-full flex-row items-center justify-center gap-2">
                <button
                  onClick={() => mutate({ id: item.id, status: "cancelled" })}
                  className=" cursor-pointer rounded border-none bg-[#ea6b6b] px-4 text-lg text-white hover:brightness-105"
                >
                  Cancel Item
                </button>
              </div>
            )}
            {item?.type === "small"
              ? item?.ItemToMine?.length &&
                item.status === "donated" && (
                  <div className=" mt-4 flex w-full flex-col gap-2">
                    <div>List of Students who claimed :</div>
                    <Table
                      dataSource={item.ItemToMine}
                      columns={col}
                      pagination={false}
                    />
                    {/* {item.ItemToMine.map((item, index) => {
                      return (
                        <div className=" pl-3 text-lg font-semibold text-gray-600">{`${
                          index + 1
                        }.)  ${item.student.firstName} ${
                          item.student.lastName
                        }`}</div>
                      );
                    })} */}
                  </div>
                )
              : item?.bulkDonatedTo &&
                item.status === "donated" && (
                  <div className=" mt-4 flex w-full flex-col gap-2">
                    <div className=" -mb-2">Claimed By : {}</div>
                    <div className=" pl-3 text-xl font-semibold text-gray-600">{`${item.bulkDonatedTo}`}</div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonatedItem;
