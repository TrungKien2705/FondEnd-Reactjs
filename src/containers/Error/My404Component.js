import React, { Component } from "react";
import { connect } from "react-redux";
import "./My404Component.scss";
import HomeHeader from "../HomePage/HomeHeader";
class My404Component extends Component {
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
    return (
      <>
        <HomeHeader />
        <div class="site">
          <div class="sketch">
            <div class="bee-sketch red"></div>
            <div class="bee-sketch blue"></div>
          </div>

          <h1 className="error">
            404:
            <small className="text-center">Page Not Found</small>
          </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(My404Component);
