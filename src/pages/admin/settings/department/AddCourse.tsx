import { Button, Form, Input, Modal } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const AddCourseModal: any = ({
  setCourseModalOpen,
  courseModalOpen,
  refetch,
  department,
  activeId,
}: any) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate, isLoading } = api.courses.createCourse.useMutation({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "Course Added");
      refetch();
      setCourseModalOpen("");
    },
    onError: () => {
      openNotificationWithIcon("error", "This course is already added");
    },
  });

  const handleCancel = () => {
    setCourseModalOpen("");
  };
  const onSubmit = (e: any) => {
    mutate({
      name: e.name,
      departmentId: department.id,
    });
  };
  return (
    <Modal
      title={`Add Course to ${department.acronym} Department`}
      footer={[]}
      open={courseModalOpen === department.id}
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

export default AddCourseModal;
