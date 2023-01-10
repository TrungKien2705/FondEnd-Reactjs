import React, { Component } from "react";
import { connect } from "react-redux";
import "./Scroll.scss";
import * as Scroll from "react-scroll";
import { Events, animateScroll as scrollSpy } from "react-scroll";

class ScrollTop extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.state = {
      scrolling: true,
    };
  }
  scrollToTop = () => {
    let scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  };
  componentDidMount() {
    Events.scrollEvent.register("begin", function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
  handleScroll(event) {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false });
    } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true });
    }
  }

  render() {
    let { scrolling } = this.state;
    return (
      <button
        onClick={(event) => this.scrollToTop(event)}
        className="movetop"
        style={{ display: scrolling === true ? "block " : "none" }}
      >
        <span className="fa fa-chevron-up"></span>
      </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop);
