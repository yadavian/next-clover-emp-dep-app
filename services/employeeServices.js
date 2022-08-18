import axios from "axios";

export const addEmployee = async (employee) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3001/employees/",
    data: employee,
    headers: { "content-type": "application/json" },
  });
  console.log("response =>", response);
  return response;
};

export const getEmployees = async (employee) => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3001/employees/",
  });
  console.log("response =>", response);
  return response;
};

export let getEmployee = async (id) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:3001/employees/${id}`,
  });
  return response;
};

export const editEmployee = async (employee, id) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:3001/employees/${id}`,
    data: employee,
    headers: { "content-type": "application/json" },
  });
  console.log(response);
  return response;
};

export const deleteEmployee = async (id) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:3001/employees/${id}`, 
  });
  console.log(response);
  return response;
};
