import { MenuProps } from "antd";
import { useRouter } from "next/router";
import { AiOutlinePoweroff } from "react-icons/ai";
export const dropdownItems = () => {
  const router = useRouter();
  return [
    {
      key: "1",
      label: (
        <div
          className=" flex w-full items-center justify-center gap-2 rounded-md bg-red-300 p-2 py-1 text-lg hover:brightness-95"
          onClick={() => {
            localStorage.clear();
            router.push("/donorLogin");
          }}
        >
          <AiOutlinePoweroff />
          Logout
        </div>
      ),
    },
  ];
};
