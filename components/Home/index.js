import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Category from "./Category/Category";
import Carousel from "./Carousel/Carousel";
import styles from "../../styles/Home.module.css";
import { useScreenWidth as useWindowResize } from "../Common/useScreenWidth";

function Home(props) {
  const { banners, categories, cartProducts } = props;
  const { width } = useWindowResize();

  if (width < 768) {
    return (
      <div className={styles.container}>
        <Header cartProducts={cartProducts} />
        <main>
          <div className={styles.carouselBar}>
            <Carousel
              naturalSlideWidth={100}
              naturalSlideHeight={30}
              banners={banners}
              totalSlides={banners && banners.length}
              isPlaying={true}
            />
          </div>
          <Category categories={categories} />
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Header cartProducts={cartProducts} />
        <main className={styles.main} id="main">
          <div className={styles.carouselBar}>
            <Carousel
              naturalSlideWidth={100}
              naturalSlideHeight={30}
              banners={banners}
              totalSlides={banners && banners.length}
              isPlaying={true}
            />
          </div>
          <Category categories={categories} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
