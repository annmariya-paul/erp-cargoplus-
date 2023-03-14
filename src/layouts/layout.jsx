import React, { useState, useEffect } from "react";
import "./layout.scss";
import { AiOutlineMenu } from "react-icons/ai";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
    const [matches, setMatches] = useState(
      window.matchMedia("(min-width: 550px)").matches
    );

    useEffect(() => {
      window
        .matchMedia("(min-width: 550px)")
        .addEventListener("change", (e) => setMatches(e.matches));
    }, []);
  return (
    <>
      <div className="col-12 d-flex header_layout">
        <div className="col-1 pt-4 ps-2">
          <AiOutlineMenu
            className="menu_icon"
            onClick={() => setShowMenu(true)}
          />
        </div>
        <div className="col-11 d-flex justify-content-end">
          <Header />
        </div>
      </div>
      <div className="container-fluid screen_orientation mt-5 pt-2">
        {matches && (
          <div className="d-flex">
            {/* <div className={` ${showMenu ? "d-none" : "menu-bars"}`}>
            <AiOutlineMenu
              className="menu_icon"
              onClick={() => setShowMenu(true)}
            />
          </div> */}
            <div
              className={` ${
                showMenu ? "sidebarWrapper col-2" : "d-none width-100 "
              }  `}
            >
              <Sidebar showSidebar={() => setShowMenu(false)} />
            </div>
            <div
              className={` ${
                showMenu ? "contentWrapper col-10 mt-2" : "col-12 mt-2"
              }`}
            >
              <Outlet />
            </div>
          </div>
        )}
        {!matches && (
          <div className="row">
            
            <div
              className={`${showMenu ? "" : "d-none"}`}
            >
              <Sidebar showSidebar={() => setShowMenu(false)} />
            </div>
            <div
              className={` ${
                showMenu
                  ? "mt-0"
                  : "mt-3"
              }`}
            >
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
