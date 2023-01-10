import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import "../Login.scss";
import { postSendEmailToken } from "../../../services/loginService";
import { LANGUAGE } from "../../../utils";
import { toast } from "react-toastify";
import Loading from "../../../components/LoadingFullScreen/Loading";

class SendEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isborderEmail: false,
      errMessageVi: "",
      errMessageEn: "",
      isLoading: false,
    };
  }
  async componentDidMount() {}

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
  handleSendEmail = async () => {
    this.setState({
      isLoading: true,
    });
    let { language } = this.props;
    this.setState({
      isborderEmail: false,
      errMessageVi: "",
      errMessageEn: "",
    });
    let res = await postSendEmailToken({
      email: this.state.email,
      language: language,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
      });
      language === LANGUAGE.VI
        ? toast.success("Gửi mã xác nhân thành công. Vui lòng kiểm tra Email")
        : toast.success(
            "Verification code sent successfully. Please check your email"
          );
      this.props.verifyToken();
      localStorage.setItem("email", this.state.email);
    }
    if (res && res.errCode === 1) {
      this.setState({
        isLoading: false,
      });
      this.setState({
        isborderEmail: true,
        errMessageVi: res.errMessageVi,
        errMessageEn: res.errMessageEn,
      });
    }
    if (res && res.errCode === 2) {
      this.setState({
        isLoading: false,
      });
      this.setState({
        isborderEmail: true,
        errMessageVi: res.errMessageVi,
        errMessageEn: res.errMessageEn,
      });
    }
    if (res && res.errCode === 3) {
      this.setState({
        isLoading: false,
      });
      this.setState({
        isborderEmail: true,
        errMessageVi: res.errMessageVi,
        errMessageEn: res.errMessageEn,
      });
    }
  };
  render() {
    let { email, isborderEmail, errMessageEn, errMessageVi, isLoading } =
      this.state;
    let { language, intl } = this.props;
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
        <div className="col-12" style={{ color: "red", marginBottom: "10px" }}>
          {language === LANGUAGE.EN ? errMessageEn : errMessageVi}
        </div>
        <button
          onClick={() => this.handleSendEmail()}
          style={{ fontSize: "15px" }}
          type="submit"
          className="btn btn-primary"
        >
          <FormattedMessage id="login.send" />
        </button>
        <Loading isLoading={isLoading} />
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
  connect(mapStateToProps, mapDispatchToProps)(SendEmail)
);
