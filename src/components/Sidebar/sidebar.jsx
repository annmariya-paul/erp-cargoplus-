import React, { useState, useEffect } from "react";
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
import { checkPermission } from "../../utils/check_permission";

export default function Sidebar({ showSidebar }) {
  // const [sidebar, setSidebar] = useState(true);
  // const showSidebar = () => setSidebar(!sidebar);
  const [Saleopen, setSaleOpen] = useState(false);
  const [HRMSopen, setHRMSopen] = useState(false);
  const [CRMopen, setCRMopen] = useState(false);
  const [CRMReport, setCRMReport] = useState(false);
  const [CRMselling, setCRMselling] = useState(false);
  const [CRMgeneral, setCRMgeneral] = useState(false);
  const [FMSOpen, setFMSOpen] = useState(false);
  const [FMSOppopen, setFMSOppopen] = useState(false);

  const [FMSAgentopen, setFMSAgentopen] = useState(false);
  const [FMSQuotationsopen, setFMSQuotationsopen] = useState(false);
  const [permissions, setPermissions] = useState(null);

  const [FMSSettingsopen, setFMSSettingsopen] = useState(false);

  const location = useLocation();

  const { pathname } = location;
  useEffect(() => {
    let p = localStorage.getItem("userPermissions");
    if (p) {
      setPermissions(JSON.parse(p));
    }
    // console.log("has permission : ", checkPermission("designation"));
  }, []);
  console.log("Permissions : ", permissions);
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
                  {checkPermission("branch") && (
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
                  )}
                  {checkPermission("department") && (
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
                  )}
                  {checkPermission("designation") && (
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
                  )}
                  {checkPermission("employment type") && (
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
                  )}
                  {checkPermission("employee") && (
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
                  )}
                  {checkPermission("employee grade") && (
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
                  )}
                  {checkPermission("roles") && (
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
                  )}
                  {checkPermission("assign permission") && (
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
                  )}
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
                    {checkPermission("lead") && (
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
                    )}
                      {checkPermission("opportunity") && (
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
                      )}
                      
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
                          {checkPermission("leadreport") && (
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
                          )}
                          {checkPermission("opportunityreport") && (
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
                          )}
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
                    {checkPermission("category") && (
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
                    )}
                    {checkPermission("brand") && (
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
                    )}
                     
                      {checkPermission("attribute") && (
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
                      )}
                      {checkPermission("product") && (
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
                      )}
                      {checkPermission("service") && (
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
                      )}
                      {checkPermission("unit and measures") && (
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
                      )}
                     
                    </>
                  ) : (
                    ""
                  )}
                  <li
                    className={
                      CRMgeneral
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={CRMgeneral ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setCRMgeneral(!CRMgeneral)}
                    >
                      <RiTeamFill className="sidebar_icons ms-3" />
                      General
                      <div className="d-flex justify-content-end ms-5 ps-5">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </Link>
                  </li>
                  {CRMgeneral ? (
                    <>
                    {checkPermission("country") && (
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.COUNTRYSELECT}
                        >
                          <MdEventNote className="sidebar_icons ms-4" />
                          Countries
                        </NavLink>
                      </li>
                    )}
                      
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
              {/* {FMSOpen ? (
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
              )} */}
              {FMSOpen ? (
                <>
                  <li
                    className={
                      FMSOppopen
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={FMSOppopen ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setFMSOppopen(!FMSOppopen)}
                    >
                      <RiTeamFill className="sidebar_icons ms-3 " />
                      Opportunity
                      <div className="d-flex justify-content-end sale_crm_sliderbar_margin_style">
                        <AiOutlineCaretDown className="toggle_btn  " />
                      </div>
                    </Link>
                  </li>
                  {FMSOppopen ? (
                    <>
                    {checkPermission("opportunity assign") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.ENQUIRIES}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Opportunity assigns
                        </NavLink>
                      </li>
                    )}
                      
                      {checkPermission("track assignment") && (
                        <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.TRACK_ASSIGNMENTS}
                        >
                          <BsFillXDiamondFill className="sidebar_icons ms-4" />
                          Track Assignments
                        </NavLink>
                      </li>
                      )}
                      
                    </>
                  ) : (
                    ""
                  )}
                  <li
                    className={
                      FMSAgentopen
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={FMSAgentopen ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setFMSAgentopen(!FMSAgentopen)}
                    >
                      <RiTeamFill className="sidebar_icons ms-3" />
                      Agent
                      <div className="d-flex justify-content-end ms-5 ps-5">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </Link>
                  </li>
                  {FMSAgentopen ? (
                    <>
                    {checkPermission("create agent") && (
                       <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.CREATEAGENT}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                          Create Agent
                        </NavLink>
                      </li>
                    )}
                     
                    {checkPermission("create agent") && (
                       <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.LISTAGENT}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                          List Agent
                        </NavLink>
                      </li>
                    )}
                     
                    </>
                  ) : (
                    ""
                  )}

          {FMSOpen ? (
                    <>
                    {checkPermission("quotation") && (
                       <li className="nav-text " style={{ marginLeft: "-61px" }}>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.QUATATIONS}
                        >
                          <RiTeamFill className="sidebar_icons ms-4" />
                          Quotation
                        </NavLink>
                      </li>
                    )}
                     
                    </>
                  ) : (
                    ""
                  )}
                  <li
                    className={
                      FMSSettingsopen
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={FMSSettingsopen ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setFMSSettingsopen(!FMSSettingsopen)}
                    >
                      <RiTeamFill className="sidebar_icons ms-3" />
                      Settings
                      <div className="d-flex justify-content-end ms-3 ps-5">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </Link>
                  </li>
                  {FMSSettingsopen ? (
                    <>
                    {checkPermission("freight type") && (
                       <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.FRIGHTLIST}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                          Fright types
                        </NavLink>
                      </li>
                    )}
                     
                    </>
                  ) : (
                    ""
                  )}
                    {FMSSettingsopen ? (
                    <>
                    {checkPermission("carrier") && (
                       <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.CARRIER}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                         Carrier
                        </NavLink>
                      </li>
                    )}
                     
                    </>
                  ) : (
                    ""
                  )}
                    {FMSSettingsopen ? (
                    <>
                    {checkPermission("mode") && (
                       <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.MODE}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                          Mode
                        </NavLink>
                      </li>
                    )}
                     
                    </>
                  ) : (
                    ""
                  )}
               
                  {/* {FMSQuotationsopen ? (
                    <>
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.QUATATIONS}
                        >
                          <BsBookmarkFill className="sidebar_icons ms-4" />
                          Quotations List
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    ""
                  )} */}
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
