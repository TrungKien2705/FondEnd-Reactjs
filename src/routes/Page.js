import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import SignIn from "../containers/Auth/SignIn";
import ForgotPassword from "../containers/Auth/ForgotPassword/ForgotPassword";

import My404Component from "../containers/Error/My404Component";
import ProfileEmp from "../containers/ProfileEmp/ProfileEmp";
import HomePage from "../containers/HomePage/HomePage";
import MovieDetail from "../containers/Movie/MovieDetail";
import CinemaDetail from "../containers/Cinema/CinemaDetail";
import VerifyEmail from "../containers/Movie/VerifyEmail/VerifyEmail";
import CancelEmail from "../containers/Movie/VerifyEmail/CancelEmail";
import New from "../containers/New/New";
import NewDetail from "../containers/New/NewDetail";
import PromotionDetail from "../containers/New/PromotionDetail";
import Category from "../containers/Category/Category";
import HomeHeader from "../containers/HomePage/HomeHeader";
import HomeFooter from "../containers/HomePage/HomeFooter";
class Page extends Component {
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <HomeHeader />
        <Switch>
          <Route path={path.HOME} exact component={Home} />
          <Route path={path.HOMEPAGE} exact component={HomePage} />
          <Route path={path.NEW} component={New} />
          <Route path={path.DETAIL_NEW} component={NewDetail} />
          <Route path={path.CATEGORY} component={Category} />
          <Route path={path.DETAIL_PROMOTION} component={PromotionDetail} />
          <Route path={path.DETAIL_MOVIE} exact component={MovieDetail} />
          <Route path={path.DETAIL_CINEMA} exact component={CinemaDetail} />
          <Route
            path={path.VERIFY_EMAIL_BOOKING}
            exact
            component={VerifyEmail}
          />
          <Route
            path={path.CANVEL_EMAIL_BOOKING}
            exact
            component={CancelEmail}
          />
          <Route
            path={path.PROFILE}
            component={userIsAuthenticated(ProfileEmp)}
          />

          <Route path={path.LOGIN} component={userIsNotAuthenticated(SignIn)} />
          <Route
            path={path.FORGORPASS}
            component={userIsNotAuthenticated(ForgotPassword)}
          />
          {/* <Route
            path={path.SYSTEM}
            exact
            component={userIsAuthenticated(System)}
          /> */}

          <Route path="*" exact={true} component={My404Component} />
        </Switch>
        <HomeFooter />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
