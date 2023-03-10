import React from "react";
import PublicFetch from "../../utils/PublicFetch";
import { ROUTES } from "../../routes/index";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/img/img_avatar.png";
import HeaderIcon from "../../components/img/HeaderIcon.png";
import { IoMdNotifications } from "react-icons/io";
import { TfiKey } from "react-icons/tfi";
import { HiLogout } from "react-icons/hi";
import { Dropdown, Space } from "antd";
import styles from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();

  //Handle dropdown options click event
  const handleDropdownClick = (event) => {
    console.log(event, "Events on Click");
    if (event.key === "1") {
      console.log("Clicked Super Admin");
      return false;
    } else if (event.key === "3") {
      LogoutUser();
      console.log("Clicked on Logout");
    }
  };

  //Api call for when logout clicked
  const LogoutUser = async () => {
    try {
      const logoutUser = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/auth/logout`
      );

      if (logoutUser?.status === 200) {
        localStorage.removeItem("UserToken");
        navigate(ROUTES.LOGIN);
      }
    } catch (err) {
      // let errorMessage = parseAxiosError(err);
      // message.error(errorMessage);
      console.log("Error while Logout");
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
            {/* <p className={`${styles.DrpdwnUser}`}>Super Admin</p>
            <hr className={`${styles.HorizontalRule}`}></hr> */}
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
              Change Password
              <span className="ps-2">
                <TfiKey size={15} />
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
              <span className="ps-2">
                <HiLogout />
              </span>
            </p>
          </div>
        </>
      ),
    },
  ];

  const notif = [
    {
      key: "1",
      label: (
        <>
          <div>
            <div>
              <p>kifherufhefhejffhjefjehfjehf</p>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div>
            <div>
              <p>kifherufhefhejffhjefjehfjehf</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  const notificationProps = {
    notif,
  };

  const menuProps = {
    items,
    onClick: handleDropdownClick,
  };

  return (
    <div className="d-flex justify-content-end mt-2">
      <div
        className={`${styles.headerContainer} d-flex align-items-center justify-content-around`}
      >
        <div className={`${styles.ImgWrappe2r}`}>
          {/* <Dropdown
            menu={menuProps}
            placement="bottom"
            overlayClassName="dropdwnHeader"
          >
            <Space> */}
          <IoMdNotifications
            size={22}
            color="#6B728E"
            className={`${styles.NotificationIcon}`}
          />
          {/* </Space> */}
          {/* </Dropdown> */}
        </div>
        <div className={`${styles.ImgWrapper}`}>
          <Dropdown
            menu={menuProps}
            placement="bottomRight"
            overlayClassName="dropdwnHeader"
          >
            {/* <Space> */}
            <img src={HeaderIcon} alt="..." />
            {/* </Space> */}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
