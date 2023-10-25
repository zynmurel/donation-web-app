import { useRouter } from "next/router";
import Layout from "./layout";

const Register = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="  flex h-full w-full flex-col items-center justify-center">
        <div className=" -mt-40 mb-2 text-3xl text-white">Register as :</div>
        <div
          onClick={() => router.push("/studentRegister")}
          className=" mb-3 w-1/2 cursor-pointer rounded-full bg-[#339598] py-3 text-center text-2xl font-semibold text-white hover:brightness-110 sm:text-6xl"
        >
          STUDENT
        </div>
        <div
          onClick={() => router.push("/donorRegister")}
          className=" w-1/2 cursor-pointer rounded-full bg-[#339598] py-3 text-center text-2xl font-semibold text-white hover:brightness-110 sm:text-6xl"
        >
          DONOR
        </div>
      </div>
    </Layout>
  );
};

export default Register;
