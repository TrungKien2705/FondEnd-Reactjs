import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./MovieSchedule.scss";
import localization from "moment/locale/vi";
import { getScheduleMovieByDate } from "../../services/userService";
import { LANGUAGE } from "../../utils";
import BookingModal from "./Modal/BookingModal";
import moment from "moment/moment";
class MovieSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTime: {},
      isOpenModalBooking: false,
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGE.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let lableVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(lableVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
    });

    if (this.props.movieId) {
      let res = await getScheduleMovieByDate(
        allDays[0].value,
        this.props.movieId
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps) {
    let { language } = this.props;
    let allDays = this.getArrDays(language);

    if (this.props.language !== prevProps.language) {
      // let res = await getScheduleMovieByDate(
      //   allDays[0].value,
      //   this.props.movieId
      // );
      // this.setState({
      //   allDays: allDays,
      // });
    }
    if (this.props.movieId !== prevProps.movieId) {
      let res = await getScheduleMovieByDate(
        allDays[0].value,
        this.props.movieId
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeDate = async (event) => {
    if (this.props.movieId && this.props.movieId !== -1) {
      let movieId = this.props.movieId;
      let date = event.target.value;

      let res = await getScheduleMovieByDate(date, movieId);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
    }
  };
  handleBookingMovie = (time) => {
    this.setState({
      dataScheduleTime: time,
      isOpenModalBooking: true,
    });
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { allDays, allAvalableTime, dataScheduleTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="movie-schedule-container">
          <div className="all-schedule">
            <div className="title-detail">
              <FormattedMessage id="movie-detail.movie-schedule" />
            </div>
            <select
              className="select-date"
              onChange={(event) => this.handleOnChangeDate(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-time">
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                allAvalableTime.map((item) => {
                  let timeDisplay = "";
                  if (item.timeData) {
                    timeDisplay =
                      language === LANGUAGE.VI
                        ? item.timeData.valueVi
                        : item.timeData.valueEn;
                  }
                  return (
                    <button
                      key={item.id}
                      onClick={() => this.handleBookingMovie(item)}
                      className="btn "
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <span>
                  <FormattedMessage id="movie-detail.no_time" />
                </span>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          moviePrice={this.props.moviePrice}
          dataScheduleTime={dataScheduleTime}
          closeBookingModal={this.closeBookingModal}
          show={this.state.isOpenModalBooking}
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieSchedule);
