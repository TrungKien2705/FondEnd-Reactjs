import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";
import System from "../routes/System";
import { CustomToastCloseButton } from "../components/CustomToast";
import CustomScrollbars from "../components/CustomScrollbars";
import My404Component from "./Error/My404Component";

import ScrollToTop from "./ScrollToTop ";
import Page from "../routes/Page";
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <ScrollToTop />
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.HOMEPAGE} exact component={Page} />
                  <Route path={path.NEW} exact component={Page} />
                  <Route path={path.DETAIL_NEW} exact component={Page} />
                  <Route path={path.CATEGORY} exact component={Page} />
                  <Route path={path.DETAIL_PROMOTION} component={Page} />
                  <Route path={path.DETAIL_MOVIE} exact component={Page} />
                  <Route path={path.DETAIL_CINEMA} exact component={Page} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    exact
                    component={Page}
                  />
                  <Route
                    path={path.CANVEL_EMAIL_BOOKING}
                    exact
                    component={Page}
                  />
                  <Route
                    path={path.PROFILE}
                    exact
                    component={userIsAuthenticated(Page)}
                  />

                  <Route
                    path={path.LOGIN}
                    exact
                    component={userIsNotAuthenticated(SignIn)}
                  />
                  <Route
                    path={path.FORGORPASS}
                    exact
                    component={userIsNotAuthenticated(ForgotPassword)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path="*" exact={true} component={My404Component} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              className="toast-container"
              position="bottom-right"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              hideProgressBar={false}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={true}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            />
          </div>
        </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
