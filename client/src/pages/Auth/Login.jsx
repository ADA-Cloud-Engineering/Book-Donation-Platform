import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import { TransparentInput } from "../../components/Inputs/Input";
import styles from "./styles.module.css";
import { loginUser } from "../../Services/Auth";
import UserContext from "../../Contexts/UserContext";

class Login extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = { error: "", loading: false };
  }
  async handleLogin(obj) {
    try {
      this.setState({ loading: true });
      let res = await loginUser(obj);
      if (res.data) {
        this.setState({ loading: false });
        localStorage.setItem("user_token", res.data.data.token);
        this.context.dispatch({
          type: "SET_USER_TOKEN",
          payload: res.data.data.token,
        });
        this.context.dispatch({ type: "SET_IS_LOGGED", payload: true });
        this.props.navigate("/");
      }
    } catch (error) {
      this.setState({ error: error.response.data.error });
      this.setState({ loading: false });
    }
  }
  handleCheckForm() {
    this.setState({ error: "" });
    let obj = {
      email: this.emailRef.current?.value,
      password: this.passwordRef.current?.value,
    };
    if (!this.emailRef.current?.value || !this.passwordRef.current?.value) {
      return;
    } else this.handleLogin(obj);
  }
  render() {
    return (
      <div>
        <Navbar noSearch />
        <Banner />

        <form className={styles.auth_container}>
          <div className={styles.login_field_block}>
            <TransparentInput
              width="100%"
              textAlign="left"
              placeholder="Email"
              type="email"
              ref={this.emailRef}
              required
              name="email"
            />
          </div>
          <div className={styles.login_field_block}>
            <TransparentInput
              width="100%"
              textAlign="left"
              placeholder="Password"
              type="password"
              ref={this.passwordRef}
              required
              name="password"
            />
          </div>

          <div className={styles.auth_action_container}>
            <p className={styles.errorText}>{this.state.error}</p>
            <Button
              text="Log in"
              onClick={() => this.handleCheckForm()}
              loading={this.state.loading}
            />
            <p>
              Don't have an account? <Link to="/register"> Register</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export const LoginWithRouter = () => {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
};

export default LoginWithRouter;
