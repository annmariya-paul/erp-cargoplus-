import React, { useState } from "react";
import "./sidebar.styles.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsFillXDiamondFill, BsBookmarkFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { ROUTES } from "../../routes";
import { NavLink } from "react-router-dom";

export default function Sidebar({ showSidebar }) {
  // const [sidebar, setSidebar] = useState(true);
  // const showSidebar = () => setSidebar(!sidebar);
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
                  <i
                    className="bi bi-list"
                    style={{ fontSize: "25px", color: "white" }}
                  />
                </div>
              </li>
              <li className="nav-text ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to="/dashboard"
                >
                  <AiOutlineAppstore className="sidebar_icons" />
                  Dashboard
                </NavLink>
                {/* <Link to="/dashboard" className="nav-link">
                  <AiOutlineAppstore className="sidebar_icons" />
                  Dashboard
                </Link> */}
              </li>
              <li className="nav-text ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to="/lead"
                >
                  <RiTeamFill className="sidebar_icons" />
                  Lead
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.LEADLIST}
                >
                  <RiTeamFill className="sidebar_icons" />
                  Lead List
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.CATEGORY_LIST}
                >
                  <BsBookmarkFill className="sidebar_icons" />
                  Category
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to="/leadReport"
                >
                  <MdEventNote className="sidebar_icons" />
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
                  <MdEventNote className="sidebar_icons" />
                  Opportunity Report
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.ATTRIBUTES}
                >
                  <BsFillXDiamondFill className="sidebar_icons" />
                  Attributes
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.BRANDS}
                >
                  <RiTeamFill className="sidebar_icons" />
                  Brands
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.PRODUCT}
                >
                  <RiTeamFill className="sidebar_icons" />
                  Products
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                  to={ROUTES.UNIT_LIST}
                >
                  <RiTeamFill className="sidebar_icons" />
                  Units and Measures
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
