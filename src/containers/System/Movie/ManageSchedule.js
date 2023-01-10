import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGE } from "../../../utils";
import { toast } from "react-toastify";
import _ from "lodash";
import DatePicker from "react-datepicker";
import ReactTooltip from "react-tooltip";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { enAU, vi } from "date-fns/locale";
import {
  bulkCreateScheduleMovie,
  getMovieById,
  getScheduleMovieByDate,
} from "../../../services/userService";
import { deleteScheduleMovie } from "../../../services/movieService";
registerLocale("vi", vi);
registerLocale("en", enAU);
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrMovie: [],
      selectMovie: {},
      currDate: "",
      rangeTime: [],
      minDay: "",
      arrSchedule: [],
      movieId: "",
    };
  }

  getAllScheduleMovie = async (date, movieId) => {
    let res = await getScheduleMovieByDate(date, movieId);

    if (res && res.errCode === 0) {
      this.setState({
        arrSchedule: res.data,
      });
    }
  };
  async componentDidMount() {
    await this.props.getAllScheduleTime();
    await this.props.fetchAllMovie();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      let dataMovie = this.builDataInputSelect(this.props.allMovie);
      this.setState({
        arrMovie: dataMovie,
      });
    }
    if (this.props.allMovie !== prevProps.allMovie) {
      let dataMovie = this.builDataInputSelect(this.props.allMovie);

      this.setState({
        arrMovie: dataMovie,
      });
    }
    if (this.props.allTime !== prevProps.allTime) {
      let dataTime = this.props.allTime;
      if (dataTime && dataTime.length > 0) {
        dataTime = dataTime.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        // rangeTime: this.props.allTime,
        rangeTime: dataTime.resTime,
      });
    }
  }
  handleChangeSelect = async (selectMovie) => {
    let { currDate } = this.state;
    this.setState({ selectMovie, movieId: selectMovie.value });

    let formatdate = new Date(currDate).getTime();
    await this.getAllScheduleMovie(formatdate, selectMovie.value);

    let resMovie = await getMovieById(selectMovie.value);
    if (resMovie && resMovie.errCode === 0) {
      let minDaySchedule = new Date(resMovie.data.premiere_date);
      if (+minDaySchedule < +new Date()) {
        this.setState({
          minDay: new Date(),
        });
      }
      if (+minDaySchedule > +new Date()) {
        this.setState({
          minDay: minDaySchedule,
        });
      }
    }
  };
  handleDatePicker = async (date) => {
    let { movieId, currDate } = this.state;
    this.setState({
      currDate: date,
    });
    let formatdate = new Date(currDate).getTime();
    await this.getAllScheduleMovie(formatdate, movieId);
  };
  builDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData &&
        inputData.map((item) => {
          let odject = {};
          let lableVi = `${item.nameVi}`;
          let lableEn = `${item.nameEn}`;

          odject.label = language === LANGUAGE.VI ? lableVi : lableEn;
          odject.value = item.id;
          result.push(odject);
        });
      return result;
    }
  };
  handleOnClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { selectMovie, currDate, rangeTime, movieId } = this.state;
    let { language } = this.props.language;
    let result = [];
    if (selectMovie && _.isEmpty(selectMovie)) {
      language === LANGUAGE.VI
        ? toast.error("Phim đã chọn không hợp lệ!")
        : toast.error("The selected movie is not valid!");
    }
    if (!currDate) {
      language === LANGUAGE.VI
        ? toast.error("Ngày không hợp lệ !")
        : toast.error("Invalid date !");
    }

    let formatdate = new Date(currDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectTime = rangeTime.filter((item) => item.isSelected === true);

      if (selectTime && selectTime.length > 0) {
        selectTime.map((item) => {
          let object = {};
          object.movieId = selectMovie.value;
          object.date = formatdate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        language === LANGUAGE.VI
          ? toast.error("Thời gian không hợp lệ!")
          : toast.error("Invalid Time !");
      }
      let res = await bulkCreateScheduleMovie({
        arrSchedule: result,
        movieId: selectMovie.value,
        date: formatdate,
      });
      if (res && res.errCode === 0) {
        // this.setState({
        //   selectMovie: {},
        //   currDate: "",
        // });
        let formatdate = new Date(currDate).getTime();
        await this.getAllScheduleMovie(formatdate, movieId);

        let selectTime = rangeTime.filter((item) => item.isSelected === true);
        selectTime = false;
        language === LANGUAGE.VI
          ? toast.success("Tạo lịch chiếu phim thành công!")
          : toast.success("Create schedule movie success");
      } else {
        language === LANGUAGE.VI
          ? toast.error("Tạo lịch chiếu phim thất bại!")
          : toast.error("Create schedule movie error");
      }
    }
  };
  handleDeleteSchedule = async (id) => {
    let { currDate, movieId } = this.state;
    let { language } = this.props;
    console.log(id);
    let res = await deleteScheduleMovie({ id: id });
    if (res && res.errCode === 0) {
      language === LANGUAGE.VI
        ? toast.success("Xoá lịch chiếu thành công")
        : toast.success("Delete schedule movie success");
      let formatdate = new Date(currDate).getTime();
      await this.getAllScheduleMovie(formatdate, movieId);
    } else {
      language === LANGUAGE.VI
        ? toast.error("Xoá lịch chiếu thất bại")
        : toast.error("Delete schedule movie eror");
    }
  };

  render() {
    let { rangeTime, arrMovie, currDate, selectMovie, minDay, arrSchedule } =
      this.state;
    let { language } = this.props;
    let lan = language === LANGUAGE.VI ? "vi" : "en";
    let date = language === LANGUAGE.VI ? "dd/MM/yyyy" : "yyyy/MM/dd";
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.manage-schedule" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-schedule.select_movie" />
                </label>
                <Select
                  value={selectMovie}
                  onChange={this.handleChangeSelect}
                  options={arrMovie}
                  placeholder={
                    <FormattedMessage id="manage-schedule.select_movie" />
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-schedule.select_date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleDatePicker}
                  selected={currDate ? currDate : null}
                  // startDate={currDate}
                  minDate={minDay}
                  dateFormat={date}
                  locale={lan}
                />
              </div>
              <div className="col-6">
                <div className="morning-time">
                  <label htmlFor="">
                    <FormattedMessage id="manage-schedule.morning" />
                  </label>
                  <div className="pick-hour">
                    {rangeTime &&
                      rangeTime.length &&
                      rangeTime.slice(0, 5).map((item) => {
                        return (
                          <button
                            onClick={() => this.handleOnClickBtnTime(item)}
                            className={
                              item.isSelected === true
                                ? "btn btn-time active"
                                : "btn btn-time"
                            }
                            key={item.id}
                          >
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </button>
                        );
                      })}
                  </div>
                </div>
                <div className="morning-time">
                  <label htmlFor="">
                    <FormattedMessage id="manage-schedule.afternoon" />
                  </label>
                  <div className="pick-hour">
                    {rangeTime &&
                      rangeTime.length &&
                      rangeTime.slice(5, 10).map((item) => {
                        return (
                          <button
                            onClick={() => this.handleOnClickBtnTime(item)}
                            className={
                              item.isSelected === true
                                ? "btn btn-time active"
                                : "btn btn-time"
                            }
                            key={item.id}
                          >
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </button>
                        );
                      })}
                  </div>
                </div>
                <div className="morning-time">
                  <label htmlFor="">
                    <FormattedMessage id="manage-schedule.night" />
                  </label>
                  <div className="pick-hour">
                    {rangeTime &&
                      rangeTime.length &&
                      rangeTime.slice(10, 15).map((item) => {
                        return (
                          <button
                            onClick={() => this.handleOnClickBtnTime(item)}
                            className={
                              item.isSelected === true
                                ? "btn btn-time active"
                                : "btn btn-time"
                            }
                            key={item.id}
                          >
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <table className="table table-bordered table-schedule">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        <FormattedMessage id="manage-schedule.time_slot" />
                      </th>
                      <th className="delete-schedule">
                        <FormattedMessage id="manage-schedule.action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrSchedule &&
                      arrSchedule.length > 0 &&
                      arrSchedule.map((item, index) => {
                        let time =
                          language === LANGUAGE.VI
                            ? item.timeData.valueVi
                            : item.timeData.valueEn;
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>
                              <a
                                className="delete-movie"
                                data-tip="Delete"
                                onClick={() =>
                                  this.handleDeleteSchedule(item.id)
                                }
                              >
                                <i className="fas fa-times-circle">&#xE5C9;</i>
                              </a>
                              <ReactTooltip />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="col-12">
                <button
                  onClick={() => this.handleSaveSchedule()}
                  className="btn btn-success mt-5"
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allTime: state.admin.allTime,
    allMovie: state.admin.allMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllScheduleTime: () => dispatch(actions.getAllScheduleTime()),
    fetchAllMovie: () => dispatch(actions.fetchAllMovie()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
