import React, { Component } from "react";
import { connect } from "react-redux";
import "./Loading.scss";
import LoadingOverlay from "react-loading-overlay";
import { LANGUAGE } from "../../utils";
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language, isLoading } = this.props;
    let text =
      language === LANGUAGE.VI
        ? "Đang tải nội dung của bạn.."
        : "Loading your content..";
    return (
      <>
        <LoadingOverlay active={isLoading} spinner text={text} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
