import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Profile.scss";
import { withRouter } from "react-router";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  OnClickProfifle = (id) => {
    if (this.props.history) {
      this.props.history.push(`/profile/${id}`);
    }
  };

  render() {
    let { processLogout, userInfo, isHeaderAdmin } = this.props;
    return (
      <div
        className={
          isHeaderAdmin === true
            ? "dropdown-menu-admin shadow"
            : "dropdown-menu-home shadow"
        }
      >
        <a
          onClick={() => this.OnClickProfifle(userInfo.id)}
          className="dropdown-item"
        >
          <i className="fas fa-user fa-sm fa-fw text-gary"></i>
          <FormattedMessage id="profile.account" />
        </a>
        {userInfo.roleId === "R1" ? (
          <a
            href="/system/manage-employee-list"
            target="_blank"
            className="dropdown-item"
          >
            <i className="fas fa-cogs fa-sm fa-fw text-gary"></i>
            <FormattedMessage id="profile.admin" />
          </a>
        ) : (
          ""
        )}

        <div className="dropdown-divider"></div>
        <a className="dropdown-item" onClick={processLogout}>
          <i className="fas fa-sign-out-alt fa-sm fa-fw text-gary"></i>
          <FormattedMessage id="profile.logout" />
        </a>
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
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
