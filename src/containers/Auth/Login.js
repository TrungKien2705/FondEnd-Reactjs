import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";
import { LANGUAGE } from "../../utils/constant";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router";
import { path } from "../../utils/constant";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessageVi: "",
      isborderEmail: false,
      isborderPassword: false,
      errMessageEn: "",
    };
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };

    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };

  handleLogin = async () => {
    this.setState({
      errMessageVi: "",
      errMessageEn: "",
      isborderEmail: false,
      isborderPassword: false,
    });
    let { email, password } = this.state;
    try {
      let data = await handleLogin(email, password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessageVi: data.errMessageVi,
          errMessageEn: data.errMessageEn,
          isborderEmail: true,
          isborderPassword: true,
        });
        if (data.errCode === 4) {
          this.setState({
            isborderEmail: true,
            isborderPassword: false,
          });
        }
        if (data.errCode === 3) {
          this.setState({
            isborderPassword: true,
            isborderEmail: false,
          });
        }
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.emp);
        console.log("login seucc");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleForgotPass = () => {
    if (this.props.history) {
      this.props.history.push(path.FORGORPASS);
    }
  };
  render() {
    let { language, intl } = this.props;
    let {
      email,
      password,
      errMessageVi,
      errMessageEn,
      isborderEmail,
      isborderPassword,
    } = this.state;
    return (
      <>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.email" />
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => this.handleOnChangeInput(event, "email")}
            className={
              isborderEmail === false
                ? "form-control "
                : "form-control border-input"
            }
            placeholder={intl.formatMessage({
              id: "login.enter_email",
            })}
          />
        </div>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.password" />
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => this.handleOnChangeInput(event, "password")}
            onKeyDown={(event) => this.handleKeyDown(event)}
            className={
              isborderPassword === false
                ? "form-control"
                : "form-control border-input"
            }
            placeholder={intl.formatMessage({
              id: "login.enter_pass",
            })}
          />
        </div>
        <div className="col-12" style={{ color: "red", marginBottom: "10px" }}>
          {language === LANGUAGE.EN ? errMessageEn : errMessageVi}
        </div>
        <button
          onClick={() => this.handleLogin()}
          style={{ fontSize: "15px" }}
          type="submit"
          className="btn btn-primary"
        >
          <FormattedMessage id="login.login" />
        </button>
        <p className="forgot-password text-right">
          <FormattedMessage id="login.forgot" />{" "}
          <a className="forgotpass" onClick={() => this.handleForgotPass()}>
            <FormattedMessage id="login.password" />?
          </a>
        </p>
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
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
);
