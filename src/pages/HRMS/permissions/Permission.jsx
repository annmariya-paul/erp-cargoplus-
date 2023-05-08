import { Checkbox, Form, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import "./permissions.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { PERMISSIONS } from "../../../utils/permission_dummy";
import TableData from "../../../components/table/table_data";
import { FaEdit } from "react-icons/fa";

function Permission() {
  const [module1Click, setModule1Click] = useState(true);
  const [allRoleData, seAllRoleData] = useState();
  const [AllObjects, setAllObjects] = useState();
  // const rolePermission = PERMISSIONS[0];
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);


  const getRoles = () => {
    PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/roles`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          setSelectedRole(res.data.data[0].id);
          seAllRoleData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getRoles();
    getObjects();
  }, []);
  const permissionsArray = ["create", "read", "update", "delete"];
  const arrayofcheckbox = [
    {
      id: 1,
      value: "create",
    },
    {
      id: 2,
      value: "update",
    },
    {
      id: 3,
      value: "read",
    },
    {
      id: 4,
      value: "delete",
    },
  ];

  const getObjects = () => {
    PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/objects`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success", res.data.data);
          setAllObjects(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleRoleChange = async (id) => {
    // dont delete old code !! might be required
    // try {
    //   setSelectedRole(id);
    //   const res = await PublicFetch.get(
    //     `${process.env.REACT_APP_BASE_URL}/permissions/${id}`
    //   );
    //   if (res?.data?.success === true) {
    //     let tmp = [];
    //     res.data.data.forEach((item, index) => {
    //       tmp.push({ permissions: item.permissions });
    //     });
    //     setRolePermissions(tmp);
    //   }
    // } catch (err) {
    //   console.log("Error while getting role permissions : ", err);
    // }

    // new code delete if required
    try {
      setSelectedRole(id);
      const res = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/permissions/${id}`
      );
      if (res?.data?.success) {
        console.log("all permissions", res.data.data);
        setRolePermissions(res?.data?.data);
      }
    } catch (err) {
      console.log("Error while changing role : ", err);
    }
  };

  const checkPermission = (value, objectId) => {
    let ret = false;
    // console.log("Value : ", value, "Object Id : ", objectId);
    // old code do not change
    // if (
    //   rolePermissions &&
    //   Array.isArray(rolePermissions) &&
    //   rolePermissions.length > 0
    // ) {
    //   ret = rolePermissions.some((item, index) => {
    //     return (
    //       item.permissions.objectid === objectId &&
    //       item.permissions.action === value
    //     );
    //   });
    // }
    // console.log("Return : ", ret);

    // new code
    ret = rolePermissions.some((rolePermission, rolePermissionIndex) => {
      return (
        rolePermission.objectid === objectId &&
        rolePermission.action.includes(value)
      );
    });
    return ret;
  };

  const handleSinglePermissionChange = (checked, value, objectId) => {
    // old code;
    // if (checked) {
    //   setRolePermissions((prev) => {
    //     return [
    //       ...prev,
    //       {
    //         permissions: {
    //           action: value,
    //           objectid: objectId,
    //         },
    //       },
    //     ];
    //   });
    // } else {
    //   let tmp = [];
    //   rolePermissions.forEach((item, index) => {
    //     // idk why I wrote this bad logic !!!
    //     // anyway its working :-()
    //     if (
    //       item.permissions.action === value &&
    //       item.permissions.objectid === objectId
    //     ) {
    //     } else {
    //       tmp.push(item);
    //     }
    //   });
    //   setRolePermissions([...tmp]);
    // }
    // new code;
    let tmp = rolePermissions;
    if (checked) {
      console.log("Checked :", objectId, value);
      // if checkbox is checked
      let addIndex = null;
      let contains = rolePermissions.some(
        (rolePermission, rolePermissionIndex) => {
          addIndex = rolePermissionIndex;
          return rolePermission.objectid === objectId;
        }
      );
      if (contains) {
        tmp[addIndex].action.push(value);
        setRolePermissions([...tmp]);
      } else {
        tmp.push({
          id: rolePermissions[rolePermissions.length - 1]?.id
            ? rolePermissions[rolePermissions.length - 1]?.id + 1
            : 1,
          objectid: objectId,
          action: [value],
        });
        setRolePermissions([...tmp]);
      }
    } else {
      // if un checked;
      console.log("Checked Un", objectId, value);
      let tmp = rolePermissions;
      let filteredActions = [];
      rolePermissions.forEach((rolePermission, rolePermissionIndex) => {
        if (rolePermission.objectid === objectId) {
          filteredActions = tmp[rolePermissionIndex].action.filter(
            (item, index) => {
              return item !== value;
            }
          );
          tmp[rolePermissionIndex].action = filteredActions;
        }
      });
      setRolePermissions([...tmp]);
    }
  };

  const handleSubModuleChange = (checked, objectId) => {
    // old code;
    // if (checked) {
    //   let tmp = [];
    //   rolePermissions.forEach((item, index) => {
    //     if (item.permissions.objectid !== objectId) {
    //       tmp.push(item);
    //     }
    //   });
    //   arrayofcheckbox.forEach((item, index) => {
    //     tmp.push({
    //       permissions: {
    //         action: item.value,
    //         objectid: objectId,
    //       },
    //     });
    //   });
    //   // console.log("Exist final : ", tmp);
    //   setRolePermissions([...tmp]);
    // } else {
    //   let tmp = [];
    //   rolePermissions.forEach((item, index) => {
    //     if (item.permissions.objectid !== objectId) {
    //       tmp.push(item);
    //     }
    //   });
    //   setRolePermissions([...tmp]);
    // }

    // new code
    if (checked) {
      // let tmp = rolePermissions;
      // rolePermissions.forEach((rolePermission, rolePermissionIndex) => {
      //   if (rolePermission.objectid === objectId) {
      //     tmp[rolePermissionIndex].action = permissionsArray;
      //   }
      // });
      // setRolePermissions([...tmp]);

      let tmp = rolePermissions;
      let hasInArray = rolePermissions.some((item, index) => {
        return item.objectid === objectId;
      });
      if (hasInArray) {
        rolePermissions.forEach((rolePermission, rolePermissionIndex) => {
          if (rolePermission.objectid === objectId) {
            tmp[rolePermissionIndex].action = permissionsArray;
          }
        });
        setRolePermissions([...tmp]);
      } else {
        tmp.push({
          id: rolePermissions[rolePermissions.length - 1]?.id
            ? rolePermissions[rolePermissions.length - 1]?.id + 1
            : 1,
          objectid: objectId,
          action: permissionsArray,
        });
        setRolePermissions([...tmp]);
      }
    } else {
      let tmp = rolePermissions;
      rolePermissions.forEach((rolePermission, rolePermissionIndex) => {
        if (rolePermission.objectid === objectId) {
          tmp[rolePermissionIndex].action = [];
        }
      });
      setRolePermissions([...tmp]);
    }
  };

  const checkSubmodule = (objectId) => {
    // let p = false;
    // rolePermissions.forEach((item, index) => {
    //   if (item.permissions.objectid === objectId) {
    //     p = permissionsArray.includes(item.permissions.action);
    //   }
    // });
    // return p;
    let isChecked = false;
    rolePermissions.forEach((item, index) => {
      if (item.objectid === objectId) {
        isChecked = rolePermissions[index].action.length === 4;
      }
    });
    return isChecked;
  };

  const handleSubmit = async () => {
    try {
      let i = 0;
      for (const rolePermission of rolePermissions) {
        rolePermission.roleid = selectedRole;
        const res = await PublicFetch.post(
          `${process.env.REACT_APP_BASE_URL}/permissions`,
          rolePermission
        );
        i += 1;
        if (i >= rolePermissions.length) {
          message.success("Permissions Assigned");
        }
      }
    } catch (err) {
      console.log("Error while adding permission : ", err);
    }
  };

  console.log("Roles : ", rolePermissions);

  const columns = [
    {
      title: "SCREENS",
      dataIndex: "name",
      key: "key",
      // width: "40%",

      render: (data, index) => {
        return (
          <div className="d-flex justify-content-start  gap-2">
            {module1Click ? (
              <>
                <div className="col-12 my-1" key={index.id}>
                      <div className=" d-flex justify-content-start gap-2">
                        {/* <Form.Item name="object_id"> */}
                        <Checkbox
                          name={index.name}
                          value={index.id}
                          onChange={(e) =>
                            handleSubModuleChange(e.target.checked, index.id)
                          }
                          checked={checkSubmodule(index.id)}
                        >
                          {index.name}
                        </Checkbox>
                        {/* </Form.Item> */}
                      </div>
                    </div>

                    <div className="col-6 ps-4">
                      <div className="row">
                        {/* {AllObjects &&
                                        AllObjects.length > 0 &&
                                        arrayofcheckbox.map(
                                          (permission, permissionIndex) => {
                                            return (
                                              <div className="col-3">
                                                <div className="">

                                                  <Checkbox
                                                    key={`${permission.value}-${object.id}`}
                                                    value={`${permission.value}-${object.id}`}
                                                    onChange={(e) =>
                                                      handleSinglePermissionChange(
                                                        e.target.checked,
                                                        permission.value,
                                                        object.id
                                                      )
                                                    }
                                                    checked={checkPermission(
                                                      permission.value,
                                                      object.id
                                                    )}
                                                  />
                                                 
                                                </div>
                                              </div>
                                            );
                                          }
                                        )} */}
                      </div>
                    </div>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
      align: "left",
    },
    {
      title: " CREATE",
      dataIndex: "designation_name",
      key: "designation_name",
      align: "center",
      render: (data, index) => {
        console.log("indxx", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div className="editIcon m-0">
                <Checkbox
                  key={`create-${index.id}`}
                  value={`create-${index.id}`}
                  onChange={(e) =>
                    handleSinglePermissionChange(
                      e.target.checked,
                      "create",
                      index.id
                    )
                  }
                  checked={checkPermission("create", index.id)}
                />
              </div>
            </div>
          </div>
        );
      },
      // width: "25%",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => {
      //   return String(record.designation_name)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
    },
    {
      title: "READ",
      dataIndex: "designation_code",
      key: "designation_code",
      align: "center",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div className="editIcon m-0">
                <Checkbox
                  key={`read-${index.id}`}
                  value={`read-${index.id}`}
                  onChange={(e) =>
                    handleSinglePermissionChange(
                      e.target.checked,
                      "read",
                      index.id
                    )
                  }
                  checked={checkPermission("read", index.id)}
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "UPDATE",
      dataIndex: "designation_code",
      key: "designation_code",
      align: "center",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div className="editIcon m-0">
                <Checkbox
                  key={`update-${index.id}`}
                  value={`update-${index.id}`}
                  onChange={(e) =>
                    handleSinglePermissionChange(
                      e.target.checked,
                      "update",
                      index.id
                    )
                  }
                  checked={checkPermission("update", index.id)}
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "DELETE",
      dataIndex: "designation_code",
      key: "designation_code",
      align: "center",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div className="editIcon m-0">
                <Checkbox
                  key={`delete-${index.id}`}
                  value={`delete-${index.id}`}
                  onChange={(e) =>
                    handleSinglePermissionChange(
                      e.target.checked,
                      "delete",
                      index.id
                    )
                  }
                  checked={checkPermission("delete", index.id)}
                />
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container-fluid container_hrms pt-3">
        <div className="container">
          <div className="">
            <h5 style={{ color: "#0891d1" }}>Assign Permission</h5>
          </div>
          <Form
            onFinish={(value) => {
              console.log("Values of submit::", value);
            }}
          >
            <div className="row ">
              <div className="col-4 py-3">
                <div className="">
                  <label>Roles</label>
                  <div className="">
                    <Form.Item name="role_id">
                      <SelectBox
                        onChange={handleRoleChange}
                        value={selectedRole}
                      >
                        {allRoleData &&
                          allRoleData.length > 0 &&
                          allRoleData.map((item, index) => {
                            return (
                              <Select.Option key={item.id} value={item.id}>
                                {item.name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
              </div>
             
              {/* Alan adding dummy data uncomment the below for api integration */}
              <TableData
                data={AllObjects}
                columns={columns}
                custom_table_css="table_permission_list"
              />

      

              <div className="col-12 d-flex justify-content-center ">
                <Button
                
                  onClick={handleSubmit}
                  className="p-2 save_button_style"
                >
                  {" "}
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Permission;
