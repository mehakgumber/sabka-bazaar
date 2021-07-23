import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "../../styles/Register.module.css";
import { withRouter } from "next/router";

const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
const validPasswordRegex = RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      windowWidth: "",
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName =
          value && value.length < 5
            ? "First Name must be 5 characters long!"
            : "";
        break;
      case "lastName":
        errors.lastName =
          value && value.length < 5
            ? "Last Name must be 5 characters long!"
            : "";
        break;
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
      case "confirmPassword":
        errors.confirmPassword =
          value.length === 0
            ? ""
            : !validPasswordRegex.test(value)
            ? "Must have a number and alphabet"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.state.errors;
    const { router } = this.props;

    let password = e.target.elements.password.value;
    let confirmPassword = e.target.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      errors.confirmPassword = "password and confirm password does not match";

      this.setState({ errors, [confirmPassword]: confirmPassword });
    }

    console.log(
      "Submit button called::::",
      this.state.errors,
      validateForm(this.state.errors)
    );
    if (
      this.state.password !== "" &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.email !== ""
    ) {
      if (validateForm(this.state.errors)) {
        console.info("Valid Form");
        router.push("/login");
      } else {
        console.error("Invalid Form");
      }
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <Header cartProducts={[]} />
        <main className={styles.mainSection} id="main">
          <div className={styles.registrationForm}>
            <div className={styles.signUpSection}>
              <h2 variant="h1"> Signup</h2>
              <p className="order-info">
                We do not share your personal details with anyone.
              </p>
            </div>
            <div className={styles.registerSection}>
              <form action="#" onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <input
                  label="First Name"
                  className={styles.textField}
                  name="firstName"
                  type="text"
                  id="firstName"
                  size={50}
                  aria-required="true"
                  noValidate
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />

                {errors.firstName && (
                  <p className={errors.firstName ? styles.error : ""}>
                    {errors.firstName}
                  </p>
                )}
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <input
                  label="Last Name"
                  className={styles.textField}
                  name="lastName"
                  type="text"
                  id="lastName"
                  size={50}
                  aria-required="true"
                  noValidate
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />

                {errors.lastName && (
                  <p className={errors.lastName ? styles.error : ""}>
                    {errors.lastName}
                  </p>
                )}

                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  label="Email"
                  className={styles.textField}
                  name="email"
                  type="text"
                  id="email"
                  size={50}
                  aria-required="true"
                  noValidate
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />

                {errors.email && (
                  <p className={errors.email ? styles.error : ""}>
                    {errors.email}
                  </p>
                )}
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  label="Pssword"
                  className={styles.textField}
                  name="password"
                  type="password"
                  id="password"
                  size={50}
                  aria-required="true"
                  noValidate
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password && (
                  <p className={errors.password ? styles.error : ""}>
                    {errors.password}
                  </p>
                )}
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  label="Email"
                  className={styles.textField}
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  size={50}
                  aria-required="true"
                  noValidate
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />

                {errors.confirmPassword && (
                  <p className={errors.confirmPassword ? styles.error : ""}>
                    {errors.confirmPassword}
                  </p>
                )}

                <button
                  type="submit"
                  value="Submit"
                  className={styles.registerButton}
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Register);
