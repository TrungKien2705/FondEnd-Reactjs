import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./NavigatorLeft.scss";
import { FormattedMessage } from "react-intl";
import { pathAdmin } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
class NavigatorLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEmployee: false,
      openMovie: false,
      openCinema: false,
      openNew: false,
    };
  }
  handleOpenEmploy = () => {
    this.setState({
      openEmployee: !this.state.openEmployee,
    });
  };
  setOpen = () => {
    this.setState({
      openMovie: !this.state.openMovie,
    });
  };
  handleOpenCinema = () => {
    this.setState({
      openCinema: !this.state.openCinema,
    });
  };
  handleOpenNew = () => {
    this.setState({
      openNew: !this.state.openNew,
    });
  };

  render() {
    let { openMovie, openEmployee, openCinema, openNew } = this.state;
    return (
      <div className="admin-container">
        <ul className="navbar-nav-left navbar-nav ">
          <a className="justify-content-center">
            <div className="sidebar-icon">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-title">MV Admin</div>
          </a>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Interface</div>
          <li className="nav-item">
            <a
              className="nav-link-collapsed d-flex justify-content-between"
              onClick={() => this.handleOpenEmploy()}
              aria-expanded={openEmployee}
            >
              <div>
                <i className="fas fa-fw fa-cog "></i>
                <span>
                  <FormattedMessage id="system.user" />
                </span>
              </div>
              <i
                className={
                  openEmployee === true
                    ? "fas fa-angle-down angle-down"
                    : "fas fa-angle-right"
                }
              ></i>
            </a>
            <Collapse in={openEmployee}>
              <div className="collapse-show">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">
                    <FormattedMessage id="system.manage" />
                  </h6>
                  <NavLink
                    to={pathAdmin.MANAGE_EMPLOYEE}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.employee" />
                  </NavLink>
                  <NavLink
                    to={pathAdmin.MANAGE_CUSTOMER}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.cutsomer" />
                  </NavLink>
                </div>
              </div>
            </Collapse>
          </li>

          <li className="nav-item">
            <a
              className="nav-link-collapsed d-flex justify-content-between"
              onClick={() => this.setOpen(openMovie)}
              aria-expanded={openMovie}
            >
              <div>
                <i className="fas fa-fw fa-wrench"></i>
                <span>
                  <FormattedMessage id="system.movie" />
                </span>
              </div>
              <i
                className={
                  openMovie === true
                    ? "fas fa-angle-down angle-down"
                    : "fas fa-angle-right"
                }
              ></i>
            </a>
            <Collapse in={openMovie}>
              <div className="collapse-show">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">
                    <FormattedMessage id="system.manage" />
                  </h6>
                  <NavLink
                    to={pathAdmin.MANAGE_MOVIE}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.list" />
                  </NavLink>
                  <NavLink
                    to={pathAdmin.MANAGE_SCHEDULE}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.schedule" />
                  </NavLink>
                  <NavLink
                    to={pathAdmin.MANAGE_MOVIE_BOOKING}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.booking" />
                  </NavLink>
                </div>
              </div>
            </Collapse>
          </li>
          <li className="nav-item">
            <a
              className="nav-link-collapsed d-flex justify-content-between"
              onClick={() => this.handleOpenCinema(openCinema)}
              aria-expanded={openCinema}
            >
              <div>
                <i className="fas fa-fw fa-chart-area"></i>
                <span>
                  <FormattedMessage id="system.cinema" />
                </span>
              </div>
              <i
                className={
                  openCinema === true
                    ? "fas fa-angle-down angle-down"
                    : "fas fa-angle-right"
                }
              ></i>
            </a>
            <Collapse in={openCinema}>
              <div className="collapse-show">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">
                    <FormattedMessage id="system.manage" />
                  </h6>
                  <NavLink
                    to={pathAdmin.MANAGE_CINEMA}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    List
                  </NavLink>
                </div>
              </div>
            </Collapse>
          </li>
          <li className="nav-item">
            <a
              className="nav-link-collapsed d-flex justify-content-between"
              onClick={() => this.handleOpenNew(openNew)}
              aria-expanded={openNew}
            >
              <div>
                <i className="fas fa-fw fa-table"></i>
                <span>
                  <FormattedMessage id="system.new" />
                </span>
              </div>
              <i
                className={
                  openNew === true
                    ? "fas fa-angle-down angle-down"
                    : "fas fa-angle-right"
                }
              ></i>
            </a>
            <Collapse in={openNew}>
              <div className="collapse-show">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">
                    <FormattedMessage id="system.manage" />
                  </h6>
                  <NavLink
                    to={pathAdmin.MANAGE_NEW}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.new" />
                  </NavLink>
                  <NavLink
                    to={pathAdmin.MANAGE_PROMOTION}
                    activeClassName="active"
                    className="collapse-item"
                  >
                    <FormattedMessage id="system.promotion" />
                  </NavLink>
                </div>
              </div>
            </Collapse>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorLeft);
