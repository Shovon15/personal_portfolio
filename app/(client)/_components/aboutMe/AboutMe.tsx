import Image from "next/image";
import React from "react";
import portfolio from "../../../../public/images/portfolio.png";

type Props = {};

const AboutMe = (props: Props) => {
  return (
    <div className=" flex flex-col md:flex-row w-full justify-start p-5 md:p-10">
      <div className="w-full md:w-1/2 rounded-full flex justify-center items-center">
        <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full flex justify-center items-center border-[3px] border-primary">
          <Image
            src={portfolio}
            width={300}
            height={300}
            alt="portfolio"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-center font-bold text-3xl text-primary dark:text-primary py-5">
          About Me
        </h1>
        <p className="whitespace-normal">
          I completed My Bachelor’s degree from Daffodil International
          University Department of SWE (Software Engineering). As an experienced
          full stack developer specializing in web development, I am passionate
          about creating responsive web applications that deliver exceptional
          user experiences. With expertise in JavaScript and proficiency in both
          front-e and back-end technologies, I specialize in crafting dynamic
          interfaces and seamless functionality. I honed my skills to build
          dynamic and interactive interfaces that bring ideas to life.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
