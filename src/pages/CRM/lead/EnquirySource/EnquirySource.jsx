import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";

function EnquirySource() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [AddModalSource, SetAddModalSource] = useState(false);
  const [EditModalSource, setEditModalSource] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [ViewModalSource, setViewModalSource] = useState(false);
  const [AllEnquirySource, setAllEnquirySource] = useState();
  const [EnquirySourceId, setEnquirySourceId] = useState();
  const [EnquirySourceData, setEnquirySourceData] = useState();

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
      dataIndex: "enq_source_name",
      key: "enq_source_name",
      width: "25%",
      align: "center",
      // filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     // console.log("hai how are", record.children);

      //     return String(record.category_name || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
    },
    // Table.EXPAND_COLUMN,
    {
      title: "DESCRIPTION",
      dataIndex: "enq_source_description",
      key: "enq_source_description",
      width: "11%",
      align: "center",
      //   filteredValue: [searchCode],
      //   onFilter: (value, record) => {
      //     console.log("dfhasasswww12", record);
      //     return String(record.category_code)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
    },
    // {
    //   title: "Lead",
    //   dataIndex: "lead",
    //   key: "lead",
    //   width: "20%",
    //   align: "center",
    //   //   filteredValue: [searchStatus],
    //   //   onFilter: (value, record) => {
    //   //     return String(record.category_parent_id)
    //   //       .toLowerCase()
    //   //       .includes(value.toLowerCase());
    //   //   },
    // },
    // {
    //   title: "Amount",
    //   dataIndex: "amount",
    //   key: "amount",
    //   width: "14%",
    //   align: "right",
    // },
    // {
    //   title: "Mode",
    //   dataIndex: "mode",
    //   key: "mode",
    //   width: "12%",
    //   //   render: (data, index) => {
    //   //     return (
    //   //       <div className=" d-flex justify-content-center align-items-center gap-3">
    //   //         <div
    //   //           className="actionEdit"
    //   //           onClick={() => handleEditPayment(index)}
    //   //         >
    //   //           <FaEdit />
    //   //         </div>
    //   //         <div
    //   //           className="actionEdit"
    //   //           onClick={() => handleViewCategory(index)}
    //   //         >
    //   //           <MdPageview />
    //   //         </div>
    //   //       </div>
    //   //     );
    //   //   },
    //   align: "center",
    // },
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
                handleEditenquirySource(index);
              }}
            >
              <FaEdit />
            </div>
            <div
              className="actionEdit"
              onClick={() => {
                handleViewEnquirySource(index);
              }}
            >
              <MdPageview />
            </div>
          </div>
        );
      },
    },
  ];

  const data = [];

  const handleEditenquirySource = (data) => {
    if (data) {
      setEditModalSource(true);
      setViewModalSource(true);
      addForm.setFieldsValue({
        enq_source_name1: data.enq_source_name,
        enq_source_description1: data.enq_source_description,
      });
      setEnquirySourceId(data?.enq_source_id);
    }
  };

  const handleViewEnquirySource = (data) => {
    setViewModalSource(true);
    setEnquirySourceData(data);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const CreateEnquirySource = (data) => {
    PublicFetch.post(`${CRM_BASE_URL}/enquiry_source`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of res", res.data.data);
          setSuccessPopup(true);
          close_modal(SuccessPopup, 1200);
          SetAddModalSource(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const GetAllEnquirySource = () => {
    PublicFetch.get(`${CRM_BASE_URL}/enquiry_source`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of data", res.data.data);
          setAllEnquirySource(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const UpdateEnquirySource = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL}/enquiry_source/${EnquirySourceId}`, {
      enq_source_name: data.enq_source_name1,
      enq_source_description: data.enq_source_description1,
    })
      .then((res) => {
        console.log("response");
        if (res.data.success) {
          console.log("successs");
          GetAllEnquirySource();
          setEditModalSource(false);
          setSuccessPopup(true);
          close_modal(SuccessPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    GetAllEnquirySource();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div>
            <div className="row flex-wrap">
              <div className="col">
                <h5 className="lead_text">Enquiry Source</h5>
              </div>
              <div className="col-auto" style={{}}>
                {/* <Leadlist_Icons /> */}
              </div>
            </div>
            <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              <div className="col-4">
                <Input.Search
                  placeholder="Search by Name"
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
              <div className="col-4">
                <Input.Search
                  placeholder="Search by code"
                  style={{ margin: "5px", borderRadius: "5px" }}
                  value={searchCode}
                  onChange={(e) => {
                    setSearchCode(e.target.value ? [e.target.value] : []);
                  }}
                  onSearch={(value) => {
                    setSearchCode(value);
                  }}
                />
              </div>
            </div>
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
                  total={AllEnquirySource?.length}
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
                  btnType="add"
                  onClick={() => {
                    SetAddModalSource(true);
                  }}
                >
                  Add Payment
                </Button>
              </div>
            </div>
            <div className="datatable">
              <TableData
                //data={getData(current, pageSize)}
                data={AllEnquirySource}
                columns={columns}
                custom_table_css="table_lead_list"
                expandable
                expandIconColumnIndex={1}
              />
            </div>
            <div className="d-flex py-2 justify-content-center">
              <MyPagination
                total={AllEnquirySource?.length}
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
        </div>
        <CustomModel
          show={AddModalSource}
          onHide={() => {
            SetAddModalSource(false);
          }}
          View_list
          list_content={
            <>
              <div className="container">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("submitted add value", value);
                    CreateEnquirySource(value);
                  }}
                >
                  <div className="row">
                    <div className="col-12">
                      <h4 className="lead_text">Enquiry Source</h4>
                    </div>
                    <div className="col-12">
                      <label>Name</label>
                      <Form.Item name="enq_source_name">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <Form.Item name="enq_source_description">
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
          show={EditModalSource}
          onHide={() => {
            setEditModalSource(false);
          }}
          View_list
          list_content={
            <>
              <div className="container">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("edit data", value);
                    UpdateEnquirySource(value);
                  }}
                >
                  <div className="row">
                    <div className="col-12">
                      <h4 className="lead_text">Enquiry Source</h4>
                    </div>
                    <div className="col-12">
                      <label>Name</label>
                      <Form.Item name="enq_source_name1">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <Form.Item name="enq_source_description1">
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
          show={ViewModalSource}
          onHide={() => {
            setViewModalSource(false);
          }}
          View_list
          list_content={
            <>
              <div className="container">
                <div className="row p-3">
                  <div className="col-6">
                    <h4 className="lead_text">Enquiry Source</h4>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <Button
                      onClick={() => {
                        handleEditenquirySource(EnquirySourceData);
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
                              {EnquirySourceData?.enq_source_name}
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
                              {EnquirySourceData?.enq_source_description}
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

export default EnquirySource;