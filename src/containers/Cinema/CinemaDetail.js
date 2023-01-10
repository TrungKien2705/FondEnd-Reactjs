import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CinemaDetail.scss";
import Movie from "../../components/Movie/Movie";
import { getCinemaById } from "../../services/userService";
import { LANGUAGE } from "../../utils";
import Loader from "../../components/Loader/Loader";
class CinemaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemaDetail: {},
      isloading: false,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getCinemaById(id);
      if (res && res.errCode === 0) {
        this.setState({
          isloading: false,
          cinemaDetail: res.data ? res.data : {},
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
    // if (this.props.match.params.id !== prevProps.id) {
    //   let id = this.props.match.params.id;
    //   let res = await getCinemaById(id);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       isloading: false,
    //       cinemaDetail: res.data ? res.data : {},
    //     });
    //   } else {
    //     this.setState({
    //       isloading: false,
    //     });
    //   }
    // }
  }

  render() {
    let { cinemaDetail, isloading } = this.state;
    let { language } = this.props;
    let name =
      language === LANGUAGE.VI ? cinemaDetail.nameVi : cinemaDetail.nameEn;
    let des =
      language === LANGUAGE.VI
        ? cinemaDetail.descriptionHTML_Vi
        : cinemaDetail.descriptionHTML_En;
    let address =
      language === LANGUAGE.VI
        ? cinemaDetail.addressVi
        : cinemaDetail.addressEn;
    let tel = `tel:${cinemaDetail.hotline}`;
    // console.log(this.state);
    return (
      <>
        <div className="cinema-detail-container">
          <div className="cinema-detail-content">
            <div className="container">
              {isloading === true ? (
                <Loader />
              ) : (
                <div className="row">
                  <div className="col-6">
                    <div className="cinema-detail">
                      <div className="cinema-title">{name}</div>
                      <div
                        className="image-cinema"
                        style={{
                          backgroundImage: `url(${cinemaDetail.image})`,
                        }}
                      ></div>
                      <div className="cinema-des">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: des,
                          }}
                        ></div>
                      </div>
                      <div className="cinema-contact">
                        <p>
                          <FormattedMessage id="cinema-detail.infor" />
                        </p>
                        <p>{name}</p>
                        <b>
                          <FormattedMessage id="cinema-detail.address" />
                          {address}
                        </b>
                        <p>
                          <b>
                            <FormattedMessage id="cinema-detail.hotline" />
                          </b>
                          <a className="hotline" href={tel}>
                            {cinemaDetail.hotline}
                          </a>
                        </p>
                      </div>
                      <div className="ciname-map">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7295562576846!2d105.84730827517573!3d21.00347528063949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad58455db2ab%3A0x9b3550bc22fd8bb!2zNTQgUC4gTMOqIFRoYW5oIE5naOG7iywgQsOhY2ggS2hvYSwgSGFpIELDoCBUcsawbmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1670740507479!5m2!1svi!2s"
                          width="600"
                          height="200"
                          style={{ border: "0" }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <h1 className="title-movie-cinema">
                      <FormattedMessage id="cinema-detail.movie-hot" />
                    </h1>
                    <Movie cinema={true} cinemaId={cinemaDetail.id} />
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CinemaDetail);
