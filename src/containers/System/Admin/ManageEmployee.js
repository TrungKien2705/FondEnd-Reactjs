import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageEmployee.scss";
import * as actions from "../../../store/actions";
import avatatNam from "../../../assets/images/undraw_profile.svg";
import avatatNu from "../../../assets/images/undraw_profile_3.svg";
import ReactTooltip from "react-tooltip";
import { getAllEmployee } from "../../../services/userService";
import {
  getAllEmployeeSortName,
  getAllEmployeeSortEmail,
  getAllEmployeeSortRole,
  getEmployeeSreach,
} from "../../../services/employeeService";
import { LANGUAGE } from "../../../utils/constant";
import ModalDetail from "./ModalDetail";
import ModalEdit from "./ModalEdit";
class ManageEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,
      arrEmployee: [],
      employess: {},
      sizePage: 0,
      totalIndex: 0,
      pageIndex: 0,
      currPage: 0,
      numberPage: [],
      search: "",
      actionsName: "",
    };
  }
  getAllEmployee = async (page) => {
    let res = await getAllEmployee("ALL", page);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        sizePage: res.empPage / res.pageSize,
        totalIndex: res.empPage,
        pageIndex: res.pageSize,
        currPage: page,
        actionsName: "#",
      });
    }
  };
  getAllPage = () => {
    let { sizePage } = this.state;
    let numberPage = [];
    for (let index = 0; index < sizePage; index++) {
      let object = {};
      object = index;
      numberPage.push(object);
    }
    return numberPage;
  };

  getEmployeeName = async (page) => {
    let res = await getAllEmployeeSortName(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        sizePage: res.empPage / res.pageSize,
        totalIndex: res.empPage,
        pageIndex: res.pageSize,
        currPage: page,
      });
    }
  };
  getEmployeeEmail = async (page) => {
    let res = await getAllEmployeeSortEmail(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        sizePage: res.empPage / res.pageSize,
        totalIndex: res.empPage,
        pageIndex: res.pageSize,
        currPage: page,
      });
    }
  };
  getEmployeeRole = async (page) => {
    let res = await getAllEmployeeSortRole(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        sizePage: res.empPage / res.pageSize,
        totalIndex: res.empPage,
        pageIndex: res.pageSize,
        currPage: page,
      });
    }
  };
  getEmployeeSreach = async (page, search) => {
    let res = await getEmployeeSreach(page, search);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        sizePage: res.empPage / res.pageSize,
        totalIndex: res.empPage,
        pageIndex: res.pageSize,
        currPage: page,
      });
    }
  };
  async componentDidMount() {
    await this.getAllEmployee(1);
    let numberPage = this.getAllPage();
    this.setState({
      numberPage: numberPage,
    });
  }

  async componentDidUpdate(prevProps) {
    let language = this.props.language;

    if (language !== prevProps.language) {
    }
    if (this.props.allEmployee !== prevProps.allEmployee) {
      this.setState({
        arrEmployee: this.props.allEmployee,
      });
    }
  }
  openDetailEmployee = async (item) => {
    this.setState({
      isOpenModal: true,
      employess: item,
    });
  };
  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  openEditEmployee = async (item) => {
    this.setState({
      isOpenModalEdit: true,
      employess: item,
    });
  };
  closeModalEdit = () => {
    this.setState({
      isOpenModalEdit: false,
    });
  };
  deletectEmployee = async (id) => {
    await this.props.deletectEmployee({
      id: id,
    });
    await this.getAllEmployee(this.state.currPage);
    let numberPage = this.getAllPage();
    this.setState({
      numberPage: numberPage,
    });
  };
  onClickPage = async (page) => {
    let { actionsName, search } = this.state;

    if (actionsName === "#") {
      await this.getAllEmployee(page);
    }
    if (actionsName === "name") {
      await this.getEmployeeName(page);
    }
    if (actionsName === "email") {
      await this.getEmployeeEmail(page);
    }
    if (actionsName === "role") {
      await this.getEmployeeRole(page);
    }
    if (actionsName === "search") {
      await this.getEmployeeSreach(page, search);
    }
  };
  onClickPreviousPage = async () => {
    let { currPage, numberPage, actionsName, search } = this.state;
    if (currPage === Math.min(...numberPage)) {
      if (actionsName === "#") {
        await this.getAllEmployee(currPage);
      }
      if (actionsName === "name") {
        await this.getEmployeeName(currPage);
      }
      if (actionsName === "email") {
        await this.getEmployeeEmail(currPage);
      }
      if (actionsName === "role") {
        await this.getEmployeeRole(currPage);
      }
      if (actionsName === "search") {
        await this.getEmployeeSreach(currPage, search);
      }
    } else {
      if (actionsName === "#") {
        await this.getAllEmployee(currPage - 1);
      }
      if (actionsName === "name") {
        await this.getEmployeeName(currPage - 1);
      }
      if (actionsName === "email") {
        await this.getEmployeeEmail(currPage - 1);
      }
      if (actionsName === "role") {
        await this.getEmployeeRole(currPage - 1);
      }
      if (actionsName === "search") {
        await this.getEmployeeSreach(currPage - 1, search);
      }
    }
  };
  onClickNextPage = async () => {
    let { currPage, numberPage, actionsName, search } = this.state;
    if (currPage === Math.max(...numberPage)) {
      if (actionsName === "#") {
        await this.getAllEmployee(currPage);
      }
      if (actionsName === "name") {
        await this.getEmployeeName(currPage);
      }
      if (actionsName === "email") {
        await this.getEmployeeEmail(currPage);
      }
      if (actionsName === "role") {
        await this.getEmployeeRole(currPage);
      }
      if (actionsName === "search") {
        await this.getEmployeeSreach(currPage, search);
      }
    } else {
      if (actionsName === "#") {
        await this.getAllEmployee(currPage + 1);
      }
      if (actionsName === "name") {
        await this.getEmployeeName(currPage + 1);
      }
      if (actionsName === "email") {
        await this.getEmployeeEmail(currPage + 1);
      }
      if (actionsName === "role") {
        await this.getEmployeeRole(currPage + 1);
      }
      if (actionsName === "search") {
        await this.getEmployeeSreach(currPage + 1, search);
      }
    }
  };
  handleSortName = async () => {
    let res = await getAllEmployeeSortName(this.state.currPage);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        actionsName: "name",
      });
    }
  };
  handleSortEmail = async () => {
    let res = await getAllEmployeeSortEmail(this.state.currPage);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        actionsName: "email",
      });
    }
  };
  handleSortRole = async () => {
    let res = await getAllEmployeeSortRole(this.state.currPage);
    if (res && res.errCode === 0) {
      this.setState({
        arrEmployee: res.emp,
        actionsName: "role",
      });
    }
  };
  handleOnChangeSearch = async (event, id) => {
    let { currPage, search } = this.state;
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
    if (search.length > 0) {
      let res = await getEmployeeSreach(currPage, search);
      if (res && res.errCode === 0) {
        this.setState({
          arrEmployee: res.emp,
          sizePage: res.empPage / res.pageSize,
          totalIndex: res.empPage,
          pageIndex: res.pageSize,
          actionsName: "search",
        });
      }
    }
  };
  onClickPageIdex = async () => {
    await this.getAllEmployee(this.state.currPage);
    this.setState({
      actionsName: "#",
    });
  };

  render() {
    let {
      arrEmployee,
      isOpenModal,
      employess,
      isOpenModalEdit,
      numberPage,
      totalIndex,
      pageIndex,
      currPage,
      search,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="container">
          <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2>
                        User <b>Management</b>
                      </h2>
                    </div>
                    <div className="col-sm-4">
                      <input
                        value={search}
                        onChange={(event) =>
                          this.handleOnChangeSearch(event, "search")
                        }
                        className=" form-control"
                        type="text"
                        placeholder="Search for..."
                      />
                    </div>
                  </div>
                </div>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>
                        <span
                          onClick={() => this.onClickPageIdex()}
                          className="sort-emp"
                        >
                          #
                        </span>
                      </th>
                      <th>
                        <span
                          onClick={() => this.handleSortName()}
                          className="sort-emp"
                        >
                          <FormattedMessage id="manage-employee.fullname" />
                          <i className="fas fa-sort"></i>
                        </span>
                      </th>
                      <th>
                        <span
                          onClick={() => this.handleSortEmail()}
                          className="sort-emp"
                        >
                          Email
                          <i className="fas fa-sort"></i>
                        </span>
                      </th>
                      <th>
                        <span
                          onClick={() => this.handleSortRole()}
                          className="sort-emp"
                        >
                          <FormattedMessage id="manage-employee.role" />
                          <i className="fas fa-sort"></i>
                        </span>
                      </th>
                      <th>
                        <FormattedMessage id="manage-employee.gender" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-employee.action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrEmployee &&
                      arrEmployee.length > 0 &&
                      arrEmployee.map((item, index) => {
                        let role =
                          LANGUAGE.VI === language
                            ? item.roleData.valueVi
                            : item.roleData.valueEn;
                        let imageBase64 = "";
                        if (item.image) {
                          imageBase64 = new Buffer(
                            item.image,
                            "base64"
                          ).toString("binary");
                        }
                        let avatar = item.gender === "M" ? avatatNam : avatatNu;
                        let gender =
                          language === LANGUAGE.VI
                            ? item.genderData.valueVi
                            : item.genderData.valueEn;
                        let name =
                          language === LANGUAGE.VI
                            ? `${item.firstName} ${item.lastName}`
                            : `${item.lastName} ${item.firstName}`;
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                              <a>
                                {imageBase64 && imageBase64.length > 0 ? (
                                  <div
                                    className="avatar"
                                    style={{
                                      backgroundImage: `url(${imageBase64})`,
                                      width: "40px",
                                      height: "40px",
                                    }}
                                  ></div>
                                ) : (
                                  <img
                                    src={avatar}
                                    className="avatar"
                                    alt="Avatar"
                                  />
                                )}
                                {name}
                              </a>
                            </td>
                            <td>{item.email}</td>
                            <td>{role}</td>
                            <td>{gender}</td>
                            <td className="action">
                              <a
                                onClick={() => this.openDetailEmployee(item)}
                                className="detail-movie"
                                data-tip="Detail"
                              >
                                <i className="fas fa-info-circle">&#xE8B8;</i>
                              </a>
                              <ReactTooltip />
                              <a
                                onClick={() => this.openEditEmployee(item)}
                                className="settings"
                                data-tip="Update"
                              >
                                <i className="fas fa-cog">&#xE8B8;</i>
                              </a>
                              <ReactTooltip />
                              <a
                                className="delete"
                                data-tip="Delete"
                                onClick={() => this.deletectEmployee(item.id)}
                              >
                                <i className="fas fa-times-circle">&#xE5C9;</i>
                              </a>
                              <ReactTooltip />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="clearfix">
                  <div className="hint-text">
                    <FormattedMessage id="manage-employee.show" />
                    <b>{pageIndex}</b>{" "}
                    <FormattedMessage id="manage-employee.out" />{" "}
                    <b>{totalIndex}</b>
                    <FormattedMessage id="manage-employee.entries" />
                  </div>
                  <ul className="pagination">
                    {currPage - 1 !== Math.min(numberPage) ? (
                      <li
                        onClick={() => this.onClickPreviousPage()}
                        className="page-item disabled"
                      >
                        <a className="page-link">
                          <FormattedMessage id="manage-employee.previous" />
                        </a>
                      </li>
                    ) : (
                      ""
                    )}

                    {numberPage.length > 0 &&
                      numberPage.map((item, index) => {
                        return (
                          <li
                            onClick={() => this.onClickPage(index + 1)}
                            className="page-item"
                          >
                            <a
                              key={index + 1}
                              className={
                                currPage === index + 1
                                  ? "page-link active-emp"
                                  : "page-link"
                              }
                            >
                              {index + 1}
                            </a>
                          </li>
                        );
                      })}
                    <li
                      onClick={() => this.onClickNextPage()}
                      className="page-item"
                    >
                      <a className="page-link">
                        <FormattedMessage id="manage-employee.next" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalDetail
          employess={employess}
          isOpenModal={isOpenModal}
          closeModal={this.closeModal}
        />
        <ModalEdit
          getAllEmployee={this.getAllEmployee}
          employess={employess}
          isOpenModal={isOpenModalEdit}
          closeModal={this.closeModalEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allEmployee: state.admin.allEmployee,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployee: () => dispatch(actions.getAllEmployeeRedux()),
    deletectEmployee: (id) => dispatch(actions.deletectEmployee(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);
