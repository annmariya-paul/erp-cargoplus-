import React, { useState } from "react";
import "./sidebar.styles.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { ROUTES } from "../../routes";

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
              <li className="nav-text">
                <Link to="/dashboard" className="nav-link">
                  <AiOutlineAppstore className="sidebar_icons" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/lead" className="nav-link">
                  <RiTeamFill className="sidebar_icons" />
                  Lead
                </Link>
              </li>
              <li className="nav-text">
                <Link to={ROUTES.LEADLIST} className="nav-link">
                  Lead List
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/category" className="nav-link">
                  Category
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
