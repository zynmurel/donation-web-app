import { Button, Form, Input, Select, Upload, UploadFile } from "antd";
// import UploadButtonComponent from "./uploadImage";
import { useContext, useState } from "react";
import ImageUpload from "./imageUpload";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { NotificationContext } from "~/pages/context/contextproviders";

const { TextArea } = Input;

const AddDonationForm = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const router = useRouter();
  const { mutate, isLoading } = api.item.addItem.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("success", "Item to Donate Added");
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
    console.log(imageUrl);
    mutate({
      description: e.description,
      imageUrl: imageUrl,
      type: e.type,
      donorId: donorId || "",
      item: e.item,
    });
  };
  return (
    <Form
      form={form}
      onFinish={onSubmitDonation}
      className=" mx-auto mt-4 w-1/2 rounded-lg bg-[#ecf0f0]  p-20"
    >
      <div className="">
        <div className="mb-10 text-center text-5xl font-extrabold text-[#3ba9ac]">
          Preloved/Item Details
        </div>
        <ImageUpload
          form={form}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
        <div className=" mb-1 text-lg font-bold">Name</div>
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
        <div className=" mb-1 text-lg font-bold">Type of preloved/item</div>
        <Form.Item
          rules={[
            { required: true, message: "Type of preloved/item is required" },
          ]}
          name={"type"}
        >
          <Select size="large" placeholder="Select type of preloved to donate">
            <Select.Option value="Uniform">Uniform</Select.Option>
            <Select.Option value="School Appliances">
              School Appliances
            </Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
        </Form.Item>
        <div className=" mb-1 text-lg font-bold">Description</div>
        <Form.Item
          name={"description"}
          rules={[
            {
              required: true,
              message: "Description of preloved/item is required",
            },
          ]}
        >
          <TextArea
            size="large"
            placeholder="Input item/preloved description"
          />
        </Form.Item>
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
