import { List, Popconfirm, Table } from "antd";
import { api } from "~/utils/api";
import { FiEdit, FiFilePlus, FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useContext, useState } from "react";
import AddModal from "./addDepartmentModal";
import EditModal from "./editDepartmentModal";
import { NotificationContext } from "~/pages/context/contextproviders";
import AddCourseModal from "./AddCourse";
import EditCourse from "./EditCourse";

const Departments = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState("");
  const [editCourseModalOpen, setEditCourseModalOpen] = useState("");
  const [editDepartmentOpen, setEditDepartmentOpen] = useState("");
  const { data, refetch } = api.department.getDepartmentAndCourse.useQuery();
  const { mutate } = api.department.deleteDepartment.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("success", "Department Deleted");
      refetch();
      setAddDepartmentOpen(false);
    },
    onError: () => {
      openNotificationWithIcon(
        "error",
        "Can't Delete. There are courses connected to this Department",
      );
    },
  });
  const { mutate: deleteCourse } = api.courses.deleteCourse.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("success", "Course Deleted");
      refetch();
      setCourseModalOpen("");
    },
    onError: () => {
      openNotificationWithIcon(
        "error",
        "Can't Delete. There are students connected to this Course",
      );
    },
  });
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-row justify-between">
        <AddModal
          refetch={refetch}
          addDepartmentOpen={addDepartmentOpen}
          setAddDepartmentOpen={setAddDepartmentOpen}
        />
        <span className=" text-3xl font-extrabold text-[#0f383a]">
          DEPARTMENTS
        </span>
        <div
          onClick={() => setAddDepartmentOpen(true)}
          className=" flex flex-row items-center gap-1 rounded bg-[#b0e5e7] p-4 py-1 text-lg text-[#0f383a] hover:brightness-110"
        >
          <FiFilePlus />
          Add Department
        </div>
      </div>
      {data?.map((item) => {
        return (
          <div className=" flex flex-col  rounded-lg bg-[#edf3f4] p-2">
            <AddCourseModal
              setCourseModalOpen={setCourseModalOpen}
              courseModalOpen={courseModalOpen}
              refetch={refetch}
              department={item}
            />
            <div className=" flex flex-row justify-between p-2 px-5">
              <div className=" flex flex-col">
                <span className=" text-3xl font-bold">{item.acronym}</span>
                <span className=" text-lg">{item.name}</span>
              </div>
              <div className=" flex flex-row gap-1">
                <EditModal
                  item={item}
                  editDepartmentOpen={editDepartmentOpen}
                  setEditDepartmentOpen={setEditDepartmentOpen}
                  refetch={refetch}
                />
                <div
                  onClick={() => setEditDepartmentOpen(item.id)}
                  className=" flex h-10 flex-row items-center gap-1 rounded bg-orange-300 p-4 py-1 text-orange-900 hover:brightness-110"
                >
                  <FiEdit />
                  Edit
                </div>
                <Popconfirm
                  title="Delete the Department"
                  description="Are you sure to delete this department?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => mutate({ id: item.id })}
                >
                  <div className=" flex h-10 flex-row items-center gap-1 rounded bg-red-500 p-4 py-1 text-white hover:brightness-110">
                    <FiTrash2 />
                    Delete
                  </div>
                </Popconfirm>
                {/* <div className=" flex h-10 flex-row items-center gap-1 rounded bg-[#b0e5e7] p-4 py-1 text-[#0f383a] hover:brightness-110">
              <FiFilePlus />
              Add Course
            </div> */}
              </div>
            </div>
            <div className=" m-2 mx-auto w-full rounded bg-white ">
              <div className=" flex w-full justify-between rounded-t bg-[#dbebec] p-2 text-xl font-bold text-[#0f383a]">
                <span>Courses</span>
                <button
                  onClick={() => {
                    setCourseModalOpen(item.id);
                  }}
                  className=" rounded border-none bg-[#55b3b8] px-4 text-base font-semibold text-white hover:brightness-110"
                >
                  Add Course
                </button>
              </div>
              <div className=" flex w-full flex-col overflow-hidden rounded-md  p-1">
                <div className=" overflow-hidden rounded-md">
                  <div className=" flex justify-between border-b border-l border-r border-t border-solid border-slate-300 bg-[#70cbcf] px-4 py-2 text-base">
                    <span className=" font-medium">Course</span>
                    <span className=" w-1/6 text-center font-medium">
                      Action
                    </span>
                  </div>
                  {item?.Course?.length === 0 && (
                    <div className=" flex justify-center border-b border-l border-r border-t border-solid border-slate-400 px-4  py-2 text-base text-slate-300">
                      <span>No Course in this Department</span>
                    </div>
                  )}
                  {item?.Course?.map((data) => {
                    return (
                      <div
                        key={data.id}
                        className=" flex items-center justify-between border-b border-l border-r border-t-0 border-solid border-slate-300 px-4 py-2 text-sm"
                      >
                        <EditCourse
                          setEditCourseModalOpen={setEditCourseModalOpen}
                          editCourseModalOpen={editCourseModalOpen}
                          refetch={refetch}
                          data={data}
                        />
                        <span>{data?.name}</span>
                        <span className=" flex w-1/6 flex-row items-center justify-center gap-1 text-center font-medium">
                          <FaEdit
                            size={25}
                            color="white"
                            className=" rounded bg-orange-400 p-1"
                            onClick={() => setEditCourseModalOpen(data.id)}
                          />
                          <Popconfirm
                            title="Delete the Course"
                            description="Are you sure to delete this course?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => deleteCourse({ id: data.id })}
                          >
                            <RiDeleteBin5Fill
                              size={25}
                              color="white"
                              className=" rounded bg-red-500 p-1"
                            />
                          </Popconfirm>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Departments;
