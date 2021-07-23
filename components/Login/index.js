import React, { Component } from "react";
import Footer from "../footer/index";
import styles from "../../styles/LoginForm.module.css";
import Header from "../Header";
import { ThemeContext } from "../Products/index";
import { withRouter } from "next/router";

const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
const validPasswordRegex = RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      windowWidth: "",
      inputFocus: false,
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Email address is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 6
            ? "Password must be 6 characters long!"
            : !validPasswordRegex.test(value)
            ? "Must have a number and alphabet"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleFocus = () => {
    this.setState({ inputFocus: true });
  };

  handleBlur = () => {
    this.setState({ inputFocus: false });

    return this.state.errors.length === 0 ? "" : "has-error";
  };

  handleSubmit = (event) => {
    const { router } = this.props;

    event.preventDefault();
    if (this.state.password !== "" && this.state.email !== "") {
      if (validateForm(this.state.errors)) {
        router.push("/");
      }
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <ThemeContext.Consumer>
        {(cartProducts) => (
          <div className={styles.container}>
            <Header cartProducts={cartProducts} />

            <main className={styles.mainSection} id="main">
              <div className={styles.loginSection}>
                <div className={styles.shoppingForm}>
                  <h2 variant="h1">Login</h2>
                  <p className="order-info">
                    Get access to your orders wish list and recommendations{" "}
                  </p>
                </div>

                <form
                  className={styles.loginForm}
                  action="#"
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  <div className="panel panel-default"></div>
                  <div className={styles.emailSection}>
                    <label htmlFor="email" className={styles.emailLabel}>
                      Email
                    </label>
                    <input
                      label="Email"
                      className={styles.emailInput}
                      name="email"
                      type="text"
                      id="email"
                      size={50}
                      aria-required="true"
                      error={errors.email}
                      noValidate
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleUserInput}
                    />
                    {errors.email && (
                      <p className={errors.email ? styles.error : ""}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className={styles.passwordSection}>
                    <label htmlFor="password" className={styles.passwordLabel}>
                      Password
                    </label>
                    <input
                      type="password"
                      label="Password"
                      name="password"
                      className={styles.passwordInput}
                      placeholder="Password"
                      size={50}
                      value={this.state.password}
                      aria-required="true"
                      error={errors.password}
                      noValidate
                      onChange={this.handleUserInput}
                    />
                    {errors.password && (
                      <p className={errors.password ? styles.error : ""}>
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className={styles.loginButton}
                  >
                    Login
                  </button>
                </form>
              </div>
            </main>
            <Footer />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default withRouter(Form);
