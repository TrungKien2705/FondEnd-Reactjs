import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import Register from "./Register";
import Login from "./Login";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: true,
    };
  }
  handleOnClickLogin = () => {
    this.setState({
      islogin: true,
    });
  };
  handleOnClickRegister = () => {
    this.setState({
      islogin: false,
    });
  };

  render() {
    let { islogin } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="auth-inner">
          <div className="title-signin">
            <div
              onClick={() => this.handleOnClickLogin()}
              className={
                islogin === true ? "tilte-login active" : "tilte-login"
              }
            >
              <FormattedMessage id="login.login" />
            </div>
            <div
              onClick={() => this.handleOnClickRegister()}
              className={
                islogin === false ? "tilte-login active" : "tilte-login"
              }
            >
              <FormattedMessage id="login.regiter" />
            </div>
          </div>
          {islogin === true ? (
            <Login />
          ) : (
            <Register openLogin={this.handleOnClickLogin} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
