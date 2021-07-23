import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScreenWidth } from "../../Common/useScreenWidth";
import styles from "../../../styles/Category.module.css";

function Category(props) {
  const { categories } = props;
  const { width } = useScreenWidth();

  return (
    <>
      {categories &&
        categories.map((item, i) => {
          return i % 2 === 0 ? (
            <div
              key={item.id}
              className={`${styles.evenProductCard} ${styles.productCard} ${styles.productContainer}`}
            >
              <div className={styles.productsImage}>
                {width > 767 ? (
                  <Image
                    className={styles.productImage}
                    src={item.imageUrl}
                    width="300"
                    height="200"
                    alt={item.key}
                  />
                ) : (
                  <Image
                    className={styles.productImage}
                    src={item.imageUrl}
                    width="400"
                    height="300"
                    alt={item.key}
                  />
                )}
              </div>
              <div className={styles.leftImage}>
                {width > 767 ? <h2>{item.name}</h2> : <h4>{item.name}</h4>}
                <p>{item.description.split("\n")}</p>
                <Link href={"products/" + item.id} className="btn-title">
                  <a> Explore {item.key} </a>
                </Link>
              </div>
            </div>
          ) : (
            <div
              key={item.id}
              className={`${styles.oddProductCard} ${styles.productCard} ${styles.productContainer} ${styles.oddProductsContainer}`}
            >
              <div className={styles.leftText}>
                {width > 767 ? <h2>{item.name}</h2> : <h4>{item.name}</h4>}
                <p>{item.description}</p>
                <Link
                  href={"products/" + item.id}
                  className="btn-title"
                  title={item.name}
                >
                  <a>Explore {item.key}</a>
                </Link>
              </div>
              <div className={`${styles.rightImage} `}>
                {width > 767 ? (
                  <Image
                    src={item.imageUrl}
                    width="500"
                    height="300"
                    alt={item.key}
                  />
                ) : (
                  <Image
                    src={item.imageUrl}
                    width="400"
                    height="300"
                    alt={item.key}
                  />
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Category;
