import { Button, Form, Input, Modal } from "antd";
import { useContext, useEffect } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const EditCourse: any = ({
  setEditCourseModalOpen,
  editCourseModalOpen,
  refetch,
  data,
}: any) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate, isLoading } = api.courses.editCourse.useMutation({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "Course Edited");
      refetch();
      setEditCourseModalOpen(false);
    },
    onError: () => {
      openNotificationWithIcon("error", "This course title is already added");
    },
  });

  const handleCancel = () => {
    setEditCourseModalOpen(false);
  };
  const onSubmit = (e: any) => {
    mutate({
      name: e.name,
      id: data.id,
    });
  };
  useEffect(() => {
    form.setFieldValue("name", data.name);
  }, [data]);
  return (
    <Modal
      title={`Edit Couse`}
      footer={[]}
      open={editCourseModalOpen === data.id}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Course"
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

export default EditCourse;
