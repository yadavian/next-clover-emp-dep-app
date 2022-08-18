import axios from "axios";

export const getDepartments = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3001/department/",
  });
  console.log("response =>", response);
  return response;
};


export let getDepartment = async (id) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:3001/department/${id}`,
  });
  return response;
};

export const addDepartment = async (department) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3001/department/",
    data: department,
  });
  console.log("response =>", response);
  return response;
};

export const editDepartment = async (department, id) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:3001/department/${id}`,
    data: department,
    headers: { "content-type": "application/json" },
  });
  console.log(response);
  return response;
};

export const deleteDepartment = async (id) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:3001/department/${id}`,
  });
  console.log(response);
  return response;
};
