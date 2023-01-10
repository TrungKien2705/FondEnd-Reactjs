import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./ManageCustomer.scss";
import { getAllCustomer } from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import moment from "moment/moment";
class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCustomer: [],
    };
  }

  async componentDidMount() {
    let res = await getAllCustomer();
    if (res && res.errCode === 0) {
      this.setState({
        arrCustomer: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { arrCustomer } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="container">
          <div className="title-manege-mobie">
            <FormattedMessage id="manage-employee.manage-cutsomer" />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>
                  <FormattedMessage id="manage-employee.fullname" />
                </th>
                <th>
                  <FormattedMessage id="manage-employee.address" />
                </th>
                <th>
                  <FormattedMessage id="manage-employee.gender" />
                </th>
                <th>
                  <FormattedMessage id="manage-employee.birthday" />
                </th>
                <th>
                  <FormattedMessage id="manage-employee.phone" />
                </th>
              </tr>
            </thead>
            <tbody>
              {arrCustomer &&
                arrCustomer.length > 0 &&
                arrCustomer.map((item, index) => {
                  let gender =
                    language === LANGUAGE.VI
                      ? item.genderCustData.valueVi
                      : item.genderCustData.valueEn;
                  let birthday =
                    language === LANGUAGE.VI
                      ? moment
                          .utc(item.birthday)
                          .add(1, "d")
                          .format("DD/MM/YYYY")
                      : moment
                          .utc(item.birthday)
                          .add(1, "d")
                          .format("YYYY/MM/DD");

                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{item.fullName}</td>
                      <td>{item.address}</td>
                      <td>{gender}</td>
                      <td>{birthday}</td>
                      <td>{item.phonenumber}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
