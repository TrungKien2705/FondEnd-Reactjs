import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./MovieDetail.scss";
import { getMovieById } from "../../services/userService";
import { LANGUAGE } from "../../utils";
import MovieSchedule from "./MovieSchedule";
import moment from "moment";
import Loader from "../../components/Loader/Loader";
import { NumericFormat } from "react-number-format";
// import ScrollTop from "../../components/Scroll/Scroll";
class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetail: [],
      currentMovieId: -1,
      isloading: true,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentMovieId: id,
      });
      let res = await getMovieById(id);
      if (res && res.errCode === 0) {
        this.setState({
          isloading: false,
          movieDetail: res.data ? res.data : {},
          currentMovieId: res.data.id,
        });
      } else {
        this.setState({
          isloading: false,
        });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { movieDetail, currentMovieId, isloading } = this.state;
    console.log(movieDetail);
    let premiere_date =
      language === LANGUAGE.VI
        ? moment.utc(movieDetail.premiere_date).add(1, "d").format("DD/MM/YYYY")
        : moment
            .utc(movieDetail.premiere_date)
            .add(1, "d")
            .format("YYYY/MM/DD");
    let des =
      LANGUAGE.VI === language
        ? movieDetail.descriptionVi
        : movieDetail.descriptionEn;
    let name =
      LANGUAGE.VI === language ? movieDetail.nameVi : movieDetail.nameEn;
    let cate = "",
      country = "",
      price = "";
    if (
      movieDetail &&
      movieDetail.cateData &&
      movieDetail.countryData &&
      movieDetail.priceData
    ) {
      cate =
        LANGUAGE.VI === language
          ? movieDetail.cateData.valueVi
          : movieDetail.cateData.valueEn;
      country =
        language === LANGUAGE.VI
          ? movieDetail.countryData.valueVi
          : movieDetail.countryData.valueEn;
      price =
        language === LANGUAGE.VI
          ? movieDetail.priceData.valueVi
          : movieDetail.priceData.valueEn;
    }

    return (
      <>
        <div className="detail-movie-container">
          <div className="detail-movie-content">
            {isloading === true ? (
              <Loader />
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <div className="image-movie">
                      <div
                        className="image-movie-detail"
                        style={{
                          backgroundImage: `url(${movieDetail.image})`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-8">
                    <h1 className="title-movie">{name}</h1>
                    <p className="des-movie">{des} </p>
                    <div className="detail-movie">
                      <div className="title-detail">
                        <FormattedMessage id="movie-detail.director" />
                      </div>
                      <div className="content-detail">
                        {movieDetail.director}
                      </div>
                    </div>
                    <div className="detail-movie">
                      <div className="title-detail">
                        <FormattedMessage id="movie-detail.cate" />
                      </div>
                      <div className="content-detail">{cate}</div>
                    </div>
                    <div className="detail-movie">
                      <div className="title-detail">
                        <FormattedMessage id="movie-detail.time_type" />
                      </div>
                      <div className="content-detail">
                        {movieDetail.timeType}
                        <FormattedMessage id="homepage.minute" />
                      </div>
                    </div>
                    <div className="detail-movie">
                      <div className="title-detail">
                        <FormattedMessage id="movie-detail.country" />
                      </div>
                      <div className="content-detail">{country}</div>
                    </div>
                    <div className="detail-movie">
                      <div className="title-detail">
                        <FormattedMessage id="movie-detail.price" />
                      </div>
                      <div className="content-detail">
                        {language === LANGUAGE.VI ? (
                          <NumericFormat
                            value={price}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VNĐ"}
                          />
                        ) : (
                          <NumericFormat
                            value={price}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="detail-movie">
                      <div className="title-detail">
                        <FormattedMessage id="movie-detail.premiere_date" />
                      </div>
                      <div className="content-detail">{premiere_date}</div>
                    </div>
                    <div className="movie-schedule">
                      <MovieSchedule
                        moviePrice={movieDetail.priceData}
                        movieId={currentMovieId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <ScrollTop /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
