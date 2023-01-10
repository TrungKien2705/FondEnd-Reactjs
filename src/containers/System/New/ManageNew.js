import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./New.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils, LANGUAGE, CRUD_Actions } from "../../../utils";
import { toast } from "react-toastify";
import {
  postCreateNew,
  putUpdateNew,
  postDeleteNew,
} from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageNew extends Component {
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
      arrNew: [],
      action: CRUD_Actions.CREATE,
      opCreate: false,
    };
  }

  getNewById = async () => {
    let { news } = this.props;
    console.log("news", news);
    this.setState({
      id: news.id,
      nameVi: news.nameVi,
      nameEn: news.nameEn,
      image: news.image,
      contentMarkdown_Vi: news.contentMarkdown_Vi,
      contentHTML_Vi: news.contentHTML_Vi,
      contentMarkdown_En: news.contentMarkdown_En,
      contentHTML_En: news.contentHTML_En,
    });
  };
  async componentDidMount() {
    this.getNewById();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.news !== prevProps.news) {
      this.getNewById();
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
      let res = await postCreateNew(this.state);
      if (res && res.errCode === 0) {
        this.props.getAllNew();
        language === LANGUAGE.VI
          ? toast.success("Thêm tin tức thàng công")
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
          ? toast.error("Thêm tin tức thất bại")
          : toast.error("Create the new error");
      }
    }
    if (action === CRUD_Actions.EDIT) {
      let res = await putUpdateNew(this.state);
      if (res && res.errCode === 0) {
        this.props.getAllNew();
        language === LANGUAGE.VI
          ? toast.success("Sửa tin tức thàng công")
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
          ? toast.error("Sửa tin tức thất bại")
          : toast.error("Update the new error");
      }
    }
  };

  handleDeleteNew = async (item) => {
    let { language } = this.props;
    let res = await postDeleteNew({ id: item.id });
    if (res && res.errCode === 0) {
      await this.getAllNewPage(1);
      language === LANGUAGE.VI
        ? toast.success("Xóa tin tức thàng công")
        : toast.success("Delete the new success");
    } else {
      language === LANGUAGE.VI
        ? toast.success("Xóa tin tức thàng công")
        : toast.success("Delete the new success");
    }
  };
  handleOnClickCreate = () => {
    this.setState({
      opCreate: !this.state.opCreate,
    });
  };

  render() {
    let {
      nameVi,
      nameEn,
      contentMarkdown_Vi,
      contentMarkdown_En,
      action,
      opCreate,
    } = this.state;
    return (
      <>
        <button
          className="btn btn-success mb-2 "
          onClick={() => this.handleOnClickCreate()}
        >
          <FormattedMessage id="manage-new.create" />
        </button>
        {opCreate === true ? (
          <div className="row">
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-new.nameVi" />
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
                <FormattedMessage id="manage-new.nameEn" />
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
                <FormattedMessage id="manage-new.image" />
              </label>
              <input
                onChange={(event) => this.handleOnChangeImg(event)}
                className="form-control"
                type="file"
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-new.content_vi" />
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
                <FormattedMessage id="manage-new.content_en" />
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
                  <span>
                    <FormattedMessage id="manage-new.save" />
                  </span>
                ) : (
                  <span>
                    <FormattedMessage id="manage-new.edit" />
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* <TableNew
            handleDeleteNew={this.handleDeleteNew}
            handleEditNew={this.handleEditNew}
            arrNew={arrNew}
          /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageNew);
