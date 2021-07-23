import React from "react";
import Image from "next/image";
import styles from "../../../styles/Corousel.module.css";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function Corousel(props) {
  return (
    <Carousel infiniteLoop useKeyboardArrows autoPlay  showThumbs={false} showArrows>
      {props.banners &&
        props.banners.map((item, i) => {
          return (
            <div key={i} className={styles.corousel}>
              <Image
                className={styles.corouselImage}
                src={item.bannerImageUrl}
                width="1000"
                height="400"
                alt={item.bannerImageAlt}
              />
            </div>
          );
        })}
    </Carousel>
  );
}

export default Corousel;
