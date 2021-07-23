import React, { useState, createContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Select from "react-select";
import ProductItem from "./Product/Product";
import { useScreenWidth as useWindowResize } from "../Common/useScreenWidth";
import Link from "next/link";
import styles from "../../styles/Products.module.css";
let cartProductss = [];

const colourOptions = [
  { value: "m", label: "m" },
  { value: "n", label: "n" },
];
const customStyles = {
  menu: (provided, state) => ({
    ...provided,

    border: "1px solid #BF2857",
    color: "white",
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "1px solid #BF2857" : "1px solid #BF2857",
    backgroundColor: "#BF2857",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    border: "1px solid black",
    backgroundColor: "#BF2857",
    color: "white",
  }),
  singleValue: (provided, state) => ({
    ...provided,

    color: "white",
  }),
};

export const ThemeContext = createContext();

function Plp(props) {
  const { products, categories } = props;
  const [displayProp, setDisplayProp] = useState("");
  const { width } = useWindowResize();
  const [cartProducts, setCartProducts] = useState([]);

  function showMenu() {
    if (width < 768) {
      if (displayProp === "block") {
        setDisplayProp("none");
      } else {
        setDisplayProp("block");
      }
    }
  }

  const handleDecrement = (product) => {
    if (cartProducts) {
      let cart = [];

      let newA = cartProducts.map((item) => {
        if (item.id == product.id) {
          item.count = item.count - 1;
        }

        return item;
      });
      newA.map((item) => {
        if (item.count > 0) {
          cart.push(item);
        }
      });

      localStorage.setItem("cartProducts", JSON.stringify(cart));
      setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
    }
  };

  const handleIncrement = (product) => {
    if (cartProducts) {
      if (cartProducts.length > 0 && cartProducts[0] !== unde) {
        let newA = [];

        let duplicateItem = cartProducts.filter(
          (item) => item.id === product.id
        );
        if (duplicateItem.length > 0) {
          let ind = duplicateItem.map((item) => item.id);
          newA = cartProducts.map((item) => {
            if (ind == item.id) {
              item.count = item.count + 1;
            }

            return item;
          });

          localStorage.setItem("cartProducts", JSON.stringify(newA));
          setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
        }
      }
    }
  };

  const buyNow = (boughtBy, product) => {
    if (props.loggedInUser === boughtBy) {
      if (cartProducts) {
        let newA = [];

        let duplicateItem = cartProducts.filter(
          (item) => item.id === product.id
        );
        if (duplicateItem.length > 0) {
          let ind = duplicateItem.map((item) => item.id);
          newA = cartProducts.map((item) => {
            if (ind == item.id) {
              item.count = item.count + 1;
            }
            return item;
          });

          if (typeof window !== "undefined") {
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
          }
        } else {
          let cartItem = {
            id: product.id,
            name: product.name,
            description: product.description,
            count: 1,
            imageURL: product.imageURL,
            price: product.price,
          };

          cartProductss = JSON.parse(localStorage.getItem("cartProducts"));
          if (cartProductss == null) cartProductss = [];

          cartProductss.push(cartItem);

          localStorage.setItem("cartProducts", JSON.stringify(cartProductss));
          setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
        }
      }
    }
  };

  let rows =
    products && products.length ? (
      products &&
      products.map((obj, i) => {
        return <ProductItem key={obj.id} obj={obj} buyNow={buyNow} />;
      })
    ) : (
      <p className="no-items">Try again after some time.</p>
    );
  let list =
    categories &&
    categories.length &&
    categories &&
    categories.map((obj, i) => {
      return (
        <li role="menuitem" key={obj.id}>
          <Link
            href={"/products/" + obj.id}
            title={obj.name}
            aria-label={obj.name}
          >
            <a>{obj.name}</a>
          </Link>
        </li>
      );
    });

  return (
    <ThemeContext.Provider value={cartProducts}>
      <div className="container">
        <Header
          cartProducts={cartProducts}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <main className={styles.productsSection}>
          {width < 768 && (
            <div className={styles.mobileDropdown}>
              <Select
                styles={customStyles}
                classNamePrefix="select"
                options={colourOptions}
              />
            </div>
          )}

          <div
            className={`${styles.productsContainer} ${
              width < 768 ? "" : "productsContainer"
            }`}
          >
            <aside className={styles.sidebar}>
              <nav className="topnavside">
                <ul
                  className={width > 768 ? "myLinks" : "noLinks"}
                  role="menu"
                  onClick={showMenu}
                >
                  {list}
                </ul>
              </nav>
            </aside>

            <div className={styles.productItems}>{rows}</div>
          </div>
        </main>

        <Footer text="Copyright &copy; 2011-2018 sabka bazaar Grocery Supplies Pvt. Ltd" />
      </div>
    </ThemeContext.Provider>
  );
}

export default Plp;
