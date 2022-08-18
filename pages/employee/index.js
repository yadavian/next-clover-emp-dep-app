import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button"; 
import toast from "react-hot-toast"; 
import { useDispatch } from "react-redux";
import { deleteEmployee, getEmployees } from "../../services/employeeServices";
import { hideLoading, showLoading } from "../../redux/slices/homeSlice";
import Layout from "../../components/layout/Layout";
import MuiTable from "../../components/mui-table/MuiTable";

const EmployeeDashboardPage = () => {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "Employee ID",
    },
    {
      id: "empName",
      numeric: false,
      disablePadding: false,
      label: "Employee Name",
    },
    {
      id: "empSalary",
      numeric: false,
      disablePadding: false,
      label: "Salary",
    },
    {
      id: "empDesignation",
      numeric: false,
      disablePadding: false,
      label: "Designation",
    },
    {
      id: "deptName",
      numeric: false,
      disablePadding: false,
      label: "Department",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setRows(response.data);
  };

  useEffect(() => {
    dispatch(showLoading());
    fetchEmployees();
    dispatch(hideLoading());
  }, []);

  const deleteEmployeeData = async (id) => {
    dispatch(showLoading());
    const response = await deleteEmployee(id);
    console.log(response);
    if (response.status == 200) {
      toast.success("deleted successfully.");
      fetchEmployees();
    }
    dispatch(hideLoading());
  };

  return (
    <Layout>
      <MuiTable
        rows={rows}
        headCells={headCells}
        deleteUser={deleteEmployeeData}
        entity="employee"
      />
    </Layout>
  );
};

export default EmployeeDashboardPage;
