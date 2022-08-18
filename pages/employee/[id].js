import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { hideLoading, showLoading } from "../../redux/slices/homeSlice";
import { addEmployee, editEmployee, getEmployee } from "../../services/employeeServices";
import { getDepartments } from "../../services/departmentService";
import Layout from "../../components/layout/Layout";
import { designation } from "../../data/employeeData";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const location = useRouter();
  const { id } = location.query
  // const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState({
    empName: "",
    empDesignation: "",
    empSalary: "",
    deptName: "",
  });
  const login = useSelector((state) => state.login);
  const { userType } = login;
  console.log("employeeInfo => ", employeeInfo);

  const handleChange = (e) => {
    setEmployeeInfo({ ...employeeInfo, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    let errors = {};
    console.log(values);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const salaryRegex = /^[1-9][0-9]*(\.[0-9])?/;

    if (!values.empName) {
      errors.empName = "Employee name required.";
    } else if (nameRegex.test(values.empName) == false) {
      errors.empName = "Invalid employee name.";
    }

    if (!values.empSalary) {
      errors.empSalary = "Employee Salary required.";
    } else if (salaryRegex.test(values.empSalary) == false) {
      errors.empSalary = "Invalid Salary.";
    }

    if (values.empDesignation == "") {
      errors.empDesignation = "Designation required.";
    }
    if (values.deptName == "") {
      errors.deptName = "Department required.";
    }

    console.log(errors);
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await setFormErrors(validate(employeeInfo));
    const isEmpty = !Object.values(employeeInfo).every((o) => o !== "");
    // const isEmpty = await Object.keys(formErrors).length === 0;
    console.log(Object.keys(formErrors).length === 0);
    console.log(isEmpty);
    console.log(id);
    // return;
    dispatch(showLoading());

    if (!isEmpty) {
      if (id) {
        const response = await editEmployee(employeeInfo, id);
        if (response.status == 201 || response.status == 200) {
          // alert("updated employee");
          toast.success("updated employee.");
          dispatch(hideLoading());
          if (userType == "admin") {
            location.push("/employee");
          }
        } else {
          // alert("something went wrong with update !");
          toast.error("something went wrong with update !");
          dispatch(hideLoading());
        }
      } else {
        const response = await addEmployee(employeeInfo);
        if (response.status == 201) {
          // alert("added employee");
          toast.success("added employee");
          dispatch(hideLoading());
          location.push("/employee");
        } else {
          // alert("something went wrong !");
          toast.error("something went wrong !");
          dispatch(hideLoading());
        }
      }
    }

    dispatch(hideLoading());
  };

  const getEmployeeData = async () => {
    const response = await getEmployee(id);
    console.log(response);
    setEmployeeInfo(response.data);
  };

  const getDepartmentsData = async () => {
    const response = await getDepartments();
    console.log(response);
    setDepartments(response.data);
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  useEffect(() => {
    getDepartmentsData();
  }, []);

  useEffect(() => {
    if (location.pathname == "employee/add-employee") {
      setEmployeeInfo({
        empName: "",
        empDesignation: "",
        empSalary: "",
        deptName: "",
      });
    }
  }, [location]);
  return (
    <Layout>
      <div className="container">
        <div className="col-md-8" style={{ margin: "0 auto" }}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-container">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 input-container">
                    <label>Name</label>
                    <input
                      type="text"
                      name="empName"
                      value={employeeInfo.empName}
                      onChange={handleChange}
                    />
                    {formErrors.empName && (
                      <p className="custom-error-text">{formErrors.empName}</p>
                    )}
                  </div>
                  <div className="col-md-6 input-container">
                    <label>Salary</label>
                    <input
                      type="number"
                      name="empSalary"
                      value={employeeInfo.empSalary}
                      onChange={handleChange}
                    />
                    {formErrors.empSalary && (
                      <p className="custom-error-text">
                        {formErrors.empSalary}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 input-container">
                    <label>Designation</label>
                    <select name="empDesignation" onChange={handleChange}>
                      {/* <option value="0">Select Designation</option>  */}

                      {id ? (
                        <option value={employeeInfo.empDesignation}>
                          {employeeInfo.empDesignation}
                        </option>
                      ) : (
                        <option value="0">Select Department</option>
                      )}
                      {designation &&
                        designation.map((item, index) => {
                          return (
                            <>
                              <option value={item.empDesignation} key={index}>
                                {item.empDesignation}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    {formErrors.empDesignation && (
                      <p className="custom-error-text">
                        {formErrors.empDesignation}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 input-container">
                    <label>Department</label>
                    <select name="deptName" onChange={handleChange}>
                      {/* <option value="0">Select Department</option>
                    <option value="IT">Information Technology</option>
                    <option value="HR">Human Resource</option>
                    <option value="Hr Manager">Hr Manager</option> */}

                      {id ? (
                        <option value={employeeInfo.deptName}>
                          {employeeInfo.deptName}
                        </option>
                      ) : (
                        <option value="0">Select Department</option>
                      )}
                      {departments &&
                        departments.map((item, index) => {
                          return (
                            <>
                              <option key={index} value={item.deptName}>
                                {item.deptName}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    {formErrors.deptName && (
                      <p className="custom-error-text">{formErrors.deptName}</p>
                    )}
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="custom-button">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEmployee;
