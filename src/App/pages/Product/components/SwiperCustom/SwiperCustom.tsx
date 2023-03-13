import React, { useRef, FC } from "react";

import Arrow from "images/Arrow.svg";
import { Swiper as SwiperType, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./SwiperCustom.module.scss";

interface SwiperCustomProps {
  slides: string[];
}

const SwiperCustom: FC<SwiperCustomProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div>
      <Swiper
        className={styles.swiper}
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}>
        <div className={styles.swiper__slides}>
          {slides?.map((slide) => (
            <SwiperSlide key={slide}>
              <img
                className={styles.swiper__slide}
                src={slide}
                alt=""
              />
            </SwiperSlide>
          ))}
        </div>
        <img
          onClick={() => swiperRef.current?.slidePrev()}
          className={styles.swiper__left}
          src={Arrow}
          alt=""
        />
        <img
          onClick={() => swiperRef.current?.slideNext()}
          src={Arrow}
          className={styles.swiper__right}
          alt=""
        />
      </Swiper>
    </div>
  );
};

export default SwiperCustom;
