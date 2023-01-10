import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import image from "../../../assets/images/undraw_profile_3.svg";
import { LANGUAGE, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { updateEmployeeInfor } from "../../../services/userService";

import DatePicker from "react-datepicker";
import Select from "react-select";
import { registerLocale } from "react-datepicker";
import { enAU, vi } from "date-fns/locale";
registerLocale("vi", vi);
registerLocale("en", enAU);
class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      listRole: [],
      listAddres: [],
      listGender: [],
      selectAddress: "",
      selectGender: "",
      isOpenImg: false,
      selectRole: "",
      birthday: "",
      phonenumber: "",
      previewImg: "",
      avata: "",
    };
  }
  getEmployeeById = () => {
    let { employess } = this.props;
    let { listAddres, listGender, listRole } = this.state;
    let day = "";
    if (employess.birthday) {
      day = new Date(employess.birthday);
    }
    let imageBase64 = "";
    if (employess.image) {
      imageBase64 = new Buffer(employess.image, "base64").toString("binary");
    }
    let selectRole = "",
      selectAddress = "",
      selectGender = "";

    selectGender = listGender.find((item) => {
      return item && item.value === employess.gender;
    });
    selectAddress = listAddres.find((item) => {
      return item && item.value === employess.address;
    });
    selectRole = listRole.find((item) => {
      return item && item.value === employess.roleId;
    });
    this.setState({
      id: employess.id,
      firstName: employess.firstName,
      lastName: employess.lastName,
      selectAddress: selectAddress,
      selectGender: selectGender,
      selectRole: selectRole,
      birthday: day,
      phonenumber: employess.phonenumber,
      previewImg: imageBase64,
      avata: imageBase64,
    });
  };
  async componentDidMount() {
    await this.props.getRequiredEmployeeInfor();
    this.getEmployeeById();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.empRequired !== prevProps.empRequired) {
      let { resGender, resProvince, resRole } = this.props.empRequired;

      let dataSelectGender = this.builDataInputSelect(resGender, "GENDER");
      let dataSelectRole = this.builDataInputSelect(resRole, "ROLE");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listGender: dataSelectGender,
        listAddres: dataSelectProvince,
        listRole: dataSelectRole,
      });
    }
    if (this.props.language !== prevProps.language) {
      let { resGender, resProvince, resRole } = this.props.empRequired;

      let dataSelectGender = this.builDataInputSelect(resGender, "GENDER");
      let dataSelectRole = this.builDataInputSelect(resRole, "ROLE");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listGender: dataSelectGender,
        listAddres: dataSelectProvince,
        listRole: dataSelectRole,
      });
    }
    if (this.props.employess !== prevProps.employess) {
      this.getEmployeeById();
    }
  }
  builDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "GENDER" || type === "PROVINCE" || type === "ROLE") {
        inputData.map((item) => {
          let object = {};
          let lableVi = `${item.valueVi}`;
          let lableEn = `${item.valueEn}`;

          object.label = language === LANGUAGE.VI ? lableVi : lableEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }
    }
    return result;
  };
  handleChangeSelectEmployeeInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleDatePicker = (date) => {
    this.setState({
      birthday: date,
    });
  };

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avata: base64,
      });
    }
  };

  handleOnClikSave = async () => {
    let { language } = this.props;
    let req = await updateEmployeeInfor({
      id: this.state.id,
      roleId: this.state.selectRole.value,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.selectAddress.value,
      birthday: this.state.birthday,
      gender: this.state.selectGender.value,
      phonenumber: this.state.phonenumber,
      avata: this.state.avata,
    });
    if (req && req.errCode === 0) {
      this.props.closeModal();
      this.props.getAllEmployee();
      language === LANGUAGE.VI
        ? toast.success("Cập nhập thông tin thàng công")
        : toast.success("Successfully updated information");
    } else {
      language === LANGUAGE.VI
        ? toast.success("Cập nhập thông tin thất bại")
        : toast.success("Update failed");
    }
  };

  render() {
    let {
      firstName,
      lastName,
      listAddres,
      listGender,
      listRole,
      birthday,
      phonenumber,
      selectAddress,
      selectGender,
      selectRole,
      previewImg,
    } = this.state;
    let { closeModal, isOpenModal, language } = this.props;
    let date = language === LANGUAGE.VI ? "dd/MM/yyyy" : "yyyy/MM/dd";
    let lan = language === LANGUAGE.VI ? "vi" : "en";
    return (
      <Modal size="lg" centered show={isOpenModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="manage-employee.edit-emp" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="main-body">
              <div className="row">
                <div className="col-lg-3">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      {previewImg && previewImg.length > 0 ? (
                        <div
                          // onClick={() => this.handleOnClickImg()}
                          className="rounded-circle"
                          style={{
                            backgroundImage: `url(${previewImg})`,
                            width: "125px",
                            height: "125px",
                          }}
                        ></div>
                      ) : (
                        <img
                          className="avatar-image"
                          src={image}
                          alt="Maxwell Admin"
                        />
                      )}
                      <div className="mt-3">
                        <label className="image-upload" htmlFor="image-emp">
                          <FormattedMessage id="manage-employee.upload" />
                          <i className="fas fa-upload"></i>
                          <input
                            onChange={(event) => this.handleOnChangeImg(event)}
                            type="file"
                            hidden
                            id="image-emp"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="login.firstname" />
                        </h6>
                      </div>
                      <div className="col-sm-9 ">
                        <input
                          value={firstName}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, "firstName")
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="login.lastname" />
                        </h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          value={lastName}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, "lastName")
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="manage-employee.phone" />
                        </h6>
                      </div>
                      <div className="col-sm-9 ">
                        <input
                          type="text"
                          className="form-control"
                          value={phonenumber}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, "phonenumber")
                          }
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="manage-employee.birthday" />
                        </h6>
                      </div>
                      <div className="col-sm-9 ">
                        <DatePicker
                          className="form-control"
                          selected={birthday ? birthday : ""}
                          onChange={this.handleDatePicker}
                          dateFormat={date}
                          locale={lan}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="manage-employee.gender" />
                        </h6>
                      </div>
                      <div className="col-sm-9 ">
                        <Select
                          value={selectGender}
                          onChange={this.handleChangeSelectEmployeeInfor}
                          options={listGender}
                          name={"selectGender"}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="profile.province" />
                        </h6>
                      </div>
                      <div className="col-sm-9 ">
                        <Select
                          value={selectAddress}
                          onChange={this.handleChangeSelectEmployeeInfor}
                          options={listAddres}
                          name={"selectAddress"}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          <FormattedMessage id="manage-employee.role" />
                        </h6>
                      </div>
                      <div className="col-sm-9 ">
                        <Select
                          value={selectRole}
                          onChange={this.handleChangeSelectEmployeeInfor}
                          options={listRole}
                          name={"selectRole"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            <FormattedMessage id="manage-employee.close" />
          </Button>
          <Button variant="primary" onClick={() => this.handleOnClikSave()}>
            <FormattedMessage id="manage-employee.save" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    empRequired: state.admin.empRequired,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredEmployeeInfor: () =>
      dispatch(actions.getRequiredEmployeeInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
