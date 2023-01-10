import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Header.scss";
import image from "../../assets/images/undraw_profile.svg";
import Profile from "../../components/Profile/Profile";
import ReactDOM from "react-dom";
import iconVi from "../../assets/images/vietnam.png";
import iconEn from "../../assets/images/united-kingdom.png";
import { LANGUAGE } from "../../utils";
import * as actions from "../../store/actions";
import Collapse from "react-bootstrap/Collapse";
// import { changeLanguageApp } from "../../store/actions";
import { getAllEmployee } from "../../services/userService";
class HeaderTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openProfile: false,
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
  handleClickOutside = (event) => {
    let domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        openProfile: false,
        openLanguge: false,
      });
    }
  };
  OnClickLanguage = (language) => {
    this.props.changeLanguageApp(language);
    // alert(language);
  };
  handleOpenProfile = () => {
    this.setState({
      openProfile: !this.state.openProfile,
      openLanguge: false,
    });
  };
  handleOpenLanguge = () => {
    this.setState({
      openLanguge: !this.state.openLanguge,
      openProfile: false,
    });
  };
  render() {
    let { openProfile, avata } = this.state;
    let { userInfo, language } = this.props;
    return (
      <div className="header-top-container">
        <nav className="navbar-top">
          {/* <div className="search-input">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small  input-search-text"
                placeholder="Search for..."
              />
              <div className="input-group-append">
                <button className="btn btn-search" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </div> */}

          <ul className="navbar-nav image-employ">
            <div className="navbar-btns">
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
                  <div
                    className="dropdown-menu-admin shadow"
                    style={{ marginTop: "2px" }}
                  >
                    <span
                      onClick={() => this.OnClickLanguage(LANGUAGE.VI)}
                      className="dropdown-item language"
                    >
                      <img src={iconVi} alt="iconVi" className="iconVi" />
                      <span className="lange">
                        <FormattedMessage id="homepage.vi" />
                      </span>
                    </span>
                    <span
                      onClick={() => this.OnClickLanguage(LANGUAGE.EN)}
                      className="dropdown-item language"
                    >
                      <img src={iconEn} alt="iconEn" className="iconEn" />
                      <span className="lange">
                        <FormattedMessage id="homepage.en" />
                      </span>
                    </span>
                  </div>
                </Collapse>
              </span>
            </div>
            <div className="topbar-divider d-sm-block"></div>

            <li
              className="nav-admin dropdown"
              onClick={() => this.handleOpenProfile()}
            >
              <a className="nav-link profile">
                <span className="fullname-employ d-lg-inline ">
                  {userInfo && userInfo.firstName ? userInfo.firstName : ""}
                  &nbsp;
                  {userInfo && userInfo.lastName ? userInfo.lastName : ""}
                </span>
                {avata && avata.length > 0 ? (
                  <div
                    className="img-profile"
                    style={{
                      backgroundImage: `url(${avata})`,
                    }}
                  ></div>
                ) : (
                  <img
                    className="img-profile"
                    src={image}
                    alt="Maxwell Admin"
                  />
                )}
                {/* <img className="img-profile" src={image} /> */}
              </a>
              {openProfile === true ? (
                <Profile isHeaderAdmin={true} />
              ) : (
                <div></div>
              )}
            </li>
          </ul>
        </nav>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTop);
