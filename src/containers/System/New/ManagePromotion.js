import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./New.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils, CRUD_Actions, LANGUAGE } from "../../../utils";
import { toast } from "react-toastify";
import {
  postCreatePromotion,
  putUpdatePromotion,
} from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManagePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameVi: "",
      nameEn: "",
      image: "",
      contentMarkdown_Vi: "",
      contentHTML_Vi: "",
      contentMarkdown_En: "",
      contentHTML_En: "",
      action: CRUD_Actions.CREATE,
      openCreate: false,
    };
  }
  getPromotionById = async () => {
    let { promotion } = this.props;
    console.log("promotion", promotion);
    this.setState({
      id: promotion.id,
      nameVi: promotion.nameVi,
      nameEn: promotion.nameEn,
      image: promotion.image,
      contentMarkdown_Vi: promotion.contentMarkdown_Vi,
      contentHTML_Vi: promotion.contentHTML_Vi,
      contentMarkdown_En: promotion.contentMarkdown_En,
      contentHTML_En: promotion.contentHTML_En,
    });
  };
  async componentDidMount() {
    this.getPromotionById();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.promotion !== prevProps.promotion) {
      this.getPromotionById();
      this.setState({
        action: CRUD_Actions.EDIT,
      });
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChangeVi = ({ html, text }) => {
    this.setState({
      contentMarkdown_Vi: text,
      contentHTML_Vi: html,
    });
  };
  handleEditorChangeEn = ({ html, text }) => {
    this.setState({
      contentMarkdown_En: text,
      contentHTML_En: html,
    });
  };
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };
  checkValidateInput = () => {
    let { language } = this.props;
    let arrCheck = [
      "nameVi",
      "nameEn",
      "image",
      "contentMarkdown_Vi",
      "contentMarkdown_En",
    ];
    let isValid = true;

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        language === LANGUAGE.VI
          ? toast.error(`Vui lòng điền trường: ${arrCheck[i]}`)
          : toast.error(`Missing Input required: ${arrCheck[i]}`);
        break;
      }
    }

    return isValid;
  };
  handleCreateNew = async () => {
    let { language } = this.props;
    let { action } = this.state;
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    if (action === CRUD_Actions.CREATE) {
      let res = await postCreatePromotion(this.state);
      if (res && res.errCode === 0) {
        this.props.getAllPromotion();
        language === LANGUAGE.VI
          ? toast.success("Thêm khuyến mãi thàng công")
          : toast.success("Create the new success");
        this.setState({
          nameVi: "",
          nameEn: "",
          image: "",
          contentMarkdown_Vi: "",
          contentHTML_Vi: "",
          contentMarkdown_En: "",
          contentHTML_En: "",
          action: CRUD_Actions.CREATE,
        });
      } else {
        language === LANGUAGE.VI
          ? toast.error("Thêm khuyến mãi thất bại")
          : toast.error("Create the new error");
      }
    }
    if (action === CRUD_Actions.EDIT) {
      let res = await putUpdatePromotion(this.state);
      if (res && res.errCode === 0) {
        this.props.getAllPromotion();
        language === LANGUAGE.VI
          ? toast.success("Sửa khuyến mãi thàng công")
          : toast.success("Update the new success");
        this.setState({
          nameVi: "",
          nameEn: "",
          image: "",
          contentMarkdown_Vi: "",
          contentHTML_Vi: "",
          contentMarkdown_En: "",
          contentHTML_En: "",
          action: CRUD_Actions.CREATE,
        });
      } else {
        language === LANGUAGE.VI
          ? toast.error("Sửa khuyến mãi thất bại")
          : toast.error("Update the new error");
      }
    }
  };
  handleOpenCreate = async () => {
    this.setState({
      openCreate: !this.state.openCreate,
    });
  };

  render() {
    let {
      nameVi,
      nameEn,
      contentMarkdown_Vi,
      contentMarkdown_En,
      action,
      openCreate,
    } = this.state;
    console.log("action", action);
    return (
      <>
        <button
          onClick={() => this.handleOpenCreate()}
          className="btn btn-success mb-2 mt-2"
        >
          <FormattedMessage id="manage-promotion.create" />
        </button>
        {openCreate === true ? (
          <div className="row">
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-promotion.nameVi" />
              </label>
              <input
                value={nameVi}
                onChange={(event) => this.handleOnChangeInput(event, "nameVi")}
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-promotion.nameEn" />
              </label>
              <input
                value={nameEn}
                onChange={(event) => this.handleOnChangeInput(event, "nameEn")}
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-promotion.image" />
              </label>
              <input
                onChange={(event) => this.handleOnChangeImg(event)}
                className="form-control"
                type="file"
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-promotion.content_vi" />
              </label>
              <MdEditor
                value={contentMarkdown_Vi}
                style={{ height: "350px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChangeVi}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-promotion.content_en" />
              </label>
              <MdEditor
                value={contentMarkdown_En}
                style={{ height: "350px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChangeEn}
              />
            </div>

            <div className="btn-submit mt-4 mb-4">
              <button
                onClick={() => this.handleCreateNew()}
                className={
                  action === CRUD_Actions.CREATE
                    ? "btn btn-success"
                    : "btn btn-warning"
                }
              >
                {action === CRUD_Actions.CREATE ? (
                  <FormattedMessage id="manage-promotion.save" />
                ) : (
                  <FormattedMessage id="manage-promotion.edit" />
                )}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePromotion);
