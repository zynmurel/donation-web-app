import { Button, Form, Input, Modal } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const AddModal: any = ({
  setAddDepartmentOpen,
  addDepartmentOpen,
  refetch,
}: any) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate, isLoading } = api.department.createDepartment.useMutation({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "Department Added");
      refetch();
      setAddDepartmentOpen(false);
    },
    onError: () => {
      openNotificationWithIcon(
        "error",
        "This acronym or department is already added",
      );
    },
  });
  const handleOk = () => {
    setAddDepartmentOpen(false);
  };

  const handleCancel = () => {
    setAddDepartmentOpen(false);
  };
  const onSubmit = (e: any) => {
    mutate({
      name: e.name,
      acronym: e.acronym,
    });
  };
  return (
    <Modal
      title="Add Department"
      footer={[]}
      open={addDepartmentOpen}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Department Acronym"
          name={"acronym"}
          rules={[{ required: true, message: "Acronym required" }]}
        >
          <Input placeholder="ex: CCIS" />
        </Form.Item>
        <Form.Item
          label="Department"
          name={"name"}
          rules={[{ required: true, message: "Department required" }]}
        >
          <Input placeholder="ex: College of Computing and Information Science" />
        </Form.Item>
        <div className=" flex flex-row justify-end gap-1">
          <button
            onClick={handleCancel}
            type="button"
            className=" rounded border-none bg-white p-1 px-3 hover:brightness-90"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className=" rounded border-none bg-blue-400 p-1 px-3 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddModal;
