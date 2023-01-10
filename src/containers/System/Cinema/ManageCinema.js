import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageCinema.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils, CRUD_Actions, LANGUAGE } from "../../../utils";
import { toast } from "react-toastify";
import {
  postCreateCinema,
  putUpdateCinema,
  getAllCinema,
} from "../../../services/userService";
import TableCinema from "./TableCinema";
const mdParser = new MarkdownIt();
class ManageCinema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameVi: "",
      nameEn: "",
      image: "",
      addressVi: "",
      addressEn: "",
      hotline: "",
      descriptionMarkdown_Vi: "",
      descriptionHTML_Vi: "",
      descriptionMarkdown_En: "",
      descriptionHTML_En: "",
      action: CRUD_Actions.CREATE,
      arrCinema: {},
      isShowFrom: false,
    };
  }

  async componentDidMount() {
    await this.handleGetAllCinema(1);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
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
      descriptionMarkdown_Vi: text,
      descriptionHTML_Vi: html,
    });
  };
  handleEditorChangeEn = ({ html, text }) => {
    this.setState({
      descriptionMarkdown_En: text,
      descriptionHTML_En: html,
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
      "addressVi",
      "addressEn",
      "hotline",
      "descriptionMarkdown_Vi",
      "descriptionMarkdown_En",
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
  handleCreateCinema = async () => {
    let { language } = this.props;
    let { action } = this.state;
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    if (action === CRUD_Actions.CREATE) {
      let res = await postCreateCinema(this.state);
      if (res && res.errCode === 0) {
        await this.handleGetAllCinema();
        this.setState({
          id: "",
          nameVi: "",
          nameEn: "",
          image: "",
          addressVi: "",
          addressEn: "",
          hotline: "",
          descriptionMarkdown_Vi: "",
          descriptionHTML_Vi: "",
          descriptionMarkdown_En: "",
          descriptionHTML_En: "",
        });
        language === LANGUAGE.VI
          ? toast.success("Thêm rạp thàng công")
          : toast.success("Create cinema success");
      } else {
        language === LANGUAGE.VI
          ? toast.error("Thêm rạp thất bại")
          : toast.error("Create cinema error");
      }
    }
    if (action === CRUD_Actions.EDIT) {
      let res = await putUpdateCinema(this.state);
      if (res && res.errCode === 0) {
        await this.handleGetAllCinema();
        this.setState({
          id: "",
          nameVi: "",
          nameEn: "",
          image: "",
          addressVi: "",
          addressEn: "",
          hotline: "",
          descriptionMarkdown_Vi: "",
          descriptionHTML_Vi: "",
          descriptionMarkdown_En: "",
          descriptionHTML_En: "",
          action: "CREATE",
        });
        language === LANGUAGE.VI
          ? toast.success("Sửa rạp thàng công")
          : toast.success("Update cinema success");
      } else {
        language === LANGUAGE.VI
          ? toast.error("Sửa rạp thất bại")
          : toast.error("Update cinema error");
      }
    }
  };

  handleEditCinema = async (cinema) => {
    console.log("cinema", cinema);
    this.setState({
      id: cinema.id,
      nameVi: cinema.nameVi,
      nameEn: cinema.nameVi,
      image: cinema.image,
      addressVi: cinema.addressVi,
      addressEn: cinema.addressEn,
      hotline: cinema.hotline,
      descriptionMarkdown_Vi: cinema.descriptionMarkdown_Vi,
      descriptionHTML_Vi: cinema.descriptionHTML_Vi,
      descriptionMarkdown_En: cinema.descriptionMarkdown_En,
      descriptionHTML_En: cinema.descriptionHTML_En,
      action: CRUD_Actions.EDIT,
    });
  };
  handleGetAllCinema = async (page) => {
    let res = await getAllCinema(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrCinema: res.data,
      });
    }
  };

  handeleOnClickBtnCreate = () => {
    this.setState({
      isShowFrom: !this.state.isShowFrom,
    });
  };
  render() {
    let {
      nameVi,
      nameEn,
      addressVi,
      addressEn,
      hotline,
      descriptionMarkdown_Vi,
      arrCinema,
      descriptionMarkdown_En,
      action,
      isShowFrom,
    } = this.state;

    console.log("sate", this.state);
    return (
      <>
        <div className="title-manege-mobie">
          <FormattedMessage id="manage-cinema.manage-cinema" />
        </div>
        <div className="container">
          <div className="mt-4 mb-4">
            <button
              onClick={() => this.handeleOnClickBtnCreate()}
              className="btn btn-success"
            >
              <FormattedMessage id="manage-cinema.create" />
            </button>
          </div>
          {isShowFrom === true ? (
            <div className="row">
              <div className="col-4 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.nameVi" />
                </label>
                <input
                  value={nameVi}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "nameVi")
                  }
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.nameEn" />
                </label>
                <input
                  value={nameEn}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "nameEn")
                  }
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.image" />
                </label>
                <input
                  onChange={(event) => this.handleOnChangeImg(event)}
                  className="form-control"
                  type="file"
                />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.addressVi" />
                </label>
                <input
                  value={addressVi}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "addressVi")
                  }
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.addressEn" />
                </label>
                <input
                  value={addressEn}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "addressEn")
                  }
                  className="form-control"
                  type="text"
                />
              </div>

              <div className="col-4 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.hotline" />
                </label>
                <input
                  value={hotline}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "hotline")
                  }
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.desVi" />
                </label>
                <MdEditor
                  value={descriptionMarkdown_Vi}
                  style={{ height: "350px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChangeVi}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-cinema.desEn" />
                </label>
                <MdEditor
                  value={descriptionMarkdown_En}
                  style={{ height: "350px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChangeEn}
                />
              </div>

              <div className="btn-submit mt-4 mb-4">
                <button
                  onClick={() => this.handleCreateCinema()}
                  className={
                    action === CRUD_Actions.CREATE
                      ? "btn btn-success"
                      : "btn btn-warning"
                  }
                >
                  {action === CRUD_Actions.CREATE ? (
                    <span>
                      <FormattedMessage id="manage-cinema.save" />
                    </span>
                  ) : (
                    <span>
                      <FormattedMessage id="manage-cinema.edit" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <TableCinema
            arrCinema={arrCinema}
            handleEditCinema={this.handleEditCinema}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCinema);
