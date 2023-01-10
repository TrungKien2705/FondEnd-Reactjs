import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./BookingModal.scss";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { enAU, vi } from "date-fns/locale";
import { LANGUAGE } from "../../../utils";
import { getAllCode } from "../../../services/userService";
import { postBookingMovie } from "../../../services/userService";
import { toast } from "react-toastify";
import { injectIntl } from "react-intl";
import moment from "moment";
import _ from "lodash";
import { NumericFormat } from "react-number-format";
import Loading from "../../../components/LoadingFullScreen/Loading";

registerLocale("vi", vi);
registerLocale("en", enAU);

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      address: "",
      selectTick: "",
      selectGender: "",
      listTick: [],
      listGender: [],
      birthday: "",
      phonenumber: "",
      movieId: "",
      cinemaId: "",
      timeType: "",
      priceId: "",
      isLoading: false,
      totalPrice: 0,
    };
  }
  getAllCodeGender = async () => {
    let resGender = await getAllCode("GENDER");
    let resTick = await getAllCode("TICK");
    if (
      resGender &&
      resGender.errCode === 0 &&
      resTick &&
      resTick.errCode === 0
    ) {
      let dataSelectGender = this.builDataInputSelect(resGender.data, "GENDER");
      let dataTick = this.builDataInputSelect(resTick.data, "TICK");
      this.setState({
        listGender: dataSelectGender,
        listTick: dataTick,
      });
    }
  };
  async componentDidMount() {
    await this.getAllCodeGender();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      await this.getAllCodeGender();
    }
    if (this.props.dataScheduleTime !== prevProps.dataScheduleTime) {
      let movieId = this.props.dataScheduleTime.movieId;
      let cinemaId = this.props.dataScheduleTime.movieData.cinemaId;
      let timeType = this.props.dataScheduleTime.timeType;
      let priceId = this.props.dataScheduleTime.movieData.priceId;
      this.setState({
        movieId: movieId,
        cinemaId: cinemaId,
        timeType: timeType,
        priceId: priceId,
      });
    }
  }
  handleChangeSelectModal = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  builDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "GENDER" || type === "TICK") {
        inputData.map((item) => {
          let object = {};
          let lableVi = `${item.valueVi}`;
          let lableEn = `${item.valueEn}`;

          object.label = language === LANGUAGE.VI ? lableVi : lableEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }
    }
    return result;
  };
  handleDatePicker = (date) => {
    this.setState({
      birthday: date,
    });
  };

  buildTimeBooking = (dataScheduleTime) => {
    let { language } = this.props;
    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      let date =
        language === LANGUAGE.VI
          ? moment
              .unix(+dataScheduleTime.date / 1000)
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataScheduleTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      let time =
        language === LANGUAGE.VI
          ? dataScheduleTime.timeData.valueVi
          : dataScheduleTime.timeData.valueEn;
      return `${time} - ${date}`;
    }
    return "";
  };
  buildDataBooking = (dataScheduleTime) => {
    let { language } = this.props;
    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      let name =
        language === LANGUAGE.VI
          ? `${dataScheduleTime.movieData.nameVi}`
          : `${dataScheduleTime.movieData.nameEn}`;

      return `${name}`;
    }
    return "";
  };
  HandleOnClickBooking = async () => {
    let { language, moviePrice } = this.props;
    let { selectTick } = this.state;
    let timeString = this.buildTimeBooking(this.props.dataScheduleTime);
    let movieName = this.buildDataBooking(this.props.dataScheduleTime);
    let date = new Date(this.state.birthday);
    let totalPrice =
      language === LANGUAGE.VI
        ? moviePrice.valueVi * selectTick.value
        : moviePrice.valueEn * selectTick.value;
    let cinemaName =
      language === LANGUAGE.VI
        ? this.props.dataScheduleTime.movieData.cinemaData.nameVi
        : this.props.dataScheduleTime.movieData.cinemaData.nameEn;
    this.setState({
      isLoading: true,
    });
    let res = await postBookingMovie({
      fullName: this.state.fullName,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      address: this.state.address,
      date: this.props.dataScheduleTime.date,
      birthday: date,
      selectGender: this.state.selectGender.value,
      movieId: this.state.movieId,
      cinemaId: this.state.cinemaId,
      timeString: timeString,
      language: language,
      timeType: this.state.timeType,
      movieName: movieName,
      cinemaName: cinemaName,
      priceType: this.state.priceId,
      totalPrice: totalPrice,
      selectTick: parseInt(this.state.selectTick.value),
    });
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
      });
      this.setState({
        email: "",
        fullName: "",
        address: "",
        selectTick: "",
        selectGender: "",
        birthday: "",
        phonenumber: "",
        movieId: "",
        cinemaId: "",
        timeType: "",
        priceId: "",
      });
      this.props.closeBookingModal();
      language === LANGUAGE.VI
        ? toast.success("Đặt vé phim thàng công")
        : toast.success("Booking movie success");
    } else {
      this.setState({
        isLoading: false,
      });
      language === LANGUAGE.VI
        ? toast.error("Đặt vé phim thất bại")
        : toast.error("Booking movie failed");
    }
  };

  render() {
    let { language, intl } = this.props;
    let { show, closeBookingModal, moviePrice } = this.props;
    let {
      fullName,
      email,
      address,
      listTick,
      selectTick,
      selectGender,
      listGender,
      birthday,
      phonenumber,
      isLoading,
    } = this.state;
    let lan = language === LANGUAGE.VI ? "vi" : "en";
    let date = language === LANGUAGE.VI ? "dd/MM/yyyy" : "yyyy/MM/dd";
    let price =
      language === LANGUAGE.VI
        ? moviePrice.valueVi * selectTick.value
        : moviePrice.valueEn * selectTick.value;
    return (
      <>
        <Modal
          show={show}
          onHide={closeBookingModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage id="booking-modal.title" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.fullname" />
                  </label>
                  <input
                    value={fullName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "fullName")
                    }
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Email:</label>
                  <input
                    value={email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.address" />
                  </label>
                  <input
                    value={address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.gender" />
                  </label>
                  <Select
                    value={selectGender}
                    onChange={this.handleChangeSelectModal}
                    options={listGender}
                    name={"selectGender"}
                    placeholder={<FormattedMessage id="booking-modal.gender" />}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.birthday" />
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={birthday}
                    onChange={this.handleDatePicker}
                    dateFormat={date}
                    locale={lan}
                    placeholderText={intl.formatMessage({
                      id: "booking-modal.birthday",
                    })}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.phone" />
                  </label>
                  <input
                    value={phonenumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phonenumber")
                    }
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.ticket-number" />
                  </label>
                  <Select
                    value={selectTick}
                    onChange={this.handleChangeSelectModal}
                    options={listTick}
                    name={"selectTick"}
                    placeholder={
                      <FormattedMessage id="booking-modal.ticket-number" />
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="booking-modal.total-price" />
                  </label>
                  {language === LANGUAGE.VI ? (
                    <NumericFormat
                      disabled
                      value={price ? price : 0}
                      className="form-control"
                      displayType={"input"}
                      thousandSeparator={true}
                      suffix={"VNĐ"}
                    />
                  ) : (
                    <NumericFormat
                      disabled
                      value={price ? price : 0}
                      className="form-control"
                      displayType={"input"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => this.HandleOnClickBooking()}
                    className="btn btn-success"
                  >
                    <FormattedMessage id="booking-modal.booking" />
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
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
  connect(mapStateToProps, mapDispatchToProps)(BookingModal)
);
