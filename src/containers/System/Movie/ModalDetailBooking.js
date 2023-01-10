import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { LANGUAGE } from "../../../utils";
import { NumericFormat } from "react-number-format";
import moment from "moment/moment";
class ModalDetailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {}

  render() {
    let { language } = this.props;
    let { isOpenDetailBooking, closeDetailBooking, dataModal } = this.props;
    console.log("dataModal", dataModal);
    let gender = "",
      cinema = "",
      movie = "",
      timeType = "",
      priceVi = "",
      priceEn = "",
      fullname = "",
      email = "";

    if (
      dataModal.customerData ||
      dataModal.cinemaBookingData ||
      dataModal.movieBookingData ||
      dataModal.priceBookingData ||
      dataModal.customerData
    ) {
      fullname = dataModal.customerData.fullName;
      email = dataModal.customerData.email;
      timeType =
        language === LANGUAGE.VI
          ? dataModal.timeBookingData.valueVi
          : dataModal.timeBookingData.valueEn;
      movie =
        language === LANGUAGE.VI
          ? dataModal.movieBookingData.nameVi
          : dataModal.movieBookingData.nameEn;
      cinema =
        language === LANGUAGE.VI
          ? dataModal.cinemaBookingData.nameVi
          : dataModal.cinemaBookingData.nameEn;
      gender =
        language === LANGUAGE.VI
          ? dataModal.customerData.genderCustData.valueVi
          : dataModal.customerData.genderCustData.valueEn;
      priceVi = dataModal.priceBookingData.valueVi * dataModal.ticketNumber;
      priceEn = dataModal.priceBookingData.valueEn * dataModal.ticketNumber;
    }
    let time =
      language === LANGUAGE.VI
        ? moment(dataModal.createdAt).format("DD/MM/YYYY HH:ss")
        : moment(dataModal.createdAt).format("YYY/MM/DD HH:ss");

    return (
      <Modal
        show={isOpenDetailBooking}
        onHide={closeDetailBooking}
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="manage-booking.title_detail" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.fullname" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">{fullname}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">{email}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.gender" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">{gender}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.cinema" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">{cinema}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.movie" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">{movie}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.time" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">{timeType}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.total-price" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {language === LANGUAGE.VI ? (
                  <NumericFormat
                    value={priceVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                ) : (
                  <NumericFormat
                    value={priceEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">
                  <FormattedMessage id="manage-booking.booking_time" />
                </h6>
              </div>
              <div className="col-sm-9 text-secondary">{time}</div>
            </div>
          </div>
        </Modal.Body>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailBooking);
