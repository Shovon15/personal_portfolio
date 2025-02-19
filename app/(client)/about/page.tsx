import React from "react";
import AboutMe from "../_components/aboutMe/AboutMe";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <div className="min-h-screen temp-class flex-col gap-5  font-semibold">
      <div>
        <AboutMe />
      </div>
      {/* <h1 className='text-2xl'>About Page</h1>
            <h1>coming soon</h1> */}
    </div>
  );
};

export default AboutPage;
