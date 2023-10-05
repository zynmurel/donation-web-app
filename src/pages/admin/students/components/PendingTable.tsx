import { Popconfirm, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const PendingStudents = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { data: students, refetch } = api.student.getStudentByStatus.useQuery({
    status: "notapproved",
  });
  const { mutate: changeStatus } = api.student.changeStudentStatus.useMutation({
    onSuccess: () => {
      refetch();
      openNotificationWithIcon("success", "Student Approved");
    },
  });
  const { mutate: deleteStudent } = api.student.deleteStudent.useMutation({
    onSuccess: () => {
      refetch();
      openNotificationWithIcon("info", "Student Deleted");
    },
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "studentId",
      key: "id",
      width: 160,
      render: (text: any) => <div>{text}</div>,
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, data: any) => {
        return (
          <>
            {data.firstName} {data.lastName}
          </>
        );
      },
    },
    {
      title: "Department",
      key: "department",
      render: (_: any, data: any) => {
        return <>{data.department.acronym}</>;
      },
    },
    {
      title: "Course",
      key: "course",
      render: (_: any, data: any) => {
        return <>{data.course.name}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <div className=" flex items-center justify-center gap-1">
          <Popconfirm
            title="Confirmation"
            description="Please confirm to approve this student"
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() =>
              changeStatus({ id: record.id, status: "approved" })
            }
          >
            <button className=" cursor-pointer rounded-lg border-none bg-green-300 p-3 hover:brightness-105">
              Approve
            </button>
          </Popconfirm>
          <Popconfirm
            title="Confirm Delete"
            description="Please confirm to delete this student"
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => deleteStudent({ id: record.id })}
          >
            <button className=" cursor-pointer rounded-lg border-none bg-red-300 p-3 hover:brightness-105">
              Remove
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={students} />;
};

export default PendingStudents;
