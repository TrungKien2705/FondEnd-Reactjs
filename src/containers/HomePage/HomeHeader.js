import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import iconVi from "../../assets/images/vietnam.png";
import iconEn from "../../assets/images/united-kingdom.png";
import { LANGUAGE } from "../../utils";
import * as actions from "../../store/actions";
import { Link, NavLink } from "react-router-dom";
import Avatar from "../../assets/images/undraw_profile.svg";
import Profile from "../../components/Profile/Profile";
import ReactDOM from "react-dom";
import Collapse from "react-bootstrap/Collapse";
import { getAllEmployee } from "../../services/userService";
import { injectIntl } from "react-intl";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopenProfile: false,
      openLanguge: false,
      avata: "",
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  getEmployeeById = async () => {
    let { userInfo } = this.props;
    let id = userInfo && userInfo.id ? userInfo.id : "";
    let res = await getAllEmployee(id);
    if (res.emp && res.errCode === 0) {
      let data = res.emp;

      let imageBase64 = "";
      if (data.image) {
        imageBase64 = new Buffer.from(data.image, "base64").toString("binary");
      }
      this.setState({
        avata: imageBase64,
      });
    }
  };

  async componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
    await this.getEmployeeById();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleClickOutside = (event) => {
    let domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        isopenProfile: false,
        openLanguge: false,
      });
    }
  };
  handleOpenLanguge = () => {
    this.setState({
      openLanguge: !this.state.openLanguge,
      isopenProfile: false,
    });
  };
  handleOpenProfile = () => {
    this.setState({
      isopenProfile: !this.state.isopenProfile,
      openLanguge: false,
    });
  };

  OnClickLanguage = (language) => {
    this.props.changeLanguageApp(language);
    // alert(language);
  };

  render() {
    let { language, isLoggedIn, intl } = this.props;
    let { isopenProfile, avata } = this.state;
    return (
      <div className="header-home-container">
        <div className="navbar">
          <div className="navbar-content">
            <div className="container">
              <div className="navbar-top flex flex-between">
                <Link to="/home" className="navbar-brand">
                  <span className="text-regal-blue">Movie</span>
                  <span className="text-gold">Booking</span>
                </Link>

                {/* <div className="navbar-search flex">
                  <input
                    type="text"
                    placeholder={intl.formatMessage({
                      id: "homepage.search",
                    })}
                  />
                  <button type="submit" className="navbar-search-btn">
                    <i className="fas fa-search"></i>
                  </button>
                </div> */}
                <div className="navbar-btns">
                  <div className="btn-txt fw-5">
                    <span
                      className="btn-icon"
                      onClick={() => this.handleOpenLanguge()}
                    >
                      {language === LANGUAGE.VI ? (
                        <img src={iconVi} alt="iconVi" className="iconVi" />
                      ) : (
                        <img src={iconEn} alt="iconEn" className="iconEn" />
                      )}
                      <Collapse in={this.state.openLanguge}>
                        <div className="dropdown-menu-home shadow">
                          <span
                            onClick={() => this.OnClickLanguage(LANGUAGE.VI)}
                            className="dropdown-item language"
                          >
                            <img src={iconVi} alt="iconVi" className="iconVi" />
                            <FormattedMessage id="homepage.vi" />
                          </span>
                          <span
                            onClick={() => this.OnClickLanguage(LANGUAGE.EN)}
                            className="dropdown-item language"
                          >
                            <img src={iconEn} alt="iconEn" className="iconVi" />
                            <FormattedMessage id="homepage.en" />
                          </span>
                        </div>
                      </Collapse>
                    </span>
                  </div>
                  {isLoggedIn === true ? (
                    <div
                      className="navbar-btns avatar-image-container"
                      onClick={() => this.handleOpenProfile()}
                    >
                      {avata && avata.length > 0 ? (
                        <div
                          className="avatar-image"
                          style={{
                            backgroundImage: `url(${avata})`,
                          }}
                        ></div>
                      ) : (
                        <img
                          className="avatar-image"
                          src={Avatar}
                          alt="Maxwell Admin"
                        />
                      )}
                      {isopenProfile === true ? (
                        <Profile isHeaderAdmin={false} />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className="navbar-btns avatar-image-container">
                      <Link to="/login" className="add-to-cart-btn flex">
                        <FormattedMessage id="homepage.login" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="navbar-bottom bg-regal-blue">
              <div className="container flex flex-between">
                <ul className={`nav-links flex ${"show-nav-links"}`}>
                  <button type="button" className="navbar-hide-btn text-white">
                    <i className="fas fa-times"></i>
                  </button>
                  <li>
                    <NavLink
                      to="/home"
                      activeClassName="active"
                      className="nav-link text-white"
                    >
                      <FormattedMessage id="homepage.home" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category"
                      activeClassName="active"
                      className="nav-link text-white"
                    >
                      <FormattedMessage id="homepage.movie" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/new"
                      activeClassName="active"
                      className="nav-link text-white"
                    >
                      <FormattedMessage id="homepage.new" />
                    </NavLink>
                  </li>
                </ul>

                <button
                  type="button"
                  className="navbar-show-btn text-gold"
                  // onClick={}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageApp: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
