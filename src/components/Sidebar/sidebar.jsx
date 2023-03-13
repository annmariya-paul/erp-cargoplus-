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
import {
  MdEventNote,
  MdSettingsInputComponent,
  MdOutlineSell,
  MdOutlinePointOfSale,
} from "react-icons/md";
import { GiCargoShip } from "react-icons/gi";
import { GrSettingsOption } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { ROUTES } from "../../routes";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { checkPermission } from "../../utils/check_permission";
import hrmsIcon from "../../components/img/human-resources-icon-png-12.jpg";
import crmIcon from "../../components/img/icons8-crm-58.png";
import fmsIcon from "../../components/img/icons8-cargo-ship-50.png";
import settingsicon from "../../components/img/icons8-gear-50.png";
import { FaRegHandshake } from "react-icons/fa";

export default function Sidebar({ showSidebar }) {
  // const [sidebar, setSidebar] = useState(true);
  // const showSidebar = () => setSidebar(!sidebar);
  const [Saleopen, setSaleOpen] = useState(false);
  const [HRMSopen, setHRMSopen] = useState(false);
  const [CRMopen, setCRMopen] = useState(false);
  const [CRMReport, setCRMReport] = useState(false);
  const [fmsReport, setFmsReport] = useState(false);
  const [CRMselling, setCRMselling] = useState(false);
  const [CRMpurchasing, setCRMpurchasing] = useState(false);
  const [ACCOUNTSopen, setACCOUNTSopen] = useState(false);

  const [CRMgeneral, setCRMgeneral] = useState(false);
  const [FMSOpen, setFMSOpen] = useState(false);
  const [FMSOppopen, setFMSOppopen] = useState(false);
  const [GeneralSettingsopen, setGeneralSettingsopen] = useState(false);
  const [FMSAgentopen, setFMSAgentopen] = useState(false);
  const [FMSQuotationsopen, setFMSQuotationsopen] = useState(false);
  const [permissions, setPermissions] = useState(null);
  const [Accounts, setAccounts] = useState(false);
  const [FMSSettingsopen, setFMSSettingsopen] = useState(false);
  const [accountsSettings, setAccountsSettings] = useState(false);

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
                  <AiOutlineMenu
                    style={{ fontSize: "25px", color: "#16528d" }}
                  />
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
              </li>

              {/* ##########  HRMS  ######## */}

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
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      <RiTeamFill className="sidebar_icons" />
                      {/* <img
                        src={hrmsIcon}
                        alt
                        height={15}
                        width={15}
                        className="mt-1 me-1"
                      /> */}
                      <div style={{ width: "120px" }} className="">
                        HRMS
                      </div>
                    </div>

                    <div className="  ">
                      <div className="text-right ">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </div>
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
                        <div className=" ms-4">Branches</div>
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
                        <div className=" ms-4">Departments</div>
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
                        <div className=" ms-4">Designation</div>
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
                        <div className=" ms-4">Employee Type</div>
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
                        <div className=" ms-4">Employee grade</div>
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
                        <div className=" ms-4">Roles</div>
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
                        <div className=" ms-4">Assign Permissions</div>
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
                        <div className=" ms-4">Employees</div>
                      </NavLink>
                    </li>
                  )}
                </>
              ) : (
                ""
              )}

              {/* ##########  CRM  ######## */}

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
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      {/* <RiTeamFill className="sidebar_icons" />
                       */}
                      <img
                        src={crmIcon}
                        alt=""
                        height={15}
                        width={15}
                        className="mt-1 me-1"
                      />
                      <div style={{ width: "120px" }} className="">
                        CRM
                      </div>
                    </div>

                    <div className="  ">
                      <div className="text-right ">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </div>
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
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          <MdOutlinePointOfSale className="sidebar_icons pt-1" />
                          <div style={{ width: "100px" }} className="">
                            Sale
                          </div>
                        </div>

                        <div className="  ">
                          <div className="text-right ">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </div>
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
                            {/* <RiTeamFill className="sidebar_icons ms-4" /> */}
                            <div className="ms-4"> Lead</div>
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
                            {/* <BsFillXDiamondFill className="sidebar_icons ms-4" /> */}
                            <div className=" ms-4">Opportunity</div>
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
                          <TbReport className="sidebar_icons ms-4" />
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
                                <div className=" ms-5">Lead Report</div>
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
                                <div className=" ms-5">Opportunity Report</div>
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
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          <MdOutlineSell className="sidebar_icons pt-1" />
                          <div style={{ width: "100px" }} className="">
                            Selling
                          </div>
                        </div>

                        <div className="  ">
                          <div className="text-right ">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </div>
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
                            <div className=" ms-4">Category</div>
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
                            <div className=" ms-4">Brands</div>
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
                            <div className=" ms-4">Units and Measures</div>
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
                            <div className=" ms-4">Attributes</div>
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
                            <div className=" ms-4">Products</div>
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
                            <div className="ms-4">Services</div>
                          </NavLink>
                        </li>
                      )}
                      {/* {checkPermission("unit and measures") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.UNIT_LIST}
                          >
                            <div className=" ms-4">Units and Measures</div>
                          </NavLink>
                        </li>
                      )} */}
                    </>
                  ) : (
                    ""
                  )}

                  <li
                    className={
                      CRMpurchasing
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={CRMpurchasing ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setCRMpurchasing(!CRMpurchasing)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          <FaRegHandshake className="sidebar_icons pt-1" />
                          <div style={{ width: "100px" }} className="">
                            Purchase
                          </div>
                        </div>

                        <div className="  ">
                          <div className="text-right ">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>

                  {CRMpurchasing ? (
                    <>
                      {checkPermission("vendor") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.VENDOR_TYPE}
                          >
                            <div className=" ms-4">Vendor Type</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("vendor") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.VENDOR}
                          >
                            <div className=" ms-4">Vendor</div>
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

              {/* ##########  FMS  ######## */}

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
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      <GiCargoShip className="sidebar_icons" />
                      {/* <img
                        src={fmsIcon}
                        alt=""
                        height={15}
                        width={15}
                        className="mt-1 me-1"
                      /> */}
                      <div style={{ width: "120px" }} className="">
                        FMS
                      </div>
                    </div>

                    <div className="  ">
                      <div className="text-right ">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </div>
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
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          <MdSettingsInputComponent className="sidebar_icons ms-1 pt-1 " />
                          <div style={{ width: "90px" }} className="">
                            Settings
                          </div>
                        </div>

                        <div className="  ">
                          <div className="text-right ">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </div>
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
                            <div className=" ms-5">Freight types</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("carrier") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.CARRIER}
                          >
                            <div className=" ms-5">Carrier</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("terms of shipment") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.TERMS_OF_PAYMENT}
                          >
                            <div className=" ms-5">Payment Terms</div>
                          </NavLink>
                        </li>
                      )}

                      {checkPermission("tax type") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.TAXTYPE}
                          >
                            <div className=" ms-5">Tax Type</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("job tasks") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.LISTAGENT}
                          >
                            <div className=" ms-5">Agents</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("job tasks") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.LOCATIONS}
                          >
                            <div className=" ms-5">Location</div>
                          </NavLink>
                        </li>
                      )}
                      {/* {checkPermission("airport") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.AIRPORT}
                          >
                            <BsBookmarkFill className="sidebar_icons ms-4" />
                            Airport
                          </NavLink>
                        </li>
                      )} */}

                      {/* {checkPermission("seaport") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.SEAPORT}
                          >
                            <BsBookmarkFill className="sidebar_icons ms-4" />
                            Seaport
                          </NavLink>
                        </li>
                      )} */}
                      {/* {checkPermission("mode") && (
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
                      )} */}
                    </>
                  ) : (
                    ""
                  )}
                  {checkPermission("opportunity assign") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.ENQUIRIES}
                      >
                        <div className=" ms-4">Enquiry</div>
                      </NavLink>
                    </li>
                  )}
                  {checkPermission("quotation") && (
                    <li className="nav-text " style={{ marginLeft: "" }}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.QUATATIONS}
                      >
                        <div className=" ms-4">Quotation</div>
                      </NavLink>
                    </li>
                  )}
                  {checkPermission("opportunity assign") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.LIST_JOB}
                      >
                        <div className=" ms-4">Job</div>
                      </NavLink>
                    </li>
                  )}
                  {checkPermission("invoice") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.INVOICE_LIST}
                      >
                        <div className=" ms-4">Invoice</div>
                      </NavLink>
                    </li>
                  )}
                  {/* {track assignment link is commented and hidden in sidebar} */}
                  {/* {checkPermission("track assignment") && (
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
                      )} */}
                  <li
                    className={
                      fmsReport
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={fmsReport ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setFmsReport(!fmsReport)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          <TbReport className="sidebar_icons ms-1 pt-1 " />
                          <div style={{ width: "90px" }} className="">
                            Report
                          </div>
                        </div>

                        <div className="  ">
                          <div className="text-right ">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  {fmsReport ? (
                    <>
                      {checkPermission("agent_report") && (
                        <>
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.AGENT_REPORT}
                            >
                              <div className="ms-4">Agent Report</div>
                            </NavLink>
                          </li>
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.COST_AND_EXPENSE_REPORT}
                            >
                              <div className="ms-4">Cost And Expense Report</div>
                            </NavLink>
                          </li>
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.MONTHLY_REPORT}
                            >
                              <div className="ms-4">Monthly Report</div>
                            </NavLink>
                          </li>
                        </>
                      )}
                      {checkPermission("cost_and_expense") && (
                        <li className="nav-text ">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.COST_AND_EXPENSE_REPORT}
                          >
                            <div className="ms-4">Cost And Expense Report</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("enquiry_report") && (
                        <li className="nav-text ">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.ENQUIRY_REPORT}
                          >
                            <div className=" ms-4">Enquiry Report</div>
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

              {/* ######## Accounts ######## */}

              <li
                className={
                  Accounts
                    ? "nav-text  items_hrms open"
                    : "nav-text  items_hrms "
                }
              >
                <Link
                  className={Accounts ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setAccounts(!Accounts)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      <RiTeamFill className="sidebar_icons" />
                      {/* <img
                        src={hrmsIcon}
                        alt
                        height={15}
                        width={15}
                        className="mt-1 me-1"
                      /> */}
                      <div style={{ width: "120px" }} className="">
                        Accounts
                      </div>
                    </div>

                    <div className="  ">
                      <div className="text-right ">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>

              {Accounts ? (
                <>
                  <li
                    className={
                      accountsSettings
                        ? "nav-text  items_hrms open"
                        : "nav-text  items_hrms "
                    }
                  >
                    <Link
                      className={accountsSettings ? "active-link" : "link"}
                      // to="/"
                      onClick={() => setAccountsSettings(!accountsSettings)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          <MdSettingsInputComponent className="sidebar_icons ms-1 pt-1 " />
                          <div style={{ width: "90px" }} className="">
                            Settings
                          </div>
                        </div>

                        <div className="  ">
                          <div className="text-right ">
                            <AiOutlineCaretDown className="toggle_btn " />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  {accountsSettings ? (
                    <>
                      {checkPermission("daily_expence") && (
                        <li className="nav-text ">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.EXPENSE_CATEGORY}
                          >
                            <div className=" ms-5">Expense Category</div>
                          </NavLink>
                        </li>
                      )}
                      {checkPermission("paymentmode") && (
                        <li className="nav-text ">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.PAYMEMENT_MODE}
                          >
                            <div className=" ms-5">Payment Mode</div>
                          </NavLink>
                        </li>
                      )}
                      {/* {checkPermission("add_purchase") && (
                    <li className="nav-text">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.ADD_PURCHASE}
                      >
                        <div className=" ms-5">Add Purchase</div>
                      </NavLink>
                    </li>
                  )} */}

                      {checkPermission("purchase") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.PURCHASE}
                          >
                            <div className=" ms-5">Purchase</div>
                          </NavLink>
                        </li>
                      )}

                      {checkPermission("bankdetails") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.BANK_DETAILS}
                          >
                            <div className=" ms-5">Bank Details</div>
                          </NavLink>
                        </li>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {checkPermission("daily_expence") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.DAILY_EXPENSE}
                      >
                        <div className="ms-4">Daily Expense</div>
                      </NavLink>
                    </li>
                  )}

                  {checkPermission("job_payments") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.JOB_PAYMENTS}
                      >
                        <div className="ms-4">Job Payments</div>
                      </NavLink>
                    </li>
                  )}
                </>
              ) : (
                ""
              )}

              {/* ########## General Settings ######## */}

              <li
                className={
                  GeneralSettingsopen
                    ? "nav-text  items_hrms open"
                    : "nav-text  items_hrms "
                }
              >
                <Link
                  className={GeneralSettingsopen ? "active-link_main" : "link"}
                  style={{ fontSize: 16 }}
                  // to="/"
                  onClick={() => setGeneralSettingsopen(!GeneralSettingsopen)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      <FiSettings className="sidebar_icons pt-1" />
                      {/* <img
                        src={settingsicon}
                        alt=""
                        height={15}
                        width={15}
                        className="mt-1 me-1 "
                      /> */}
                      <div style={{ width: "120px" }} className=" d-flex">
                        General Settings
                      </div>
                    </div>

                    <div className="  ">
                      <div className="text-right ">
                        <AiOutlineCaretDown className="toggle_btn " />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
              {GeneralSettingsopen ? (
                <>
                  {checkPermission("country") && (
                    <li className="nav-text">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.COUNTRYSELECT}
                      >
                        <div className=" ms-4">Countries</div>
                      </NavLink>
                    </li>
                  )}
                  {checkPermission("currency") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.CURRENCY}
                      >
                        <div className=" ms-4">Currency</div>
                      </NavLink>
                    </li>
                  )}

                  {checkPermission("companyinfo") && (
                    <li className="nav-text ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={ROUTES.COMPANYINFO}
                      >
                        <div className=" ms-4">CompanyInfo</div>
                      </NavLink>
                    </li>
                  )}
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
