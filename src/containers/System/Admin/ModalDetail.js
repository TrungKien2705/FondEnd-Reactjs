import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import image from "../../../assets/images/undraw_profile_3.svg";
import "./ModalDetail.scss";
import moment from "moment/moment";
import { LANGUAGE } from "../../../utils/constant";
class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { closeModal, isOpenModal, employess, language } = this.props;
    let imageBase64 = "";
    if (employess.image) {
      imageBase64 = new Buffer(employess.image, "base64").toString("binary");
    }
    let birthday_date =
      language === LANGUAGE.VI
        ? moment.utc(employess.birthday).add(1, "d").format("DD/MM/YYYY")
        : moment.utc(employess.birthday).add(1, "d").format("YYYY/MM/DD");
    let createAt_date =
      language === LANGUAGE.VI
        ? moment
            .utc(employess.createdAt)
            .add(7, "hours")
            .format("DD/MM/YYYY HH:mm:ss")
        : moment
            .utc(employess.createdAt)
            .add(7, "hours")
            .format("YYYY/MM/DD HH:mm");
    let role = "",
      gender = "",
      addData = "";
    if (
      employess &&
      employess.roleData &&
      employess.addressData &&
      employess.genderData
    ) {
      role =
        language === LANGUAGE.VI
          ? employess.roleData.valueVi
          : employess.roleData.valueEn;
      gender =
        language === LANGUAGE.VI
          ? employess.genderData.valueVi
          : employess.genderData.valueEn;
      addData =
        language === LANGUAGE.VI
          ? employess.addressData.valueVi
          : employess.addressData.valueEn;
    }

    return (
      <Modal size="lg" centered show={isOpenModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="manage-employee.detai-emp" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="main-body">
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        {imageBase64 && imageBase64.length > 0 ? (
                          <div
                            className="rounded-circle"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        ) : (
                          <img
                            src={image}
                            alt="Admin"
                            className="rounded-circle"
                            width="150"
                          />
                        )}

                        <div className="mt-3">
                          <h4>
                            {employess.firstName} {employess.lastName}
                          </h4>
                          <p className="text-secondary mb-1">{role}</p>
                          <p className="text-muted font-size-sm">{gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">
                            <FormattedMessage id="manage-employee.fullname" />
                          </h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                          {employess.firstName} {employess.lastName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                          {employess.email}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">
                            <FormattedMessage id="manage-employee.phone" />
                          </h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                          {employess.phonenumber}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">
                            <FormattedMessage id="manage-employee.birthday" />
                          </h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                          {birthday_date}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">
                            <FormattedMessage id="manage-employee.address" />
                          </h6>
                        </div>
                        <div className="col-sm-8 text-secondary">{addData}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">
                            <FormattedMessage id="manage-employee.createAt" />
                          </h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                          {createAt_date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            <FormattedMessage id="manage-employee.close" />
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail);
