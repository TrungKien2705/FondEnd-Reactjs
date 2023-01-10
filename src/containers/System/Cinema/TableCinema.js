import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE } from "../../../utils";
import ReactTooltip from "react-tooltip";
class TableCiname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCinema: [],
      cinema: {},
    };
  }
  getAllCinema = async () => {
    let { arrCinema } = this.props;
    this.setState({
      arrCinema: arrCinema,
    });
  };

  async componentDidMount() {
    await this.getAllCinema();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.arrCinema !== prevProps.arrCinema) {
      await this.getAllCinema();
    }
  }

  handleEditCinema = (cinema) => {
    this.props.handleEditCinema(cinema);
  };

  render() {
    let { arrCinema } = this.state;
    let { language } = this.props;
    return (
      <>
        <table className="table table-bordered mb-5">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <FormattedMessage id="manage-cinema.name" />
              </th>
              <th>
                <FormattedMessage id="manage-cinema.address" />
              </th>
              <th>
                <FormattedMessage id="manage-cinema.hotline" />
              </th>
              <th>
                <FormattedMessage id="manage-cinema.action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {arrCinema &&
              arrCinema.length > 0 &&
              arrCinema.map((item, index) => {
                let name = language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                let address =
                  language === LANGUAGE.VI ? item.addressVi : item.addressEn;
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td className="action-cinema">{item.hotline}</td>
                    <td className="action-cinema">
                      <a className="detail-cinema" data-tip="Detail">
                        <i className="fas fa-info-circle">&#xE8B8;</i>
                      </a>
                      <ReactTooltip />
                      <a
                        onClick={() => this.handleEditCinema(item)}
                        className="settings-cinema"
                        data-tip="Update"
                      >
                        <i className="fas fa-cog">&#xE8B8;</i>
                      </a>
                      <ReactTooltip />
                      <a
                        className="delete-cinema"
                        data-tip="Delete"
                        onClick={() => this.handleDeleteMovie(item.id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableCiname);
