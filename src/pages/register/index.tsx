import Head from "next/head";
import Link from "next/link";
import { Button, Form, Input, Select } from "antd";

import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loginLocalStorage } from "../loghelper/loghelper";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  });
  const [form] = Form.useForm();
  const { data, isLoading } = api.department.getDepartmentAndCourse.useQuery();
  const { mutate } = api.student.createStudent.useMutation({
    onSuccess: (data) => {
      toast.success("Student Registered");
      form.resetFields();
      loginLocalStorage("student", data.id);
    },
    onError: (error) => {
      toast.error(error.message);
      form.setFields([
        {
          name: "studentId",
          errors: [""],
        },
      ]);
    },
  });
  const handleRegister = (e: any) => {
    // console.log(e);
    mutate({
      ...e,
    });
  };
  const [courses, setCourses] = useState<any>([]);
  return (
    <>
      <Head>
        <title>NWSSU Donation</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-body flex min-h-screen flex-col items-center bg-gradient-to-b from-[#62d5b5] to-[#3ba9ac]">
        <div className=" flex min-h-screen w-11/12 flex-col items-center transition-all duration-300 sm:w-4/12">
          <div className=" flex w-full flex-col items-center rounded  px-5 py-10 text-5xl font-semibold ">
            <img src="/nwssu.png" alt="nwssu" className=" w-1/3 " />
            <div className=" mb-5 rounded-lg text-center text-5xl font-semibold text-white ">
              NSSWU Donation
            </div>
            <div className=" flex w-full flex-col items-center justify-center gap-0 rounded-lg bg-white  p-10 text-2xl font-semibold text-slate-600 ">
              <span className="mb-2 text-xl font-medium text-[#3ba9ac]">
                Register
              </span>
              <span className="flex items-center text-xs font-normal text-orange-500">
                <span className=" mx-1 rounded-full bg-orange-100 p-2 py-0 text-sm">
                  !
                </span>{" "}
                If the details are incorrect, Admin might terminate the account
              </span>
              <Form
                className=" mt-5 w-full"
                form={form}
                onFinish={handleRegister}
              >
                <span className=" pl-1 text-sm text-slate-600">Student Id</span>
                <Form.Item
                  name={"studentId"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input size="large" placeholder="Input your Student ID" />
                </Form.Item>
                <div className=" flex flex-row gap-1">
                  <div className=" flex flex-1 flex-col">
                    <span className=" pl-1 text-sm text-slate-600">
                      First Name
                    </span>
                    <Form.Item
                      name={"firstName"}
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input size="large" placeholder="First name" />
                    </Form.Item>
                  </div>
                  <div className=" flex flex-1 flex-col">
                    <span className=" pl-1 text-sm text-slate-600">
                      Last Name
                    </span>
                    <Form.Item
                      name={"lastName"}
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input size="large" placeholder="Last name" />
                    </Form.Item>
                  </div>
                </div>
                <div className=" flex  flex-row gap-1">
                  <div className=" flex w-1/3 flex-col">
                    <span className=" pl-1 text-sm text-slate-600">
                      Department
                    </span>
                    <Form.Item
                      name="departmentId"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select
                        placeholder={"Select Department"}
                        size="large"
                        onChange={(e) => {
                          const department = data?.filter((dt) => dt.id === e);
                          console.log(department?.[0]?.courses);
                          form.setFieldValue("course", null);
                          setCourses(department?.[0]?.courses);
                        }}
                      >
                        {data?.map((b) => (
                          <Select.Option key={b.id} value={b.id}>
                            {b.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className=" flex w-2/3 flex-col">
                    <span className=" pl-1 text-sm text-slate-600">Course</span>
                    <Form.Item
                      name="courseId"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select placeholder={"Select Course"} size="large">
                        {courses?.map((b: any) => (
                          <Select.Option key={b.id} value={b.id}>
                            {b.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className=" mb-4 rounded bg-green-100 p-2 text-xs font-normal text-green-800">
                  Your default password is "Default123". You can only change
                  your password after the admin confirm your identification.
                </div>
                <Button
                  htmlType="submit"
                  className=" mt-0 h-10 w-full border-none bg-gradient-to-b from-[#62d5b5] to-[#3ba9ac] text-white hover:brightness-90"
                >
                  <span className="text-xl text-white hover:text-white">
                    Register
                  </span>
                </Button>
                <div className=" mt-2 flex w-full flex-1 items-end justify-center text-base font-normal text-slate-700">
                  Already registered?{" "}
                  <span className=" mx-1">
                    <a href="/login" className=" text-[#62d5b5]">
                      Login
                    </a>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}