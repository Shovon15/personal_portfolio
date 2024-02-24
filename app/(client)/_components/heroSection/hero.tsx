import Image from "next/image";
import React from "react";

import heroImage from "../../../../public/images/hero.png";

type Props = {};

const HeroComponent = (props: Props) => {
    return (
        <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-7/12 bg-cyan-300 p-5 md:p-10 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-semibold text-orange-500">

                    nulla consequuntur aspernatur deserunt inventore dolorum?
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aperiam recusandae quas veniam quos
                    nulla consequuntur aspernatur deserunt inventore dolorum?
                </h1>
            </div>
            <div className="w-full md:w-5/12 bg-green-500 flex justify-center items-center">
                <Image src={heroImage} width={400} height={400} alt="hero img" />
            </div>
        </div>
    );
};

export default HeroComponent;
