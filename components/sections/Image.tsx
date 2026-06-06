import Carousel from "../ui/Carousel";
import type { EmblaOptionsType } from "embla-carousel";
import { useState } from "react";
import styles from "./Image.module.scss";
import Image from "next/image";

const Images = () => {
  const [images, setImages] = useState([
    //"/profile/profile.jpg",
    "/profile/profile2.jpg",
    // "/profile/profile3.jpg",
  ]);
  const OPTIONS: EmblaOptionsType = {
    loop: true,
  };


  return (
    <div className={styles.image_container}>
      <Carousel options={OPTIONS}>
        {images.map((image, index) => (
          <div className={styles.slide} key={index}>
            <Image
              className={styles.image}
              src={image}
              alt={image}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Images;
