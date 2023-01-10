import React, { Component } from "react";
import { connect } from "react-redux";
import "./Loader.scss";
class Loader extends Component {
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
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="dbl-spinner"></div>
            <div className="dbl-spinner"></div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
