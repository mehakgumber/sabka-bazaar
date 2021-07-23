import React from "react";
import styles from "../../styles/Footer.module.css";

function Footer(props) {
  return (
    <div className={props.cartModal ? styles.cartFooter : styles.footer}>
      <p>
        {props.cartModal
          ? "Start Shopping"
          : "Copyright © 2011-2018 sabka bazaar Grocery Supplies Pvt. Ltd"}
      </p>
    </div>
  );
}

export default Footer;
