import axios from "../axios";

const postSendEmailToken = (data) => {
  return axios.post("/api/send-email-token", data);
};

const handleForgotPassword = (data) => {
  return axios.post("/api/forgot-password-employee", data);
};
const timeOutDeleteToken = (data) => {
  return axios.post("/api/time-out-delete-token", data);
};

const handleChangePassword = (data) => {
  return axios.put("/api/change-password-employee", data);
};

export {
  postSendEmailToken,
  handleForgotPassword,
  timeOutDeleteToken,
  handleChangePassword,
};
