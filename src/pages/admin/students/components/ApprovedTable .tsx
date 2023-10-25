import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const ApprovedStudents = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { data: students, refetch } = api.student.getStudentByStatus.useQuery({
    status: "approved",
  });
  const { mutate: changeStatus } = api.student.changeStudentStatus.useMutation({
    onSuccess: () => {
      refetch();
      openNotificationWithIcon("success", "Student Approved");
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
            {data?.firstName} {data?.lastName}
          </>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={students} />;
};

export default ApprovedStudents;
