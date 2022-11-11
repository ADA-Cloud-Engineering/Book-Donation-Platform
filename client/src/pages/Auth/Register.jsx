import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import { TransparentInput } from "../../components/Inputs/Input";
import styles from "./styles.module.css";
import { registerUser } from "../../Services/Auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.firstnameRef = React.createRef();
    this.lastnameRef = React.createRef();
    this.emailRef = React.createRef();
    this.cityRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.state = { error: "", loading: false };
  }
  async handleRegister(obj) {
    try {
      this.setState({ loading: true });
      let res = await registerUser(obj);
      if (res.status == 201) {
        this.setState({ loading: false });
        this.props.navigate("/success", {
          state: {
            message: "Regsitration Successful. Redirecting to Login",
            next: "/login",
          },
        });
      }
    } catch (error) {
      this.setState({ error: error.response.data.error });
      this.setState({ loading: false });
      this.props.navigation.navigate("/");
    }
  }
  handleCheckForm() {
    this.setState({ error: "" });
    let obj = {
      firstname: this.firstnameRef?.current?.value,
      lastname: this.lastnameRef?.current?.value,
      email: this.emailRef?.current?.value,
      city: this.cityRef?.current?.value,
      password: this.passwordRef?.current?.value,
      consfirmPassword: this.confirmPasswordRef?.current?.value,
    };
    if (
      !this.emailRef?.current?.value ||
      !this.passwordRef?.current?.value ||
      !this.confirmPasswordRef?.current?.value ||
      !this.firstnameRef?.current?.value ||
      !this.lastnameRef?.current?.value ||
      !this.cityRef?.current?.value
    ) {
      return;
    } else if (
      !this.passwordRef.current?.value !==
      !this.confirmPasswordRef.current?.value
    ) {
      this.setState({ error: "Passwords do not match" });
      return;
    } else this.handleRegister(obj);
  }
  render() {
    return (
      <div>
        <Navbar noSearch noAuth />
        <Banner />

        <form className={styles.auth_container}>
          <TransparentInput
            width="45%"
            textAlign="left"
            placeholder="First name"
            type="text"
            ref={this.firstnameRef}
            name="firstname"
          />
          <TransparentInput
            width="45%"
            textAlign="left"
            placeholder="Last name"
            type="text"
            ref={this.lastnameRef}
            name="lastname"
          />
          <TransparentInput
            width="45%"
            textAlign="left"
            placeholder="Email"
            type="email"
            ref={this.emailRef}
            name="email"
          />
          <TransparentInput
            ref={this.cityRef}
            width="45%"
            textAlign="left"
            placeholder="City"
            type="text"
            name="city"
          />
          <TransparentInput
            width="45%"
            textAlign="left"
            placeholder="Password"
            type="password"
            ref={this.passwordRef}
            name="password"
          />
          <TransparentInput
            width="45%"
            textAlign="left"
            placeholder="Confirm password"
            type="password"
            name="password"
            ref={this.confirmPasswordRef}
          />
          <div className={styles.auth_action_container}>
            <Button
              text="Sign up"
              onClick={() => this.handleCheckForm()}
              loading={this.state.loading}
            />
            <p className={styles.auth_other}>
              Already have an account? <Link to="/login"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export const RegisterWithRouter = () => {
  const navigate = useNavigate();
  return <Register navigate={navigate} />;
};

export default RegisterWithRouter;
