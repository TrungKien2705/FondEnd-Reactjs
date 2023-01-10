import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE, CommonUtils } from "../../../utils";
import { createNewMovie, putUpdateMovie } from "../../../services/userService";
import Select from "react-select";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { enAU, vi } from "date-fns/locale";
registerLocale("vi", vi);
registerLocale("en", enAU);
class ManageCreateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameVi: "",
      nameEn: "",
      image: "",
      listCinema: [],
      selectCinema: "",
      director: "",
      listPrice: [],
      selectPrice: "",
      listCate: [],
      selectCate: "",
      timeType: "",
      listCountry: [],
      selectCountry: "",
      premiere_date: "",
      trailer: "",
      descriptionVi: "",
      descriptionEn: "",
      action: true,
      openCreate: false,
    };
  }
  async componentDidMount() {
    await this.props.getRequiredAllMovie();
    // this.getRequiredAllMovieById();
  }
  getRequiredAllMovieById = () => {
    let { movie } = this.props;
    // console.log("prop", movie);
    let { listCate, listCinema, listCountry, listPrice } = this.state;
    let day = "";
    if (movie.premiere_date) {
      day = new Date(movie.premiere_date);
    }
    let imageBase64 = "";
    if (movie.image) {
      imageBase64 = new Buffer.from(movie.image, "base64").toString("binary");
    }
    let selectCinema = "",
      selectCate = "",
      selectCountry = "",
      selectPrice = "";

    selectCinema = listCinema.find((item) => {
      return item && item.value === movie.cinemaId;
    });
    selectCate = listCate.find((item) => {
      return item && item.value === movie.categoryId;
    });
    selectCountry = listCountry.find((item) => {
      return item && item.value === movie.countryType;
    });
    selectPrice = listPrice.find((item) => {
      return item && item.value === movie.priceId;
    });
    this.setState({
      id: movie.id,
      nameVi: movie.nameVi,
      nameEn: movie.nameEn,
      image: imageBase64,
      selectCinema: selectCinema,
      director: movie.director,
      selectPrice: selectPrice,
      selectCate: selectCate,
      timeType: movie.timeType,
      selectCountry: selectCountry,
      premiere_date: day,
      trailer: movie.trailer,
      descriptionVi: movie.descriptionVi,
      descriptionEn: movie.descriptionEn,
      action: false,
    });
  };
  clearState = () => {
    this.setState({
      nameVi: "",
      nameEn: "",
      image: "",
      selectCinema: "",
      director: "",
      selectPrice: "",
      selectCate: "",
      timeType: "",
      selectCountry: "",
      premiere_date: "",
      trailer: "",
      descriptionVi: "",
      descriptionEn: "",
      action: true,
    });
  };
  async componentDidUpdate(prevProps) {
    if (this.props.movieRequired !== prevProps.movieRequired) {
      let { resPrice, resCate, resCountry, rescinema } =
        this.props.movieRequired;
      let dataSelectCinema = this.builDataInputSelect(rescinema, "CINEMA");
      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
      let dataSelectCate = this.builDataInputSelect(resCate, "CATEGORY");
      let dataSelectCountry = this.builDataInputSelect(resCountry, "COUNTRY");

      this.setState({
        listCinema: dataSelectCinema,
        listCate: dataSelectCate,
        listPrice: dataSelectPrice,
        listCountry: dataSelectCountry,
      });
    }
    if (this.props.language !== prevProps.language) {
      let { resPrice, resCate, resCountry, rescinema } =
        this.props.movieRequired;
      let dataSelectCinema = this.builDataInputSelect(rescinema, "CINEMA");
      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
      let dataSelectCate = this.builDataInputSelect(resCate, "CATEGORY");
      let dataSelectCountry = this.builDataInputSelect(resCountry, "COUNTRY");
      console.log("dataSelectCinema", dataSelectCinema);
      console.log("selectCinema", this.state.selectCinema);
      console.log("rescinema", rescinema);
      this.setState({
        // selectCinema: dataSelectCinema[0].value,
        listCinema: dataSelectCinema,
        listCate: dataSelectCate,
        listPrice: dataSelectPrice,
        listCountry: dataSelectCountry,
      });
    }
    if (this.props.movie !== prevProps.movie) {
      this.getRequiredAllMovieById();
    }
  }
  builDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "CINEMA") {
        inputData.map((item) => {
          let odject = {};
          let lableVi = `${item.nameVi}`;
          let lableEn = `${item.nameEn}`;

          odject.label = language === LANGUAGE.VI ? lableVi : lableEn;
          odject.value = item.id;
          result.push(odject);
        });
      }
      if (type === "PRICE") {
        inputData.map((item) => {
          let odject = {};
          let lableVi = `${item.valueVi} VNĐ`;
          let lableEn = `${item.valueEn} USD`;

          odject.label = language === LANGUAGE.VI ? lableVi : lableEn;
          odject.value = item.keyMap;

          result.push(odject);
        });
      }
      if (type === "CATEGORY" || type === "COUNTRY") {
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
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
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
  handleChangeSelectMovie = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  checkValidateInput = () => {
    let { language } = this.props;
    let arrCheck = [
      "nameVi",
      "image",
      "nameEn",
      "selectCinema",
      "director",
      "selectPrice",
      "selectCate",
      "timeType",
      "selectCountry",
      "premiere_date",
      "trailer",
      "descriptionVi",
      "descriptionEn",
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
  handleDatePicker = (date) => {
    this.setState({
      premiere_date: date,
    });
  };

  handleSaveMovie = async () => {
    let isValid = this.checkValidateInput();
    // if (!this.state.premiere_date) {
    //   toast.error("Vui lòng điền trường Date !");
    //   return;
    // }
    if (isValid === false) return;
    let { action } = this.state;
    let { language } = this.props;
    if (action === true) {
      let req = await createNewMovie({
        nameVi: this.state.nameVi,
        nameEn: this.state.nameEn,
        image: this.state.image,
        cinemaId: this.state.selectCinema.value,
        director: this.state.director,
        priceId: this.state.selectPrice.value,
        categoryId: this.state.selectCate.value,
        timeType: this.state.timeType,
        countryType: this.state.selectCountry.value,
        premiere_date: this.state.premiere_date,
        trailer: this.state.trailer,
        descriptionVi: this.state.descriptionVi,
        descriptionEn: this.state.descriptionEn,
      });
      if (req && req.errCode === 0) {
        this.clearState();
        await this.props.getAllMovie();

        language === LANGUAGE.VI
          ? toast.success("Thêm phim thàng công")
          : toast.success("Create movie success");
      } else {
        language === LANGUAGE.VI
          ? toast.error("Thêm phim thất bại")
          : toast.error("Create movie failed");
      }
    }
    if (action === false) {
      let res = await putUpdateMovie({
        id: this.state.id,
        nameVi: this.state.nameVi,
        nameEn: this.state.nameEn,
        image: this.state.image,
        cinemaId: this.state.selectCinema.value,
        director: this.state.director,
        priceId: this.state.selectPrice.value,
        categoryId: this.state.selectCate.value,
        timeType: this.state.timeType,
        countryType: this.state.selectCountry.value,
        premiere_date: this.state.premiere_date,
        trailer: this.state.trailer,
        descriptionVi: this.state.descriptionVi,
        descriptionEn: this.state.descriptionEn,
      });
      if (res && res.errCode === 0) {
        this.clearState();
        await this.props.getAllMovie(1);

        language === LANGUAGE.VI
          ? toast.success("Sửa phim thàng công")
          : toast.success("Edit movie success");
      } else {
        language === LANGUAGE.VI
          ? toast.error("Sửa phim thất bại")
          : toast.error("Edit movie failed");
      }
    }
  };
  openCreateMovie = () => {
    this.setState({
      openCreate: !this.state.openCreate,
    });
  };

  render() {
    let {
      nameVi,
      nameEn,
      selectCinema,
      director,
      selectPrice,
      selectCate,
      timeType,
      selectCountry,
      premiere_date,
      trailer,
      descriptionVi,
      descriptionEn,
      listPrice,
      listCate,
      listCountry,
      listCinema,
      action,
      openCreate,
    } = this.state;
    let { language } = this.props;
    let date = language === LANGUAGE.VI ? "dd/MM/yyyy" : "yyyy/MM/dd";
    let lan = language === LANGUAGE.VI ? "vi" : "en";
    return (
      <>
        <div className="btn-create-movie">
          <button
            onClick={() => this.openCreateMovie()}
            className="btn btn-success"
          >
            <FormattedMessage id="manage-movie.create" />
          </button>
        </div>
        {openCreate === true ? (
          <div className="row">
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.nameVi" />
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
                <FormattedMessage id="manage-movie.nameEn" />
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
                <FormattedMessage id="manage-movie.image" />
              </label>
              <input
                onChange={(event) => this.handleOnChangeImg(event)}
                className="form-control"
                type="file"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.cinema" />
              </label>
              <Select
                value={selectCinema}
                onChange={this.handleChangeSelectMovie}
                options={listCinema}
                placeholder={<FormattedMessage id="manage-movie.cinema" />}
                name={"selectCinema"}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.price" />
              </label>
              <Select
                value={selectPrice}
                onChange={this.handleChangeSelectMovie}
                options={listPrice}
                placeholder={<FormattedMessage id="manage-movie.price" />}
                name={"selectPrice"}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.cate" />
              </label>
              <Select
                value={selectCate}
                onChange={this.handleChangeSelectMovie}
                placeholder={<FormattedMessage id="manage-movie.cate" />}
                options={listCate}
                name={"selectCate"}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.country" />
              </label>
              <Select
                value={selectCountry}
                onChange={this.handleChangeSelectMovie}
                options={listCountry}
                placeholder={<FormattedMessage id="manage-movie.country" />}
                name={"selectCountry"}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.time" />
              </label>
              <input
                value={timeType}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "timeType")
                }
                className="form-control"
                type="number"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.premiere_date" />
              </label>
              <DatePicker
                className="form-control"
                selected={premiere_date}
                onChange={this.handleDatePicker}
                minDate={new Date()}
                dateFormat={date}
                locale={lan}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.director" />
              </label>
              <input
                value={director}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "director")
                }
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-8 form-group">
              <label htmlFor="">Trailer</label>
              <input
                value={trailer}
                onChange={(event) => this.handleOnChangeInput(event, "trailer")}
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.desVi" />
              </label>
              <textarea
                value={descriptionVi}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "descriptionVi")
                }
                className="form-control"
                rows="5"
              ></textarea>
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-movie.desEn" />
              </label>
              <textarea
                value={descriptionEn}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "descriptionEn")
                }
                className="form-control"
                rows="5"
              ></textarea>
            </div>

            <div className="btn-submit mt-4 mb-4  ">
              <button
                onClick={() => this.handleSaveMovie()}
                className={
                  action === true ? "btn btn-success" : "btn btn-warning"
                }
              >
                {action === true ? (
                  <FormattedMessage id="manage-movie.save" />
                ) : (
                  <FormattedMessage id="manage-movie.edit" />
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
    movieRequired: state.admin.movieRequired,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredAllMovie: () => dispatch(actions.getRequiredAllMovie()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCreateMovie);
