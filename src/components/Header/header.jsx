import React, { useState } from "react";
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
import CustomModel from "../custom_modal/custom_model";

const Header = () => {
  const navigate = useNavigate();
  const [notiModal, setNotiModal] = useState(false);
  const [notiClicked, setNotiClicked] = useState();
  const data = [
    {
      id: 1,
      name: "Quotation Created SuccessFully",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      name: "Job Created SuccessFully",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      name: "Invoice Created SuccessFully",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 4,
      name: "Opportunity Created SuccessFully",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  const [allNotifications, setAllNotifications] = useState(data);

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

  const menuProps = {
    items,
    onClick: handleDropdownClick,
  };

  const handlenotification = () => {
    setNotiModal(true);
  };
  const handleShowContent = (data) => {
    setNotiClicked(data);
  };

  return (
    <div className="d-flex justify-content-end mt-2">
      <div
        className={`${styles.headerContainer} d-flex align-items-center justify-content-around`}
      >
        <div
          className={`${styles.notification_icon}`}
          onClick={() => {
            handlenotification();
          }}
        >
          <span className={`${styles.icon_style}`}>
            <lable className={`${styles.notif_count}`}>3</lable>
          </span>
          <IoMdNotifications
            size={22}
            color="#6B728E"
            className={`${styles.NotificationIcon}`}
          />
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
      <CustomModel
        show={notiModal}
        onHide={() => {
          setNotiModal(false);
        }}
        View_list
        list_content={
          <>
            <div className="container-fluid">
              <div className="row">
                <h4 style={{ color: "#0891d1" }}>Notifications</h4>
                <div className="col-12">
                  {allNotifications &&
                    allNotifications.length > 0 &&
                    allNotifications.map((item, index) => {
                      return (
                        <div className="row my-2 py-2 ">
                          <div className="col-2">
                            <div
                              style={{
                                borderRadius: "100%",
                                backgroundColor: "whitesmoke",
                              }}
                              className={`p-3`}
                            >
                              <IoMdNotifications
                                size={22}
                                color="#6B728E"
                                className={`${styles.NotificationIcon}`}
                              />
                            </div>
                          </div>
                          <div className="col-10">
                            <div
                              className="mt-3"
                              onClick={() => {
                                handleShowContent(item.id);
                              }}
                            >
                              <h6 style={{ fontWeight: "600" }}>{item.name}</h6>
                            </div>
                            {notiClicked == item.id ? (
                              <>
                                <div className="">
                                  <p>{item.description}</p>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default Header;
