import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
} from "antd";
// import UploadButtonComponent from "./uploadImage";
import { useContext, useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { NotificationContext } from "~/pages/context/contextproviders";

const { TextArea } = Input;

const AddDonationForm = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [itemStatus, setItemStatus] = useState("");
  const router = useRouter();
  const { mutate, isLoading } = api.item.addItem.useMutation({
    onSuccess: () => {
      openNotificationWithIcon(
        "success",
        "Item to Donate Added. Please Deliver Your item to our Admin Office to avoid cancelation",
      );
      form.resetFields();
      router.push("/donor/donations");
    },
  });
  let donorId: string;
  if (typeof window !== "undefined") {
    donorId = localStorage.getItem("id") || "";
  }
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form] = Form.useForm();
  const onSubmitDonation = (e: any) => {
    mutate({
      description: e.description,
      imageUrl: imageUrl,
      type: e.type,
      donorId: donorId || "",
      itemName: e.item,
      quantity: e.quantity,
      unit: e.unit,
      bulkDonatedTo: e.benefeciary,
      location: e.location,
    });
  };
  useEffect(() => {
    form.setFieldValue("unit", undefined);
    if (itemStatus !== "bulk") {
      form.setFieldsValue({
        benefeciary: undefined,
        location: undefined,
      });
    }
  }, [itemStatus]);
  const unit =
    itemStatus === "small"
      ? [
          { id: "pcs", name: "pcs" },
          { id: "set", name: "set" },
          { id: "pair", name: "pair" },
        ]
      : [
          { id: "pack", name: "pack" },
          { id: "box", name: "box" },
          { id: "sack", name: "sack" },
        ];
  return (
    <Form
      form={form}
      onFinish={onSubmitDonation}
      className=" mt-4 rounded-lg bg-[#ecf0f0] sm:mx-auto sm:w-1/2  sm:p-20"
    >
      <div className="p-5 sm:p-0">
        <div className=" text-center text-xl font-extrabold text-[#3ba9ac] sm:-mt-5 sm:mb-5 sm:text-5xl">
          Preloved/Item Details
        </div>
        <ImageUpload
          form={form}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
        <div className=" -mt-6 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
          Name of Item to be donated
        </div>
        <Form.Item
          name={"item"}
          rules={[
            {
              required: true,
              message: "Description of preloved/item is required",
            },
          ]}
        >
          <Input size="large" placeholder="Input item name" />
        </Form.Item>
        <div className=" -mt-4 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
          Type of Item
        </div>
        <Form.Item rules={[{ required: true, message: "" }]} name={"type"}>
          <Select
            size="large"
            placeholder="Select type of item to donate"
            onChange={(e) => setItemStatus(e)}
          >
            <Select.Option value="small">
              Small Donation ( For NWSSU Students)
            </Select.Option>
            <Select.Option value="bulk">
              Bulk Donation ( For those in need )
            </Select.Option>
          </Select>
        </Form.Item>
        {itemStatus === "bulk" && (
          <>
            <div className=" -mt-4 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
              Name of benefeciary
            </div>
            <Form.Item
              name={"benefeciary"}
              rules={[
                {
                  required: true,
                  message: "Name of benefeciary required",
                },
              ]}
            >
              <Input size="large" placeholder="Input item name" />
            </Form.Item>
            <div className=" -mt-4 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
              Location
            </div>
            <Form.Item
              name={"location"}
              rules={[
                {
                  required: true,
                  message: "Location of benefeciary is required",
                },
              ]}
            >
              <Input size="large" placeholder="Input item name" />
            </Form.Item>
          </>
        )}
        <div className=" -mt-4 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
          Description of Item to be donated
        </div>
        <Form.Item
          name={"description"}
          rules={[
            {
              required: true,
              message: "Description of item is required",
            },
          ]}
        >
          <TextArea
            size="large"
            placeholder="Input item/preloved description"
          />
        </Form.Item>
        <div className=" flex flex-row gap-1">
          <div className=" flex flex-1 flex-col">
            <div className=" -mt-4 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
              Quantity
            </div>
            <Form.Item
              name={"quantity"}
              rules={[
                {
                  required: true,
                  message: "Description of preloved/item is required",
                },
              ]}
            >
              <InputNumber
                size="large"
                className=" w-full"
                placeholder="Input Quantity"
              />
            </Form.Item>
          </div>
          <div className=" flex w-1/2 flex-col">
            <div className=" -mt-4 font-bold sm:mb-1 sm:mt-0 sm:text-lg">
              Unit
            </div>
            <Form.Item
              name={"unit"}
              rules={[
                {
                  required: true,
                  message: "Unit required",
                },
              ]}
            >
              <Select
                placeholder={"Select Unit"}
                size="large"
                disabled={itemStatus === ""}
              >
                {unit?.map((b: any) => (
                  <Select.Option key={b.id} value={b.id}>
                    {b.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className=" mt-10 flex w-full items-center gap-2">
          <Button
            onClick={() => router.push("/donor/donations")}
            className=" mx-auto flex-1 bg-white"
            size="large"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            htmlType="submit"
            className=" mx-auto flex-1 bg-[#3ba9ac] text-white"
            size="large"
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AddDonationForm;
