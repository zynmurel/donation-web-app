import { Button, Form, Input, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const EditAccount = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [form] = Form.useForm();
  const [canEdit, setCanEdit] = useState(true);
  const [changePassword, setChangePassword] = useState(true);
  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("id");
  }
  const { data: donor, refetch } = api.donor.findDonor.useQuery({
    id: user || "",
  });
  const { mutate, isLoading } = api.donor.editDonor.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("success", "Details edited");
      setCanEdit(true);
      refetch();
    },
    onError: () => {
      form.setFields([
        {
          name: "username",
          errors: ["This username is already used."],
        },
      ]);
    },
  });
  const { mutate: mutatePass, isLoading: passIsLoading } =
    api.donor.donorChangePass.useMutation({
      onSuccess: () => {
        openNotificationWithIcon("success", "Password Changed");
        setChangePassword(true);
        form.setFieldValue("confirmPass", "");
        refetch();
      },
    });
  useEffect(() => {
    form.setFieldsValue({
      username: donor?.username,
      name: donor?.name,
      alumni: donor?.alumni,
    });
    if (changePassword) {
      form.setFieldsValue({
        password: donor?.password,
      });
    } else {
      form.setFieldsValue({
        password: "",
      });
    }
  }, [donor, canEdit, changePassword]);
  return (
    <>
      <Form className=" mt-5 w-full" form={form} disabled={canEdit}>
        <div className=" mx-auto mb-4 w-full p-3 text-center text-2xl font-extrabold text-[#205b5d] sm:text-5xl">
          Account
        </div>
        <div className=" mx-auto  flex  w-full justify-between text-base font-extrabold text-[#205b5d] sm:text-xl">
          <span>Donor Details</span>{" "}
          {canEdit && (
            <button
              onClick={() => {
                setCanEdit(false);
                setChangePassword(true);
              }}
              className=" rounded border-none bg-yellow-500 p-1 px-3 text-sm font-normal text-white hover:brightness-110"
            >
              Edit Details
            </button>
          )}
        </div>
        <span className=" pl-1 text-sm text-slate-600">Username</span>
        <Form.Item name={"username"} rules={[{ required: true, message: "" }]}>
          <Input size="large" placeholder="Input your username" />
        </Form.Item>
        <div className=" flex flex-row gap-1">
          <div className=" flex flex-1 flex-col">
            <span className=" pl-1 text-sm text-slate-600">Name</span>
            <Form.Item name={"name"} rules={[{ required: true, message: "" }]}>
              <Input size="large" placeholder="Donor Name" />
            </Form.Item>
          </div>
        </div>
        <div className=" flex flex-row gap-1">
          <div className=" flex flex-1 flex-col">
            <span className=" pl-1 text-sm text-slate-600">
              Alumni of NWSSU ?
            </span>
            <Form.Item name="alumni" rules={[{ required: true, message: "" }]}>
              <Select placeholder={"Are you an alumni of NWSSU?"} size="large">
                {[
                  { id: true, name: "Yes" },
                  { id: false, name: "No" },
                ]?.map((b: any) => (
                  <Select.Option key={b.id} value={b.id}>
                    {b.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        {!canEdit && (
          <div className=" flex w-full items-center justify-end gap-2">
            <button
              onClick={() => {
                setCanEdit(true);
              }}
              className=" rounded border border-solid bg-[#ffff] p-1 px-5 text-base font-medium text-black hover:brightness-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const { name, alumni, username } = form.getFieldsValue();
                if (donor) {
                  mutate({
                    id: donor.id,
                    name: name,
                    alumni: alumni,
                    username: username,
                  });
                }
              }}
              className=" rounded border-none bg-[#62d5b5] p-1 px-5 text-base font-semibold text-white hover:brightness-110"
            >
              Save
            </button>
          </div>
        )}
      </Form>

      <Form className=" mt-5 w-full" form={form} disabled={changePassword}>
        <div className=" mx-auto  flex  w-full justify-between text-base font-extrabold text-[#205b5d] sm:text-xl">
          <span>Account Password</span>{" "}
          {changePassword && (
            <button
              onClick={() => {
                setChangePassword(false);
                setCanEdit(true);
              }}
              className=" rounded border-none bg-green-500 p-1 px-3 text-sm font-normal text-white hover:brightness-110"
            >
              Change password?
            </button>
          )}
        </div>
        <div className=" flex flex-row gap-1">
          <div className=" flex flex-1 flex-col">
            <span className=" pl-1 text-sm text-slate-600">Password</span>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "" }]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
          </div>
        </div>
        {!changePassword && (
          <div className=" flex flex-row gap-1">
            <div className=" flex flex-1 flex-col">
              <span className=" pl-1 text-sm text-slate-600">
                Confirm Password
              </span>
              <Form.Item
                name="confirmPass"
                rules={[
                  {
                    validator: async (_: any, value: any) => {
                      if (value !== form.getFieldValue("password")) {
                        return Promise.reject(
                          new Error("Password does not match."),
                        );
                      }
                    },
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Confirm Password" />
              </Form.Item>
            </div>
          </div>
        )}
        {!changePassword && (
          <div className=" flex w-full items-center justify-end gap-2">
            <button
              onClick={() => {
                setCanEdit(true);
                setChangePassword(true);
              }}
              className=" rounded border border-solid bg-[#ffff] p-1 px-5 text-base font-medium text-black hover:brightness-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const { password, confirmPass } = form.getFieldsValue();
                if (confirmPass === password && donor) {
                  mutatePass({
                    id: donor.id,
                    password: password,
                  });
                } else {
                  form.setFields([
                    {
                      name: "password",
                      errors: ["Password not match."],
                    },
                    {
                      name: "confirmPass",
                      errors: ["Password not match."],
                    },
                  ]);
                }
              }}
              className=" rounded border-none bg-[#62d5b5] p-1 px-5 text-base font-semibold text-white hover:brightness-110"
            >
              Save
            </button>
          </div>
        )}
      </Form>
    </>
  );
};

export default EditAccount;
