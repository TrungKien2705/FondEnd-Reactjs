import axios from "../axios";
//login
const handleLogin = (email, password) => {
  return axios.post("/api/login-employee", {
    email,
    password,
  });
};

const handleRegister = (data) => {
  return axios.post("/api/register-employee", data);
};
//All code
const getAllCode = (type) => {
  return axios.get(`/api/get-allcode?type=${type}`);
};

//employee
const getAllEmployee = (id, page) => {
  return axios.get(`/api/get-all-employee?id=${id}&page=${page}`);
};

const updateEmployeeInfor = (data) => {
  return axios.put("/api/update-employee", data);
};
const delectEmployeeInfor = (data) => {
  return axios.put(`/api/delete-employee`, data);
};
//Movie
const getAllMovie = (page) => {
  return axios.get(`/api/get-all-movie?page=${page}`);
};
const getAllTopMovie = () => {
  return axios.get(`/api/get-top-movie-hot`);
};
const createNewMovie = (data) => {
  return axios.post("/api/post-create-movie", data);
};
const bulkCreateScheduleMovie = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const putUpdateMovie = (data) => {
  return axios.put(`/api/update-movie`, data);
};
const getMovieById = (id) => {
  return axios.get(`/api/get-movie-by-id?id=${id}`);
};
const getScheduleMovieByDate = (date, movieId) => {
  return axios.get(
    `/api/get-schedule-movie-by-date?date=${date}&movieId=${movieId}`
  );
};
//Cinema
const getAllNamecinema = () => {
  return axios.get("/api/get-all-name-cinema");
};
const postCreateCinema = (data) => {
  return axios.post("/api/post-create-cinema", data);
};
const getTopCinemaHome = () => {
  return axios.get("/api/get-top-cinema-home");
};
const getCinemaById = (id) => {
  return axios.get(`/api/get-cinema-by-id?id=${id}`);
};
const getMovieByCinema = (cinemaId) => {
  return axios.get(`/api/get-movie-by-cinema?cinemaId=${cinemaId}`);
};
const putUpdateCinema = (data) => {
  return axios.put("/api/put-update-cinema", data);
};

const getAllCinema = (page) => {
  return axios.get(`/api/get-all-cinema?page=${page}`);
};
//customer
const postBookingMovie = (data) => {
  return axios.post("/api/customer-book-movie", data);
};
const verifyBookingMovie = (data) => {
  return axios.post("/api/verify-customer-book-movie", data);
};
const cancelBookingMovie = (data) => {
  return axios.post("/api/cancel-customer-book-movie", data);
};
const getAllCustomer = () => {
  return axios.get("/api/get-all-customer");
};
//booking
const getListBookingMovie = (date) => {
  return axios.get(`/api/get-list-booking-movie?date=${date}`);
};
//new & Promotion
const postCreateNew = (data) => {
  return axios.post("/api/post-create-new", data);
};
const postCreatePromotion = (data) => {
  return axios.post("/api/post-create-promotion", data);
};

const putUpdateNew = (data) => {
  return axios.put("/api/put-update-new", data);
};

const putUpdatePromotion = (data) => {
  return axios.put("/api/put-update-promotion", data);
};
const postDeleteNew = (id) => {
  return axios.post("/api/post-delete-new", id);
};

const postDeletePromotion = (id) => {
  return axios.post("/api/post-delete-promotion", id);
};
const getAllNewPage = (page) => {
  return axios.get(`/api/get-all-new-page?page=${page}`);
};
const getAllPromotionPage = (page) => {
  return axios.get(`/api/get-all-promotion-page?page=${page}`);
};

const getPromotionById = (id) => {
  return axios.get(`/api/get-promotion-by-id?id=${id}`);
};
const getNewById = (id) => {
  return axios.get(`/api/get-new-by-id?id=${id}`);
};

export {
  handleLogin,
  handleRegister,
  getAllEmployee,
  getAllCode,
  updateEmployeeInfor,
  delectEmployeeInfor,
  getAllMovie,
  getAllTopMovie,
  createNewMovie,
  getAllNamecinema,
  putUpdateMovie,
  getMovieById,
  bulkCreateScheduleMovie,
  getScheduleMovieByDate,
  postCreateCinema,
  getTopCinemaHome,
  postBookingMovie,
  verifyBookingMovie,
  cancelBookingMovie,
  getListBookingMovie,
  getCinemaById,
  getMovieByCinema,
  postCreateNew,
  postCreatePromotion,
  getAllCustomer,
  getAllNewPage,
  getAllPromotionPage,
  getNewById,
  getPromotionById,
  getAllCinema,
  putUpdateCinema,
  putUpdateNew,
  postDeleteNew,
  putUpdatePromotion,
  postDeletePromotion,
};
