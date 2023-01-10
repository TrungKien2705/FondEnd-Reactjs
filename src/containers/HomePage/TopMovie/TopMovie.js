import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TopMovie.scss";
import { getAllTopMovie } from "../../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { LANGUAGE } from "../../../utils/constant";
import Loader from "../../../components/Loader/Loader";
class TopMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrMovie: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    let res = await getAllTopMovie();
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        arrMovie: res.data ? res.data : [],
      });
    } else {
      this.setState({
        isLoading: false,
        errCode: res && res.errCode ? res.errCode : -1,
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnClickMovie = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-movie/${id}`);
    }
  };

  render() {
    let { arrMovie, isLoading } = this.state;
    let { language } = this.props;
    return (
      <>
        <section className="w3l-covers-18">
          <div className="covers-main editContent">
            <div className="container">
              <div className="main-titles-head ">
                <h3 className="header-name">
                  <FormattedMessage id="homepage.top_movie" />
                </h3>
              </div>
              <div className="gallery-image row">
                {isLoading === true ? (
                  <Loader />
                ) : (
                  <Slider {...this.props.settings}>
                    {arrMovie &&
                      arrMovie.length > 0 &&
                      arrMovie.map((item) => {
                        let name =
                          language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                        let cate =
                          language === LANGUAGE.VI
                            ? item.cateData.valueVi
                            : item.cateData.valueEn;
                        return (
                          <div
                            className="col-lg-3 col-md-6 "
                            key={item.id}
                            onClick={() => this.handleOnClickMovie(item.id)}
                          >
                            <div className="img-box">
                              <div
                                className="image-movie"
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>

                              <h5 className="my-2">
                                <a className="title-movie">{name}</a>
                              </h5>
                              <div className="blog-date">
                                <p className="pos-date">
                                  <b className="title-cate">
                                    <FormattedMessage id="homepage.time_type" />
                                  </b>
                                  {cate}
                                </p>
                                <p className="pos-date">
                                  <b className="title-cate">
                                    <FormattedMessage id="homepage.cate" />
                                  </b>
                                  {item.timeType}
                                  <FormattedMessage id="homepage.minute" />
                                </p>
                              </div>
                              <div className="top-gap">
                                <button className="btn-booking">
                                  <FormattedMessage id="homepage.ticket" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </section>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopMovie)
);
