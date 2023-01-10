import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import CommonUtils from "../../../utils/CommonUtils";

class ModalRemedy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal.customerData) {
      this.setState({
        email: this.props.dataModal.customerData.email,
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.dataModal.customerData !== this.props.dataModal.customerData
    ) {
      this.setState({
        email: this.props.dataModal.customerData.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: this.props.dataModal.email,
    });
  };
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { email } = this.state;
    let { isOpenModalRemedy, closeRemedyModal } = this.props;
    return (
      <Modal
        show={isOpenModalRemedy}
        onHide={closeRemedyModal}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="manage-booking.send" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="">Email</label>
              <input
                disabled
                value={email}
                className="form-control"
                type="text"
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="">
                <FormattedMessage id="manage-booking.invoice_file" />
              </label>
              <input
                onChange={(event) => this.handleOnChangeImg(event)}
                className="form-control-file"
                type="file"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeRemedyModal} className="btn-secondary btn">
            <FormattedMessage id="manage-booking.cancel" />
          </button>
          <button
            onClick={() => this.handleSendRemedy()}
            className="btn-primary btn"
          >
            <FormattedMessage id="manage-booking.btn_confrim" />
          </button>
        </Modal.Footer>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemedy);
