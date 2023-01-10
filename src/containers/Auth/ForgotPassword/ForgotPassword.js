import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ForgotPassword.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import SendEmail from "./SendEmail";
import VerifyToken from "./VerifyToken";
import "../Login.scss";
import { withRouter } from "react-router";
import { path } from "../../../utils/constant";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnClickSendEmail = () => {
    this.setState({
      isActive: true,
    });
  };
  handleOnClickForgot = () => {
    this.setState({
      isActive: false,
    });
  };
  handleOnClickToLogin = () => {
    if (this.props.history) {
      this.props.history.push(path.LOGIN);
    }
  };

  render() {
    let { isActive } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="auth-inner">
          <div className="title-signin">
            <div
              onClick={() => this.handleOnClickSendEmail()}
              className={
                isActive === true ? "tilte-login active" : "tilte-login"
              }
            >
              <FormattedMessage id="login.send_email" />
            </div>
            <div
              onClick={() => this.handleOnClickForgot()}
              className={
                isActive === false ? "tilte-login active" : "tilte-login"
              }
            >
              <FormattedMessage id="login.change_pass" />
            </div>
          </div>
          {isActive === true ? (
            <SendEmail verifyToken={this.handleOnClickForgot} />
          ) : (
            <VerifyToken />
          )}

          <p className="forgot-password text-right">
            <a
              onClick={() => this.handleOnClickToLogin()}
              className="forgotpass"
            >
              <FormattedMessage id="login.login" />
            </a>
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
