import React, { useState } from "react";
import "./sidebar.styles.scss";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  UserAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="navbar">
        <Link to="" className="menu-bars">
          <i class="bi bimenu bi-list" onClick={showSidebar} />
        </Link>
        <div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              <li className="navbar-toggle nav-close" onClick={showSidebar}>
                <Link to="" className="nav-link">
                  <i class="bi bi-list" style={{fontSize:"25px",color:"white"}}/>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/dashboard" className="nav-link">
                  <AppstoreOutlined />
                  Dashboard
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/lead" className="nav-link">
                  <UserAddOutlined />
                  Lead
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/lead_list" className="nav-link">
                  Lead List
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}


