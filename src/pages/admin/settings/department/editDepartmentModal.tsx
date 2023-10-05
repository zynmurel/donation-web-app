import { Button, Form, Input, Modal } from "antd";
import { useContext, useEffect } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const EditModal: any = ({
  setEditDepartmentOpen,
  editDepartmentOpen,
  refetch,
  item,
}: any) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate, isLoading } = api.department.editDepartment.useMutation({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "Department Edited");
      refetch();
      setEditDepartmentOpen("");
    },
    onError: () => {
      openNotificationWithIcon(
        "error",
        "This acronym or department is already added",
      );
    },
  });

  const handleCancel = () => {
    setEditDepartmentOpen("");
  };
  const onSubmit = (e: any) => {
    mutate({
      id: item.id,
      name: e.name,
      acronym: e.acronym,
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: item.name,
      acronym: item.acronym,
    });
  }, [editDepartmentOpen]);

  return (
    <Modal
      title="Edit Department"
      footer={[]}
      open={editDepartmentOpen === item.id}
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
            className=" rounded border border-none bg-white p-1 px-3 hover:brightness-90"
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

export default EditModal;
