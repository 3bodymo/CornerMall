import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper"
import Link from "next/link"

export default function SliderComponent() {
  return (
    <div className="mb-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide href="/product#clothes">
          <Link href="/product#clothes" scroll>
            <img
              className="object-fill w-full h-96"
              src="https://ae01.alicdn.com/kf/H82d4597f0602415e8fac57e6882fb9abV.jpg"
              alt="image slide 1"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/product#laptops" scroll>
            <img
              className="object-fill w-full h-96"
              src="https://www.thdesigninc.com/wp-content/uploads/2022/10/laptop.jpg"
              alt="image slide 1"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/product#mobiles" scroll>
            <img
              className="object-fill w-full h-96"
              src="https://wtemc.ist.hokudai.ac.jp/eng/pictures/trimed/antenna2.jpg"
              alt="image slide 1"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
