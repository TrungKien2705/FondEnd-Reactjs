import axios from "../axios";

const getMovieSortName = (page) => {
  return axios.get(`/api/get-movie-sort-name?page=${page}`);
};
const getMovieSortPrice = (page) => {
  return axios.get(`/api/get-movie-sort-price?page=${page}`);
};
const getMovieSortDate = (page) => {
  return axios.get(`/api/get-movie-sort-date?page=${page}`);
};
const getMovieSearchName = (page, search) => {
  return axios.get(`/api/get-movie-search-name?page=${page}&search=${search}`);
};

const putDeleteMovie = (data) => {
  return axios.put("/api/put-delete-movie", data);
};

const getRandomMovie = () => {
  return axios.get(`/api/get-random-movie`);
};

const getAllMovieName = () => {
  return axios.get(`/api/get-all-movie-name`);
};

const deleteScheduleMovie = (id) => {
  return axios.post(`/api/delete-schedule-movie-by-date`, id);
};

const getMovieUpcomming = () => {
  return axios.get(`/api/get-all-movie-upcomming`);
};
const getMoviePlay = () => {
  return axios.get(`/api/get-all-movie-play`);
};

const postSendRemedy = (data) => {
  return axios.post("/api/post-send-remedy", data);
};
export {
  getMovieSortName,
  getMovieSortPrice,
  getMovieSortDate,
  putDeleteMovie,
  getMovieSearchName,
  getRandomMovie,
  getAllMovieName,
  deleteScheduleMovie,
  getMovieUpcomming,
  getMoviePlay,
  postSendRemedy,
};
