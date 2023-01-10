import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalDetail.scss";
import moment from "moment/moment";
import { LANGUAGE } from "../../../utils/constant";

class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetail: {},
    };
  }

  getMovieById = async () => {
    let { movie } = this.props;
    if (movie) {
      this.setState({
        movieDetail: movie,
      });
    }
  };
  async componentDidMount() {
    await this.getMovieById();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.movie !== prevProps.movie) {
      await this.getMovieById();
    }
  }

  render() {
    let { isOpenModal, closeModal, movie, language } = this.props;
    let { movieDetail } = this.state;
    console.log("movieDetail", movieDetail);
    let cinema = "",
      cate = "",
      contry = "",
      name = "",
      price = "",
      premiere_date = "",
      createdAt = "";
    if (movie.cinemaData || movie.premiere_date) {
      cinema =
        language === LANGUAGE.VI
          ? movie.cinemaData.nameVi
          : movie.cinemaData.nameEn;
      cate =
        language === LANGUAGE.VI
          ? movie.cateData.valueVi
          : movie.cateData.valueEn;
      contry =
        language === LANGUAGE.VI
          ? movie.countryData.valueVi
          : movie.countryData.valueEn;
      name = language === LANGUAGE.VI ? movie.nameVi : movie.nameEn;
      price =
        language === LANGUAGE.VI
          ? movie.priceData.valueVi
          : movie.priceData.valueEn;
      premiere_date =
        language === LANGUAGE.VI
          ? moment.utc(movie.premiere_date).add(1, "d").format("DD/MM/YYYY")
          : moment.utc(movie.premiere_date).add(1, "d").format("YYYY/MM/DD");
      createdAt =
        language === LANGUAGE.VI
          ? moment.utc(movie.createdAt).add(1, "d").format("DD/MM/YYYY HH:mm")
          : moment.utc(movie.createdAt).add(1, "d").format("YYYY/MM/DD HH:mm");
    }

    return (
      <Modal size="lg" centered show={isOpenModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="manage-movie.detai_movie" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div
                  className="image-detail-movie"
                  style={{
                    backgroundImage: `url(${movie.image})`,
                  }}
                ></div>
              </div>
              <div className="col-8">
                <div className="content-detail">
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.name" />:
                    </span>
                    <span className="right-detail">{name}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.cinema" />:
                    </span>
                    <span className="right-detail">{cinema}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.cate" />:
                    </span>
                    <span className="right-detail">{cate}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.country" />:
                    </span>
                    <span className="right-det/ail">{contry}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.director" />:
                    </span>
                    <span className="right-detail">{movieDetail.director}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.price" />:
                    </span>
                    <span className="right-detail">{price}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.premiere_date" />:
                    </span>
                    <span className="right-detail">{premiere_date}</span>
                  </div>
                  <div className="text-detail">
                    <span className="left-detail">
                      <FormattedMessage id="manage-movie.createAt" />
                    </span>
                    <span className="right-detail">{createdAt}</span>
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
