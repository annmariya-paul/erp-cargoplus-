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
import { GrProductHunt, GrServices, GrSettingsOption } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { ROUTES } from "../../routes";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { checkPermission } from "../../utils/check_permission";
import hrmsIcon from "../../components/img/human-resources-icon-png-12.jpg";
import crmIcon from "../../components/img/118211.png";
import fmsIcon from "../../components/img/icons8-cargo-ship-50.png";
import settingsicon from "../../components/img/icons8-gear-50.png";
import { FaRegHandshake } from "react-icons/fa";
import cargologo from "../../assets/logo/cargopluslogo1.png";
import Purchaseorder from "../../pages/FMS/Purchase/Purchase Order/purchase_order";
import ListpurchaseOrder from "../../pages/FMS/Purchase/Purchase Order/purchase_orderlist";

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

  const [CRMproductmaster, setCRMproductmaster] = useState(false);
  const [CRMservicemaster, setCRMservicemaster] = useState(false);
  const [CRMproduct, setCRMproduct] = useState(false);
  const [CRMservice, setCRMservice] = useState(false);

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
  const [accountsReports, setAccountsReports] = useState(false);

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
          <nav className={`nav-menu active  nav-menu `}>
            <ul className="nav-menu-items p-0 ">
              <li className="nav-text  mt-2 ps-3">
                <div className="d-flex">
                  <div className="logo_img">
                    <img
                      src={cargologo}
                      alt=""
                      height={50}
                      width={150}
                      // className="mt-1 me-1"
                    />
                  </div>
                  <div
                    to=""
                    // className=""
                    className="nav-link navbar-toggle nav-close"
                    onClick={showSidebar}
                  >
                    {" "}
                    <AiOutlineMenu
                      style={{ fontSize: "25px", color: "#16528d" }}
                    />
                    {/* <i
                    className=""
                    style={{ fontSize: "25px", color: "white" }}
                  /> */}
                  </div>
                </div>
              </li>

              <li className="nav-text mt-4  ps-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.DASHBOARD}
                >
                  {/* <AiOutlineAppstore className="sidebar_icons" /> */}
                  Dashboard
                </NavLink>
              </li>

              {/* ##########  HRMS  ######## */}

              <li
                className={
                  HRMSopen
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms  ps-2"
                }
              >
                <Link
                  className={HRMSopen ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setHRMSopen(!HRMSopen)}
                >
                  <div className="d-flex justify-content-between gap-5 ">
                    <div className="d-flex">
                      {/* <RiTeamFill className="sidebar_icons" /> */}
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
                  <div className="nav_active_color ">
                    {checkPermission("branch") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.BRANCHES}
                        >
                          <div className=" ms-4 subactivelink">Branches</div>
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
                          <div className=" ms-4 subactivelink">Departments</div>
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
                          <div className=" ms-4 subactivelink">Designation</div>
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
                          <div className=" ms-4 subactivelink">
                            Employee Type
                          </div>
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
                          <div className=" ms-4 subactivelink">
                            Employee grade
                          </div>
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
                          <div className=" ms-4  subactivelink">Roles</div>
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
                          <div className=" ms-4 subactivelink">
                            Assign Permissions
                          </div>
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
                          <div className=" ms-4  subactivelink">Employees</div>
                        </NavLink>
                      </li>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}

              {/* ##########  CRM  ######## */}

              <li
                className={
                  CRMopen
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms ps-2"
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
                      {/* <img
                        src={crmIcon}
                        alt=""
                        height={15}
                        width={15}
                        className="mt-1 me-1"
                      /> */}
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
                  {/* <li
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
                  </li> */}

                  {/* {Saleopen ? (
                    <>
                    <div className="nav_active_color ">
                      {checkPermission("lead") && (
                        <li className="nav-text ">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.LEADLIST}
                          >
                          
                            <div className="ms-4 subactivelink"> Lead</div>
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
                          
                            <div className="subactivelink ms-4">Opportunity</div>
                          </NavLink>
                        </li>
                      )}
</div>
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
                            <div className="nav_active_color ">
                          {" "}
                          {checkPermission("leadreport") && (
                            <li className="nav-text">
                              <NavLink
                                className={({ isActive }) =>
                                  isActive ? "active-link" : "link"
                                }
                                to="/leadReport"
                              >
                                <div className=" ms-5 subactivelink">Lead Report</div>
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
                                <div className=" ms-5 subactivelink">Opportunity Report</div>
                              </NavLink>
                            </li>
                          )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )} */}

                  {/* <li
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
                  </li> */}

                  {/* {CRMselling ? (
                    <>
                       <div className="nav_active_color ">
                      {checkPermission("category") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.CATEGORY_LIST}
                          >
                            <div className=" ms-4 subactivelink">Category</div>
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
                            <div className=" ms-4 subactivelink">Brands</div>
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
                            <div className=" ms-4 subactivelink">Units and Measures</div>
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
                            <div className=" ms-4  subactivelink">Attributes</div>
                          </NavLink>
                        </li>
                      )}
                     
                      </div>
                    </>
                  ) : (
                    ""
                  )} */}

                  {/* changes sidebar */}
                  <div className="nav_active_color ">
                    {checkPermission("lead") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.CUSTOMER_LIST}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            {" "}
                            Customer
                          </div>
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
                          <div className="ms-3 ps-1  subactivelink">Vendor</div>
                        </NavLink>
                      </li>
                    )}
                    {checkPermission("sale_enquiry") && (
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.ENQUIRY_LIST}
                        >
                          <div className="ms-3 ps-1 subactivelink">Enquiry</div>
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
                          <div className="subactivelink ms-3 ps-1">
                            Opportunity
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </div>

                  <li
                    className={
                      CRMpurchasing
                        ? "nav-text  items_hrms nav_active_color open"
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      className="link"
                      // to="/"
                      onClick={() => setCRMpurchasing(!CRMpurchasing)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-3">
                        <div className="d-flex">
                          {/* <FaRegHandshake className="sidebar_icons pt-1" /> */}
                          <div
                            style={{ width: "100px" }}
                            className="subactivelink"
                          >
                            Masters
                          </div>
                        </div>
                        <div className="text-right ">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>

                  {CRMpurchasing ? (
                    <>
                      <div className="nav_active_color">
                        {checkPermission("vendor") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.VENDOR_TYPE}
                            >
                              <div className="ms-4 ps-2 subactivelink">
                                Vendor Type
                              </div>
                            </NavLink>
                          </li>
                        )}

                        {checkPermission("enquirysource") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.ENQUIRY_SOURCE}
                            >
                              <div className="ms-4 ps-2 subactivelink">
                                Enquiry Source
                              </div>
                            </NavLink>
                          </li>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* <li
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
                  </li> */}

                  {/* {CRMpurchasing ? (
                    <>
                      <div className="nav_active_color ">
                      {checkPermission("vendor") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.VENDOR_TYPE}
                          >
                            <div className=" ms-4 subactivelink">Vendor Type</div>
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
                            <div className=" ms-4 subactivelink">Vendor</div>
                          </NavLink>
                        </li>
                      )}
                      </div>
                    </>
                  ) : (
                    ""
                  )} */}
                </>
              ) : (
                ""
              )}

              {/* product */}

              <li
                className={
                  CRMproduct
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms ps-2"
                }
              >
                <Link
                  className={CRMproduct ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setCRMproduct(!CRMproduct)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      {/* <GrProductHunt className="sidebar_icons pt-1" /> */}
                      <div style={{ width: "120px" }} className="">
                        Product
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

              {CRMproduct ? (
                <>
                  <div className="nav_active_color ">
                    {checkPermission("lead") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.PRODUCT}
                        >
                          <div className="ms-3 ps-1 subactivelink">Product</div>
                        </NavLink>
                      </li>
                    )}
                  </div>

                  <li
                    className={
                      CRMproductmaster
                        ? "nav-text  items_hrms nav_active_color open"
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      className="link"
                      // to="/"
                      onClick={() => setCRMproductmaster(!CRMproductmaster)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-2">
                        <div className="d-flex">
                          {/* <FaRegHandshake className="sidebar_icons pt-1" /> */}
                          <div
                            style={{ width: "100px" }}
                            className="subactivelink ms-2 ps-1"
                          >
                            Masters
                          </div>
                        </div>

                        <div className="text-right">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>

                  {CRMproductmaster ? (
                    <>
                      <div className="nav_active_color ">
                        {checkPermission("category") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.CATEGORY_LIST}
                            >
                              <div className="ms-4 ps-2 subactivelink">
                                Category
                              </div>
                            </NavLink>
                          </li>
                        )}

                        {checkPermission("brands") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.BRANDS}
                            >
                              <div className=" ms-4 ps-2 subactivelink">
                                Brands
                              </div>
                            </NavLink>
                          </li>
                        )}

                        {checkPermission("attributes") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.ATTRIBUTES}
                            >
                              <div className=" ms-4 ps-2 subactivelink">
                                Attributes
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("unitandMeasurement") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.UNIT_LIST}
                            >
                              <div className="ms-4 ps-2 subactivelink">
                                Unit And Measurements
                              </div>
                            </NavLink>
                          </li>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              {/* servicess */}

              <li
                className={
                  CRMservice
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms ps-2"
                }
              >
                <Link
                  className={CRMservice ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setCRMservice(!CRMservice)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      {/* <RiTeamFill className="sidebar_icons" />
                       */}
                      {/* <GrServices className="sidebar_icons pt-1" /> */}
                      <div style={{ width: "120px" }} className="">
                        Services
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

              {CRMservice ? (
                <>
                  <div className="nav_active_color ">
                    {checkPermission("lead") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.SERVICES}
                        >
                          <div className="ms-4 subactivelink"> Service</div>
                        </NavLink>
                      </li>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
              {/* ##########  FMS  ######## */}

              <li
                className={
                  FMSOpen
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms ps-2"
                }
              >
                <Link
                  className={FMSOpen ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setFMSOpen(!FMSOpen)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      {/* <GiCargoShip className="sidebar_icons" /> */}
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
                  <div className="nav_active_color ">
                    {checkPermission("opportunity assign") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.ENQUIRIES}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Opportunity
                          </div>
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
                          <div className="ms-3 ps-1 subactivelink">
                            Quotation
                          </div>
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
                          <div className="ms-3 ps-1 subactivelink">Job</div>
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
                          <div className="ms-3 ps-1 subactivelink">Invoice</div>
                        </NavLink>
                      </li>
                    )}
                  </div>

                  <li
                    className={
                      FMSSettingsopen
                        ? "nav-text  items_hrms nav_active_color open"
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      // className={FMSSettingsopen ? "active-link" : "link"}
                      className="link"
                      // to="/"
                      onClick={() => setFMSSettingsopen(!FMSSettingsopen)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-3">
                        <div className="d-flex">
                          {/* <MdSettingsInputComponent className="sidebar_icons ms-1 pt-1 " /> */}
                          <div
                            style={{ width: "90px" }}
                            className="subactivelink"
                          >
                            Purchase
                          </div>
                        </div>
                        <div className="text-right ">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  {FMSSettingsopen ? (
                    <>
                      <div className="nav_active_color">
                        {checkPermission("purchase_order_list") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.PUCHASE_ORDER_LIST}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Purchase Order
                              </div>
                            </NavLink>
                          </li>
                        )}
                    
                       

                     
                     
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <li
                    className={
                      FMSSettingsopen
                        ? "nav-text  items_hrms nav_active_color open"
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      // className={FMSSettingsopen ? "active-link" : "link"}
                      className="link"
                      // to="/"
                      onClick={() => setFMSSettingsopen(!FMSSettingsopen)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-3">
                        <div className="d-flex">
                          {/* <MdSettingsInputComponent className="sidebar_icons ms-1 pt-1 " /> */}
                          <div
                            style={{ width: "90px" }}
                            className="subactivelink"
                          >
                            Masters
                          </div>
                        </div>
                        <div className="text-right ">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  {FMSSettingsopen ? (
                    <>
                      <div className="nav_active_color">
                        {checkPermission("freight type") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.FRIGHTLIST}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Freight types
                              </div>
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
                              <div className="ms-4 ps-3 subactivelink">
                                Carrier
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("incoterm") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.INCOTERM}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Incoterm
                              </div>
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
                              <div className="ms-4 ps-3 subactivelink">
                                Payment Terms
                              </div>
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
                              <div className="ms-4 ps-3 subactivelink">
                                Tax Type
                              </div>
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
                              <div className="ms-4 ps-3 subactivelink">
                                Agents
                              </div>
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
                              <div className="ms-4 ps-3 subactivelink">
                                Location
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("containertype") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.CONTAINER_TYPES}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Container Types
                              </div>
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
                      </div>
                    </>
                  ) : (
                    ""
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
                        ? "nav-text  items_hrms nav_active_color open"
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      className="link"
                      // to="/"
                      onClick={() => setFmsReport(!fmsReport)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-3">
                        <div className="d-flex">
                          {/* <TbReport className="sidebar_icons ms-1 pt-1 " /> */}
                          <div
                            style={{ width: "90px" }}
                            className="subactivelink"
                          >
                            Report
                          </div>
                        </div>
                        <div className="text-right ">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  {fmsReport ? (
                    <>
                      <div className="nav_active_color ">
                        {checkPermission("agent_report") && (
                          <>
                            <li className="nav-text ">
                              <NavLink
                                className={({ isActive }) =>
                                  isActive ? "active-link" : "link"
                                }
                                to={ROUTES.AGENT_REPORT}
                              >
                                <div className="ms-4 ps-2 subactivelink">
                                  Agent Report
                                </div>
                              </NavLink>
                            </li>
                            {/* <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.COST_AND_EXPENSE_REPORT}
                            >
                              <div className="ms-4">
                                Cost And Expense Report
                              </div>
                            </NavLink>
                          </li> */}
                            <li className="nav-text ">
                              <NavLink
                                className={({ isActive }) =>
                                  isActive ? "active-link" : "link"
                                }
                                to={ROUTES.MONTHLY_REPORT}
                              >
                                <div className="ms-4 ps-2 subactivelink">
                                  Monthly Report
                                </div>
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
                              <div className="ms-4 ps-2 subactivelink">
                                Cost And Expense Report
                              </div>
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
                              <div className="ms-4 ps-2 subactivelink">
                                Enquiry Report
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("invoice_report") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.INVOICE_REPORT}
                            >
                              <div className="ms-4 ps-2 subactivelink">
                                Invoice Report
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("awb_bl_report") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.AWBBL_REPORT}
                            >
                              <div className="ms-4 ps-2 subactivelink">
                                AWB/BL Report
                              </div>
                            </NavLink>
                          </li>
                        )}
                      </div>
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
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms ps-2"
                }
              >
                <Link
                  className={Accounts ? "active-link_main" : "link"}
                  // to="/"
                  onClick={() => setAccounts(!Accounts)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      {/* <RiTeamFill className="sidebar_icons" /> */}
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
                        ? "nav-text  items_hrms nav_active_color open "
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      className="link"
                      // to="/"
                      onClick={() => setAccountsSettings(!accountsSettings)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-3">
                        <div className="d-flex">
                          {/* <MdSettingsInputComponent className="sidebar_icons ms-1 pt-1 " /> */}
                          <div
                            style={{ width: "90px" }}
                            className="subactivelink"
                          >
                            Masters
                          </div>
                        </div>
                        <div className="text-right ">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  {accountsSettings ? (
                    <>
                      <div className="nav_active_color ">
                        {checkPermission("daily_expence") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.EXPENSE_CATEGORY}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Expense Category
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {/* {checkPermission("credit_note_type") && (
                        <li className="nav-text ">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.CREDIT_NOTE_TYPE}
                          >
                            <div className=" ms-5">Credit Note Type</div>
                          </NavLink>
                        </li>
                      )} */}
                        {checkPermission("paymentmode") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.PAYMEMENT_MODE}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Payment Mode
                              </div>
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
                        <div className=" ms-3 ps-3">Add Purchase</div>
                      </NavLink>
                    </li>
                    )} */}

                        {/* {checkPermission("purchase") && (
                        <li className="nav-text">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.PURCHASE}
                          >
                            <div className=" ms-3 ps-3">Purchase</div>
                          </NavLink>
                        </li>
                      )} */}

                        {checkPermission("bankdetails") && (
                          <li className="nav-text">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.BANK_DETAILS}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Bank Details
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("credit_note_type") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.CREDIT_NOTE_TYPE}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Credit Note Type
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("gl_type") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.GL_TYPE}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                GL Type
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("accGroup") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.ACC_GROUP}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Account Group
                              </div>
                            </NavLink>
                          </li>
                        )}
                        {checkPermission("ledger") && (
                          <li className="nav-text ">
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active-link" : "link"
                              }
                              to={ROUTES.LEDGER}
                            >
                              <div className="ms-4 ps-3 subactivelink">
                                Ledger
                              </div>
                            </NavLink>
                          </li>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="nav_active_color">
                    {checkPermission("purchase") && (
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.PURCHASE}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Purchase
                          </div>
                        </NavLink>
                      </li>
                    )}

                    {checkPermission("daily_expence") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.DAILY_EXPENSE}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Daily Expense
                          </div>
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
                          <div className="ms-3 ps-1 subactivelink">
                            Job Payments
                          </div>
                        </NavLink>
                      </li>
                    )}
                    {checkPermission("payments") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.PAYMENTS}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Payments
                          </div>
                        </NavLink>
                      </li>
                    )}
                    {checkPermission("add_credit_notes") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.CREDIT_NOTES}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Credit Notes
                          </div>
                        </NavLink>
                      </li>
                    )}
                    {checkPermission("add_debit_notes") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.DEBIT_NOTES}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Debit Notes
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </div>

                  <li
                    className={
                      accountsReports
                        ? "nav-text  items_hrms nav_active_color open"
                        : "nav-text  items_hrms nav_active_color"
                    }
                  >
                    <Link
                      className="link"
                      // to="/"
                      onClick={() => setAccountsReports(!accountsReports)}
                    >
                      <div className="d-flex justify-content-between gap-5 ms-3">
                        <div className="d-flex">
                          {/* <TbReport className="sidebar_icons ms-1 pt-1 " /> */}
                          <div
                            style={{ width: "90px" }}
                            className="subactivelink"
                          >
                            Reports
                          </div>
                        </div>
                        <div className="text-right ">
                          <AiOutlineCaretDown className="toggle_btn subactivelink" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  {accountsReports ? (
                    <>
                      {checkPermission("daily_expense_report") && (
                        <li className="nav-text nav_active_color">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active-link" : "link"
                            }
                            to={ROUTES.DAILY_EXPENSE_REPORT}
                          >
                            <div className="subactivelink ms-4 ps-3">
                              Daily Expense Report
                            </div>
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

              {/* ########## General Settings ######## */}

              <li
                className={
                  GeneralSettingsopen
                    ? "nav-text  items_hrms open ps-2"
                    : "nav-text  items_hrms ps-2"
                }
              >
                <Link
                  className={GeneralSettingsopen ? "active-link_main" : "link"}
                  // style={{ fontSize: 16 }}
                  // to="/"
                  onClick={() => setGeneralSettingsopen(!GeneralSettingsopen)}
                >
                  <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex">
                      {/* <FiSettings className="sidebar_icons pt-1" /> */}
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
                  <div className="nav_active_color ">
                    {checkPermission("country") && (
                      <li className="nav-text">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.COUNTRYSELECT}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Countries
                          </div>
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
                          <div className="ms-3 ps-1 subactivelink">
                            Currency
                          </div>
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
                          <div className="ms-3 ps-1 subactivelink">
                            CompanyInfo
                          </div>
                        </NavLink>
                      </li>
                    )}

                    {checkPermission("fmssettings") && (
                      <li className="nav-text ">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active-link" : "link"
                          }
                          to={ROUTES.FMSSETTINGS}
                        >
                          <div className="ms-3 ps-1 subactivelink">
                            Fms Settings
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </div>
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
