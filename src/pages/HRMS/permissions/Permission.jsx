import { Checkbox, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import "./permissions.scss";

function Permission() {
  const [module1Click, setModule1Click] = useState(true);
  const [allRoleData, seAllRoleData] = useState();
  const [AllObjects, setAllObjects] = useState();

  const getRoles = () => {
    PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/roles`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
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

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState(arrayofcheckbox);
  const [branch, setBranch] = useState(false);

  console.log("dd", list);

  // const handleSelectAll = (e) => {
  //   console.log("data by check box 1", e);
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(list.map((li) => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  // const handleClick = (e) => {
  //   console.log("data by checkbox 2");
  //   const { id, checked } = e.target;
  //   setIsCheck([...isCheck, id]);
  //   if (!checked) {
  //     setIsCheck(isCheck.filter((item) => item !== id));
  //   }
  // };

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

  return (
    <div>
      <div className="">
        <div className="container p-3">
          <div className="">
            <h2 style={{ color: "#0891d1" }}>Assign Permission</h2>
          </div>
          <Form
            onFinish={(value) => {
              console.log("Values of submit::", value);
            }}
          >
            <div className="row">
              <div className="col-4 py-3">
                <div className="">
                  <label>Roles</label>
                  <div className="">
                    <Form.Item name="role_id">
                      <SelectBox >
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
              <div className="col-12 py-5">
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <label>Create</label>
                      </div>
                      <div className="col-3">
                        <label>Update</label>
                      </div>
                      <div className="col-3">
                        <label>Read</label>
                      </div>
                      <div className="col-3">
                        <label>Delete</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    {/* <div className="d-flex justify-content-center">
                    <Checkbox></Checkbox>
                    <button
                      onClick={() => setModule1Click(!module1Click)}
                      className="ms-3 btn-toggle"
                    >
                      Hrms
                    </button>
                  </div> */}
                  </div>
                  {module1Click ? (
                    <>
                      {AllObjects &&
                        AllObjects.length > 0 &&
                        AllObjects.map((item, index) => {
                          return (
                            <div className="col-12 my-3">
                              {/* {single screen/object  starts} */}

                              <div className="row">
                                <div className="col-6 ">
                                  <div className=" d-flex justify-content-center gap-2">
                                    <Form.Item name="object_id">
                                      <Checkbox.Group>
                                        <Checkbox
                                        name={item.name}
                                          // indeterminate={}
                                          value={item.id}
                                          onChange={(e) => {
                                            // handleSelectAll(e);
                                            console.log(
                                              "datat",
                                              e.target.value
                                            );
                                            setBranch(!branch);
                                          }}
                                          // checked={isCheckAll}
                                        >
                                          {item.name}
                                        </Checkbox>
                                      </Checkbox.Group>
                                    </Form.Item>
                                  </div>
                                </div>

                                <div className="col-6 ps-4">
                                  <div className="row">
                                    {AllObjects &&
                                      AllObjects.length > 0 &&
                                      arrayofcheckbox.map((item1, index) => {
                                        return (
                                          <div className="col-3">
                                            <div className="">
                                              <Form.Item name="permissions">
                                                <Checkbox name={item.name}
                                                  id={item.id}
                                                  value={item1?.value}
                                                  onChange={(value) => {
                                                    console.log(
                                                      "jsfdjdas",
                                                      value.target.value
                                                    );

                                                    // onChange(value);
                                                    // handleClick(value);
                                                  }}
                                                  checked={branch}
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>

                                {/* <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div> */}
                              </div>

                              {/* {single screen/object   ends} */}
                            </div>
                          );
                        })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="row my-5">
                <div className="col-6">
                  <div className="d-flex justify-content-center">
                    <Checkbox></Checkbox>
                    <button
                      onClick={() => setModule1Click(!module1Click)}
                      className="ms-3 btn-toggle"
                    >
                      CRM
                    </button>
                  </div>
                </div>
                {module1Click ? (
                  <div className="col-12 my-3">
                    <div className="row">
                      <div className="col-6 ">
                        <div className="ms-5 d-flex justify-content-center ">
                          <label></label>
                          <p>sales</p>
                        </div>
                      </div>
                      <div className="col-6 ps-4">
                        <div className="row">
                          <div className="col-3">
                            <div className="">
                              <Checkbox />
                            </div>
                          </div>
                          <div className="col-3">
                            <Checkbox />
                          </div>
                          <div className="col-3">
                            <Checkbox />
                          </div>
                          <div className="col-3">
                            <Checkbox />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div> */}
              </div>
              <div className="col-12 d-flex justify-content-center">
                <Button type="submit" className="p-2 save_button_style">
                  {" "}
                  save
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
