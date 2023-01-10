import actionTypes from "./actionTypes";
import {
  getAllCode,
  delectEmployeeInfor,
  getAllEmployee,
  getAllNamecinema,
} from "../../services/userService";
import { getAllMovieName } from "../../services/movieService";
import { toast } from "react-toastify";
//get all requires employee
export const getRequiredEmployeeInfor = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_EMPLOYEE_INFOR_START });
      let resGender = await getAllCode("GENDER");
      let resProvince = await getAllCode("PROVINCE");
      let resRole = await getAllCode("ROLE");
      if (
        resGender &&
        resGender.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resRole &&
        resRole.errCode === 0
      ) {
        let data = {
          resRole: resRole.data,
          resGender: resGender.data,
          resProvince: resProvince.data,
        };
        dispatch(getEmployeeInforSuccess(data));
      } else {
        dispatch(getEmployeeInforfailed());
      }
    } catch (error) {
      dispatch(getEmployeeInforfailed());
      console.log(error);
    }
  };
};

export const getEmployeeInforSuccess = (dataEmp) => ({
  type: actionTypes.GET_EMPLOYEE_INFOR_SUCCESS,
  data: dataEmp,
});

export const getEmployeeInforfailed = () => ({
  type: actionTypes.GET_EMPLOYEE_INFOR_FAILED,
});

//get all employ
export const getAllEmployeeRedux = () => {
  return async (dispatch) => {
    try {
      // dispatch({ type: actionTypes.GET_ALL_EMPLOYEE_START });
      let res = await getAllEmployee("ALL");
      if (res && res.errCode === 0) {
        dispatch(getAllEmployeeSuccess());
      } else {
        dispatch(getAllEmployeeFailed());
      }
    } catch (error) {
      dispatch(getAllEmployeeFailed());
      console.log(error);
    }
  };
};

export const getAllEmployeeSuccess = (data) => ({
  type: actionTypes.GET_ALL_EMPLOYEE_SUCCESS,
  allEmployee: data,
});

export const getAllEmployeeFailed = () => ({
  type: actionTypes.GET_ALL_EMPLOYEE_FAILED,
});

// delete employss
export const deletectEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DELETECT_EMPLOYEE_START });
      let res = await delectEmployeeInfor(id);
      if (res && res.errCode === 0) {
        dispatch(deletectEmployeeSuccess());
        dispatch(getAllEmployeeRedux());
        toast.success("🦄Delete user success!");
      } else {
        toast.error("🦄Delete user error!");
        dispatch(deletectEmployeeFailed());
      }
    } catch (error) {
      dispatch(deletectEmployeeFailed());
      console.log(error);
    }
  };
};

export const deletectEmployeeSuccess = () => ({
  type: actionTypes.DELETECT_EMPLOYEE_SUCCESS,
});

export const deletectEmployeeFailed = () => ({
  type: actionTypes.DELETECT_EMPLOYEE_FAILED,
});

//get all requiured moie
export const getRequiredAllMovie = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_ALL_REQUIRED_MOVIE_START });
      let rescinema = await getAllNamecinema();
      let resPrice = await getAllCode("PRICE");
      let resCate = await getAllCode("CATEGORY");
      let resCountry = await getAllCode("COUNTRY");
      if (
        rescinema &&
        rescinema.errCode === 0 &&
        resPrice &&
        resPrice.errCode === 0 &&
        resCate &&
        resCate.errCode === 0 &&
        resCountry &&
        resCountry.errCode === 0
      ) {
        let data = {
          rescinema: rescinema.data,
          resPrice: resPrice.data,
          resCate: resCate.data,
          resCountry: resCountry.data,
        };
        dispatch(getRequiredAllMovieSuccess(data));
      } else {
        dispatch(getRequiredAllMoviefailed());
      }
    } catch (error) {
      dispatch(getRequiredAllMoviefailed());
      console.log(error);
    }
  };
};

export const getRequiredAllMovieSuccess = (data) => ({
  type: actionTypes.GET_ALL_REQUIRED_MOVIE_SUCCESS,
  data: data,
});

export const getRequiredAllMoviefailed = () => ({
  type: actionTypes.GET_ALL_REQUIRED_MOVIE_FAILED,
});
//get all schedudule time
export const getAllScheduleTime = () => {
  return async (dispatch) => {
    try {
      // dispatch({ type: actionTypes.GET_ALL_SCHEDULE_TIME_START });
      let resTime = await getAllCode("TIME");
      if (resTime && resTime.errCode === 0) {
        let data = {
          resTime: resTime.data,
        };
        dispatch(getAllScheduleTimeSuccess(data));
      } else {
        dispatch(getAllScheduleTimefailed());
      }
    } catch (error) {
      dispatch(getAllScheduleTimefailed());
    }
  };
};

export const getAllScheduleTimeSuccess = (data) => ({
  type: actionTypes.GET_ALL_SCHEDULE_TIME_SUCCESS,
  data: data,
});

export const getAllScheduleTimefailed = () => ({
  type: actionTypes.GET_ALL_SCHEDULE_TIME_FAILED,
});
//get all Movie
export const fetchAllMovie = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_ALL_MOVIE_START });
      let resMovie = await getAllMovieName();
      if (resMovie && resMovie.errCode === 0) {
        dispatch(getAllMovieSuccess(resMovie));
      } else {
        dispatch(getAllMoviefailed());
      }
    } catch (error) {
      dispatch(getAllMoviefailed());
    }
  };
};

export const getAllMovieSuccess = (resMovie) => ({
  type: actionTypes.GET_ALL_MOVIE_SUCCESS,
  data: resMovie.data,
});

export const getAllMoviefailed = () => ({
  type: actionTypes.GET_ALL_MOVIE_FAILED,
});
