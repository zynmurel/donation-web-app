import { useRouter } from "next/router";
import Layout from "./layout";

const Register = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="  flex h-full flex-col items-center justify-start sm:mt-0 sm:justify-center">
        <div
          style={{ maxHeight: "85vh" }}
          className=" m-2 w-11/12 flex-1 overflow-scroll rounded-md bg-[#ffffff5e] text-teal-800"
        >
          <div className=" mt-5 px-5 text-xl font-bold uppercase sm:mt-10 sm:px-10 sm:text-4xl">
            Services Provided by the Nwssu Donation Webapp:
          </div>
          <div className=" mt-2 px-8 text-xs sm:mt-10 sm:px-40 sm:text-xl">
            <span className=" font-semibold sm:block">
              User Registration and Authentication:
            </span>{" "}
            Users can easily register and log in to the platform to participate
            in the donation process.
          </div>

          <div className=" mt-2 px-8 text-xs sm:mt-5 sm:px-40 sm:text-xl">
            <span className=" font-semibold sm:block">
              Item Posting and Listing:{" "}
            </span>{" "}
            Donors can create listings or posts for the school items they want
            to donate, providing details about each item, such as its name,
            description, and any specific requirements.
          </div>

          <div className=" mt-2 px-8 text-xs sm:mt-5 sm:px-40 sm:text-xl">
            <span className=" font-semibold sm:block">
              Device Compatibility:{" "}
            </span>{" "}
            The web app is designed to work seamlessly on devices, including
            smartphones and desktop computers, ensuring accessibility for all
            users.
          </div>

          <div className=" mt-2 px-8 text-xs sm:mt-5 sm:px-40 sm:text-xl">
            <span className=" font-semibold sm:block">
              Collaboration with Alumni Office and Non-profit Organizations:{" "}
            </span>{" "}
            The platform partners with the local school alumni office and
            non-profit organizations to enhance support for secondhand school
            item donations, expanding its impact.
          </div>

          <div className=" mt-2 px-8 text-xs sm:mt-5 sm:px-40 sm:text-xl">
            <span className=" font-semibold sm:block">
              Promotion of Sustainability:{" "}
            </span>{" "}
            The web app encourages sustainability by facilitating the reuse of
            school items, reducing waste, and promoting eco-friendly practices,
            benefiting both students and the environment.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
