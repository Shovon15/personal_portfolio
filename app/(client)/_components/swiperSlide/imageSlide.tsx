import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import Image from 'next/image';

type Props = {
    data: string[]
}

const ImageSlide = ({ data }: Props) => {
    return (
        <div>
            {data.length > 0 && (
                <Swiper
                    grabCursor={true}
                    centeredSlides={true}
                    loop={data.length > 1}
                    speed={1500}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    slidesPerView={1}
                    // className="h-[16rem] md:h-[450px] rounded-xl "
                    className='shadow-xl rounded-xl'
                >
                    {data.map((imageUrl, index) => (
                        <SwiperSlide key={index} >
                            <div className="md:h-auto">
                                <Image
                                    src={imageUrl}
                                    alt={`banner-img-${index}`}
                                    className="object-fill h-full  rounded-xl"
                                    width={760}
                                    height={485}
                                    priority={true}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default ImageSlide