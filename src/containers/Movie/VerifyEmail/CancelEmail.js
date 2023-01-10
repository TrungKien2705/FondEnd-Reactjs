import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { cancelBookingMovie } from "../../../services/userService";
import "./VerifyEmail.scss";
class CancelEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let movieId = urlParams.get("movieId");
      console.log("token", token);
      console.log("movieId", movieId);
      let res = await cancelBookingMovie({
        movieId: movieId,
        token: token,
      });

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { errCode, statusVerify } = this.state;
    return (
      <>
        <div className="verrify-email-container">
          {statusVerify === false ? (
            <div className="infor-booking">
              <FormattedMessage id="verify.loading" />
            </div>
          ) : (
            <div>
              {errCode === 0 ? (
                <div className="infor-booking">
                  <FormattedMessage id="verify.mer_cancel" />
                </div>
              ) : (
                <div className="infor-booking">
                  <FormattedMessage id="verify.mer_error" />
                </div>
              )}
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CancelEmail);
