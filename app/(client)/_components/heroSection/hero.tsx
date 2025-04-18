"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import heroImage from "../../../../public/images/hero-image.png";
import { Button } from "@/components/ui/button";
import SocialLink from "./socialLink";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { get } from "@/utils/fetchApi";
// import myCv from "../../../../data/"
type Props = {};

const HeroComponent = (props: Props) => {
  const openPdf = () => {
    // Replace 'path-to-your-pdf-file.pdf' with the actual path to your PDF file
    // const pdfUrl = myCv;
    // window.open(pdfUrl, '_blank');
    // console.log("hello")
  };

  const [cvLink, setCvLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProjectData = async () => {
    setIsLoading(true);
    try {
      const res = await get(`/cv/public`);
      const data = res.data.payload?.data;
      setCvLink(data?.link || {});
    } catch (error) {
      console.error("Error fetching project data:", error);
      // setProjectError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-full md:w-7/12 p-5 md:p-10 flex flex-col justify-between">
        <div className="flex flex-col justify-center gap-3 md:pt-12 md:px-10">
          <h1 className={cn("text-lg ")}>Hi, My name is</h1>
          <h1 className="text-5xl font-bold text-[#3bad7e]">Shovon Mahamud</h1>
          <h1
            className={cn(
              "text-4xl font-bold text-black/60 dark:text-white/60",
            )}
          >
            I Build things for the web
          </h1>
          <h1>
            I am a web developer specializing in web development, I am
            passionate about creating responsive web applications that deliver
            exceptional user experiences. With expertise in JavaScript and
            proficiency in both front-end and back-end technologies, I
            specialize in crafting dynamic interfaces and seamless
            functionality. I have honed my skills to build dynamic and
            interactive interfaces that bring ideas to life
          </h1>
          <div className="flex gap-2">
            <Link href="/hire-me">
              <Button className={cn("w-24 bg-primary")}>Let’s Talk</Button>
            </Link>
            {cvLink ? (
              <Button asChild className="w-24">
                <a href={cvLink} target="_blank" rel="noopener noreferrer">
                  CV
                </a>
              </Button>
            ) : (
              <Button asChild className="w-24" disabled>
                <p>CV</p>
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center pt-10">
          <SocialLink />
        </div>
      </div>
      <div className="w-full md:w-5/12  flex justify-center items-center">
        <Image
          src={heroImage}
          width={500}
          height={500}
          alt="hero img"
          priority={true}
        />
      </div>
    </div>
  );
};

export default HeroComponent;
