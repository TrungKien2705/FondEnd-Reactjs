import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllPromotionPage,
  postDeletePromotion,
} from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import ReactTooltip from "react-tooltip";
import ManagePromotion from "./ManagePromotion";
import { toast } from "react-toastify";
class TablePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPro: [],
      promotion: {},
      sizePage: 0,
      currPage: 0,
      numberPage: [],
    };
  }
  getAllPage = () => {
    let { sizePage } = this.state;
    let numberPage = [];
    for (let index = 0; index < sizePage; index++) {
      let object = {};
      object = index + 1;
      numberPage.push(object);
    }
    return numberPage;
  };
  getAllPromotion = async (page) => {
    let res = await getAllPromotionPage(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrPro: res.data,
        sizePage: res.pageNew / res.pageSize,
        currPage: page,
      });
    }
  };
  async componentDidMount() {
    await this.getAllPromotion(1);
    let numberPage = this.getAllPage();
    this.setState({
      numberPage: numberPage,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }
  onClickPage = async (page) => {
    await this.getAllPromotion(page);
  };
  onClickNextPage = async () => {
    let { numberPage, currPage } = this.state;
    if (currPage === Math.max(...numberPage)) {
      await this.getAllPromotion(currPage);
    } else {
      await this.getAllPromotion(currPage + 1);
    }
  };
  onClickPreviousPage = async () => {
    let { numberPage, currPage } = this.state;
    if (currPage === Math.min(...numberPage)) {
      await this.getAllPromotion(currPage);
    } else {
      await this.getAllPromotion(currPage - 1);
    }
  };
  handleEditPromotion = (item) => {
    this.setState({
      promotion: item,
    });
  };
  handleDeletePromotion = async (id) => {
    let { language } = this.props;
    let res = await postDeletePromotion({ id: id });
    if (res && res.errCode === 0) {
      await this.getAllPromotion(1);
      language === LANGUAGE.VI
        ? toast.success("Xóa khuyến mãi thàng công")
        : toast.success("Delete the new success");
    } else {
      language === LANGUAGE.VI
        ? toast.error("Xóa khuyến mãi thất bại")
        : toast.error("Delete the new error");
    }
  };

  render() {
    let { arrPro, promotion, numberPage, currPage } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="title-manege-mobie">
          <FormattedMessage id="manage-promotion.manage_new" />
        </div>
        <div className="container">
          <ManagePromotion
            getAllPromotion={this.getAllPromotion}
            promotion={promotion}
          />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <FormattedMessage id="manage-promotion.name" />
                </th>
                <th>
                  <FormattedMessage id="manage-promotion.image" />
                </th>
                <th>
                  <FormattedMessage id="manage-cinema.action" />
                </th>
              </tr>
            </thead>
            <tbody>
              {arrPro &&
                arrPro.length > 0 &&
                arrPro.map((item, index) => {
                  let name =
                    language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div
                          className="image-new"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        ></div>
                      </td>
                      <td>{name}</td>
                      <td>
                        <div className="action-new">
                          <a className="detail-new" data-tip="Detail">
                            <i className="fas fa-info-circle">&#xE8B8;</i>
                          </a>
                          <ReactTooltip />
                          <a
                            onClick={() => this.handleEditPromotion(item)}
                            className="settings-new"
                            data-tip="Update"
                          >
                            <i className="fas fa-cog">&#xE8B8;</i>
                          </a>
                          <ReactTooltip />
                          <a
                            className="delete-new"
                            data-tip="Delete"
                            onClick={() => this.handleDeletePromotion(item.id)}
                          >
                            <i className="fas fa-times-circle">&#xE5C9;</i>
                          </a>
                          <ReactTooltip />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="pagination mb-4">
            <a onClick={() => this.onClickPreviousPage()} title="previous page">
              <svg fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </a>
            {numberPage &&
              numberPage.length > 0 &&
              numberPage.map((item, index) => {
                return (
                  <a
                    onClick={() => this.onClickPage(item)}
                    className={currPage === index + 1 ? "page-active" : ""}
                    key={index + 1}
                  >
                    {item}
                  </a>
                );
              })}

            <a onClick={() => this.onClickNextPage()} title="next page">
              <svg fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(TablePromotion);
