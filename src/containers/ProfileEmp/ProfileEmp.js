import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProfileEmp.scss";
import * as actions from "../../store/actions";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { LANGUAGE, CommonUtils } from "../../utils";
import { toast } from "react-toastify";
import {
  getAllEmployee,
  updateEmployeeInfor,
} from "../../services/userService";
import ChangePass from "./ChangePass";
import avater from "../../assets/images/undraw_profile.svg";
import { registerLocale } from "react-datepicker";
import { enAU, vi } from "date-fns/locale";
registerLocale("vi", vi);
registerLocale("en", enAU);
class ProfileEmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      resFirstName: "",
      resLastName: " ",
      firstName: "",
      lastName: "",
      roleId: "",
      listAddres: [],
      listGender: [],
      selectAddress: "",
      selectGender: "",
      birthday: "",
      phonenumber: "",
      previewImg: "",
      avata: "",
      isModalChangePass: false,
    };
  }
  getEmployeeById = async () => {
    let { userInfo } = this.props;
    let idParams = this.props.match.params.id;
    let id = userInfo && userInfo.id ? userInfo.id : idParams;
    let { listAddres, listGender } = this.state;
    let res = await getAllEmployee(id);
    if (res.emp && res.errCode === 0) {
      let data = res.emp;

      let genderId = "",
        addressId = "",
        selectAddress = "",
        selectGender = "";

      genderId = data.gender;
      addressId = data.address;

      selectAddress = listAddres.find((item) => {
        return item && item.value === addressId;
      });
      selectGender = listGender.find((item) => {
        return item && item.value === genderId;
      });
      let imageBase64 = "";
      if (data.image) {
        imageBase64 = new Buffer(data.image, "base64").toString("binary");
      }
      this.setState({
        resFirstName: data.firstName,
        resLastName: data.lastName,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.roleId,
        birthday: new Date(data.birthday),
        phonenumber: data.phonenumber,
        avata: imageBase64,
        selectAddress: selectAddress,
        selectGender: selectGender,
      });
    }
  };
  async componentDidMount() {
    await this.props.getRequiredEmployeeInfor();
    await this.getEmployeeById();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.empRequired !== prevProps.empRequired) {
      let { resGender, resProvince } = this.props.empRequired;

      let dataSelectGender = this.builDataInputSelect(resGender, "GENDER");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listGender: dataSelectGender,
        listAddres: dataSelectProvince,
      });
    }
    if (this.props.language !== prevProps.language) {
      let { resGender, resProvince } = this.props.empRequired;

      let dataSelectGender = this.builDataInputSelect(resGender, "GENDER");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listGender: dataSelectGender,
        listAddres: dataSelectProvince,
      });
    }
  }
  builDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "GENDER" || type === "PROVINCE") {
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
      this.setState({
        avata: base64,
      });
    }
  };
  checkValidateInput = () => {
    let { language } = this.props;
    let arrCheck = [
      "firstName",
      "lastName",
      "selectAddress",
      "phonenumber",
      "selectGender",
      "birthday",
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

  SaveEmployeeInfor = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { language } = this.props;

    let req = await updateEmployeeInfor({
      id: this.state.id,
      roleId: this.state.roleId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.selectAddress.value,
      birthday: this.state.birthday,
      gender: this.state.selectGender.value,
      phonenumber: this.state.phonenumber,
      avata: this.state.avata,
    });

    if (req && req.errCode === 0) {
      await this.getEmployeeById();
      language === LANGUAGE.VI
        ? toast.success("Cập nhập thông tin thàng công")
        : toast.success("Successfully updated information");
    }
    if (req && req.errCode !== 0) {
      language === LANGUAGE.VI
        ? toast.success("Cập nhập thông tin thất bại")
        : toast.success("Update failed");
    }
  };
  handleClose = () => {
    this.setState({
      isModalChangePass: false,
    });
  };
  handleShowModal = () => {
    this.setState({
      isModalChangePass: true,
    });
  };

  render() {
    let {
      firstName,
      lastName,
      listAddres,
      listGender,
      birthday,
      phonenumber,
      selectAddress,
      selectGender,
      avata,
      resFirstName,
      resLastName,
      isModalChangePass,
    } = this.state;
    let { userInfo, language } = this.props;
    let date = language === LANGUAGE.VI ? "dd/MM/yyyy" : "yyyy/MM/dd";
    let lan = language === LANGUAGE.VI ? "vi" : "en";

    return (
      <>
        <div className="container">
          <div className="row gutters mt-5">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <div className="user-avatar">
                        {avata && avata.length > 0 ? (
                          <div
                            className="avatar-image"
                            style={{
                              backgroundImage: `url(${avata})`,
                              width: "90px",
                              height: "90px",
                            }}
                          ></div>
                        ) : (
                          <img
                            className="avatar-image"
                            src={avater}
                            alt="Maxwell Admin"
                          />
                        )}
                      </div>
                      <h5 className="user-name">
                        {resFirstName ? resFirstName : ""}&nbsp;
                        {resLastName ? resLastName : resLastName}
                      </h5>
                      <h6 className="user-email">
                        {userInfo && userInfo.email ? userInfo.email : ""}
                      </h6>
                    </div>
                    <div className="about">
                      <h5>About</h5>
                      <button
                        onClick={() => this.handleShowModal()}
                        className="btn btn-success"
                      >
                        <FormattedMessage id="profile.change_pass" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 text-primary">
                        <FormattedMessage id="profile.personal_details" />
                      </h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="fullName">
                          <FormattedMessage id="profile.firstname" />
                        </label>
                        <input
                          value={firstName}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, "firstName")
                          }
                          type="text"
                          className="form-control"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="eMail">
                          <FormattedMessage id="profile.lastname" />
                        </label>
                        <input
                          value={lastName}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, "lastName")
                          }
                          type="text"
                          className="form-control"
                          placeholder="Enter email ID"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">
                          <FormattedMessage id="profile.phone" />
                        </label>
                        <input
                          value={phonenumber}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, "phonenumber")
                          }
                          type="text"
                          className="form-control"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="website">
                          <FormattedMessage id="profile.birthday" />
                        </label>
                        <DatePicker
                          className="form-control"
                          selected={birthday}
                          onChange={this.handleDatePicker}
                          dateFormat={date}
                          locale={lan}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="Street">
                          <FormattedMessage id="profile.gender" />
                        </label>
                        <Select
                          value={selectGender}
                          onChange={this.handleChangeSelectEmployeeInfor}
                          options={listGender}
                          // placeholder={
                          //   <FormattedMessage id="admin.manage-doctor.province" />
                          // }
                          name={"selectGender"}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="ciTy">
                          <FormattedMessage id="profile.province" />
                        </label>
                        <Select
                          value={selectAddress}
                          onChange={this.handleChangeSelectEmployeeInfor}
                          options={listAddres}
                          // placeholder={
                          //   <FormattedMessage id="admin.manage-doctor.province" />
                          // }
                          name={"selectAddress"}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="sTate">
                          <FormattedMessage id="profile.image" />
                        </label>
                        <input
                          onChange={(event) => this.handleOnChangeImg(event)}
                          type="file"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right  mt-4">
                        <button
                          onClick={() => this.SaveEmployeeInfor()}
                          type="button"
                          className="btn btn-success"
                        >
                          <FormattedMessage id="profile.save" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ChangePass
                  handleClose={this.handleClose}
                  show={isModalChangePass}
                />
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
    empRequired: state.admin.empRequired,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredEmployeeInfor: () =>
      dispatch(actions.getRequiredEmployeeInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEmp);
