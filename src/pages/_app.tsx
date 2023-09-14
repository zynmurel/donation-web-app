import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="font-body  min-h-screen w-full   bg-gradient-to-b from-[#62d5b5] to-[#3ba9ac]">
      {" "}
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
