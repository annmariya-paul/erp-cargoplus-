import React, { useEffect, useState } from "react";
import "./lead_list_icon.scss"
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
} from "react-icons/fa";
import { MdFileCopy } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";

 const Leadlist_Icons=()=>{

return (
  <>
    <div className="col-auto">
      <div className="row flex-wrap">
        <ul className="leadlist_icons_panel">
          <li className="icon-border">
            <a className="icon" href="#">
              <MdFileCopy />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFileExcel />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFileCsv />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFilePdf />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <AiFillPrinter />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <FaBookOpen />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </>
);
 }
export default Leadlist_Icons;