import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NavigatorLeft from "../containers/Header/NavigatorLeft";
import HeaderTop from "../containers/Header/HeaderTop";
import ManageEmployee from "../containers/System/Admin/ManageEmployee";
import { pathAdmin } from "../utils/constant";
import ManageMovie from "../containers/System/Movie/ManageMovie";
import ManageSchedule from "../containers/System/Movie/ManageSchedule";
import ManageCinema from "../containers/System/Cinema/ManageCinema";
import ManageBooking from "../containers/System/Movie/ManageBooking";

import ManageCustomer from "../containers/System/Cutsomer/ManageCustomer";
import TablePromotion from "../containers/System/New/TablePromotion";
import TableNew from "../containers/System/New/TableNew";
class System extends Component {
  render() {
    let { isLoggedIn } = this.props;
    return (
      <>
        <div style={{ display: "flex" }}>
          {isLoggedIn && <NavigatorLeft />}
          <div style={{ width: "100%" }}>
            <HeaderTop />

            <Switch>
              <Route
                path={pathAdmin.MANAGE_EMPLOYEE}
                exact
                component={ManageEmployee}
              />
              <Route path={pathAdmin.MANAGE_MOVIE} component={ManageMovie} />
              <Route
                path={pathAdmin.MANAGE_SCHEDULE}
                component={ManageSchedule}
              />
              <Route
                path={pathAdmin.MANAGE_MOVIE_BOOKING}
                component={ManageBooking}
              />
              <Route path={pathAdmin.MANAGE_NEW} component={TableNew} />
              <Route
                path={pathAdmin.MANAGE_CUSTOMER}
                component={ManageCustomer}
              />
              <Route
                path={pathAdmin.MANAGE_PROMOTION}
                component={TablePromotion}
              />
              <Route path={pathAdmin.MANAGE_CINEMA} component={ManageCinema} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
