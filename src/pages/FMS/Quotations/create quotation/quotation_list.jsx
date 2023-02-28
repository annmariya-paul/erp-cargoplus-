import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";

import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { Link, useNavigate } from "react-router-dom";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import moment from "moment";

import { CRM_BASE_URL_HRMS, CRM_BASE_URL_FMS } from "../../../../api/bootapi";

export default function Quotations(props) {
  const navigate = useNavigate();
  const [serialNo, setserialNo] = useState(1);
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  // const [addForm, setAddForm] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddFright, setModalAddFright] = useState(false);

  const [pageSize, setPageSize] = useState("25");

  const [Errormsg, setErrormsg] = useState();
  const [NameInput, setNameInput] = useState();
  const [CodeInput, setCodeInput] = useState();
  const [AllQuotations, setAllQuotations] = useState();
  //  const [showViewModal, setShowViewModal] = useState(false);

  const [editForm] = Form.useForm();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const [date, setDate] = useState();
  console.log(date);
  const today = new Date().toISOString().split("T")[0];

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "QUOTATION NO",
      dataIndex: "quotation_no",
      key: "quotation_no",
      width: "10%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.quotation_no)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.consignee_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.quotation_shipper)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      align: "center",
    },
    {
      title: "DATE",
      dataIndex: "quotation_date",
      key: "quotation_date",
      width: "9%",
      align: "center",
    },
    {
      title: "VALIDITY",
      dataIndex: "quotation_validity",
      key: "quotation_validity",
      width: "9%",
      align: "center",
    },
    {
      title: "CONSIGNEE",
      dataIndex: "consignee_name",
      key: "consignee_name",
      width: "18%",
      align: "center",
    },
    {
      title: "SHIPPER",
      dataIndex: "quotation_shipper",
      key: "quotation_shipper",
      width: "15%",
      align: "center",
    },
    {
      title: "STATUS",
      dataIndex: "quotation_status",
      key: "quotation_status",
      width: "12%",
      align: "center",
    },

    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "10%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="editIcon m-0 "
              // onClick={() => {
              //   navigate(`/edit_quotation`);
              // }}
            >
              <Link to={`${ROUTES.EDIT_QUOTATION}/${index.quotation_id}`}>
                {/* <FaEdit style={{ marginLeft: 15 }} /> */}
                <div className="actioneditdelete">
                  <FaEdit />
                </div>
              </Link>
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => {
                navigate(`${ROUTES.VIEW_QUOTATION}/${index.quotation_id}`);
              }}
              // onClick={()=>{
              //   setShowViewModal(true);
              // }}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "",
      dataIndex: "assign",
      key: "assign",
      width: "9%",
      align: "center",
      render: (data, index) => {
        return (
          <>
            <div className="row justify-content-center">
              {index.fms_v1_quotation_agents &&
              index.fms_v1_quotation_agents.length > 0 ? (
                <div className="col-2 d-flex justify-content-center">
                  <Button
                    btnType="add"
                    className="me-1 view_btn"
                    onClick={() => {
                      navigate(
                        `${ROUTES.ASSIGN_QUOTATION}/${index.quotation_id}`
                      );
                    }}
                  >
                    view
                  </Button>
                </div>
              ) : (
                <div className="col-2 d-flex justify-content-center">
                  <Button
                    btnType="add"
                    className="view_btn"
                    onClick={() => {
                      navigate(
                        `${ROUTES.ASSIGN_QUOTATION}/${index.quotation_id}`
                      );
                    }}
                  >
                    Assign
                  </Button>
                </div>
              )}
            </div>
          </>
        );
      },
    },
  ];

  const data = [
    {
      id: "1",
      date: "4-01-2023",
      validity: "test",
      consignee: "xyz",
      shipper: "new",
      status: "data",

      key: "1",
    },
    {
      id: "2",
      date: "22-01-2023",
      validity: "test",
      consignee: "xyz",
      shipper: "new",
      status: "data",

      key: "2",
    },
  ];

  const getAllQuotation = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation?startIndex=0&noOfItems=100`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            let date = moment(item.quotation_date).format("DD-MM-YYYY");
            let validity = moment(item.quotation_validity).format("DD-MM-YYYY");
            temp.push({
              quotation_cargo_type: item.quotation_cargo_type,
              quotation_carrier: item.quotation_carrier,
              quotation_id: item.quotation_id,
              quotation_no: item.quotation_no,
              quotation_date: date,
              quotation_validity: validity,
              quotation_consignee: item.quotation_consignee,
              consignee_name: item.crm_v1_leads.lead_customer_name,
              quotation_shipper: item.quotation_shipper,
              quotation_status: item.status,
              fms_v1_quotation_agents: item.fms_v1_quotation_agents,
            });
          });
          setAllQuotations(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllQuotation();
  }, []);

  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Quotations</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Quotation No/Consignee/Shipper"
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
        </div>
        <div className="row my-3">
          <div className="col-xl-3 col-lg-3 col-sm-12 px-3">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">25</span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1"> 50</span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">100</span>
              </Select.Option>
            </Select>
          </div>
          <div className="col-xl-1 col-lg-1 col-sm-12 p-1"></div>
          <div className="col-xl-8 col-lg-8 col-sm-12 d-flex justify-content-end">
            <div className="col mb-2 px-4">
              <Link to={ROUTES.ADD_QUOTATION} style={{ color: "white" }}>
                <Button btnType="add">Add Quotation</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}

            data={AllQuotations}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
      {/* <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="d-flex justify-content-between my-1">
              <div className="mt-3">
                <h5 className="opportunity_heading">Quotation</h5>
              </div>
              <div className="">
                <Button btnType="add_borderless">
                  <span
                    className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                    style={{ fontSize: "14px" }}
                    onClick={() => {
                    
                      setShowViewModal(false);
                    }}
                  >
                    Edit <FiEdit />
                  </span>
                </Button>
              </div>
            </div>

            <div>
              <table className="table table-borderless">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Quotation No</td>
                    <td>:</td>
                    <td>001</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>:</td>
                    <td>22-1-2023</td>
                  </tr>
                  <tr>
                    <td>Validity Date</td>
                    <td>:</td>
                    <td>22-1-2023</td>
                  </tr>
                  <tr>
                    <td>Consignee</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Shipper</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Origin Agent</td>
                    <td>:</td>
                    <td>Data</td>
                  </tr>
                  <tr>
                    <td>Destination Agent</td>
                    <td>:</td>
                    <td>Data</td>
                  </tr>
                  <tr>
                    <td>Freight Type</td>
                    <td>:</td>
                    <td>New</td>
                  </tr>
                  <tr>
                    <td>cargo Type</td>
                    <td>:</td>
                    <td>New</td>
                  </tr>
                  <tr>
                    <td>Mode</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Origin</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Carrier</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Terms</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>No of pieces</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>UOM</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Gross wt</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Chargeable wt</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Currency </td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Exchange Rate </td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Chargeable wt</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Attachments</td>
                    <td>:</td>
                    <td>Test</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between my-1">
              
              <div className="">
              
              </div>
            </div>
           
          </div>
        }
      /> */}

      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : " "}
    </>
  );
}
