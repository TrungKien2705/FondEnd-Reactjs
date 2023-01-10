import actionTypes from "../actions/actionTypes";

const initialState = {
  empRequired: [],
  allEmployee: [],
  movieRequired: [],
  allTime: [],
  allMovie: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //get all required emp infor
    case actionTypes.GET_EMPLOYEE_INFOR_SUCCESS:
      state.empRequired = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_EMPLOYEE_INFOR_FAILED:
      state.empRequired = [];
      return {
        ...state,
      };
    //get all employee
    case actionTypes.GET_ALL_EMPLOYEE_SUCCESS:
      state.allEmployee = action.allEmployee;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_EMPLOYEE_FAILED:
      state.allEmployee = [];
      return {
        ...state,
      };
    //get all required Movie
    case actionTypes.GET_ALL_REQUIRED_MOVIE_SUCCESS:
      state.movieRequired = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_REQUIRED_MOVIE_FAILED:
      state.movieRequired = [];
      return {
        ...state,
      };
    //get all Schedule Time
    case actionTypes.GET_ALL_SCHEDULE_TIME_SUCCESS:
      state.allTime = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_SCHEDULE_TIME_FAILED:
      state.allTime = [];
      return {
        ...state,
      };
    //get All Movie
    case actionTypes.GET_ALL_MOVIE_SUCCESS:
      state.allMovie = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_MOVIE_FAILED:
      state.allMovie = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
