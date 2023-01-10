import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getTopCinemaHome } from "../../../services/userService";
import Slider from "react-slick";
import { LANGUAGE } from "../../../utils";
import Loader from "../../../components/Loader/Loader";
import { withRouter } from "react-router";
class TopCinema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCinema: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    let res = await getTopCinemaHome();
    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        arrCinema: res.data ? res.data : [],
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
    // if (this.state.arrCinema !== prevProps.arrCinema) {
    //   let res = await getTopCinemaHome();
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       arrCinema: res.data ? res.data : [],
    //     });
    //   }
    // }
  }
  handleCinemaDetaill = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-cinema/${id}`);
    }
  };
  render() {
    let { settings, language } = this.props;
    let { arrCinema, isLoading } = this.state;
    return (
      <div className="team-single-main">
        <div className="container">
          {isLoading === true ? (
            <Loader />
          ) : (
            <Slider {...settings}>
              {arrCinema &&
                arrCinema.length > 0 &&
                arrCinema.map((item) => {
                  let name =
                    language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                  let des =
                    language === LANGUAGE.VI
                      ? item.descriptionHTML_Vi
                      : item.descriptionHTML_En;
                  return (
                    <div className="row cinema-container" key={item.id}>
                      <div className="col-lg-6">
                        <div
                          className="img-cinema"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        ></div>
                      </div>
                      <div className="nature-row  coloum4 col-lg-6">
                        <h6 className="small-title">
                          <FormattedMessage id="homepage.explore" />
                        </h6>
                        <h3 className="title-cinema">{name}</h3>
                        <div className="des-cinema">
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: des,
                              }}
                            ></div>
                          }
                        </div>
                        <a
                          onClick={() => this.handleCinemaDetaill(item.id)}
                          className="action-button btn mt-lg-5 mt-4"
                        >
                          <FormattedMessage id="homepage.read-more" />
                        </a>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          )}
        </div>
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(TopCinema)
);
