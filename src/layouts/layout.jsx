import React, { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <>
      <div className="container-fluid screen_orientation">
        <div className="d-flex">
          <div className={` ${showMenu ? "d-none" : "menu-bars"}`}>
            <i
              className="bi bimenu bi-list"
              onClick={() => setShowMenu(true)}
            />
          </div>
          <div
            className={` ${
              showMenu ? "sidebarWrapper col-2" : "d-none width-100 "
            }  `}
          >
            <Sidebar showSidebar={() => setShowMenu(false)} />
          </div>
          <div
            className={` ${
              showMenu
                ? "contentWrapper col-10 mt-3"
                : " col-11 mt-3 pe-2 ms-2 "
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
