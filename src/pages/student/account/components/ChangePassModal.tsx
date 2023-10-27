import { Form, Input, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

const ChangePassModal = ({
  student,
  changePassOpen,
  setChangePassOpen,
  refetch,
}: any) => {
  const [form] = Form.useForm();
  const { mutate } = api.student.changeStudentPassword.useMutation({
    onSuccess: () => {
      setChangePassOpen(false);
      toast.success("Change Password Success");
      form.resetFields();
      refetch();
    },
  });
  const handleOk = (e: any) => {
    console.log(student);
    if (form.getFieldValue("password") !== student.password) {
      form.setFields([
        {
          name: "password",
          errors: ["Incorrect password"],
        },
      ]);
    } else if (
      form.getFieldValue("newpassword") !==
      form.getFieldValue("confirmpassword")
    ) {
      form.setFields([
        {
          name: "newpassword",
          errors: [""],
        },
        {
          name: "confirmpassword",
          errors: ["Password does not match"],
        },
      ]);
    } else {
      mutate({
        id: student?.id || "",
        password: form.getFieldValue("newpassword"),
      });
    }
  };

  const handleCancel = () => {
    setChangePassOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Change Password"
      open={changePassOpen}
      footer={[]}
      onCancel={handleCancel}
      width={400}
    >
      <Form form={form} onFinish={handleOk}>
        <div>Current Password :</div>
        <Form.Item
          name="password"
          className=" mb-3"
          rules={[
            {
              required: true,
              message: "Current password required",
            },
          ]}
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>
        <div>New Password :</div>
        <Form.Item
          name="newpassword"
          className=" mb-3"
          rules={[
            {
              required: true,
              message: "New password required",
            },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <div>Confirm Password :</div>
        <Form.Item
          name="confirmpassword"
          className=" mb-3"
          rules={[
            {
              required: true,
              message: "Confirm your password",
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <div className=" flex w-full justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className=" rounded border border-gray-400 bg-white p-1 px-4 text-gray-500 sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-blue-500sm:text-base rounded border-none bg-blue-400 p-1 px-4 sm:text-base"
          >
            Submit
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassModal;
