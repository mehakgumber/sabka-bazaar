import Link from "next/link";
import Model from "../Cart";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import { useScreenWidth as useWindowResize } from "../Common/useScreenWidth";
import React, { useState } from "react";
function Header(props) {
  const [show, setModel] = useState(false);
  const { width } = useWindowResize();
  let showModal = () => {
    setModel(true);
  };

  let hideModal = () => {
    setModel(false);
  };

  function handleIncrement(e, obj) {
    props.handleIncrement(obj);
  }
  function handleDecrement(e, obj) {
    props.handleDecrement(obj);
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.desktop}>
          <div className={`${styles.flexContainer} ${styles.webApp}`}>
            <div
              className={`${styles.flexItem}  ${styles.flexCenter}
           ${styles.itemCenter} ${styles.logo}`}
            >
              {width > 426 ? (
                <Image
                  src="/assets/logo_2x.png"
                  className={styles.logoImage}
                  width="200"
                  height="100"
                  alt="sabka-bazar-logo"
                />
              ) : (
                <Image
                  src="/assets/logo_2x.png"
                  className={styles.logoImage}
                  width="100"
                  height="50"
                  alt="sabka-bazar-logo"
                />
              )}
            </div>
            <nav
              role="navigation"
              aria-label="header navigation"
              className={`${styles.navBar} ${styles.headerNav}`}
            >
              <ul role="menu">
                <li role="menuitem">
                  <Link href="/" aria-label="Home Menu Item" title="Home">
                    Home
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    href="/products"
                    aria-label="Products Menu Item"
                    title="Products"
                  >
                    Products
                  </Link>{" "}
                </li>
              </ul>
            </nav>
            <div className={styles.flexItem}>
              <nav aria-label="site navigation" className={styles.topNav}>
                <ul
                  role="menu"
                  className={`${styles.flexTop} ${styles.flexContainer} ${styles.flexCenter}`}
                >
                  <li role="menuitem">
                    <Link
                      href="/login"
                      aria-label="SignIn Menu Item"
                      title="SignIn"
                    >
                      SignIn
                    </Link>{" "}
                  </li>
                  <li role="menuitem">
                    <Link
                      href="/register"
                      aria-label="Register Menu Item"
                      title="Register"
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </nav>
              <div
                className={`${styles.flexCart} ${styles.cartIcon} ${styles.flexContainer} ${styles.flexCenter} ${styles.flexEnd}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.cartImage}
                  height="30"
                  onClick={showModal}
                  viewBox="0 0 48 48"
                  width="30"
                >
                  <path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96 0-1.11-.9-2-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z" />
                  <path d="M0 0h48v48H0z" fill="none" />
                </svg>
                <span className={styles.headerCartItems}>
                {typeof window !== "undefined"
                    ? JSON.parse(localStorage.getItem("cartProducts")).length
                    : 0}{" "}
                  {typeof window !== "undefined" ?
                  (JSON.parse(localStorage.getItem("cartProducts")).length === 1
                    ? "item"
                    : "items") : "item"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Model
        show={show}
        cartProducts={props.cartProducts}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleClose={hideModal}
      />
    </div>
  );
}

export default Header;
