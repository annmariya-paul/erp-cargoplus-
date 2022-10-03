import React, { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({children}) {
//   const [showMenu, setShowMenu] = useState(true);
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <div className="col-1 col-sm-2">
            <Sidebar />
          </div>
          <div className="col-11 col-sm-10 d-flex justify-content-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
