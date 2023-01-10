import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { getTopCinemaHome, getAllCode } from "../../services/userService";
import { LANGUAGE } from "../../utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { withRouter } from "react-router";
class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCinema: [],
      arrCate: [],
      isOpenImg: false,
      prevImage: "",
    };
  }
  getAllDataFooter = async () => {
    let res = await getTopCinemaHome();
    if (res && res.errCode === 0) {
      this.setState({
        arrCinema: res.data ? res.data : [],
      });
    }
    let resCate = await getAllCode("CATEGORY");
    if (resCate && resCate.errCode === 0) {
      this.setState({
        arrCate: resCate.data ? resCate.data : [],
      });
    }
  };
  async componentDidMount() {
    await this.getAllDataFooter();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnClickImg = (image) => {
    this.setState({
      prevImage: image,
      isOpenImg: true,
    });
  };
  handleClickCinema = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-cinema/${id}`);
    }
  };

  render() {
    let { arrCinema, arrCate, isOpenImg, prevImage } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="footer-29 py-5 ">
          <div className="container">
            <div className="grid-col-4 footer-top-29">
              <div className="footer-1">
                <ul>
                  <h2 className="footer-title">
                    <FormattedMessage id="footer.contact" />
                  </h2>
                  <li>
                    <p className="footer-content">
                      <span className="fa fas fa-map-marker-alt"></span>
                      California, #32841 block, #221DRS 75 West Rock, Maple
                      Building, UK.
                    </p>
                  </li>
                  <li>
                    <a href="tel:+7-800-999-800">
                      <p className="footer-content">
                        <span className="fa fa-phone"></span> +(21)-255-999-8888
                      </p>
                    </a>
                  </li>
                  <li>
                    <p className="footer-content">
                      <a
                        href="mailto:kien.nt.955@aptechlearning.edu.vn"
                        className="mail"
                      >
                        <span className="fa fas fa-envelope-open"></span>
                        kien.nt.955@aptechlearning.edu.vn
                      </a>
                    </p>
                  </li>
                  <div className="main-social-footer-29">
                    <a href="#facebook" className="facebook">
                      <span className="fa fab fa-facebook-f"></span>
                    </a>
                    <a href="#twitter" className="twitter">
                      <span className="fa fab fa-twitter"></span>
                    </a>
                    <a href="#instagram" className="instagram">
                      <span className="fa fab fa-instagram"></span>
                    </a>
                    <a href="#google-plus" className="google-plus">
                      <span className="fa fab fa-google-plus-g"></span>
                    </a>
                    <a href="#linkedin" className="linkedin">
                      <span className="fa fab fa-linkedin-in"></span>
                    </a>
                  </div>
                </ul>
              </div>
              <div className="footer-list-29 footer-2">
                <ul>
                  <h6 className="footer-title">
                    <FormattedMessage id="footer.cate" />
                  </h6>
                  {arrCate &&
                    arrCate.length > 0 &&
                    arrCate.slice(0, 6).map((item) => {
                      let nameCate =
                        language === LANGUAGE.VI ? item.valueVi : item.valueEn;
                      return (
                        <li key={item.id}>
                          <a className="footer-content">{nameCate}</a>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="footer-list-29 footer-3">
                <div className="properties">
                  <h6 className="footer-title">
                    <FormattedMessage id="footer.gallery" />
                  </h6>
                  <div className="images-col">
                    {arrCinema &&
                      arrCinema.length > 0 &&
                      arrCinema.slice(0, 6).map((item) => {
                        return (
                          <div
                            onClick={() => this.handleOnClickImg(item.image)}
                            key={item.id}
                            className="img-footer"
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                          ></div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="footer-list-29 footer-4">
                <ul>
                  <h6 className="footer-title">
                    <FormattedMessage id="footer.cinema" />
                  </h6>
                  {arrCinema &&
                    arrCinema.length > 0 &&
                    arrCinema.map((item) => {
                      let name =
                        language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                      return (
                        <li key={item.id} className="name-cinema-footer">
                          <a
                            onClick={() => this.handleClickCinema(item.id)}
                            className="footer-content"
                          >
                            {name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className=" bottom-copies text-center">
              <p className="copy-footer-29">
                © 2022 Movie Booking. All rights reserved | Designed by Trung
                Kien
              </p>
            </div>
          </div>
        </div>

        {isOpenImg === true && (
          <Lightbox
            mainSrc={prevImage}
            onCloseRequest={() => this.setState({ isOpenImg: false })}
          />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
