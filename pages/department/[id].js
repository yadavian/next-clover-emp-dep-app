import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  addDepartment,
  editDepartment,
  getDepartment,
} from "../../services/departmentService";
import { hideLoading, showLoading } from "../../redux/slices/homeSlice";
import Layout from "../../components/layout/Layout";
import { departmentCity } from "../../data/employeeData";

const AddDepartment = () => {
  // const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useRouter();
  console.log("navigate =>", navigate);
  const { id } = navigate.query


  const [formErrors, setFormErrors] = useState({});
  const [department, setDepartment] = useState({
    deptName: "",
    deptAddress: "",
  });

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    let errors = {};
    console.log(values);
    const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

    if (!values.deptName) {
      errors.deptName = "Department name required.";
    } else if (nameRegex.test(values.deptName) == false) {
      errors.deptName = "Invalid department name.";
    }

    if (values.deptAddress == "") {
      errors.deptAddress = "Designation required.";
    }

    console.log(errors);
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(department);
    await setFormErrors(validate(department));
    const isEmpty = !Object.values(department).every((o) => o !== "");
    // const isEmpty = await Object.keys(formErrors).length === 0;
    console.log(Object.keys(formErrors).length === 0);
    console.log(isEmpty);
    // return;
    dispatch(showLoading());
    if (!isEmpty) {
      if (id) {
        const response = await editDepartment(department, id);
        if (response.status == 200 || response.status == 201) {
          dispatch(hideLoading());
          navigate.push("/department");
        }
      } else {
        const response = await addDepartment(department);
        if (response.status == 200 || response.status == 201) {
          dispatch(hideLoading());
          navigate.push("/department");
        }
      }
    }

    dispatch(hideLoading());
  };

  const getDepartmentData = async () => {
    const response = await getDepartment(id);
    console.log(response);
    setDepartment(response.data);
  };

  React.useEffect(() => {
    dispatch(showLoading());
    getDepartmentData();
    dispatch(hideLoading());
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="col-md-6" style={{ margin: "0 auto" }}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-container">
              <div className="container">
                <div className="row">
                  <div className="col-md-12  input-container">
                    <label>Department Name</label>
                    <input
                      type="text"
                      name="deptName"
                      value={department.deptName}
                      onChange={handleChange}
                    />
                    {formErrors.deptName && (
                      <p className="custom-error-text">{formErrors.deptName}</p>
                    )}
                  </div>
                  {/* <div className="col-md-12  input-container">
                    <label>Department Address</label>
                    <input
                      type="text"
                      name="deptAddress"
                      value={department.deptAddress}
                      onChange={handleChange}
                    />
                    {formErrors.deptAddress && (
                      <p className="custom-error-text">
                        {formErrors.deptAddress}
                      </p>
                    )}
                  </div> */}

                  <div className="col-md-12 input-container">
                    <label>Department City</label>
                    <select name="deptAddress" onChange={handleChange}>
                      {/* <option value="0">Select Designation</option>  */}

                      {id ? (
                        <option value={department.deptAddress}>
                          {department.deptAddress}
                        </option>
                      ) : (
                        <option value="0">Select Department</option>
                      )}
                      {departmentCity &&
                        departmentCity.map((item, index) => {
                          return (
                            <>
                              <option value={item.name} key={index}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    {formErrors.deptAddress && (
                      <p className="custom-error-text">
                        {formErrors.deptAddress}
                      </p>
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

export default AddDepartment;
