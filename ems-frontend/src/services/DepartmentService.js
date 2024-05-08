import axios from "axios";

const DEPT_URL = "http://localhost:8080/api/department";

export const getAllDepartment = () => {
  return axios.get(DEPT_URL);
};

export const createDepartment = (dept) => {
  console.log(dept);
  return axios.post(DEPT_URL, dept);
};

export const fetchDeatils = (deptId) => {
  return axios.get(DEPT_URL + "/" + deptId);
};

export const updateDepartment = (deptId, dept) => {
  return axios.put(DEPT_URL + "/" + deptId, dept);
};

export const deleteDepartment = (deptId) => {
  return axios.delete(DEPT_URL + "/" + deptId);
};
