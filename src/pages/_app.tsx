import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { NotificationContext } from "./context/contextproviders";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
const MyApp: AppType = ({ Component, pageProps }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  return (
    <NotificationContext.Provider value={{ openNotificationWithIcon }}>
      <div className="min-h-screen  w-full bg-gradient-to-b   from-[#62d5b5] to-[#3ba9ac] font-body">
        {" "}
        {contextHolder}
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </div>
    </NotificationContext.Provider>
  );
};

export default api.withTRPC(MyApp);
