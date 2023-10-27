import { api } from "~/utils/api";
import Layout from "../layout";
import { useState } from "react";
import ChangePassModal from "./components/ChangePassModal";
import DeactiveModal from "./components/DeactiveModal";

const StudentAccount = () => {
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const { data: student, refetch } = api.student.findStudent.useQuery({
    id: user || "some",
  });
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [deactiveOpen, setDeactiveOpen] = useState(false);
  return (
    <Layout student={student}>
      <ChangePassModal
        student={student}
        changePassOpen={changePassOpen}
        setChangePassOpen={setChangePassOpen}
        refetch={refetch}
      />
      <DeactiveModal
        student={student}
        deactiveOpen={deactiveOpen}
        setDeactiveOpen={setDeactiveOpen}
        refetch={refetch}
      />
      <div className=" flex w-4/5 flex-col items-center p-5 sm:w-1/3">
        <div className=" text-xl font-medium text-gray-700 sm:mt-10 sm:text-4xl">
          Account
        </div>
        <div className=" mt-5 flex w-full flex-col rounded p-5 py-2 shadow sm:p-10 sm:py-5">
          <div className=" my-2 flex flex-row items-center justify-between text-sm">
            <span>Account Details</span>
            <button
              disabled={
                student && student?.status === "notapproved" ? true : false
              }
              onClick={() => setChangePassOpen(true)}
              className=" cursor-pointer rounded border-none bg-green-500 p-1 px-2 hover:brightness-110 disabled:bg-gray-400"
            >
              Change Password
            </button>
          </div>
          <span className=" text-sm text-gray-600 sm:text-lg">
            <span className=" text-xs sm:text-base">Student ID : </span>
            <span className=" font-medium text-gray-800">
              {student?.studentId}
            </span>
          </span>
          <span className=" text-sm text-gray-600 sm:text-lg">
            <span className=" text-xs sm:text-base">Name : </span>
            <span className=" font-medium text-gray-800">
              {student?.firstName} {student?.lastName}
            </span>
          </span>
        </div>
        {student && student?.status === "approved" ? (
          <button
            onClick={() => setDeactiveOpen(true)}
            className=" mt-5 cursor-pointer rounded border-none bg-red-400 p-1 px-2 hover:brightness-105"
          >
            Deactive Account
          </button>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default StudentAccount;
