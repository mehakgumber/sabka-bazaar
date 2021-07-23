import React from "react";
import Footer from "../Footer";
import styles from "../../styles/Modal.module.css";
import Image from "next/image";

function Cart(props) {
  const hideModal = () => {
    props.handleClose();
  };

  return (
    <div
      id="myModal"
      className={props.show ? styles.modalOpen : styles.modalClose}
    >
      <div className={styles.modalContent}>
        <div style={{ background: "#383737", padding: "9px" }}>
          <h4 style={{ color: "white" }}>My Cart</h4>
          <span className={styles.close} onClick={hideModal}>
            &times;
          </span>
        </div>
        <div className={styles.cartContent}>
          {typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("cartProducts")) &&
          (JSON.parse(localStorage.getItem("cartProducts"))[0] === undefined ||
            JSON.parse(localStorage.getItem("cartProducts")).length === 0)
            ? "No items in the bag"
            : typeof window !== "undefined" &&
              JSON.parse(localStorage.getItem("cartProducts")) &&
              JSON.parse(localStorage.getItem("cartProducts")).length > 0 &&
              JSON.parse(localStorage.getItem("cartProducts")).map(
                (prod, i) => {
                  return (
                    <div key={i} className={styles.cartItem}>
                      <div className={styles.cartImage}>
                        <Image
                          src={prod.imageURL}
                          width="80"
                          height="78"
                          alt={prod.name}
                        ></Image>
                      </div>
                      <div className={styles.cartProductText}>
                        <div style={{ marginTop: "5px" }}>{prod.name} </div>
                        <div className={styles.updateCartItem}>
                          <div
                            className={styles.btn}
                            onClick={(e) => props.handleDecrement(e, prod)}
                          >
                            -
                          </div>
                          <span className={styles.noOfItems}>
                            {prod.count > 0 && prod.count}
                          </span>
                          <div
                            className={styles.btn}
                            onClick={(e) => props.handleIncrement(e, prod)}
                          >
                            +
                          </div>
                          <span className={styles.prodPriceCalculation}>
                            X {prod.count * prod.price}
                          </span>
                          <span className={styles.prodPrice}>
                            Rs. {prod.count * prod.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
        </div>

        <Footer cartModal={true} />
      </div>
    </div>
  );
}

export default Cart;
