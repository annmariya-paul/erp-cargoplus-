import React, { useState } from "react";
import "./sidebar.styles.scss";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineAppstore,
  AiOutlineCaretDown,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsFillXDiamondFill, BsBookmarkFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { ROUTES } from "../../routes";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

export default function Sidebar({ showSidebar }) {
  // const [sidebar, setSidebar] = useState(true);
  // const showSidebar = () => setSidebar(!sidebar);
  const [Saleopen, setSaleOpen] = useState(false);
  const [HRMSopen, setHRMSopen] = useState(false);
  const [CRMopen, setCRMopen] = useState(false);
  const [CRMReport, setCRMReport] = useState(false);
  const [CRMselling, setCRMselling] = useState(false);
  const [FMSOpen, setFMSOpen] = useState(false);
  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");
  return (
    <>
      <div className="navbar">
        {/* <div className="menu-bars">
          <i className="bi bimenu bi-list" onClick={showSidebar} />
        </div> */}
        <div>
          <nav className={`nav-menu active  nav-menu`}>
            <ul className="nav-menu-items">
              <li className="navbar-toggle nav-close" onClick={showSidebar}>
                <div to="" className="nav-link">
                  {" "}
                  <AiOutlineMenu style={{ fontSize: "25px", color: "white" }} />
                  {/* <i
                    className=""
                    style={{ fontSize: "25px", color: "white" }}
                  /> */}
                </div>
              </li>
              <li className="nav-text ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.DASHBOARD}
                >
                  <AiOutlineAppstore className="sidebar_icons" />
                  Dashboard
                </NavLink>
                {/* <Link to="/dashboard" className="nav-link">
                  <AiOutlineAppstore className="sidebar_icons" />
                  Dashboard
                </Link> */}
              </li>
              <li
                className={
                  HRMSopen
                    ? "nav-text  items_hrms open"
                    : "nav-text  items_hrms "
                }
              >
                <Link
                  className={HRMSopen ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setHRMSopen(!HRMSopen)}
                >
                  <RiTeamFill className="sidebar_icons" />
                  HRMS
                  <div className="d-flex justify-content-end ms-5 ps-5">
                    <AiOutlineCaretDown className="toggle_btn " />
                  </div>
                </Link>
              </li>
              {HRMSopen ? (
                <>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.BRANCHES}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Branches
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.DEPARTMENTS}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Departments
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.DESIGNATION}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Designation
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.EMPLOYMENT_TYPE}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Employment Type
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.EMPLOYEES}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Employees
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.EMPLOYEEGRADE}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Employee grade
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.ROLES_SCREEN}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Roles
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.PERMISSIONS}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Assign Permissions
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}

              <li
                className={
                  CRMopen
                    ? "nav-text  items_hrms open"
                    : "nav-text  items_hrms "
                }
              >
                <Link
                  className={CRMopen ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setCRMopen(!CRMopen)}
                >
                  <RiTeamFill className="sidebar_icons" />
                  CRM
                  <div className="d-flex justify-content-end ms-5 ps-5">
                    <AiOutlineCaretDown className="toggle_btn " />
                  </div>
                </Link>
              </li>

              {CRMopen ? (
                <>
                  <li
                    className={
                      Saleopen
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={Saleopen ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setSaleOpen(!Saleopen)}
                    >
                      <RiTeamFill className="sidebar_icons ms-3" />
                      Sale
                      <div className="d-flex justify-content-end sale_crm_sliderbar_margin_style">
                        <AiOutlineCaretDown className="toggle_btn  " />
                      </div>
                    </Link>
                  </li>
                  {Saleopen ? (
                    <>
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.LEADLIST}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Lead
                        </NavLink>
                      </li>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.OPPORTUNITY}
                        >
                          <BsFillXDiamondFill className="sidebar_icons ms-4" />
                          Opportunity
                        </NavLink>
                      </li>
                      <li
                        className={
                          CRMReport
                            ? "nav-text  items_hrms open"
                            : "nav-text  items_hrms "
                        }
                      >
                        <Link
                          className={CRMReport ? "active-link" : "link"}
                          // to="/"
                          onClick={() => setCRMReport(!CRMReport)}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Reports
                          <div className="d-flex justify-content-end ms-5 ps-4">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </Link>
                      </li>
                      {CRMReport ? (
                        <>
                          {" "}
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to="/leadReport"
                            >
                              <MdEventNote className="sidebar_icons ms-4" />
                              Lead Report
                            </NavLink>
                          </li>
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.OPPORTUNITY_REPORT}
                            >
                              <MdEventNote className="sidebar_icons ms-4" />
                              Opportunity Report
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  <li
                    className={
                      CRMselling
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={CRMselling ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setCRMselling(!CRMselling)}
                    >
                      <RiTeamFill className="sidebar_icons ms-3" />
                      Selling
                      <div className="d-flex justify-content-end ms-5 ps-5">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </Link>
                  </li>
                  {CRMselling ? (
                    <>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.CATEGORY_LIST}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                          Category
                        </NavLink>
                      </li>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.BRANDS}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Brands
                        </NavLink>
                      </li>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.ATTRIBUTES}
                        >
                          <BsFillXDiamondFill className="sidebar_icons ms-4" />
                          Attributes
                        </NavLink>
                      </li>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.PRODUCT}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Products
                        </NavLink>
                      </li>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.SERVICES}
                        >
                          <FiSettings className="sidebar_icons ms-4" />
                          Services
                        </NavLink>
                      </li>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.UNIT_LIST}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Units and Measures
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              <li
                className={
                  FMSOpen
                    ? "nav-text  items_hrms open"
                    : "nav-text  items_hrms "
                }
              >
                <Link
                  className={FMSOpen ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setFMSOpen(!FMSOpen)}
                >
                  <RiTeamFill className="sidebar_icons" />
                  FMS
                  <div className="d-flex justify-content-end ms-5 ps-5">
                    <AiOutlineCaretDown className="toggle_btn " />
                  </div>
                </Link>
              </li>
              {FMSOpen ? (
                <>
                  <li className="nav-text">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.ASSIGN_OPPORTUNITIES}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Opportunity assigns
                    </NavLink>
                  </li>
                  <li className="nav-text ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link" : "link"
                      }
                      to={ROUTES.TRACK_ASSIGNMENTS}
                    >
                      <RiTeamFill className="sidebar_icons ms-4" />
                      Track Assignments
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
