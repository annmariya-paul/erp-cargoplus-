import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdPageview } from "react-icons/md";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import SelectBox from "../../../../components/Select Box/SelectBox";
import TableData from "../../../../components/table/table_data";

function AccGroup() {
  const [AddForm] = Form.useForm();
  const [searchedText, setSearchedText] = useState("");
  const [totalAccGroup, setTotalAccGroup] = useState();
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [slno, setSlno] = useState(1);
  const [AddPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [AccGroupData, setAccGroupData] = useState();

  const columns = [
    {
      title: "Slno",
      dataIndex: "slno",
      key: "slno",
      width: "2%",
      render: (data, index, no) => {
        return (
          <div>
            <lable>{slno + no}</lable>
          </div>
        );
      },
    },
    {
      title: "GROUP CODE",
      dataIndex: "acc_group_code",
      key: "acc_group_code",
      width: "8%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.acc_group_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.acc_group_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.acc_group_parent_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.acc_group_description)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.acc_group_head)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      // align: "center",
    },
    {
      title: "GROUP Name",
      dataIndex: "acc_group_name",
      key: "acc_group_name",
      width: "15%",
      //   filteredValue: [searchSource],
    },
    {
      title: "GROUP PARENT",
      dataIndex: "acc_group_parent_name",
      key: "acc_group_parent_name",
      width: "15%",
      //   filteredValue: [searchSource],
    },

    {
      title: "GROUP HEAD",
      dataIndex: "acc_group_head",
      key: "acc_group_head",
      width: "15%",
      //   filteredValue: [searchSource],
    },
    {
      title: "DESCRIPTION",
      dataIndex: "acc_group_description",
      key: "acc_group_description",
      width: "15%",
      //   filteredValue: [searchSource],
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "5%",
      render: (data, index) => {
        console.log("mere index", index);
        return (
          <div className="d-flex editcolor justify-content-center gap-4 align-items-center">
            {/* <div className="editcolor "> */}
            <FaEdit
              fontSize={17}
              onClick={() => {
                // expEdit(index);
                // setUniqueEditName(false);
                handleEditClick(index);
              }}
            />
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>

            {/* </div> */}
            {/* <div className="editcolor">
              <MdDelete />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
  ];

  const data = [
    {
      acc_group_description: "lorem ispum",
      acc_group_code: 100,
      acc_group_parent_name: "Test Ledger",
      acc_group_name: "Test Group",
    },
  ];

  const handleEditClick = (data) => {
    console.log("hai its edit", data);
    if (data) {
      setEditPopup(true);
      AddForm.setFieldsValue({
        acc_group_code1: data.acc_group_code,
        acc_group_name1: data.acc_group_name,
        acc_group_parent_id1: data.acc_group_parent_id,
        acc_group_description1: data.acc_group_description,
      });
      setViewPopup(false);
    }
  };

  const handleViewClick = (data) => {
    if (data) {
      setViewPopup(true);
      setAccGroupData(data);
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "GROUP CODE",
      "GROUP NAME",
      "PARENT GROUP",
      "GROUP HEAD",
      "LEDGER DESCRIPTION",
    ],
  ];
  //for pdf download
  const data12 = data?.map((item, index) => [
    index + slno,
    item.acc_group_code,
    item.acc_group_name,
    item.acc_group_parent,
    item.acc_group_description,
    item.acc_group_head,
  ]);
  return (
    <div className="container-fluid shadow-sm p-3">
      <div className="row align-items-center">
        <div className="col-xl-4">
          <h5 className="lead_text">Account Groups</h5>
        </div>
        <div className="col-xl-4">
          <Input.Search
            className="inputSearch"
            placeholder="Search"
            style={{ margin: "5px", borderRadius: "5px" }}
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value ? [e.target.value] : []);
            }}
            onSearch={(value) => {
              setSearchedText(value);
            }}
          />
        </div>
        <div className="col-xl-4 d-flex justify-content-end">
          {data12 && (
            <Leadlist_Icons
              datas={data12}
              columns={filteredColumns}
              items={data12}
              xlheading={UnitHeads}
              filename="data.csv"
            />
          )}
        </div>
      </div>
      <div className="row my-3 ">
        <div className="col-4 px-3">
          <Select
            // defaultValue={"25"}
            bordered={false}
            className=" page_size_style"
            value={numOfItems}
            onChange={(e) => {
              setNumOfItems(e);
              setCurrent(1);
            }}
          >
            <Select.Option value="25">
              Show{" "}
              <span style={{ color: "lightgray" }} className="ms-1">
                |
              </span>
              <span style={{ color: "#2f6b8f" }} className="ms-2">
                25
              </span>{" "}
            </Select.Option>
            <Select.Option value="50">
              {" "}
              Show{" "}
              <span style={{ color: "lightgray" }} className="ms-1">
                |
              </span>
              <span style={{ color: "#2f6b8f" }} className="ms-2">
                50
              </span>{" "}
            </Select.Option>
            <Select.Option value="100">
              {" "}
              Show{" "}
              <span style={{ color: "lightgray" }} className="ms-1">
                |
              </span>
              <span style={{ color: "#2f6b8f" }} className="ms-2">
                100
              </span>{" "}
            </Select.Option>
          </Select>
        </div>

        <div className="col-4 d-flex   align-items-center justify-content-center">
          {totalAccGroup?.length > 0 && (
            <MyPagination
              total={parseInt(totalAccGroup?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          )}
        </div>
        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
        <div className="col-4 d-flex justify-content-end">
          {/* <div className=""> */}
          {/* <Link style={{ color: "white" }}> */}
          <Button
            onClick={() => {
              setAddPopup(true);
              //   setUniqueName(false);
              // setInvoice_id(index.invoice_id);
              //   AddForm.resetFields();
            }}
            btnType="save"
          >
            New Account Group
          </Button>
          {/* </Link> */}
        </div>
        <div className="col-12">
          <div className="datatable">
            {/* {AllinvoiceData && ( */}
            <TableData
              data={data}
              // data={allLeadList}
              // data={OpportunityList}
              columns={columns}
              custom_table_css="table_lead_list"
            />
            {/* )} */}
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-3">
          {totalAccGroup?.length > 0 && (
            <MyPagination
              total={parseInt(totalAccGroup?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          )}
        </div>
      </div>

      <CustomModel
        show={AddPopup}
        onHide={() => {
          setAddPopup(false);
        }}
        // centered
        View_list
        list_content={
          <div>
            <div className="container">
              <h4 style={{ color: "#0891d1" }}>Account Group</h4>
              <Form
                form={AddForm}
                onFinish={(value) => {
                  console.log("On finishing", value);
                  //   createExpenseCategory(value);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="col-12 py-2">
                      <div className="">
                        <div className="">
                          <label>Group Code</label>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Ledger code is Required",
                              },
                            ]}
                            name="acc_group_code"
                          >
                            <InputType
                              onChange={(e) => {
                                // setCategoryName(e.target.value);
                                // setUniqueName(false);
                              }}
                              //   onBlur={async () => {
                              //     let n = await CheckUnique({
                              //       type: "expensecategoryname",
                              //       value: categoryName,
                              //     });
                              //     setUniqueName(n);
                              //   }}
                            />
                          </Form.Item>
                          {/* {uniqueName ? (
                            <p style={{ color: "red" }}>
                              Expense category name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 py-2">
                      <div className="">
                        <div className="">
                          <label>
                            Group Name<span className="required">*</span>
                          </label>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Ledger Name is Required",
                              },
                            ]}
                            name="acc_group_name"
                          >
                            <InputType
                              onChange={(e) => {
                                // setCategoryName(e.target.value);
                                // setUniqueName(false);
                              }}
                              //   onBlur={async () => {
                              //     let n = await CheckUnique({
                              //       type: "expensecategoryname",
                              //       value: categoryName,
                              //     });
                              //     setUniqueName(n);
                              //   }}
                            />
                          </Form.Item>
                          {/* {uniqueName ? (
                            <p style={{ color: "red" }}>
                              Expense category name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 py-2">
                      <label>
                        Parent Group<span className="required">*</span>
                      </label>
                      <Form.Item name="acc_group_parent_id">
                        <SelectBox>
                          <Select.Option></Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-12 py-2">
                      <label>
                        Account Head<span className="required">*</span>
                      </label>
                      <Form.Item name="acc_group_head">
                        <SelectBox>
                          <Select.Option></Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-12 py-2">
                      <lable>Description</lable>
                      <Form.Item
                        rules={[
                          {
                            min: 5,
                            message: "Required minimum 5 Letter",
                          },
                        ]}
                        name="acc_group_description"
                      >
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        }
      />

      {/* { EDIT MODAL} */}
      <CustomModel
        show={editPopup}
        onHide={() => {
          setEditPopup(false);
        }}
        // centered
        View_list
        list_content={
          <div>
            <div className="container">
              <h4 style={{ color: "#0891d1" }}>Account Group</h4>
              <Form
                form={AddForm}
                onFinish={(value) => {
                  console.log("On finishing", value);
                  //   createExpenseCategory(value);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="col-12 py-2">
                      <div className="">
                        <div className="">
                          <label>Group Code</label>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Ledger code is Required",
                              },
                            ]}
                            name="acc_group_code1"
                          >
                            <InputType
                              onChange={(e) => {
                                // setCategoryName(e.target.value);
                                // setUniqueName(false);
                              }}
                              //   onBlur={async () => {
                              //     let n = await CheckUnique({
                              //       type: "expensecategoryname",
                              //       value: categoryName,
                              //     });
                              //     setUniqueName(n);
                              //   }}
                            />
                          </Form.Item>
                          {/* {uniqueName ? (
                            <p style={{ color: "red" }}>
                              Expense category name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 py-2">
                      <div className="">
                        <div className="">
                          <label>
                            Group Name<span className="required">*</span>
                          </label>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Ledger Name is Required",
                              },
                            ]}
                            name="acc_group_name1"
                          >
                            <InputType
                              onChange={(e) => {
                                // setCategoryName(e.target.value);
                                // setUniqueName(false);
                              }}
                              //   onBlur={async () => {
                              //     let n = await CheckUnique({
                              //       type: "expensecategoryname",
                              //       value: categoryName,
                              //     });
                              //     setUniqueName(n);
                              //   }}
                            />
                          </Form.Item>
                          {/* {uniqueName ? (
                            <p style={{ color: "red" }}>
                              Expense category name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 py-2">
                      <label>
                        Parent Group<span className="required">*</span>
                      </label>
                      <Form.Item name="acc_group_parent_id1">
                        <SelectBox>
                          <Select.Option></Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-12 py-2">
                      <label>
                        Account Head<span className="required">*</span>
                      </label>
                      <Form.Item name="acc_group_head1">
                        <SelectBox>
                          <Select.Option></Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-12 py-2">
                      <lable>Description</lable>
                      <Form.Item
                        rules={[
                          {
                            min: 5,
                            message: "Required minimum 5 Letter",
                          },
                        ]}
                        name="acc_group_description1"
                      >
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        }
      />

      {/* { VIEW MODAL} */}
      <CustomModel
        show={viewPopup}
        onHide={() => {
          setViewPopup(false);
        }}
        //   centered
        View_list
        list_content={
          <>
            <div className="container p-3">
              <div className="row mt-3">
                <div className="col-12 ">
                  <div className="d-flex justify-content-between ">
                    <h4 className="lead_text">Account Group</h4>
                    <div className="">
                      <Button
                        btnType="add_borderless"
                        className="edit_button"
                        onClick={() => {
                          // handleupdate();
                          //   handleviewtoedit(viewexp);
                          //   setUniqueEditName(false);
                          handleEditClick(AccGroupData);
                        }}
                      >
                        Edit
                        <FiEdit
                          style={{
                            marginBottom: "4px",
                            marginInline: "3px",
                          }}
                        />
                      </Button>
                    </div>
                  </div>

                  {/* <div className="row my-3">
                          <div className="col-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Category Name</td>
                                  <td>:</td>
                                  <td>
{viewexp?.expense_category_name}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Category Description</td>
                                  <td>:</td>
                                  <td>
                                  {viewexp?.expense_category_description}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div> */}
                  <div className="row mt-4">
                    <div className="col-4">
                      <p>Group Code</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">
                        {AccGroupData?.acc_ledger_code}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4">
                      <p>Group Name</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">
                        {AccGroupData?.acc_ledger_name}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4">
                      <p>Parent Group</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">
                        {AccGroupData?.acc_ledger_group_name}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4">
                      <p>Account Head</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">
                        {AccGroupData?.acc_ledger_group_name}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4">
                      <p> Description</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">
                        {AccGroupData?.acc_ledger_description}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default AccGroup;
