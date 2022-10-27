import React, { useState, useEffect } from "react";
import PublicFetch from "../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../api/bootapi";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select, Pagination } from "antd";

import "../CRM/lead/lead_list/leadlist.scss";
import TableData from "../../components/table/table_data";
import MyPagination from "../../components/Pagination/MyPagination";
import CustomModel from "../../components/custom_modal/custom_model";
import Button from "../../components/button/button";
import "./opportunitylist.scss";
import { BsPlusCircleFill } from "react-icons/bs";

// import { Route } from "react-router-dom";
import OpportunityEdit from "../CRM/lead/modals/OpportunityEdit";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Leadlist_Icons from "../../components/lead_list_icon/lead_list_icon";

function Opportunitylist(props) {
  const [numOfItems, setNumOfItems] = useState("25");
  const [pageSize, setPageSize] = useState(0); // page size
  const [current, setCurrent] = useState(1); // current page
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState(""); //search by status select box
  const [showViewModal, setShowViewModal] = useState(false); //oppertunity view modal
  const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
  const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
  const [successPopup, setSuccessPopup] = useState(false); //success popups
  const [date, setDate] = useState(); //for date
  const [showAddOpportunity, setShowAddOpportunity] = useState(false); //adding opportunity

  // { function to get all opportunity data - Ann mariya(27/10/22)}

  const [OpportunityList, setOpportunityList] = useState();

  const GetOpportunityData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/opportunity/basic?startIndex=${pageSize}&noOfItems=${numOfItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All opportunity data", res?.data?.data);
          setOpportunityList(res?.data?.data?.leads);
        } else {
          console.log("Failed to load data !");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };
  console.log("fhhthhh", OpportunityList);
  useEffect(() => {
    GetOpportunityData();
  }, [numOfItems, pageSize]);

  // {timeout set for success popups }

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  // const submit = (data) => {
  //   console.log(data);
  //   localStorage.setItem("Form", JSON.stringify(data));
  //   setShowViewModal(false);
  //   setShowEditModal(false);
  //   setSuccessPopup(true);
  //   close_modal(successPopup, 1200);
  //   props.onHide();
  //   reset();
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const getData = (current, pageSize) => {
    return OpportunityList?.slice((current - 1) * pageSize, current * pageSize);
  };

  // {columns is opportunity listing table componenet }

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: "14%",
      render: (data, index) => {
        return (
          <div>
            {/* <a href="" className="actionEdit">
              <FaEdit />
            </a> */}
            <div onClick={() => setShowViewModal(true)} className="actionView">
              <MdPageview />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "TYPE",
      dataIndex: "opportunity_type",
      key: "opportunity_type",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "FROM",
      dataIndex: "opportunity_from",
      key: "opportunity_from",
      width: "23%",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.lead_status)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "CONVERTED BY",
      dataIndex: "opportunity_created_by",
      key: "opportunity_created_by",
      width: "23%",
      align: "center",
    },
    {
      title: "SOURCE",
      dataIndex: "opportunity_source",
      key: "opportunity_source",
      width: "14%",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.lead_customer_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "PARTY",
      dataIndex: "opportunity_party",
      key: "opportunity_party",

      align: "center",
    },
  ];

  const progress = [
    {
      title: "SLNo:",
      dataIndex: "slno",
      key: "key",

      align: "center",
    },
    {
      title: "RESPONSE",
      dataIndex: "response",
      key: "key",

      align: "center",
    },
    {
      title: "NEXT CONTACT DATE",
      dataIndex: "next_date",
      key: "key",
      width: "35%",
      align: "center",
    },
    {
      title: "DETAILS",
      dataIndex: "details",
      key: "key",

      align: "center",
    },
  ];

  const progress_data = [
    {
      slno: "01",
      response: "Interested",
      next_date: "01-01-2023",
      details:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      slno: "02",
      response: "Positive",
      next_date: "12-01-2023",
      details:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      slno: "03",
      response: "Busy",
      next_date: "03-01-2023",
      details:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      slno: "04",
      response: "Call Back",
      next_date: "23-01-2023",
      details:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      slno: "05",
      response: "Rejected",
      next_date: "01-01-2023",
      details:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];

  return (
    <div>
      <div className="container-fluid lead_list  my-3 py-3">
        {/* opportunity listing section One */}

        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Opportunity</h5>
            </div>
            <Leadlist_Icons />
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
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by Type"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
              >
                <Select.Option value="sales">sales</Select.Option>
                <Select.Option value="maintenance">Maintenance</Select.Option>
                <Select.Option value="support">support</Select.Option>
              </Select>
            </div>
            <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by From"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchStatus(event ? [event] : []);
                }}
              >
                {/* {LeadStatus &&
                  LeadStatus.map((item, index) => {
                    return (
                      <Select.Option key={item.id} value={item.value}>
                        {item.name}
                      </Select.Option>
                    );
                  })} */}
                <Select.Option value="L">Lead</Select.Option>
                <Select.Option value="C">Customer</Select.Option>
              </Select>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12  px-3">
              <Select
                // defaultValue={"25"}
                bordered={false}
                className=" page_size_style"
                value={numOfItems}
                onChange={(e) => setNumOfItems(e)}
              >
                {/* <Select.Option value="5">5 | pages</Select.Option> */}
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div>
            <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
              <Button
                onClick={() => setShowAddOpportunity(true)}
                className="add_opportunity"
              >
                Add Opportunity
              </Button>
            </div>
          </div>
          <div className="datatable">
            <TableData
              data={getData(current, numOfItems, pageSize)}
              // data={allLeadList}
              // data={OpportunityList}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={getData.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
          {/* {"mcncncncncncncnc"} */}
        </div>

        {/*  {/* {View model of opportunity  section Two    }  */}
      </div>
      <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="d-flex justify-content-between my-1">
              <div className="mt-3">
                <h5 className="opportunity_heading">Opportunity</h5>
              </div>
              <div className="">
                <Button btnType="add_borderless">
                  <span
                    className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                    style={{ fontSize: "14px" }}
                    onClick={() => {
                      setShowEditModal(true);
                      setShowViewModal(false);
                    }}
                  >
                    Edit <FiEdit />
                  </span>
                </Button>
              </div>
            </div>
            <div className="border-bottom">
              <div className="row mt-4">
                <div className="col-5">
                  <p style={{ color: "#000" }} className="modal_view_p_style">
                    Type
                  </p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">Sales</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">From </p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">Customer</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">Converted By</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">HGJK4536FC</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">Source</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">Reference</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">Party</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">Database</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">Valid up to</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">17-10-2022</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">Details</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">Expecting Amount</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">6000</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">
                    Probability of conversion
                  </p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">Low</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="modal_view_p_style">status</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal_view_p_sub">Interested</p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between my-1">
              <div className="mt-3">
                <h5 className="opportunity_heading">Opportunity Progress</h5>
              </div>
              <div className="">
                <Button btnType="add_borderless">
                  <span
                    className="d-flex align-items-center justify-content-between gap-1  p-1 "
                    style={{ fontSize: "14px" }}
                    onClick={() => {
                      setShowProgresssModal(true);
                      setShowViewModal(false);
                    }}
                  >
                    <BsPlusCircleFill fontSize={18} /> Add
                  </span>
                </Button>
              </div>
            </div>
            <div>
              <TableData columns={progress} data={progress_data} />
            </div>
          </div>
        }
      />

      {/* {Adding Opportunity Modal in Opportunity page} */}

      <CustomModel
        Adding_contents
        show={showAddOpportunity}
        onHide={() => setShowAddOpportunity(false)}
        header="Add Opportunity"
        size={`xl`}
        footer={[<Button btnType="save">Save</Button>]}
        {...props}
      >
        <Form
        // onSubmit={handleSubmit(submit)}
        >
          <div className="px-5">
            <div className="row px-1">
              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_type">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    aria-label="lead_type"
                    name="lead_type"
                    className={`${errors.lead_type && "invalid"}`}
                    {...register("lead_type", {
                      required: "Type is required",
                    })}
                    onKeyUp={() => {
                      trigger("lead_type");
                    }}
                  >
                    <option value="Sales" selected>
                      Sales
                    </option>
                    <option value="Support">Support</option>
                    <option value="maintenance">Maintenance</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_customer_from">
                  <Form.Label>From</Form.Label>
                  <Form.Select
                    aria-label="lead_customer_from"
                    name="lead_customer_from"
                    className={`${errors.lead_customer_from && "invalid"}`}
                    {...register("lead_customer_from", {
                      required: "Type is required",
                    })}
                    onKeyUp={() => {
                      trigger("lead_customer_from");
                    }}
                  >
                    {errors.lead_customer_from && (
                      <small className="text-danger">
                        {errors.lead_customer_from.message}
                      </small>
                    )}
                    {/* <option value="Sales" selected>
                         Sales
                          </option> */}
                    <option value="Customer" selected>
                      Customer
                    </option>
                    <option value="Lead">Lead</option>
                  </Form.Select>

                  {errors.lead_customer_from && (
                    <small className="text-danger">
                      {errors.lead_customer_from.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group
                  className="mb-2"
                  controlId="lead_customer_generated"
                >
                  <Form.Label>Generated/Converted by</Form.Label>
                  <Form.Control
                    type="text"
                    name="lead_customer_generated"
                    placeholder="User ID"
                    className={`${errors.lead_customer_generated && "invalid"}`}
                    {...register("lead_customer_generated", {
                      required: "Please enter a valid User ID",
                      minLength: {
                        value: 3,
                        message: "Minimum Required length is 3",
                      },
                      maxLength: {
                        value: 100,
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9 ]*$/,
                        message: "Only letters and numbers are allowed!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_customer_generated");
                    }}
                  />
                  {errors.lead_customer_generated && (
                    <small className="text-danger">
                      {errors.lead_customer_generated.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_source">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    aria-label="lead_source"
                    name="lead_source"
                    className={`${errors.lead_source && "invalid"}`}
                    {...register("lead_source", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_source");
                    }}
                  >
                    <option value="Reference" selected>
                      Reference
                    </option>
                    <option value="Direct Visit">Direct Visit</option>
                    <option value="Online Registraion">
                      Online Registration
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_party">
                  <Form.Label>Party</Form.Label>
                  <Form.Select
                    aria-label="lead_party"
                    name="lead_party"
                    className={`${errors.lead_party && "invalid"}`}
                    {...register("lead_party", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_party");
                    }}
                  >
                    <option value="Database" selected>
                      data
                    </option>
                    <option value="Direct Visit"></option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_valid_up_to">
                  <Form.Label>Valid Up to</Form.Label>
                  <div className="form-control">
                    <input
                      type="date"
                      style={{ borderWidth: 0 }}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </Form.Group>
              </div>

              <div className="col-sm-8 pt-3">
                <Form.Group className="mb-2" controlId="lead_details">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className={`${errors.lead_details && "invalid"}`}
                    {...register("lead_details", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_details");
                    }}
                  />
                  {errors.lead_details && (
                    <small className="text-danger">
                      {errors.lead_details.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-3">
                <Form.Group className="mb-2" controlId="lead_expecting_amt">
                  <Form.Label>Expecting Amount</Form.Label>
                  <Form.Control
                    type="text"
                    className={`${errors.lead_expecting_amt && "invalid"}`}
                    {...register("lead_expecting_amt", {
                      minLength: {
                        value: 3,
                        message: "Minimum Required length is 3",
                      },
                      maxLength: {
                        value: 100,
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9 ]*$/,
                        message: "Only letters and numbers are allowed!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_expecting_amt");
                    }}
                  />{" "}
                  {errors.lead_expecting_amt && (
                    <small className="text-danger">
                      {errors.lead_expecting_amt.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_probability">
                  <Form.Label>Probability of conversion</Form.Label>
                  <Form.Select
                    aria-label="lead_probability"
                    name="lead_probability"
                    className={`${errors.lead_probability && "invalid"}`}
                    {...register("lead_probability", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_probability");
                    }}
                  >
                    <option value="low" selected>
                      low
                    </option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="lead_status"
                    name="lead_status"
                    className={`${errors.lead_status && "invalid"}`}
                    {...register("lead_status", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_status");
                    }}
                  >
                    <option value="quotation" selected>
                      quotation
                    </option>
                    <option value="interested">interested</option>
                    <option value="converted">converted</option>
                    <option value="lost">lost</option>
                    <option value="DND">DND</option>
                  </Form.Select>
                </Form.Group>
              </div>
              {/* <div className="col-12 d-flex justify-content-center my-2">
                <Button onClick={submit} btnType="save">
                  Save
                </Button>
              </div> */}
            </div>
          </div>
        </Form>
      </CustomModel>

      {/* Edit opportunity modal   section THREE */}
      <CustomModel
        Adding_contents
        show={ShowEditModal}
        onHide={() => setShowEditModal(false)}
        header="Edit Opportunity"
        size={`xl`}
        footer={[<Button btnType="save">Save</Button>]}
        {...props}
      >
        <Form
        // onSubmit={handleSubmit(submit)}
        >
          <div className="px-5">
            <div className="row px-1">
              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_type">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    aria-label="lead_type"
                    name="lead_type"
                    className={`${errors.lead_type && "invalid"}`}
                    {...register("lead_type", {
                      required: "Type is required",
                    })}
                    onKeyUp={() => {
                      trigger("lead_type");
                    }}
                  >
                    <option value="Sales" selected>
                      Sales
                    </option>
                    <option value="Support">Support</option>
                    <option value="maintenance">Maintenance</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_customer_from">
                  <Form.Label>From</Form.Label>
                  <Form.Select
                    aria-label="lead_customer_from"
                    name="lead_customer_from"
                    className={`${errors.lead_customer_from && "invalid"}`}
                    {...register("lead_customer_from", {
                      required: "Type is required",
                    })}
                    onKeyUp={() => {
                      trigger("lead_customer_from");
                    }}
                  >
                    {errors.lead_customer_from && (
                      <small className="text-danger">
                        {errors.lead_customer_from.message}
                      </small>
                    )}
                    {/* <option value="Sales" selected>
                         Sales
                          </option> */}
                    <option value="Customer" selected>
                      Customer
                    </option>
                    <option value="Lead">Lead</option>
                  </Form.Select>

                  {errors.lead_customer_from && (
                    <small className="text-danger">
                      {errors.lead_customer_from.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group
                  className="mb-2"
                  controlId="lead_customer_generated"
                >
                  <Form.Label>Generated/Converted by</Form.Label>
                  <Form.Control
                    type="text"
                    name="lead_customer_generated"
                    placeholder="User ID"
                    className={`${errors.lead_customer_generated && "invalid"}`}
                    {...register("lead_customer_generated", {
                      required: "Please enter a valid User ID",
                      minLength: {
                        value: 3,
                        message: "Minimum Required length is 3",
                      },
                      maxLength: {
                        value: 100,
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9 ]*$/,
                        message: "Only letters and numbers are allowed!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_customer_generated");
                    }}
                  />
                  {errors.lead_customer_generated && (
                    <small className="text-danger">
                      {errors.lead_customer_generated.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_source">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    aria-label="lead_source"
                    name="lead_source"
                    className={`${errors.lead_source && "invalid"}`}
                    {...register("lead_source", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_source");
                    }}
                  >
                    <option value="Reference" selected>
                      Reference
                    </option>
                    <option value="Direct Visit">Direct Visit</option>
                    <option value="Online Registraion">
                      Online Registration
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_party">
                  <Form.Label>Party</Form.Label>
                  <Form.Select
                    aria-label="lead_party"
                    name="lead_party"
                    className={`${errors.lead_party && "invalid"}`}
                    {...register("lead_party", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_party");
                    }}
                  >
                    <option value="Database" selected>
                      data
                    </option>
                    <option value="Direct Visit"></option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_valid_up_to">
                  <Form.Label>Valid Up to</Form.Label>
                  <div className="form-control">
                    <input
                      type="date"
                      style={{ borderWidth: 0 }}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </Form.Group>
              </div>

              <div className="col-sm-8 pt-3">
                <Form.Group className="mb-2" controlId="lead_details">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className={`${errors.lead_details && "invalid"}`}
                    {...register("lead_details", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_details");
                    }}
                  />
                  {errors.lead_details && (
                    <small className="text-danger">
                      {errors.lead_details.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-3">
                <Form.Group className="mb-2" controlId="lead_expecting_amt">
                  <Form.Label>Expecting Amount</Form.Label>
                  <Form.Control
                    type="text"
                    className={`${errors.lead_expecting_amt && "invalid"}`}
                    {...register("lead_expecting_amt", {
                      minLength: {
                        value: 3,
                        message: "Minimum Required length is 3",
                      },
                      maxLength: {
                        value: 100,
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9 ]*$/,
                        message: "Only letters and numbers are allowed!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_expecting_amt");
                    }}
                  />{" "}
                  {errors.lead_expecting_amt && (
                    <small className="text-danger">
                      {errors.lead_expecting_amt.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_probability">
                  <Form.Label>Probability of conversion</Form.Label>
                  <Form.Select
                    aria-label="lead_probability"
                    name="lead_probability"
                    className={`${errors.lead_probability && "invalid"}`}
                    {...register("lead_probability", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_probability");
                    }}
                  >
                    <option value="low" selected>
                      low
                    </option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="lead_status"
                    name="lead_status"
                    className={`${errors.lead_status && "invalid"}`}
                    {...register("lead_status", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_status");
                    }}
                  >
                    <option value="quotation" selected>
                      quotation
                    </option>
                    <option value="interested">interested</option>
                    <option value="converted">converted</option>
                    <option value="lost">lost</option>
                    <option value="DND">DND</option>
                  </Form.Select>
                </Form.Group>
              </div>
              {/* <div className="col-12 d-flex justify-content-center my-2">
                <Button onClick={submit} btnType="save">
                  Save
                </Button>
              </div> */}
            </div>
          </div>
        </Form>
      </CustomModel>

      {/* {Success successPopup Modal } */}
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {/* ADD OPPORTUNITY PROGRESS MODAL    SECTION FOUR */}
      <CustomModel
        show={showProgressModal}
        onHide={() => setShowProgresssModal(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid">
              <div className="d-flex justify-content-between my-1">
                <div className="mt-3">
                  <h5 className="opportunity_heading">Add Progress</h5>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-6 my-1">
                  <label className="my-1">Response</label>
                  <input type="text" className="input_type_style w-100 " />
                </div>
                <div className="col-6 my-1">
                  <label className="my-1">Next Contact Date</label>
                  <input type="text" className="input_type_style w-100" />
                </div>
                <div className="col-12 my-1">
                  <label className="my-1">Details</label>
                  <textarea type="text" className="input_type_style w-100" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12 d-flex justify-content-center align-items-center gap-3">
                  <Button className="save_button">Save</Button>
                  <Button
                    className="cancel_button"
                    onClick={() => setShowProgresssModal(false)}
                  >
                    cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Opportunitylist;
