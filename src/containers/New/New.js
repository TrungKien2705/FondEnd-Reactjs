import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./New.scss";
import { getAllPromotionPage, getAllNewPage } from "../../services/userService";
import { LANGUAGE } from "../../utils";
import Loader from "../../components/Loader/Loader";
import { withRouter } from "react-router";
class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNew: [],
      arrPromotion: [],
      sizePageNew: 0,
      sizePageProm: 0,
      currPageNew: 0,
      currPageProm: 0,
      numberPageNew: [],
      numberPageProm: [],
      isloading: true,
    };
  }
  getAllPageNew = () => {
    let { sizePageNew } = this.state;
    let numberPageNew = [];
    for (let index = 0; index < sizePageNew; index++) {
      let object = {};
      object = index + 1;
      numberPageNew.push(object);
    }
    return numberPageNew;
  };
  getAllPagePromotion = () => {
    let { sizePageProm } = this.state;
    let numberPageProm = [];
    for (let index = 0; index < sizePageProm; index++) {
      let object = {};
      object = index + 1;
      numberPageProm.push(object);
    }
    return numberPageProm;
  };
  getAllPromotion = async (page) => {
    let res = await getAllPromotionPage(page);
    if (res && res.errCode === 0) {
      this.setState({
        isloading: false,
        arrPromotion: res.data,
        sizePageProm: res.pageNew / res.pageSize,
        currPageProm: page,
      });
    } else {
      this.setState({
        isloading: false,
      });
    }
  };
  getAllNew = async (page) => {
    let res = await getAllNewPage(page);
    if (res && res.errCode === 0) {
      this.setState({
        isloading: false,
        arrNew: res.data,
        sizePageNew: res.pageNew / res.pageSize,
        currPageNew: page,
      });
    } else {
      this.setState({
        isloading: false,
      });
    }
  };

  async componentDidMount() {
    await this.getAllNew(1);
    await this.getAllPromotion(1);
    let numberPageNew = this.getAllPageNew();
    let numberPageProm = this.getAllPagePromotion();
    this.setState({
      numberPageNew: numberPageNew,
      numberPageProm: numberPageProm,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  onCickPagePromotion = async (page) => {
    await this.getAllPromotion(page);
  };
  onCickPageNew = async (page) => {
    await this.getAllNew(page);
  };
  onClickNextPage = async (key) => {
    let { currPageProm, numberPageProm, currPageNew, numberPageNew } =
      this.state;
    if (key === "promotion") {
      if (currPageProm === Math.max(...numberPageProm)) {
        await this.getAllPromotion(currPageProm);
      } else {
        await this.getAllPromotion(currPageProm + 1);
      }
    }
    if (key === "new") {
      if (currPageNew === Math.max(...numberPageNew)) {
        await this.getAllNew(currPageNew);
      } else {
        await this.getAllNew(currPageNew + 1);
      }
    }
  };
  onClickPreviousPage = async (key) => {
    let { currPageProm, numberPageProm, currPageNew, numberPageNew } =
      this.state;
    if (key === "promotion") {
      if (currPageProm === Math.min(...numberPageProm)) {
        await this.getAllPromotion(currPageProm);
      } else {
        await this.getAllPromotion(currPageProm - 1);
      }
    }
    if (key === "new") {
      if (currPageNew === Math.min(...numberPageNew)) {
        await this.getAllNew(currPageNew);
      } else {
        await this.getAllNew(currPageNew - 1);
      }
    }
  };
  handleDetailNew = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-new/${id}`);
    }
  };
  handleDetailPromotion = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-promotion/${id}`);
    }
  };

  render() {
    let {
      arrNew,
      arrPromotion,
      currPageNew,
      currPageProm,
      numberPageNew,
      numberPageProm,
      isloading,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="new-promotion-container">
          <div className="container">
            {isloading === true ? (
              <Loader />
            ) : (
              <>
                <div className="title-promotion-main">
                  <FormattedMessage id="new.title_pro" />
                </div>
                <div className="promotion-container">
                  <div className="row" style={{ width: "100%" }}>
                    {arrPromotion &&
                      arrPromotion.length > 0 &&
                      arrPromotion.map((item) => {
                        let name =
                          language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                        return (
                          <div
                            onClick={() => this.handleDetailPromotion(item.id)}
                            key={item.id}
                            className="promotion-child col-3"
                          >
                            <div
                              className="image-promotion"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                            ></div>
                            <span className="title-promotion">{name}</span>
                          </div>
                        );
                      })}
                    <div className="pagination-new">
                      <a onClick={() => this.onClickPreviousPage("promotion")}>
                        <i className="fas fa-angle-left"></i>
                      </a>
                      {numberPageProm &&
                        numberPageProm.length > 0 &&
                        numberPageProm.map((item, index) => {
                          return (
                            <a
                              onClick={() => this.onCickPagePromotion(item)}
                              key={index + 1}
                              className={
                                currPageProm === item ? "page-active" : ""
                              }
                            >
                              {item}
                            </a>
                          );
                        })}

                      <a onClick={() => this.onClickNextPage("promotion")}>
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isloading === true ? (
              <Loader />
            ) : (
              <>
                <div className="title-new-main">
                  <FormattedMessage id="new.title_new" />
                </div>
                <div className="promotion-container">
                  <div className="row">
                    {arrNew &&
                      arrNew.length > 0 &&
                      arrNew.map((item) => {
                        let name =
                          language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                        return (
                          <div
                            onClick={() => this.handleDetailNew(item.id)}
                            key={item.id}
                            className="promotion-child col-3"
                          >
                            <div
                              className="image-promotion"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                            ></div>
                            <span className="title-promotion">{name}</span>
                          </div>
                        );
                      })}

                    <div className="pagination-new">
                      <a onClick={() => this.onClickPreviousPage("new")}>
                        <i className="fas fa-angle-left"></i>
                      </a>
                      {numberPageNew &&
                        numberPageNew.length > 0 &&
                        numberPageNew.map((item, index) => {
                          return (
                            <a
                              onClick={() => this.onCickPageNew(item)}
                              key={index + 1}
                              className={
                                currPageNew === item ? "page-active" : ""
                              }
                            >
                              {item}
                            </a>
                          );
                        })}
                      <a onClick={() => this.onClickNextPage("new")}>
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(New));
