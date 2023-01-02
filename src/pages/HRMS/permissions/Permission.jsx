import { Checkbox, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import "./permissions.scss";

function Permission() {
  const [module1Click, setModule1Click] = useState(true);
  const [allRoleData, seAllRoleData] = useState();

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

  console.log("dd", list);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <div>
      <div className="">
        <div className="container p-3">
          <div className="">
            <h2 style={{ color: "#0891d1" }}>Assign Permission</h2>
          </div>
          <Form>
            <div className="row">
              <div className="col-4 py-3">
                <div className="">
                  <label>Roles</label>
                  <div className="">
                    <SelectBox>
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
                    <div className="col-12 my-3">
                      {/* {single screen/object  starts} */}
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox
                              // indeterminate={}
                              onChange={handleSelectAll}
                              checked={isCheckAll}
                            ></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            {arrayofcheckbox.map((item, index) => {
                              return (
                                <div className="col-3">
                                  <div className="">
                                    <Checkbox
                                      id={item.id}
                                      value={item.value}
                                      onChange={(value) => {
                                        console.log(
                                          "jsfdjdas",
                                          value.target.value
                                        );
                                        // onChange(value);
                                        handleClick(value);
                                      }}
                                      checked={isCheck.includes(item.id)}
                                    />
                                  </div>
                                </div>
                              );
                            })}

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
                        </div>
                      </div>
                      {/* {single screen/object   ends} */}
                    </div>
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
                <Button className="p-2 save_button_style"> save</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Permission;
