import Head from "next/head";
import Link from "next/link";
import { Button, Form, Input } from "antd";

import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loginLocalStorage } from "../loghelper/loghelper";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  });
  const [form] = Form.useForm();
  const { mutate, isLoading } = api.donor.getDonorLogin.useMutation({
    onSuccess: (data) => {
      if (data.hasEmail && data.login) {
        toast.success("Login");
        form.resetFields();
        loginLocalStorage(data.type, data.login.id);
      } else if (!data.login && data.hasEmail) {
        toast.error("Incorrect password");
        form.setFields([
          {
            name: "password",
            errors: ["Incorrect Password"],
          },
        ]);
      } else {
        toast.error("Username not found");
        form.setFields([
          {
            name: "password",
            errors: [""],
          },
          {
            name: "username",
            errors: ["Username not found"],
          },
        ]);
      }
    },
  });
  const handleLogin = (e: any) => {
    mutate({
      username: e.username,
      password: e.password,
    });
  };

  return (
    <>
      <Head>
        <title>NWSSU Donation</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b  from-[#62d5b5] to-[#3ba9ac] font-body">
        <div className=" flex min-h-screen w-11/12 flex-col items-center transition-all  duration-300 sm:w-4/12">
          <div className=" flex w-full flex-col items-center rounded  px-5 py-10 text-5xl font-semibold ">
            <img src="/nwssu.png" alt="nwssu" className=" w-1/3 " />
            <div className=" mb-5 rounded-lg text-center text-5xl font-semibold text-white ">
              NWSSU Donation
            </div>
            <div className=" flex w-full flex-col items-center justify-center rounded-lg bg-white  p-10 text-2xl font-semibold text-slate-600 ">
              <span className=" text-2xl font-medium text-[#3ba9ac]">
                Login as Donor
              </span>
              <span className=" rounded bg-[#e4feff] p-2 text-center text-sm font-light text-[#3ba9ac]">
                Your gently-used items can make a significant difference for
                those in need.
              </span>
              <Form className=" mt-5 w-full" form={form} onFinish={handleLogin}>
                <span className=" pl-1 text-lg text-slate-600">Username</span>
                <Form.Item
                  name={"username"}
                  rules={[{ required: true, message: "Input your username" }]}
                >
                  <Input size="large" placeholder="Input your username" />
                </Form.Item>
                <span className=" pl-1 text-lg text-slate-600">Password</span>
                <Form.Item
                  name={"password"}
                  rules={[{ required: true, message: "Input your password" }]}
                >
                  <Input.Password size="large" placeholder="Input Password" />
                </Form.Item>
                <Button
                  htmlType="submit"
                  className=" mt-0 h-10 w-full border-none bg-gradient-to-b from-[#62d5b5] to-[#3ba9ac] text-white hover:brightness-90"
                >
                  <span className="text-xl text-white hover:text-white">
                    {isLoading ? "Loading..." : "Login"}
                  </span>
                </Button>
                <div className=" mt-2 flex w-full flex-1 items-end justify-center text-base font-normal text-slate-700">
                  Not registered yet?{" "}
                  <span className=" mx-1">
                    <a href="/donorRegister" className=" text-[#62d5b5]">
                      Register
                    </a>
                  </span>
                </div>
              </Form>
              <span className=" mt-5 items-center text-center text-sm font-normal">
                <a href="/login" className=" text-[#62d5b5]">
                  Login as Student
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
