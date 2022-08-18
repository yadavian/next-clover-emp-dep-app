import React from "react";
import { CgMenuRight } from "react-icons/cg";
import { setActiveUserType } from "../../../../redux/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import DrawerComponent from "../drawer/DrawerComponent";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const { data, userType } = login;
  console.log("location.pathname =>", location.pathname);

  const adminMenu = [
    {
      id: 1,
      title: "Employee",
      pathname: "/employee",
      className: `${
        (location.pathname == "/employee" ||
          location.pathname == "/employee/add-employee") &&
        "navbar-item-active"
      }`,
      userType: "employee",
    },
    {
      id: 2,
      title: `Department`,
      pathname: "/department",
      className: `${
        (location.pathname == "/department" ||
          location.pathname == "/department/add-department") &&
        "navbar-item-active"
      }`,
      userType: "department",
    },
  ];

  const employeeMenu = [
    {
      id: 1,
      title: "Profile",
      pathname: `/employee/add-employee/${data?.employee_id}`,
      className: `${
        (location.pathname == "/employee" ||
          location.pathname == `/employee/add-employee/${1}`) &&
        "navbar-item-active"
      }`,
      userType: "employee",
    },
  ];

  // const isAdmin = false;
  const menuToRendered = userType == "admin" ? adminMenu : employeeMenu;

  return (
    <>
      <div
        className="navbar-section"
        style={{ minWidth: `${userType == "employee" ? "100%" : "86%"}` }}
      >
        <div className="navbar-logo">
          <a>
            <Link href={`${userType == "employee" ? "#" : "/employee"}`}>
              Clover Employee App
            </Link>
          </a>
        </div>
        <div className="navbar-right-box">
          {menuToRendered?.map((d, i) => {
            return (
              <Link href={d.pathname}>
                <div  className={d.className} onClick={() => dispatch(setActiveUserType(d.userType))}>
                  {d.title}
                </div>
              </Link>
            );
          })}
          {/* <Link
            className={`${
              location.pathname == "/employee" && "navbar-item-active"
            }`}
            href="/employee"
            onClick={() => dispatch(setActiveUserType("employee"))}
          >
            <div>Employee</div>
          </Link>
          <Link
            href="/department"
            className={`${
              location.pathname == "/department" &&
              "navbar-item-active"
            }`}
            onClick={() => dispatch(setActiveUserType("department"))}
          >
            <div>Department</div>
          </Link> */}
          <Link href="/">
            <div>Logout</div>
          </Link>
        </div>
      </div>

      <div className="mobile-header">
        <Link href="/employee">Clover Employee App</Link>
        {/* <CgMenuRight color="#6966c7" /> */}
        <DrawerComponent />
      </div>
    </>
  );
};

export default Header;
