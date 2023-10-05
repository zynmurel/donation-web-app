import { Button, Form, Input, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "~/pages/context/contextproviders";
import { api } from "~/utils/api";

const AdminAccount = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [form] = Form.useForm();
  const [canEdit, setCanEdit] = useState(true);
  const [changePassword, setChangePassword] = useState(true);
  const { data: donor, refetch } = api.admin.findAdmin.useQuery();
  const { mutate, isLoading } = api.admin.editAdminUsername.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("success", "Username edited");
      setCanEdit(true);
      refetch();
    },
    onError: () => {
      openNotificationWithIcon("error", "Error occured");
    },
  });
  const { mutate: mutatePass, isLoading: passIsLoading } =
    api.admin.adminChangePass.useMutation({
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
    <div className=" mx-auto w-2/3">
      <Form className=" mt-5 w-full" form={form} disabled={canEdit}>
        <div className=" mx-auto mb-4 w-full p-3 text-center text-5xl font-extrabold text-[#205b5d]">
          Account
        </div>
        <div className=" mx-auto  flex  w-full justify-between text-lg font-bold text-[#205b5d]">
          <span>Admin Username</span>{" "}
          {canEdit && (
            <button
              onClick={() => {
                setCanEdit(false);
                setChangePassword(true);
              }}
              className=" rounded bg-yellow-500 p-1 px-3 text-sm font-normal text-white hover:brightness-110"
            >
              Edit Username
            </button>
          )}
        </div>
        <span className=" pl-1 text-sm text-slate-600">Username</span>
        <Form.Item name={"username"} rules={[{ required: true, message: "" }]}>
          <Input size="large" placeholder="Input your username" />
        </Form.Item>
        {!canEdit && (
          <div className=" flex w-full items-center justify-end gap-2">
            <button
              onClick={() => {
                setCanEdit(true);
              }}
              className=" rounded border border-solid bg-[#ffff] p-1 px-5 text-base font-medium hover:brightness-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const { username } = form.getFieldsValue();
                if (donor) {
                  mutate({
                    username: username,
                  });
                }
              }}
              className=" rounded bg-[#62d5b5] p-1 px-5 text-base font-semibold text-white hover:brightness-110"
            >
              Save
            </button>
          </div>
        )}
      </Form>

      <Form className=" mt-5 w-full" form={form} disabled={changePassword}>
        <div className=" mx-auto  flex  w-full justify-between text-lg font-bold text-[#205b5d]">
          <span>Admin Password</span>{" "}
          {changePassword && (
            <button
              onClick={() => {
                setChangePassword(false);
                setCanEdit(true);
              }}
              className=" rounded bg-green-500 p-1 px-3 text-sm font-normal text-white hover:brightness-110"
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
              className=" rounded border border-solid bg-[#ffff] p-1 px-5 text-base font-medium hover:brightness-95"
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
              className=" rounded bg-[#62d5b5] p-1 px-5 text-base font-semibold text-white hover:brightness-110"
            >
              Save
            </button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default AdminAccount;
