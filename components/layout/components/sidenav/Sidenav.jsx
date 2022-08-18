import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import IMAGE_CLOVER from "../../../../public/clover-blog.jpg";

const Sidenav = () => {
  const location = useRouter();
  const home = useSelector((state) => state.home);

  const adminMenu = [
    {
      id: 1,
      title: "Dashboard",
      pathname: `${
        home.activeUserType == "employee" ? "/employee" : "/department"
      }`,
      className: `${
        location.pathname == "/employee" || location.pathname == "/department"
          ? "sidebar-link-item-active"
          : "sidebar-link-item"
      }`,
    },
    {
      id: 2,
      title: `Add ${home.activeUserType}`,
      pathname: `${
        home.activeUserType == "department"
          ? "/department/add-department"
          : "/employee/add-employee"
      }`,
      className: `${
        location.pathname == "/employee/add-employee" ||
        location.pathname == "/department/add-department"
          ? "sidebar-link-item-active"
          : "sidebar-link-item"
      }`,
    },
  ];

  const employeeMenu = [
    {
      id: 1,
      title: "Profile",
      pathname: "/employee",
      className: `${
        location.pathname == "/profile"
          ? "sidebar-link-item-active"
          : "sidebar-link-item"
      }`,
    },
  ];

  const isAdmin = true;
  const menuToRendered = isAdmin ? adminMenu : employeeMenu;
  return (
    <>
      <div className="sidenav">
        <div className="sidebar-header">
          <div className="sidebar-upper">
            {/* <Link href="/">
              <p>Employee App</p>
            </Link> */}
            {/* <p>+</p> */}
          </div>
          <div className="sidebar-main-content">
            {/* <img
              src={require("../../../../assets/images/common/clover-blog.jpg")}
              style={{ height: 75, width: 75, margin: "0rem 0rem 2rem 0rem" }}
            /> */}
            <Image
              src={IMAGE_CLOVER}
              alt="Picture of the author"
              width={75}
              height={75}
            />
            <p style={{ marginTop: "2rem" }}>Clover Employee App</p>
          </div>
          <div className="sidebar-links">
            {menuToRendered?.map((d, i) => {
              return (
                <Link href={d.pathname}>
                  <div className={d.className}>
                    <p style={{ textTransform: "capitalize" }}>{d.title}</p>
                  </div>
                </Link>
              );
            })}

            {/* <Link
              href={`${
                home.activeUserType == "employee"
                  ? "/employee"
                  : "/department"
              }`}
            >
              <div
                className={`${
                  location.pathname == "/employee" ||
                  location.pathname == "/department"
                    ? "sidebar-link-item-active"
                    : "sidebar-link-item"
                }`}
              >
                <p>Dashboard</p>
              </div>
            </Link>
            <Link
              href={`${
                home.activeUserType == "employee"
                  ? "/employee/add-employee"
                  : "/department/add-department"
              }`}
            >
              <div
                className={`${
                  location.pathname == "/employee/add-employee" ||
                  location.pathname == "/department/add-department"
                    ? "sidebar-link-item-active"
                    : "sidebar-link-item"
                }`}
              >
                <p style={{ display: "inline-block" }}>Add</p>
                {home.activeUserType == "employee"
                  ? " Employee"
                  : " Department"}
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
