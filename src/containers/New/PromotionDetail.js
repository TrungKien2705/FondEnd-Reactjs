import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./NewDetail.scss";
import Movie from "../../components/Movie/Movie";
import { getPromotionById } from "../../services/userService";
import { LANGUAGE } from "../../utils";
class PromotionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDetail: {},
      isloading: true,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getPromotionById(id);
      if (res && res.errCode === 0) {
        this.setState({
          isloading: false,
          newDetail: res.data ? res.data : {},
        });
      } else {
        this.setState({
          isloading: false,
        });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { newDetail } = this.state;
    let des =
      language === LANGUAGE.VI
        ? newDetail.contentHTML_Vi
        : newDetail.contentHTML_En;
    let name = language === LANGUAGE.VI ? newDetail.nameVi : newDetail.nameEn;
    return (
      <>
        <div className="new-detail-container">
          <div className="new-detail-content">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="new-detail">
                    <div className="new-title">{name}</div>
                    <div
                      className="image-new"
                      style={{
                        backgroundImage: `url(${newDetail.image})`,
                      }}
                    ></div>
                    <div className="new-des">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: des,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <h1 className="title-movie-new">
                    <FormattedMessage id="cinema-detail.movie-hot" />
                  </h1>
                  <Movie cinema={false} />
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PromotionDetail);
