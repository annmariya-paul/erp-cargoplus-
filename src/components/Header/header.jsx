import React from "react";
import Avatar from "../../components/img/img_avatar.png";
import { IoMdNotifications } from "react-icons/io";
import { TfiKey } from "react-icons/tfi";
import { HiLogout } from "react-icons/hi";
import { Dropdown, Space } from "antd";
import styles from "./header.module.scss";

const Header = () => {
  //Handle dropdown options click event
  const handleDropdownClick = (event) => {
    console.log(event, "Events on Click");
    if (event.key === "1") {
      console.log("Clicked Super Admin");
      return false;
    } else if (event.key === "3") {
      console.log("Clicked on Logout");
    }
  };

  //Array containing dropdown options
  const items = [
    {
      key: "1",
      label: (
        <>
          <div>
            <p className={`${styles.Welcome} mt-2`}>Welcome Super admin!</p>
            <p className={`${styles.DrpdwnUser}`}>Super Admin</p>
            <hr className={`${styles.HorizontalRule}`}></hr>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <p className={`${styles.HeaderOptions}`}>
              Change Password{" "}
              <span className="ps-3">
                <TfiKey size={20} />
              </span>
            </p>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div>
            <p className={`${styles.HeaderOptions}`}>
              Logout
              <span className="ps-3">
                <HiLogout />
              </span>
            </p>
          </div>
        </>
      ),
    },
  ];

  const menuProps = {
    items,
    onClick: handleDropdownClick,
  };

  return (
    <div className="d-flex justify-content-end mt-2 ms-2 me-2 mb-3">
      <div
        className={`${styles.headerContainer} d-flex align-items-center justify-content-around`}
      >
        <IoMdNotifications
          size={25}
          color="#6B728E"
          className={`${styles.NotificationIcon}`}
        />
        <div className={`${styles.ImgWrapper}`}>
          <Dropdown
            menu={menuProps}
            placement="bottomRight"
            overlayClassName="dropdwnHeader"
          >
            {/* <Space> */}
            <img src={Avatar} alt="..." />
            {/* </Space> */}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
