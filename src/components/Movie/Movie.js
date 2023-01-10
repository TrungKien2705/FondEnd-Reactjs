import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieByCinema } from "../../services/userService";
import { getRandomMovie } from "../../services/movieService";
import { LANGUAGE } from "../../utils";
import Loader from "../Loader/Loader";
import { withRouter } from "react-router";
class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      isLoading: true,
    };
  }
  getAllMovieByCinema = async () => {
    let { cinemaId } = this.props;
    let res = await getMovieByCinema(cinemaId);
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        movieData: res.data ? res.data : [],
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  getAllRandomMovie = async () => {
    let res = await getRandomMovie();
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        movieData: res.data ? res.data : [],
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  async componentDidMount() {
    if (this.props.cinema === true) {
      await this.getAllMovieByCinema();
    }
    if (this.props.cinema === false) {
      await this.getAllRandomMovie();
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.cinemaId !== prevProps.cinemaId) {
      await this.getAllMovieByCinema();
    }
  }
  handleDetailMovie = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-movie/${id}`);
    }
  };

  render() {
    let { language } = this.props;
    let { movieData, isLoading } = this.state;
    return (
      <>
        {isLoading === true ? (
          <Loader />
        ) : (
          <div className="movie-hot-container">
            <div className="row">
              {movieData &&
                movieData.length > 0 &&
                movieData.map((item) => {
                  let name =
                    language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                  return (
                    <div
                      onClick={() => this.handleDetailMovie(item.id)}
                      className="movie-hot col-6"
                      key={item.id}
                    >
                      <div
                        className="image-movie-cinema"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      ></div>
                      <div className="name-movie ">{name}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movie));
