import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import PublicFetch from "../../../../utils/PublicFetch";

function TaxGroup() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [AddModal, SetAddModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [ViewModal, setViewModal] = useState(false);
  const [AllTaxGroup, setAllTaxGroup] = useState();
  const [taxgroupId, setTaxGroupId] = useState();
  const [taxGroupData, setTaxGroupData] = useState();

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "5%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "NAME",
      dataIndex: "tax_group_name",
      key: "enq_source_name",
      width: "25%",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        // console.log("hai how are", record.children);

        return (
          String(record.tax_group_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.tax_group_description)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    // Table.EXPAND_COLUMN,
    {
      title: "DESCRIPTION",
      dataIndex: "tax_group_description",
      key: "tax_group_description",
      width: "11%",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        // console.log("hai how are", record.children);

        return (
          String(record.tax_group_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.tax_group_description)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "24%",
      align: "center",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <div
              className="actionEdit"
              onClick={() => {
                handleEditTaxGroup(index);
              }}
            >
              <FaEdit />
            </div>
            <div
              className="actionEdit"
              onClick={() => {
                handleViewTaxGroup(index);
              }}
            >
              <MdPageview />
            </div>
          </div>
        );
      },
    },
  ];

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const GetTaxGroups = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/tax_group`)
      .then((res) => {
        console.log("response");
        if (res.data.success) {
          console.log("success");
          setAllTaxGroup(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const CreateTaxGroup = (data) => {
    PublicFetch.post(`${CRM_BASE_URL_FMS}/tax_group`, data)
      .then((res) => {
        console.log("response");
        if (res.data.success) {
          console.log("success");
          GetTaxGroups();
          SetAddModal(false);
          setSuccessPopup(true);
          close_modal(SuccessPopup, 1200);
          addForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleEditTaxGroup = (data) => {
    if (data) {
      setEditModal(true);
      setViewModal(false);
      setTaxGroupId(data?.tax_group_id);
      addForm.setFieldsValue({
        tax_group_name1: data.tax_group_name,
        tax_group_description1: data.tax_group_description,
      });
    }
  };

  const updateTaxGroup = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/tax_group/${taxgroupId}`, {
      tax_group_name: data.tax_group_name1,
      tax_group_description: data.tax_group_description1,
    })
      .then((res) => {
        console.log("response");
        if (res.data.success) {
          console.log("success");
          setEditModal(false);
          GetTaxGroups();
          setSuccessPopup(true);
          close_modal(SuccessPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleViewTaxGroup = (data) => {
    if (data) {
      setTaxGroupData(data);
      setViewModal(true);
    }
  };
  const data12 = AllTaxGroup?.map((item) => [
    item?.action,
    item?.tax_group_name,
    item?.tax_group_description,
  ]);

  const TaxGroupHeads = [
    ["tax_group_id", "tax_group_name", "tax_group_description"],
  ];

  const getData = (current, pageSize) => {
    return AllTaxGroup?.slice((current - 1) * pageSize, current * pageSize);
  };

  useEffect(() => {
    GetTaxGroups();
  }, []);

  return (
    <div className="container-fluid shadow-sm p-3">
      <div className="row  ">
        <div className="col-4">
          <h5 className="lead_text">Tax Groups</h5>
        </div>
        <div className="col-4 ">
          <Input.Search
            className="inputSearch"
            placeholder="Search by Name"
            style={{ borderRadius: "5px" }}
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value ? [e.target.value] : []);
            }}
            onSearch={(value) => {
              setSearchedText(value);
            }}
          />
        </div>
        <div className="col-4 d-flex justify-content-end">
          {AllTaxGroup && (
            <Leadlist_Icons
              datas={data12}
              columns={columns}
              items={data12}
              xlheading={TaxGroupHeads}
              filename="data.csv"
              // chechboxes={
              //   <Checkbo.Group onChange={onChange} value={selectedColumns}>
              //     {columnsKeys.map((column) => (
              //       <li>
              //         <Checkbox value={column} key={column}>
              //           {column}
              //         </Checkbox>
              //       </li>
              //     ))}
              //   </Checkbo.Group>
              // }
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="row my-3">
          <div className="col-4  ">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => {
                setCurrent(1);
                setPageSize(e);
              }}
            >
              <Select.Option value="25">
                Show
                <span style={{ color: "lightgray" }} className="ms-1">
                  |
                </span>
                <span style={{ color: "#2f6b8f" }} className="ms-1">
                  25
                </span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span style={{ color: "lightgray" }} className="ms-1">
                  |
                </span>
                <span style={{ color: "#2f6b8f" }} className="ms-1">
                  50
                </span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span style={{ color: "lightgray" }} className="ms-1">
                  |
                </span>
                <span style={{ color: "#2f6b8f" }} className="ms-1">
                  100
                </span>
              </Select.Option>
            </Select>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <MyPagination
              total={AllTaxGroup?.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end" style={{}}>
            <Button
              btnType="save"
              onClick={() => {
                SetAddModal(true);
              }}
            >
              Add Tax Group
            </Button>
          </div>
        </div>
        <div className="col-12">
          <div className="datatable">
            <TableData
              data={getData(current, pageSize)}
              //   data={AllTaxGroup}
              columns={columns}
              custom_table_css="table_lead_list"
              expandable
              expandIconColumnIndex={1}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={AllTaxGroup?.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
        </div>
        <CustomModel
          show={AddModal}
          onHide={() => {
            SetAddModal(false);
          }}
          View_list
          list_content={
            <>
              <div className="container">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("submitted add value", value);
                    CreateTaxGroup(value);
                  }}
                >
                  <div className="row">
                    <div className="col-12">
                      <h5 className="lead_text">Tax Group</h5>
                    </div>
                    <div className="col-12 mt-2">
                      <label>
                        Name<span className="required">*</span>
                      </label>
                      <Form.Item
                        name="tax_group_name"
                        rules={[
                          {
                            required: true,
                            message: "Name is Required",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-3">
                      <label>Description</label>
                      <Form.Item name="tax_group_description">
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          }
        />
        <CustomModel
          show={EditModal}
          onHide={() => {
            setEditModal(false);
          }}
          View_list
          list_content={
            <>
              <div className="container">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("edit data", value);
                    updateTaxGroup(value);
                  }}
                >
                  <div className="row">
                    <div className="col-12">
                      <h5 className="lead_text">Tax Group</h5>
                    </div>
                    <div className="col-12 mt-2">
                      <label>
                        Name<span className="required">*</span>
                      </label>
                      <Form.Item
                        name="tax_group_name1"
                        rules={[
                          {
                            required: true,
                            message: "Name is Required",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-3">
                      <label>Description</label>
                      <Form.Item name="tax_group_description1">
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          }
        />
        <CustomModel
          show={ViewModal}
          onHide={() => {
            setViewModal(false);
          }}
          View_list
          list_content={
            <>
              <div className="container">
                <div className="row p-3">
                  <div className="col-6">
                    <h4 className="lead_text">Tax Group</h4>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <Button
                      onClick={() => {
                        handleEditTaxGroup(taxGroupData);
                      }}
                      btnType="add_borderless"
                      className="edit_button"
                    >
                      Edit <FaEdit />
                    </Button>
                  </div>
                  <div className="col-12 p-3">
                    <table>
                      <tbody>
                        <tr className="mt-3">
                          <td>
                            <p>Name</p>
                          </td>
                          <td>
                            <p>:</p>
                          </td>
                          <td>
                            <p className="modal_view_p_sub">
                              {taxGroupData?.tax_group_name}
                            </p>
                          </td>
                        </tr>
                        <tr className="mt-3">
                          <td>
                            <p> Description</p>
                          </td>
                          <td>
                            <p>:</p>
                          </td>
                          <td>
                            <p className="modal_view_p_sub">
                              {taxGroupData?.tax_group_description}
                            </p>{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          }
        />
        <CustomModel
          show={SuccessPopup}
          onHide={() => {
            setSuccessPopup(false);
          }}
          success
        />
      </div>
    </div>
  );
}

export default TaxGroup;
