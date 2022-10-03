import React, { useState } from "react";
import "./sidebar.scss";
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
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle nav-close">
                <Link to="" className="nav-link">
                  <CloseOutlined />
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
              <li className="nav-text">
                <Link to="" className="nav-link">
                  Label 2
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}



// import React, { useState } from "react";
// import "./sidebars.css";
// import {
//   AppstoreOutlined,
//   UserAddOutlined,
//   CloseOutlined,
// } from "@ant-design/icons";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
 
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const menuItem = [
//     {
//       path: "/dashboard",
//       name: "Dashboard",
//       icon: <AppstoreOutlined />,
//     },
//     {
//       path: "/",
//       name: "Lead",
//       icon: <UserAddOutlined />,
//     },
//     {
//       path: "/lead_list",
//       name: "Analytics",
//       icon: <CloseOutlined />,
//     }
//   ];
//   return (
//     <div className="row contain">
//       <div className="container-fluid">
//         <div 
//         style={{ width: isOpen ? "220px" : "50px" }} 
//         className="sidebar">
//           <div className="top_section">
//             <div
//               style={{ marginLeft: isOpen ? "150px" : "0px" }}
//               className="bars"
//             >
//               <i class="bi bimenu bi-list" onClick={toggle} />
//             </div>
//           </div>
//           {menuItem.map((item, index) => (
//             <NavLink
//               to={item.path}
//               key={index}
//               className="link"
//               activeclassName="active"
//             >
//               <div className="icon">{item.icon}</div>
//               <div
//                 style={{ display: isOpen ? "block" : "none" }}
//                 className="link_text"
//               >
//                 {item.name}
//               </div>
//             </NavLink>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
