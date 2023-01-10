import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageMovie.scss";
import {
  getMovieSortName,
  getMovieSortPrice,
  getMovieSortDate,
  putDeleteMovie,
  getMovieSearchName,
} from "../../../services/movieService";
import { LANGUAGE } from "../../../utils";
import ReactTooltip from "react-tooltip";
import { getAllMovie } from "../../../services/userService";
import { NumericFormat } from "react-number-format";
import ManageCreateMovie from "./ManageCreateMovie";
import { toast } from "react-toastify";
import moment from "moment";
import ModalDetail from "./ModalDetail";
class ManageMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrMovie: [],
      openCreate: false,
      movie: {},
      sizePage: 0,
      currPage: 0,
      numberPage: [],
      actionsName: "",
      search: "",
      isOpModal: false,
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
  getAllMoviePage = async (page) => {
    let res = await getAllMovie(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        sizePage: res.pageMovie / res.pageSize,
        currPage: page,
        actionsName: "#",
      });
    }
  };
  async componentDidMount() {
    await this.getAllMoviePage(1);
    let numberPage = this.getAllPage();
    this.setState({
      numberPage: numberPage,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  getMovieName = async (page) => {
    let res = await getMovieSortName(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        sizePage: res.pageMovie / res.pageSize,
        currPage: page,
      });
    }
  };
  getMoviePrice = async (page) => {
    let res = await getMovieSortPrice(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        sizePage: res.pageMovie / res.pageSize,
        currPage: page,
      });
    }
  };
  getMovieDate = async (page) => {
    let res = await getMovieSortDate(page);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        sizePage: res.pageMovie / res.pageSize,
        currPage: page,
      });
    }
  };

  handleEditMovie = async (movie) => {
    this.setState({
      movie: movie,
    });
  };
  onClickPage = async (page) => {
    let { actionsName } = this.state;

    if (actionsName === "#") {
      await this.getAllMoviePage(page);
    }
    if (actionsName === "name") {
      await this.getMovieName(page);
    }
    if (actionsName === "price") {
      await this.getMoviePrice(page);
    }
    if (actionsName === "date") {
      await this.getMovieDate(page);
    }
  };
  onClickPreviousPage = async () => {
    let { actionsName, currPage, numberPage } = this.state;

    if (currPage === Math.min(...numberPage)) {
      if (actionsName === "#") {
        await this.getAllMoviePage(currPage);
      }
      if (actionsName === "name") {
        await this.getMovieName(currPage);
      }
      if (actionsName === "price") {
        await this.getMoviePrice(currPage);
      }
      if (actionsName === "date") {
        await this.getMovieDAte(currPage);
      }
    } else {
      if (actionsName === "#") {
        await this.getAllMoviePage(currPage - 1);
      }
      if (actionsName === "name") {
        await this.getMovieName(currPage - 1);
      }
      if (actionsName === "price") {
        await this.getMoviePrice(currPage - 1);
      }
      if (actionsName === "date") {
        await this.getMovieDAte(currPage - 1);
      }
    }
  };
  onClickNextPage = async () => {
    let { actionsName, currPage, numberPage } = this.state;

    if (currPage === Math.max(...numberPage)) {
      if (actionsName === "#") {
        await this.getAllMoviePage(currPage);
      }
      if (actionsName === "name") {
        await this.getMovieName(currPage);
      }
      if (actionsName === "price") {
        await this.getMoviePrice(currPage);
      }
      if (actionsName === "date") {
        await this.getMovieDAte(currPage);
      }
    } else {
      if (actionsName === "#") {
        await this.getAllMoviePage(currPage + 1);
      }
      if (actionsName === "name") {
        await this.getMovieName(currPage + 1);
      }
      if (actionsName === "price") {
        await this.getMoviePrice(currPage + 1);
      }
      if (actionsName === "date") {
        await this.getMovieDAte(currPage + 1);
      }
    }
  };
  handleSortName = async () => {
    let res = await getMovieSortName(this.state.currPage);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        actionsName: "name",
      });
    }
  };
  handleSortPrice = async () => {
    let res = await getMovieSortPrice(this.state.currPage);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        actionsName: "price",
      });
    }
  };
  handleSortDate = async () => {
    let res = await getMovieSortDate(this.state.currPage);
    if (res && res.errCode === 0) {
      this.setState({
        arrMovie: res.data,
        actionsName: "date",
      });
    }
  };
  handleGetMovie = async () => {
    await this.getAllMoviePage(this.state.currPage);
    this.setState({
      actionsName: "#",
    });
  };
  handleDeleteMovie = async (id) => {
    let { language } = this.props;
    let res = await putDeleteMovie({ id: id });
    if (res && res.errCode === 0) {
      await this.getAllMoviePage(this.state.currPage);
      let numberPage = this.getAllPage();
      this.setState({
        numberPage: numberPage,
      });
      language === LANGUAGE.VI
        ? toast.success("Xóa phim thành công!")
        : toast.success("Delete movie successfully!");
    } else {
      language === LANGUAGE.VI
        ? toast.error("Xóa phim thất bại!")
        : toast.error("Delete failed movie!");
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
      let res = await getMovieSearchName(currPage, search);
      if (res && res.errCode === 0) {
        this.setState({
          arrMovie: res.data,
          actionsName: "search",
          sizePage: res.pageMovie / res.pageSize,
        });
      }
    }
  };

  handleOnClickDetail = (item) => {
    this.setState({
      isOpModal: true,
      movie: item,
    });
  };
  closeModal = () => {
    this.setState({
      isOpModal: false,
    });
  };
  render() {
    let { arrMovie, movie, currPage, numberPage, search, isOpModal } =
      this.state;
    let { language } = this.props;
    return (
      <>
        <div className="container">
          <div className="title-manege-mobie">
            <FormattedMessage id="manage-movie.manage-movie" />
          </div>
          <div className="row">
            <div className="col-12">
              <ManageCreateMovie
                movie={movie}
                getAllMovie={this.getAllMoviePage}
              />
              <div className="col-sm-4 mb-4">
                <input
                  value={search}
                  onChange={(event) =>
                    this.handleOnChangeSearch(event, "search")
                  }
                  className=" form-control search"
                  type="text"
                  placeholder="Search for..."
                />
                {search}
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      <span
                        className="movie-point"
                        onClick={() => this.handleGetMovie()}
                      >
                        #
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => this.handleSortName()}
                        className="movie-point"
                      >
                        <FormattedMessage id="manage-movie.name" />
                        <i className="fas fa-sort"></i>
                      </span>
                    </th>
                    {/* <th>Thumbail</th> */}
                    <th>
                      <span
                        onClick={() => this.handleSortPrice()}
                        className="movie-point"
                      >
                        <FormattedMessage id="manage-movie.price" />
                        <i className="fas fa-sort"></i>
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => this.handleSortDate()}
                        className="movie-point"
                      >
                        <FormattedMessage id="manage-movie.premiere_date" />
                        <i className="fas fa-sort"></i>
                      </span>
                    </th>
                    <th>
                      <FormattedMessage id="manage-employee.action" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arrMovie &&
                    arrMovie.length > 0 &&
                    arrMovie.map((item, index) => {
                      let Name =
                        language === LANGUAGE.VI ? item.nameVi : item.nameEn;
                      let Price =
                        language === LANGUAGE.VI ? (
                          <NumericFormat
                            value={item.priceData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                          />
                        ) : (
                          <NumericFormat
                            value={item.priceData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        );
                      let premiere_date =
                        language === LANGUAGE.VI
                          ? moment
                              .utc(item.premiere_date)
                              .add(1, "d")
                              .format("DD/MM/YYYY")
                          : moment
                              .utc(item.premiere_date)
                              .add(1, "d")
                              .format("YYYY/MM/DD");
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{Name}</td>
                          {/* <td>
                            {imageBase64 && imageBase64.length > 0 ? (
                              <div
                                className="image-movie"
                                style={{
                                  backgroundImage: `url(${imageBase64})`,
                                }}
                              ></div>
                            ) : (
                              ""
                            )}
                          </td> */}
                          <td>{Price}</td>
                          <td>{premiere_date}</td>
                          <td>
                            <a
                              onClick={() => this.handleOnClickDetail(item)}
                              className="detail-movie"
                              data-tip="Detail"
                            >
                              <i className="fas fa-info-circle">&#xE8B8;</i>
                            </a>
                            <ReactTooltip />
                            <a
                              onClick={() => this.handleEditMovie(item)}
                              className="settings-movie"
                              data-tip="Update"
                            >
                              <i className="fas fa-cog">&#xE8B8;</i>
                            </a>
                            <ReactTooltip />
                            <a
                              className="delete-movie"
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
              <div className="pagination mb-4">
                <a
                  onClick={() => this.onClickPreviousPage()}
                  title="previous page"
                >
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
          </div>
        </div>
        <ModalDetail
          movie={movie}
          isOpenModal={isOpModal}
          closeModal={this.closeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovie);
