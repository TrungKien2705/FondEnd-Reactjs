import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { LANGUAGE } from "../../../utils";
import "../Login.scss";
import {
  handleForgotPassword,
  timeOutDeleteToken,
} from "../../../services/loginService";
import { toast } from "react-toastify";
class VerifyToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      passNew: "",
      confirmPasNew: "",
      errMessageEn: "",
      errMessageVi: "",
      isBorderToken: false,
      isBorderPass: false,
    };
  }
  async componentDidMount() {
    let email = localStorage.getItem("email");
    let { language } = this.props;
    let resToken = await timeOutDeleteToken({
      email: email,
    });
    if (resToken && resToken.errCode === 0) {
      language === LANGUAGE.VI
        ? toast.warn(resToken.errMessageVi)
        : toast.warn(resToken.errMessageEn);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };

    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  checkPassWord = () => {
    let { passNew, confirmPasNew } = this.state;
    if (passNew !== confirmPasNew) {
      this.setState({
        isBorderPass: true,
        errMessageVi: "Xác nhận mật khẩu không đúng",
        errMessageEn: "Password was wrong",
      });
    }
  };
  handleVerifyToken = async () => {
    let { language } = this.props;
    this.checkPassWord();
    let res = await handleForgotPassword({
      token: this.state.token,
      passNew: this.state.passNew,
    });
    if (res && res.errCode === 0) {
      this.state({
        token: "",
        passNew: "",
        confirmPasNew: "",
        errMessageEn: "",
        errMessageVi: "",
        isBorderToken: false,
        isBorderPass: false,
      });
      language === LANGUAGE.VI
        ? toast.success("Đổi mật khẩu thành công")
        : toast.success("Change password successfully");
    }
    if (res && res.errCode === 1) {
      this.setState({
        errMessageVi: res.errMessageVi,
        errMessageEn: res.errMessageEn,
      });
    }
    if (res && res.errCode === 2) {
      this.setState({
        isBorderToken: true,
        errMessageVi: res.errMessageVi,
        errMessageEn: res.errMessageEn,
      });
    }
  };

  render() {
    let { intl, language } = this.props;
    let {
      token,
      passNew,
      confirmPasNew,
      errMessageEn,
      errMessageVi,
      isBorderToken,
      isBorderPass,
    } = this.state;
    return (
      <>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.token" />
          </label>
          <input
            type="text"
            value={token}
            onChange={(event) => this.handleOnChangeInput(event, "token")}
            className={
              isBorderToken === false
                ? "form-control "
                : "form-control border-input"
            }
            placeholder={intl.formatMessage({
              id: "login.enter_token",
            })}
          />
        </div>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.new_pass" />
          </label>
          <input
            type="password"
            value={passNew}
            onChange={(event) => this.handleOnChangeInput(event, "passNew")}
            className={
              isBorderPass === false
                ? "form-control "
                : "form-control border-input"
            }
            placeholder={intl.formatMessage({
              id: "login.enter_pass",
            })}
          />
        </div>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.con_new_pass" />
          </label>
          <input
            type="password"
            value={confirmPasNew}
            onChange={(event) =>
              this.handleOnChangeInput(event, "confirmPasNew")
            }
            // onKeyDown={(event) => this.handleKeyDown(event)}
            className={
              isBorderPass === false
                ? "form-control "
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
          onClick={() => this.handleVerifyToken()}
          style={{ fontSize: "15px" }}
          type="submit"
          className="btn btn-primary"
        >
          <FormattedMessage id="login.change_pass" />
        </button>
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

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(VerifyToken)
);
