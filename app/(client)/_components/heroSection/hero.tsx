import Image from "next/image";
import React from "react";

import heroImage from "../../../../public/images/hero-image.png";
import { Button } from "@/components/ui/button";
import SocialLink from "./socialLink";
import { cn } from "@/lib/utils";

type Props = {};

const HeroComponent = (props: Props) => {
    return (
        <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-7/12 p-5 md:p-10 flex flex-col justify-between">
                <div className="flex flex-col justify-center gap-3 md:pt-12 px-10">
                    <h1 className={cn("text-lg ")}>
                        Hi, My name is
                    </h1>
                    <h1 className="text-5xl font-bold text-[#3bad7e]">
                        Shovon Mahamud
                    </h1>
                    <h1 className={cn("text-4xl font-bold text-black/60")}>
                        I Build things for the web 
                    </h1>
                    <h1>
                        I am a web developer specializing in web development, I am passionate about creating responsive web applications that deliver exceptional user experiences. With expertise in JavaScript and proficiency in both front-end and back-end technologies, I specialize in crafting dynamic interfaces and seamless functionality. I have honed my skills to build dynamic and interactive interfaces that bring ideas to life
                    </h1>
                    <div className="flex gap-2">
                        <Button className={cn("w-24 bg-primary/80")}>
                            Hire Me
                        </Button>
                        <Button className={cn("w-24 bg-primary/80")}>
                            CV
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center items-center pt-10">
                    <SocialLink />
                </div>
            </div>
            <div className="w-full md:w-5/12  flex justify-center items-center">
                <Image src={heroImage} width={500} height={500} alt="hero img" />
            </div>
        </div>
    );
};

export default HeroComponent;
