import { Form, Input, Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

const DeactiveModal = ({
  student,
  deactiveOpen,
  setDeactiveOpen,
  refetch,
}: any) => {
  const router = useRouter();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [active, setActive] = useState<any>(null);
  const [password, setPassword] = useState("");
  const { mutate: deactiveAccount } = api.student.deactiveStudent.useMutation({
    onSuccess: () => {
      toast.success("Account Deactivated");
      localStorage.clear();
      router.push("/login");
    },
  });
  const { mutate: deactiveAndCreateDonor } =
    api.student.deactiveAndCreateDonor.useMutation({
      onSuccess: () => {
        toast.success("Account Deactivated");
        localStorage.clear();
        router.push("/donorLogin");
      },
    });

  const handleCancel = () => {
    setDeactiveOpen(false);
    setActive(null);
    form1.resetFields();
    form2.resetFields();
  };
  const confirmDeactive = (e: any) => {
    if (form1.getFieldValue("password") !== student?.password) {
      form1.setFields([
        {
          name: "password",
          errors: ["Incorrect password"],
        },
      ]);
    } else {
      form1.setFields([
        {
          name: "password",
          errors: [],
        },
      ]);
      deactiveAccount({
        id: student.id,
      });
    }
  };
  const confirmDeactiveAndSwitchToDonor = (e: any) => {
    if (form2.getFieldValue("password") !== student?.password) {
      form2.setFields([
        {
          name: "password",
          errors: ["Incorrect password"],
        },
      ]);
    } else {
      form2.setFields([
        {
          name: "password",
          errors: [],
        },
      ]);
      deactiveAndCreateDonor({
        id: student.id,
        address: form2.getFieldValue("address"),
        contact: form2.getFieldValue("contact"),
      });
    }
  };
  return (
    <Modal
      title={
        active === null || active === "deactive"
          ? "Deactive Account"
          : "Deactive & Switch as Donor"
      }
      open={deactiveOpen}
      footer={[]}
      onCancel={handleCancel}
      width={400}
    >
      {!active && (
        <div className=" flex flex-col items-center justify-center gap-1">
          <button
            onClick={() => setActive("deactive")}
            className=" w-full rounded border-none bg-red-400 py-2"
          >
            Deactive Account
          </button>
          <span className=" text-xs text-gray-700">OR</span>
          <button
            onClick={() => setActive("donor")}
            className=" w-full rounded border-none bg-red-500 py-2"
          >
            Deactive & Switch as Donor
          </button>
        </div>
      )}
      {active === "deactive" && (
        <div>
          <div className=" my-2 rounded border border-solid border-red-500 bg-red-200 p-1 px-2 text-xs text-red-600">
            Confirmation ( Deactivation of account )
          </div>
          <Form form={form1} onFinish={confirmDeactive}>
            <div>Input Password</div>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "Input your password" }]}
            >
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <div className=" mt-4 flex w-full justify-end gap-2">
              <button
                type="button"
                onClick={() => setActive(null)}
                className=" rounded border border-solid border-gray-400 bg-white  p-1 px-3 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" rounded border-none bg-blue-500 p-1 px-3"
              >
                Confirm
              </button>
            </div>
          </Form>
        </div>
      )}
      {active === "donor" && (
        <div>
          <div className=" my-2 rounded border border-solid border-red-500 bg-red-200 p-1 px-2 text-xs text-red-600">
            Confirmation ( Deactivation of account )
          </div>
          <div className=" my-2 rounded border border-solid border-orange-500 bg-orange-200 p-1 px-2 text-xs text-orange-600">
            The student ID and password you currently have will continue to be
            the ones you use for logging in as a donor.
          </div>
          <Form form={form2} onFinish={confirmDeactiveAndSwitchToDonor}>
            <div className=" text-xs text-gray-500">
              Please input some needed details
            </div>
            <span>Mobile Number</span>
            <Form.Item
              className="m-0"
              name="contact"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="09*********" />
            </Form.Item>
            <span>Address</span>
            <Form.Item name="address" rules={[{ required: true, message: "" }]}>
              <Input placeholder="Input address" />
            </Form.Item>

            <div className=" text-xs text-gray-500">Confirm using password</div>
            <div>Input Password</div>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "Input your password" }]}
            >
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <div className=" mt-4 flex w-full justify-end gap-2">
              <button
                type="button"
                onClick={() => setActive(null)}
                className=" rounded border border-solid border-gray-400 bg-white  p-1 px-3 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" rounded border-none bg-blue-500 p-1 px-3"
              >
                Confirm
              </button>
            </div>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default DeactiveModal;
