import Layout from "./layout";

const AboutUs = () => {
  return (
    <Layout>
      <div className="  flex h-full flex-col items-center justify-start sm:mt-0 sm:justify-center">
        <div
          style={{ maxHeight: "85vh" }}
          className=" m-2 w-11/12 flex-1 overflow-scroll rounded-md bg-[#ffffff5e] text-teal-800"
        >
          <div className=" mt-5 px-5 text-xl font-bold uppercase sm:mt-10 sm:px-10 sm:text-4xl">
            About the NWSSU Donation Web App
          </div>
          <div className=" px-5 pt-5 text-start text-sm sm:px-32 sm:text-xl">
            The NWSSU Donation Web App is an online platform designed to
            simplify the process of donating and receiving school items,
            exclusively for NWSSU students. We recognize that many alumni have
            school items they no longer use, while some students struggle to
            afford these essential supplies.
          </div>
          <div className=" px-5 pt-5 text-start text-sm sm:px-32 sm:text-xl">
            Our user-friendly interface allows donors to register and create
            listings for the items they wish to donate, including item details .
            Students can easily browse available items and express their
            interest.
          </div>
          <div className=" px-5 pt-5 text-start text-sm sm:px-32 sm:text-xl">
            We aim to positively impact the educational journey of incoming
            students by providing them with the necessary school items and
            promoting a sense of community and support within NWSSU.
          </div>
          <div className=" mt-10 px-5 text-xl font-bold uppercase sm:px-10 sm:text-4xl">
            MISSON
          </div>
          <div className=" px-5 pt-5 text-start text-sm sm:px-32 sm:text-xl">
            Our mission at the NWSSU Donation Web App is to provide a
            user-friendly online platform that connects donors with students in
            need, facilitating the donation of gently used school items such as
            uniforms, textbooks, backpacks, and more. We aim to support students
            who may struggle to afford essential school supplies, reduce waste
            by promoting the reuse of educational materials, and foster a sense
            of community among donors and recipients. By collaborating with
            local school alumni offices and non-profit organizations, we strive
            to maximize the impact of these donations and positively influence
            the educational journey of incoming students.
          </div>
          <div className=" mt-10 px-5 text-xl font-bold uppercase sm:px-10 sm:text-4xl">
            VISION
          </div>
          <div className=" mb-10 px-5 pt-5 text-start text-sm sm:px-32 sm:text-xl ">
            Our vision is to create a sustainable and inclusive ecosystem within
            NWSSU, where every student has access to the necessary school items
            and where the community comes together to support one another. We
            aim to expand our reach, fostering connections between donors and
            recipients not only within our institution but also in the wider
            educational community. We envision a future where the NWSSU Donation
            Web App is a symbol of empowerment, sustainability, and charitable
            giving, making a lasting impact on the educational journey of
            students and promoting environmentally-friendly practices.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
