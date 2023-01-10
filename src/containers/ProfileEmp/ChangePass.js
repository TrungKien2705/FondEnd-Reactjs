import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { handleChangePassword } from "../../services/loginService";
import { toast } from "react-toastify";
import { LANGUAGE } from "../../utils";
import { injectIntl } from "react-intl";
class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passNew: "",
      passOld: "",
      ispassNew: false,
      ispassOld: false,
      errMessageVi: "",
      errMessageEn: "",
      isborderPass: false,
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handlePasswordShow = (key) => {
    if (key === "old") {
      this.setState({
        ispassOld: !this.state.ispassOld,
      });
    }
    if (key === "new") {
      this.setState({
        ispassNew: !this.state.ispassNew,
      });
    }
  };
  handleChangePassword = async () => {
    this.setState({
      errMessageVi: "",
      errMessageEn: "",
      isborderPass: false,
    });
    let { userInfo, language } = this.props;
    let res = await handleChangePassword({
      id: userInfo.id,
      email: userInfo.email,
      passOld: this.state.passOld,
      passNew: this.state.passNew,
    });
    if (res && res.errCode === 0) {
      this.setState({
        passNew: "",
        passOld: "",
        ispassNew: false,
        ispassOld: false,
      });
      language === LANGUAGE.VI
        ? toast.success("Đổi mật khẩu thành công")
        : toast.success("Change password successfully");
      this.props.handleClose();
    }
    if (res && res.errCode === 3) {
      this.setState({
        isborderPass: true,
        errMessageVi: res.errMessageVi,
        errMessageEn: res.errMessageEn,
      });
    }
  };

  render() {
    let {
      passNew,
      passOld,
      ispassOld,
      ispassNew,
      errMessageVi,
      errMessageEn,
      isborderPass,
    } = this.state;
    let { show, handleClose, language, intl } = this.props;
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          // backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage id="profile.change_pass" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="form-group ">
                <label>
                  <FormattedMessage id="profile.old_pass" />
                </label>
                <div className="custom-password">
                  <input
                    value={passOld}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "passOld")
                    }
                    type={ispassOld ? "text" : "password"}
                    className={
                      isborderPass === false
                        ? "form-control"
                        : "form-control border-input"
                    }
                    placeholder={intl.formatMessage({
                      id: "profile.enter_old_pass",
                    })}
                  />
                  <span onClick={() => this.handlePasswordShow("old")}>
                    <i
                      className={ispassOld ? "far fa-eye" : "far fa-eye-slash"}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label>
                  <FormattedMessage id="profile.new_pass" />
                </label>
                <div className="custom-password">
                  <input
                    value={passNew}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "passNew")
                    }
                    type={ispassNew ? "text" : "password"}
                    className="form-control"
                    placeholder={intl.formatMessage({
                      id: "profile.enter_new_pass",
                    })}
                  />
                  <span onClick={() => this.handlePasswordShow("new")}>
                    <i
                      className={ispassNew ? "far fa-eye" : "far fa-eye-slash"}
                    ></i>
                  </span>
                </div>
              </div>
              <div
                className="col-12"
                style={{ color: "red", marginBottom: "5px", marginTop: "5px" }}
              >
                {language === LANGUAGE.EN ? errMessageEn : errMessageVi}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <FormattedMessage id="manage-employee.close" />
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleChangePassword()}
            >
              <FormattedMessage id="profile.change" />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ChangePass)
);
