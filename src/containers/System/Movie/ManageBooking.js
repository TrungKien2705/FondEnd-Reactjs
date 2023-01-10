import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./MangeBooking.scss";
import { LANGUAGE } from "../../../utils";
import { getListBookingMovie } from "../../../services/userService";
import { postSendRemedy } from "../../../services/movieService";
import DatePicker from "react-datepicker";
import moment from "moment";
import { registerLocale } from "react-datepicker";
import { enAU, vi } from "date-fns/locale";
import { NumericFormat } from "react-number-format";
import ModalRemedy from "./ModalRemedy";
import ModalDetailBooking from "./ModalDetailBooking";
import Loading from "../../../components/LoadingFullScreen/Loading";
import { toast } from "react-toastify";
registerLocale("vi", vi);
registerLocale("en", enAU);
class MangeBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: moment(new Date()).startOf("day").valueOf(),
      dataBooking: [],
      dataModal: {},
      dataModalDetail: {},
      isOpenModalRemedy: false,
      isOpenDetailBooking: false,
      isLoading: false,
    };
  }
  getDataBookingMovie = async () => {
    let { currDate } = this.state;
    let formatDate = new Date(currDate).getTime();
    let res = await getListBookingMovie(formatDate);
    if (res && res.errCode === 0) {
      this.setState({
        dataBooking: res.data,
        // statusBtn: res.data.statusId,
      });
    }
  };
  async componentDidMount() {
    await this.getDataBookingMovie();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleDatePicker = (date) => {
    this.setState(
      {
        currDate: date,
      },
      async () => {
        await this.getDataBookingMovie();
      }
    );
  };

  handleConfirm = (item) => {
    this.setState({
      isOpenModalRemedy: true,
      dataModal: item,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenModalRemedy: false,
    });
  };
  sendRemedy = async (dataFromModal) => {
    let { dataModal } = this.state;
    let { language } = this.props;
    this.setState({
      isLoading: true,
    });

    let res = await postSendRemedy({
      email: dataFromModal.email,
      imgBase64: dataFromModal.imgBase64,
      movieId: dataModal.movieId,
      customerId: dataModal.customerId,
      timeType: dataModal.timeType,
      language: this.props.language,
      customerName: dataModal.customerName,
    });
    if (res && res.errCode === 0) {
      language === LANGUAGE.VI
        ? toast.success("Gửi hóa đơn thành công")
        : toast.success("Invoice sent successfully");

      this.closeRemedyModal();
      await this.getDataBookingMovie();

      this.setState({
        isLoading: false,
      });
    } else {
      language === LANGUAGE.VI
        ? toast.error("Gửi hóa đơn thất bại")
        : toast.error("Invoice submission failed");
      this.setState({
        isLoading: false,
      });
    }
  };
  handleDetailBooking = (item) => {
    this.setState({
      isOpenDetailBooking: true,
      dataModalDetail: item,
    });
  };
  closeDetailBooking = () => {
    this.setState({
      isOpenDetailBooking: false,
    });
  };
  handleDelete = () => {};

  render() {
    let {
      currDate,
      dataBooking,
      isOpenModalRemedy,
      dataModal,
      dataModalDetail,
      isLoading,
      isOpenDetailBooking,
    } = this.state;
    let { language } = this.props;
    let date = language === LANGUAGE.VI ? "dd/MM/yyyy" : "yyyy/MM/dd";
    let lan = language === LANGUAGE.VI ? "vi" : "en";
    return (
      <>
        <Loading isLoading={isLoading} />
        <div className="manage-booking-container">
          <div className="m-p-title">
            <FormattedMessage id="manage-booking.manage-booking" />
          </div>
          <div className="container">
            <div className="manage-booking-body row">
              <div className="col-6 form-group mt-4">
                <label htmlFor="">
                  <FormattedMessage id="manage-booking.booking-date" />
                </label>
                <DatePicker
                  className="form-control"
                  selected={currDate}
                  onChange={this.handleDatePicker}
                  dateFormat={date}
                  locale={lan}
                />
              </div>
              <div className="col-12 mt-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>
                        <FormattedMessage id="manage-booking.movie" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-booking.total-price" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-booking.status" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-booking.action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBooking && dataBooking.length > 0 ? (
                      dataBooking.map((item, index) => {
                        // let time =
                        //   language === LANGUAGE.VI
                        //     ? item.timeBookingData.valueVi
                        //     : item.timeBookingData.valueEn;
                        let movie =
                          language === LANGUAGE.VI
                            ? item.movieBookingData.nameVi
                            : item.movieBookingData.nameEn;

                        let priceVi =
                          item.priceBookingData.valueVi * item.ticketNumber;
                        let priceEn =
                          item.priceBookingData.valueEn * item.ticketNumber;
                        let price =
                          language === LANGUAGE.VI ? (
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
                          );
                        let status =
                          language === LANGUAGE.VI
                            ? item.statusData.valueVi
                            : item.statusData.valueEn;
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.customerData.email}</td>
                            {/* <td>{time}</td> */}
                            <td>{movie}</td>
                            <td>
                              ({item.ticketNumber}){price}
                            </td>
                            <td>{status}</td>
                            <td>
                              {item.statusId === "S1" && (
                                <button
                                  onClick={() => this.handleDetailBooking(item)}
                                  className="btn btn-success"
                                >
                                  <FormattedMessage id="manage-booking.btn_detail" />
                                </button>
                              )}
                              {item.statusId === "S3" && (
                                <button
                                  onClick={() => this.handleDetailBooking(item)}
                                  className="btn btn-success"
                                >
                                  <FormattedMessage id="manage-booking.btn_detail" />
                                </button>
                              )}
                              {item.statusId === "S2" && (
                                <button
                                  onClick={() => this.handleConfirm(item)}
                                  className="btn btn-warning"
                                >
                                  <FormattedMessage id="manage-booking.btn_confrim" />
                                </button>
                              )}

                              {item.statusId === "S4" && (
                                <button
                                  onClick={() => this.handleDelete(item.id)}
                                  className="btn btn-danger"
                                >
                                  <FormattedMessage id="manage-booking.btn_delete" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="no-data">
                          <FormattedMessage id="manage-booking.no-data" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ModalRemedy
          dataModal={dataModal}
          isOpenModalRemedy={isOpenModalRemedy}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
        />
        <ModalDetailBooking
          dataModal={dataModalDetail}
          isOpenDetailBooking={isOpenDetailBooking}
          closeDetailBooking={this.closeDetailBooking}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(MangeBooking);
