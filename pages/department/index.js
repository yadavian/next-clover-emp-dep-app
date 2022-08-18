import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button"; 
import toast from "react-hot-toast"; 
import { useDispatch } from "react-redux";
import { deleteDepartment, getDepartments } from "../../services/departmentService";
import { hideLoading, showLoading } from "../../redux/slices/homeSlice";
import MuiTable from "../../components/mui-table/MuiTable";
import Layout from "../../components/layout/Layout";

const DepartmentDashboardPage = () => {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "Department ID",
    },
    {
      id: "depName",
      numeric: false,
      disablePadding: false,
      label: "Department Name",
    },
    {
      id: "deptAddress",
      numeric: false,
      disablePadding: false,
      label: "Department Address",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const fetchDepartment = async () => {
    const response = await getDepartments();
    setRows(response.data);
  };

  useEffect(() => {
    dispatch(showLoading());
    fetchDepartment();
    dispatch(hideLoading());
  }, []);

  const deleteDepartmentData = async (id) => {
    dispatch(showLoading());
    const response = await deleteDepartment(id);
    console.log(response);
    if (response.status == 200) {
      toast.success("department deleted.");
      fetchDepartment();
    }
    dispatch(hideLoading());
  };

  return (
    <Layout>
      <MuiTable
        rows={rows}
        headCells={headCells}
        deleteUser={deleteDepartmentData}
        entity="department"
      />
    </Layout>
  );
};

export default DepartmentDashboardPage;
