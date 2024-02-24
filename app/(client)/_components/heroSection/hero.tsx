import Image from "next/image";
import React from "react";

import heroImage from "../../../../public/images/hero.png";
import { Button } from "@/components/ui/button";
import SocialLink from "./socialLink";
import { cn } from "@/lib/utils";

type Props = {};

const HeroComponent = (props: Props) => {
    return (
        <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-7/12 p-5 md:p-10 flex flex-col justify-between">
                <div className="flex flex-col justify-center gap-5 md:pt-20 ">
                    <h1 className="text-4xl font-semibold text-orange-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quam!
                    </h1>
                    <h1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aperiam recusandae quas veniam
                        quos nulla consequuntur aspernatur deserunt inventore dolorum?
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
                <Image src={heroImage} width={400} height={400} alt="hero img" />
            </div>
        </div>
    );
};

export default HeroComponent;
