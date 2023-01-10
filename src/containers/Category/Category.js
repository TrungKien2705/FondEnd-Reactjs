import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Category.scss";
import { getMovieUpcomming, getMoviePlay } from "../../services/movieService";
import { LANGUAGE } from "../../utils";
import Loader from "../../components/Loader/Loader";
import { withRouter } from "react-router";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrMovieUp: [],
      arrMiviePlay: [],
      isLoading: true,
    };
  }
  getMoviePlay = async () => {
    let res = await getMoviePlay();
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        arrMiviePlay: res.data,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  getMovieUpcomming = async () => {
    let res = await getMovieUpcomming();
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        arrMovieUp: res.data,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  async componentDidMount() {
    await this.getMoviePlay();
    await this.getMovieUpcomming();
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
    let { arrMiviePlay, arrMovieUp, isLoading } = this.state;
    let { language } = this.props;
    console.log("arrMovieUp", arrMovieUp);
    return (
      <>
        <div className="category-container">
          <div className="container">
            <div className="content-upcoming-movie">
              {isLoading === true ? (
                <Loader />
              ) : (
                <>
                  <div className="title-cate">
                    <FormattedMessage id="homepage.movie_up" />
                  </div>
                  <div className="row">
                    {arrMovieUp &&
                      arrMovieUp.length > 0 &&
                      arrMovieUp.map((item) => {
                        let name =
                          language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                        return (
                          <div
                            onClick={() => this.handleOnClickMovie(item.id)}
                            key={item.id}
                            className="col-3 div-image"
                          >
                            <div
                              className="image-cate"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                            ></div>
                            <span className="name-movie">{name}</span>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>

            <div className="content-play-movie">
              {isLoading === true ? (
                <Loader />
              ) : (
                <>
                  <div className="title-cate">
                    <FormattedMessage id="homepage.movie_play" />
                  </div>
                  <div className="row">
                    {arrMiviePlay &&
                      arrMiviePlay.length > 0 &&
                      arrMiviePlay.map((item) => {
                        let name =
                          language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                        return (
                          <div
                            onClick={() => this.handleOnClickMovie(item.id)}
                            key={item.id}
                            className="col-3 div-image"
                          >
                            <div
                              className="image-cate"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                            ></div>
                            <span className="name-movie">{name}</span>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
