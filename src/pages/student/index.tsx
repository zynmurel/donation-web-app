import { api } from "~/utils/api";
import Layout from "./layout";
import { FaDropbox } from "react-icons/fa";
import { useState } from "react";
import { Image, InputNumber, Modal } from "antd";
import toast, { Toaster } from "react-hot-toast";

const StudentDashboard = () => {
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const [quantity, setQuantity] = useState(1);
  const [viewItem, setViewItem] = useState<any>(null);
  const [error, setError] = useState<any>(undefined);
  const { data: student } = api.student.findStudent.useQuery({
    id: user || "some",
  });
  const {
    data: itemsToMine,
    isLoading: itemIsLoading,
    refetch,
  } = api.item.getApprovedItems.useQuery({
    id: student?.id || "",
  });
  const { mutate } = api.item.mineItem.useMutation({
    onSuccess: () => {
      setViewItem(null);
      refetch();
      toast.success("Item mined");
    },
  });
  const handleOk = () => {
    console.log(viewItem, quantity);
    if (viewItem?.quantity < quantity) {
      setError("error");
    } else {
      setError(undefined);
      mutate({
        itemID: viewItem?.id || "",
        studentId: student?.id || "",
        quantity: quantity,
      });
    }
    console.log(viewItem);
  };

  const handleCancel = () => {
    setViewItem(null);
    setQuantity(1);
  };
  return (
    <Layout student={student}>
      <Modal
        title={student?.status === "approved" ? "Mine Item" : "View Item"}
        open={viewItem}
        onCancel={handleCancel}
        footer={[]}
        okText="Mine"
      >
        <div className=" flex w-full flex-col items-center justify-center">
          <Image
            src={viewItem?.imageUrl}
            height={150}
            className=" rounded"
            alt="image"
          />
          <div className=" text-xs text-gray-400">Click image to view</div>
          <div className=" flex w-full flex-col">
            <div className=" m-1 mx-2 sm:m-2 sm:mx-5">
              <div className=" text-3xl font-semibold uppercase sm:text-xl">
                {viewItem?.itemName}
              </div>
              <div className=" text-sm font-normal sm:text-sm">
                Quantity : {viewItem?.quantity}
              </div>
              <div className=" max-h-10 overflow-hidden text-sm font-normal sm:max-h-none">
                Description : {viewItem?.description?.slice(0, 100)}
                {(viewItem?.description?.length || 0) >= 100 ? ". . ." : ""}
              </div>
              {viewItem?.ItemToMine.length ? (
                <div className=" max-h-10 overflow-hidden text-sm font-normal text-teal-600 sm:max-h-none">
                  {`* ${viewItem?.ItemToMine?.length} student${
                    viewItem?.ItemToMine.length === 1 ? "" : "s"
                  } also mined this item`}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {student?.status === "approved" && (
            <>
              <div>
                <div className=" flex flex-col items-center justify-center">
                  <span>Quantity</span>
                  <InputNumber
                    defaultValue={quantity}
                    value={quantity}
                    status={error}
                    onChange={(e) => {
                      console.log(e && e <= viewItem?.quantity);
                      setQuantity(e);
                    }}
                  />
                </div>
              </div>
              <div className=" mt-2 flex w-full justify-end gap-2">
                <div
                  onClick={handleCancel}
                  className="flex-none cursor-pointer rounded border border-solid border-gray-200 bg-white p-1 px-3 text-center"
                >
                  Close
                </div>
                <div
                  onClick={handleOk}
                  className="flex-none cursor-pointer rounded border border-solid border-teal-400 bg-teal-400 p-1  px-5 text-center text-white hover:brightness-90"
                >
                  Mine
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
      {itemIsLoading && <div className=" pt-20">Loading ...</div>}
      {!itemIsLoading &&
        itemsToMine &&
        (itemsToMine.length ? (
          <div className=" flex flex-1 flex-col">
            <div className=" p-5 pb-1 text-gray-800">Donated Item/s</div>
            {student?.status === "notapproved" && (
              <div className=" px-5 pb-1 text-xs text-gray-800 sm:text-sm">
                <div className=" rounded border border-solid border-orange-400 bg-orange-100 p-1 text-center text-orange-400">
                  The administrator is still in the process of reviewing and
                  approving this account. ( View only )
                </div>
              </div>
            )}
            <div
              className=" flex flex-1 flex-row flex-wrap justify-center gap-2 p-5 sm:justify-start sm:gap-5 sm:p-20 sm:py-5"
              style={{ maxHeight: "75vh", overflow: "scroll" }}
            >
              {[...itemsToMine].map((data) => {
                return (
                  <div
                    key={data.id}
                    className=" relative flex h-56 w-36 flex-col items-center overflow-hidden rounded-lg bg-white text-black shadow-lg sm:h-96 sm:w-72"
                  >
                    <div className=" flex h-28 w-full items-center justify-center overflow-hidden sm:h-40">
                      <img
                        src={data.imageUrl}
                        className=" w-full"
                        alt="image"
                      />
                    </div>
                    <div className=" flex w-full flex-col justify-center overflow-hidden">
                      <div className=" m-1 mx-2 sm:m-2 sm:mx-5">
                        <div className=" text-sm font-semibold uppercase sm:text-xl">
                          {data.itemName}
                        </div>
                        <div className=" text-xs font-normal sm:text-sm">
                          Quantity : {data.quantity}
                        </div>
                        <div className=" max-h-10 overflow-hidden text-xs font-normal sm:max-h-none">
                          Description : {data.description?.slice(0, 100)}
                          {(data.description?.length || 0) >= 100
                            ? ". . ."
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => setViewItem(data)}
                      className=" absolute bottom-2 mx-auto w-2/3 cursor-pointer rounded-full bg-teal-400 py-1 text-center text-sm text-white hover:bg-teal-400 sm:bottom-5 sm:py-3 sm:text-base"
                    >
                      {student?.status === "approved" ? "Mine" : "View"} Item
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className=" mt-10 flex h-1/3 w-10/12 flex-col items-center justify-center self-start rounded-xl bg-white px-5 py-5 text-gray-500 sm:mt-0 sm:h-2/3 sm:w-2/4 sm:self-center">
            <FaDropbox className=" mb-5" size={200} />
            <div className=" text-center text-xl font-medium uppercase text-gray-700 sm:text-5xl">
              {" "}
              No Donated Item This time
            </div>
            <div className=" px-5 text-center sm:mt-5 sm:text-xl">
              This time, there were no donated items to support the cause or
              event, reflecting a temporary absence of contributions from the
              community or individuals.
            </div>
          </div>
        ))}
    </Layout>
  );
};

export default StudentDashboard;
