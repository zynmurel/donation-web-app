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
import { Dropdown, Image, MenuProps } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useRouter } from "next/router";
import EditAccount from "../account/components/editAccount";
import { IoArrowBack } from "react-icons/io5";

import { HiMenu } from "react-icons/hi";
import { pad } from "~/pages/student/mined/components/ClaimedItems";
import { NotificationContext } from "~/pages/context/contextproviders";
import dayjs from "dayjs";

const DonatedItem = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext)
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
    id: router.query.id as string || ""
  })
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
      router.back()
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
        case "cancelled": return <div className=" border-red-300 text-red-500 border border-solid text-base font-light rounded px-4">{"Cancelled Donation"}</div>;
        case "pending": return <div className=" border-gray-300 text-gray-500 border border-solid text-base font-light rounded px-4"><span>{"Undelivered"}</span></div>;
        case "confirmed": return <div className=" border-cyan-300 text-cyan-500 border border-solid text-base font-light rounded px-4">{"Delivered Donation (Confirmed)"}</div>;
        case "donated": return <div className=" border-green-300 text-green-500 border border-solid text-base font-light rounded px-4">{"Claimed Donation (Donated)"}</div>;
      }
    } else {
      return <></>
    }
  }
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
          <div className=" flex flex-col w-full items-start text-gray-500">
            <div onClick={() => router.back()} className=" flex items-center justify-center text-lg gap-2 cursor-pointer hover:text-gray-700"><IoArrowBack />Back</div>
            <div className=" font-semibold text-2xl w-full justify-between flex-row flex"><div>#{pad(item?.itemNo || 0, 5)}</div><div>{status(item?.status)}</div></div>            {item?.status === "pending" && <div className=" border-orange-300 w-full text-orange-500 border border-solid text-sm text-center font-light rounded px-4 mb-2">{"Please deliver your item to alumni office to avoid cancellation"}</div>}
            <div className=" w-full items-center flex justify-center"> <div className=" border-2 shadow-md border-red-600 overflow-hidden rounded"><Image src={item?.imageUrl} height={100} /></div></div>
            <div className=" text-blue-600 text-sm mt-2">Date Added - {dayjs(item?.createdAt, "MM-DD-YYYY").format("MMM DD, YYYY")}</div>
            <div className=" font-bold text-4xl">{item?.itemName?.toUpperCase()}</div>
            <div className=" font-base text-2xl">{item?.description}</div>
            <div className=" font-base text-lg capitalize">Type : {item?.type}</div>
            <div className=" font-base text-lg capitalize">Quantity : {item?.quantity}{" "}{item?.unit}</div>

            {
              item?.id && item.status === "cancelled" && <div className=" flex flex-row items-center justify-center gap-2 w-full mt-4">
                <button
                  onClick={() => mutate({ id: item.id, status: "pending" })}
                  className=" rounded border-none bg-[#5073c3] cursor-pointer px-4 text-lg text-white hover:brightness-105"
                >
                  Reprocess Item
                </button>
                <button
                  onClick={() => deleteItem({ id: item.id, donorId: item.donorId })}
                  className=" rounded border-none bg-[#ff1414] cursor-pointer px-4 text-lg text-white hover:brightness-105"
                >
                  Delete Item
                </button>
              </div>
            }
            {
              item?.id && item.status === "pending" && <div className=" flex flex-row items-center justify-center gap-2 w-full mt-4">
                <button
                  onClick={() => mutate({ id: item.id, status: "cancelled" })}
                  className=" rounded border-none bg-[#ea6b6b] cursor-pointer px-4 text-lg text-white hover:brightness-105"
                >
                  Cancel Item
                </button>
              </div>
            }
            {
              item?.student && item.status === "donated" && <div className=" flex flex-col gap-2 w-full mt-4">
                <div className=" -mb-2">Claimed By : { }</div>
                <div className=" text-xl pl-3 text-gray-600 font-semibold">{`${item.student.firstName} ${item.student.lastName}`}</div>
              </div>
            }
          </div>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonatedItem;
