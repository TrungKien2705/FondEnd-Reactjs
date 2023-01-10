import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { handleRegister } from "../../services/userService";
import { toast } from "react-toastify";
import { injectIntl } from "react-intl";
import { LANGUAGE } from "../../utils";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  async componentDidMount() {}
  async componentWillUnmount() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
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
      this.handleRegister();
    }
  };
  handleRegister = async (data) => {
    let { language } = this.props;
    let res = await handleRegister(data);
    if (res && res.errCode !== 0) {
      toast.warn(res.errMessageVi);
    }
    if (res && res.errCode === 0) {
      language === LANGUAGE
        ? toast.success("Register success")
        : toast.success("Đăng ký thành công");

      this.props.openLogin();
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else if (!res) {
      language === LANGUAGE
        ? toast.error("Register error")
        : toast.error("Đăng ký không thành công");
    }
  };

  render() {
    let { intl } = this.props;
    let { email, password, firstName, lastName } = this.state;
    return (
      <>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.firstname" />
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={intl.formatMessage({
              id: "login.enter_firstname",
            })}
            value={firstName}
            onChange={(event) => this.handleOnChangeInput(event, "firstName")}
          />
        </div>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.lastname" />
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={intl.formatMessage({
              id: "login.enter_lastname",
            })}
            value={lastName}
            onChange={(event) => this.handleOnChangeInput(event, "lastName")}
          />
        </div>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.email" />
          </label>
          <input
            type="email"
            className="form-control"
            placeholder={intl.formatMessage({
              id: "login.enter_email",
            })}
            value={email}
            onChange={(event) => this.handleOnChangeInput(event, "email")}
          />
        </div>
        <div className="mb-3">
          <label>
            <FormattedMessage id="login.password" />
          </label>
          <input
            type="password"
            className="form-control"
            placeholder={intl.formatMessage({
              id: "login.enter_pass",
            })}
            value={password}
            onChange={(event) => this.handleOnChangeInput(event, "password")}
            onKeyDown={(event) => this.handleKeyDown(event)}
          />
        </div>

        <button
          style={{ fontSize: "15px" }}
          type="submit"
          className="btn btn-primary"
          onClick={() => this.handleRegister(this.state)}
        >
          <FormattedMessage id="login.regiter" />
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
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
