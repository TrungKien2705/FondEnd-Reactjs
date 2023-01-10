import axios from "../axios";

const getAllEmployeeSortName = (page) => {
  return axios.get(`/api/get-all-employee-sort-by-name?page=${page}`);
};
const getAllEmployeeSortEmail = (page) => {
  return axios.get(`/api/get-all-employee-sort-by-email?page=${page}`);
};
const getAllEmployeeSortRole = (page) => {
  return axios.get(`/api/get-all-employee-sort-by-roleId?page=${page}`);
};
const getEmployeeSreach = (page, search) => {
  return axios.get(`/api/get-employee-by-search?page=${page}&search=${search}`);
};
export {
  getAllEmployeeSortName,
  getAllEmployeeSortEmail,
  getAllEmployeeSortRole,
  getEmployeeSreach,
};
