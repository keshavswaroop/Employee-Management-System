import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = () => {
  return axios.get(BASE_URL);
};

export const createEmployee = (employee) => {
  return axios.post(BASE_URL, employee);
};

//The  below line of code represents shortend way of writing the above code
//export const createEmployee = (employee) => axios.post(BASE_URL, employee);

//To get the existing data fro update table fields
export const getEmployeeDetails = (employeeId) => {
  return axios.get(BASE_URL + "/" + employeeId);
};

export const updateEmployee = (employeeId, employee) => {
  return axios.put(BASE_URL + "/" + employeeId, employee);
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(BASE_URL + "/" + employeeId);
};
