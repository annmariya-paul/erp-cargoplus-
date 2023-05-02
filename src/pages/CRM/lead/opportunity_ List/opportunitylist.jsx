import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../opportunity_ List/opportunitylist.scss";
import { Oppor_Status, Prob_conversion } from "../../../../utils/SelectOptions";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { message, Checkbox } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select, Pagination } from "antd";
import { ROUTES } from "../../../../routes";
import "../../../CRM//lead/lead_list/leadlist.scss";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import CustomModel from "../../../../components/custom_modal/custom_model";
import Button from "../../../../components/button/button";
import { Popconfirm } from "antd";
import { GiCancel } from "react-icons/gi";
import "./opportunitylist.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link, Route } from "react-router-dom";
import OpportunityEdit from "../modals/OpportunityEdit";
import { useForm } from "react-hook-form";
// import { Form } from "react-bootstrap";
import LeadlistIcons from "../../../../components/lead_list_icon/lead_list_icon";
import moment from "moment";
import { DatePicker } from "antd";
import { Form } from "antd";
import SelectBox from "../../../../components/Select Box/SelectBox";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
// const editformData = new FormData();
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "jspdf-autotable";
import * as XLSX from "xlsx/xlsx.js"; //for xl download
import { AudioOutlined } from "@ant-design/icons";
import { Space } from "antd";
import CopyToClipboard, { copyToClipboard } from "react-copy-to-clipboard"; //copy to clipboard
import { Toaster, toast } from "react-hot-toast"; // copy to clip board

// import {forwardRef} from "react";
// import {useTable} from "react-table";

function Opportunitylist(props) {
  const navigate = useNavigate();
  const { Search } = Input;
  const { id } = useParams();
  console.log("ID is ...", id);
  const today = new Date();
  const [EditForm] = Form.useForm();
  const [numOfItems, setNumOfItems] = useState("25");
  const [oppstatus, setOppstatus] = useState(Oppor_Status);
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [pageSize, setPageSize] = useState(0); // page size
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState(""); //search by status select box
  const [showViewModal, setShowViewModal] = useState(false); //oppertunity view modal
  const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
  const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
  const [successPopup, setSuccessPopup] = useState(false); //success popups
  const [date, setDate] = useState(); //for date
  const [showAddOpportunity, setShowAddOpportunity] = useState(false); //adding opportunity
  const [oppId, setOppID] = useState(parseInt(id));
  console.log(oppId);
  const config = {
    rules: [{ required: true, message: "Please select Date!" }],
  };
  const [oppurtunitylead, setOppurtunitylead] = useState("");
  const [opportunityNum, setOpportunityNum] = useState("");
  const [oppurtunitytype, setoppurtunitytype] = useState();
  const [oppurtunityfrom, setOppurtunityfrom] = useState();
  const [oppurtunitysource, setOppurtunitysource] = useState();
  const [oppurtunityparty, setOppurtunityparty] = useState("");
  const [oppurtunityvalidity, setOppurtunityvalidity] = useState();
  console.log("opp validity", oppurtunityvalidity);
  const [oppurtunityamount, setOppurtunityamount] = useState("");
  const [oppurtunityprobability, setOppurtunityProbability] = useState("");
  const [opportunitydescription, setOpportunitydescription] = useState("");
  const [oppurtunitystatus, setOppurtunitystatus] = useState("");
  const [oppurtunityviewprogress, setoppurtunityviewprogress] = useState();
  const [oppurtunityid, setOppurtunityid] = useState();
  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);
  const [contact, setContact] = useState([]);
  const [progressResponse, setProgressResponse] = useState("");
  const [progressDetails, setProgressDetails] = useState("");
  const [progressUpdatenextDate, setProgressUpdatenextDate] = useState();
  const [progressUpdatestatus, setProgressUpdatestatus] = useState(5);
  const [isDate, setIsDate] = useState();
  //view progress
  const [tableprogress, setTableprogress] = useState("");
  const [count, setcount] = useState(0);
  const [editForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const componentRef = useRef();
  const [cancelPopUp, setCancelPopUp] = useState(false);

  const [startcount, setstartcount] = useState();
  //pdf file start
  // const exportPDF = () => {
  //   const unit = "pt";
  //   const size = "A4"; // Use A1, A2, A3 or A4
  //   const orientation = "portrait"; // portrait or landscape

  //   const marginLeft = 40;
  //   const doc = new jsPDF(orientation, unit, size);

  //   doc.setFontSize(15);

  // const title = "My Awesome Report";
  // const headers = [["NAME", "PROFESSION"]];

  //   let content = {
  //     startY: 50,
  //     // head: headers,
  //     body: data,
  //   };

  //   // doc.text(title, marginLeft, 40);
  //   doc.autoTable({
  //     columns: columns.map((col) => ({ ...col, dataIndex: col.key })),
  //     body: data,
  //   });
  //   doc.save("report.pdf");
  // };
  //pdf end

  // view oppurtunity
  const [viewoppurtunity, setviewoppurtunity] = useState({
    id: "",
    opportunity_number: "",
    opportunity_type: "",
    opportunity_from: "",
    convertedby: "",
    opportunity_source: "",
    opportunity_party: "",
    opportunity_validity: "",
    opportunity_description: "",
    opportunity_amount: "",
    opportunity_probability: "",
    opportunity_status: "",
    opportunity_leadid: "",
    opportunity_statusname: "",
  });

  // { function to get all opportunity data - Ann mariya(27/10/22)}

  const [OpportunityList, setOpportunityList] = useState([]);
  const [totalCount, setTotalcount] = useState();
  // const [oppurtunityid, setOppurtunityid] = useState();

  const pageofIndex = numOfItems * (current - 1) - 1 + 1;

  const pagesizecount = Math.ceil(totalCount / numOfItems);
  console.log("page number isss", pagesizecount);

  const GetOpportunityData = (query) => {
    PublicFetch.get(
      `${CRM_BASE_URL}/opportunity?startIndex=${pageofIndex}&noOfItems=${numOfItems}&search=${query}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All opportunity dataqqq", res?.data?.data.leads);

          let tempArr = [];
          res?.data?.data?.leads.forEach((item, index) => {
            let temp = [];
            item.fms_v1_enquiry_opportunities.forEach((item, index) => {
              temp.push(item.fms_v1_enquiries.enquiry_no);
            });

            oppstatus.forEach((sts, index) => {
              var statusnew = parseInt(sts.value);
              if (statusnew == item.opportunity_status) {
                tempArr.push({
                  opportunity_Id: item?.opportunity_id,
                  opportunity_number: item?.opportunity_number,
                  opportunity_type: item?.opportunity_type,
                  opportunity_party: item?.crm_v1_contacts?.contact_person_name,
                  opportunity_party1: item?.crm_v1_contacts?.contact_id,
                  opportunity_from: item?.opportunity_from,
                  opportunity_statusname: sts?.name,
                  opportunity_created_by1: item?.crm_v1_leads?.lead_id,
                  opportunity_created_by:
                    item?.crm_v1_leads?.lead_customer_name,
                  opportunity_source: item?.opportunity_source,
                  opportunity_probability: item?.opportunity_probability,
                  opportunity_description: item?.opportunity_description,
                  opportunity_amount: item?.opportunity_amount,
                  opportunity_status: item?.opportunity_status,
                  opportunity_validity: item?.opportunity_validity,
                  opp_enq: temp,
                  startcount: res?.data?.data?.startIndex,
                  startindex: res?.data?.data?.startIndex,
                });
              }
            });
          });
          setOppnew(tempArr);
          setstartcount(res?.data?.data?.startIndex);
          setOpportunityList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
        } else {
          console.log("Failed to load data !");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      GetOpportunityData(searchSource);
    }, 1000);

    return () => clearTimeout(getData);
    // getAllContact();
  }, [numOfItems, pageofIndex, pagesizecount, searchSource]);

  // get one oppurtunity
  const [oneoppurtunity, setOneoppurtunity] = useState();

  const getoneoppurtunity = async () => {
    try {
      const oneoppurtunities = await PublicFetch.get(
        `${CRM_BASE_URL}/opportunity/${viewoppurtunity.id}`
      );
      console.log("one oppurtunitiesss::: ", oneoppurtunities.data.data);

      setOneoppurtunity(oneoppurtunities.data.data);
      // console.log("typeee:", oneoppurtunities.data?.data?.opportunity_type);

      setOppurtunityid(oneoppurtunities.data?.data?.opportunity_id);
      setOpportunityNum(oneoppurtunities.data?.data?.opportunity_number);
      setoppurtunitytype(oneoppurtunities.data?.data?.opportunity_type);
      setOppurtunityfrom(oneoppurtunities.data?.data?.opportunity_from);
      setOppurtunitysource(oneoppurtunities.data?.data?.opportunity_source);
      setOppurtunityvalidity(oneoppurtunities.data?.data?.opportunity_validity);
      setOpportunitydescription(
        oneoppurtunities.data?.data?.opportunity_description
      );
      setOppurtunityamount(oneoppurtunities.data?.data?.opportunity_amount);
      setOppurtunityProbability(
        oneoppurtunities.data?.data?.opportunity_probability
      );
      setOppurtunitystatus(oneoppurtunities.data?.data?.opportunity_status);
      setOppurtunitylead(oneoppurtunities.data?.data?.opportunity_lead_id);
      setOppurtunityparty(oneoppurtunities.data?.data?.opportunity_party);
      // setOppurtunityparty()
      editForm.setFieldsValue({
        opportunity_number: oneoppurtunities.data?.data?.opportunity_number,
        opportunity_type: oneoppurtunities.data?.data?.opportunity_type,
        opportunity_from: oneoppurtunities.data?.data?.opportunity_from,
        opportunity_party: oneoppurtunities.data?.data?.opportunity_party,
        opportunity_source: oneoppurtunities.data?.data?.opportunity_source,
        opportunity_validity: oneoppurtunities.data?.data?.opportunity_validity,
        opportunity_amount: oneoppurtunities.data?.data?.opportunity_amount,
        opportunity_description:
          oneoppurtunities.data?.data?.opportunity_description,
        opportunity_probability:
          oneoppurtunities.data?.data?.opportunity_probability,
        opportunity_status: oneoppurtunities.data?.data?.opportunity_status,
        opportunity_lead_id: oneoppurtunities.data?.data?.opportunity_lead_id,
      });
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  const getAllContact = async () => {
    try {
      const allNames = await PublicFetch.get(`${CRM_BASE_URL}/contact`);
      if (allNames.data.success) {
        setContact(allNames.data.data);
        console.log("all contact data names :::: of oppor", allNames.data.data);
      }

      console.log("All leads res : ", allNames);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  // {timeout set for success popups }
  // console.log("bjfnj", oneoppurtunity);
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        setCancelPopUp(false);
      }, time);
    }
  };

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

  // function to view oppurtunity unnimaya

  const Viewoppurtunties = (item) => {
    console.log("view oppurtunity issss:", item);
    setviewoppurtunity({
      ...viewoppurtunity,
      id: item?.opportunity_Id,
      opportunity_number: item.opportunity_number,
      opportunity_type: item.opportunity_type,
      opportunity_from: item.opportunity_from,
      convertedby: item.opportunity_created_by,
      opportunity_source: item.opportunity_source,
      opportunity_party: item.opportunity_party,
      opportunity_validity: item.opportunity_validity,
      opportunity_description: item.opportunity_description,
      opportunity_amount: item.opportunity_amount,
      opportunity_probability: item.opportunity_probability,
      opportunity_status: item.opportunity_status,
      opportunity_leadid: item.opportunity_lead_id,
      opportunity_lead_name: item.opportunity_created_by,
      opportunity_statusname: item.opportunity_statusname,
    });
    getOppurtunityProgress(item);

    setShowViewModal(true);
  };
  // function to view progress

  const getOppurtunityProgress = async (viewoppurtunity) => {
    try {
      const opportunityprogress = await PublicFetch.get(
        `${CRM_BASE_URL}/opportunity/${viewoppurtunity.opportunity_Id}/progress`
      );
      console.log("progresss iss", opportunityprogress.data.data);
      setoppurtunityviewprogress(opportunityprogress.data.data);
      setTableprogress(opportunityprogress.data.data);
    } catch (err) {
      console.log("error while getting oppurtunity progress: ", err);
    }
  };

  const onSearch = (value) => console.log(value);

  console.log("opportunity id will be", viewoppurtunity);
  // function to add oppurtunityprogress

  const addOppurtunityProgress = async (data) => {
    let date = moment(data.opportunity_nextcontactdate);
    // let idds = viewoppurtunity?.id;
    try {
      const opportunityprogress = await PublicFetch.post(
        `${CRM_BASE_URL}/opportunity/${viewoppurtunity.id}/progress`,
        {
          opportunity_progress_response: data.opportunity_response,
          opportunity_progress_details: data.opportunuty_reponse_details,
          opportunity_update_next_date_contact: date,
          opportunity_update_status: progressUpdatestatus,
        }
      );

      console.log("progresss iss", opportunityprogress.data.success);
      if (opportunityprogress.data.success) {
        setoppurtunityviewprogress();
        setShowProgresssModal(false);
        setSuccessPopup(true);
        close_modal(successPopup, 1200);
      }
    } catch (err) {
      console.log("error while getting oppurtunity progress: ", err);
    }
  };

  const handleAddclick = () => {
    getoneoppurtunity();
  };

  //   const handlePrint = () => {
  //     console.log("hhhhhhhhhh");
  //     window.print();
  //     setTimeout(function () { window.close(); }, 100);
  // }

  //  columns is opportunity listing table componenet

  const cancelOpportunity = (data) => {
    if (data) {
      PublicFetch.delete(`${CRM_BASE_URL}/opportunity/${data}`)
        .then((res) => {
          console.log("Response after cancel");
          if (res.data.success) {
            console.log("Success after Cancel");
            setCancelPopUp(true);
            close_modal(cancelPopUp, 1200);
            GetOpportunityData(searchSource);
          }
        })
        .catch((err) => {
          console.log("Error", err);
          message.error(err?.response?.data?.data?.err?.message);
        });
    }
  };

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totalCount / numOfItems);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totalCount;
    return total;
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: "7%",
      render: (value, item, index) => {
        return <div>{item?.startindex + index + serialNo}</div>;
      },
      align: "center",
    },

    {
      title: "OPPORTUNITY NO",
      dataIndex: "opportunity_number",
      key: "opportunity_number",
      width: "12%",
      // align: "center",
    },
    {
      title: "CUSTOMER",
      dataIndex: "opportunity_party",
      key: "PARTY",
      align: "left",
    },
    {
      title: "ENQUIRY NO",
      dataIndex: "opp_enq",
      key: "opp_enq",

      align: "left",
      render: (enquiryNumbers) => {
        if (Array.isArray(enquiryNumbers)) {
          return enquiryNumbers.join(", ");
        }
        return enquiryNumbers;
      },
    },
    {
      title: "TYPE",
      dataIndex: "opportunity_type",
      key: "TYPE",
      // width:"10%",

      align: "left",
    },

    // {
    //   title: "CONVERTED BY",
    //   dataIndex: "opportunity_created_by",
    //   key: "CONVERTED BY",
    //   width: "17%",
    //   align: "left",
    // },
    {
      title: "SOURCE",
      dataIndex: "opportunity_source",
      key: "SOURCE",
      align: "left",
      width: "10%",
    },

    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        console.log("indexx", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              {/* <FaEdit onClick={() => handleEditedclick(index)} /> */}
              <Link
                to={`${ROUTES.EDIT_OPPORTUNITY}/${index.opportunity_Id}`}
                className="editcolor"
              >
                <FaEdit />
              </Link>
            </div>
            <div className="actionView m-0">
              <div
                className="editcolor"
                onClick={
                  () => {
                    navigate(
                      `${ROUTES.VIEW_OPPORTUNITY}/${index.opportunity_Id}`
                    );
                  }
                  //   handleViewData(index)
                }
              >
                <MdPageview
                // onClick={()=>viewprogressoppurtunity(index)}
                // onClick={() => Viewoppurtunties(index)}
                />
              </div>
            </div>
            <div className="deleteIcon m-0">
              <Popconfirm
                title={`Are you sure you want to cancel this Opportunity?`}
                onConfirm={() => {
                  // handleCancelOpp();
                  cancelOpportunity(index.opportunity_Id);
                }}
              >
                <GiCancel style={{ marginRight: 18 }} />
              </Popconfirm>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  //for show or hide colums start
  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );

  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };
  const OppHeads = [
    [
      "opportunity_id",
      "opportunity_type",
      "opportunity_source",
      "opportunity_validity",
      "opportunity_description",
      "opportunity_status",
      "opportunity_amount",
    ],
  ];
  //end
  const progress = [
    {
      title: "SLNo:",
      dataIndex: "slno",
      key: "slno",
      align: "center",
      render: (value, item, indx) => serialNo + indx,
    },
    {
      title: "RESPONSE",
      dataIndex: "opportunity_progress_response",
      key: "opportunity_progress_response",
      align: "center",
    },
    {
      title: "NEXT CONTACT DATE",
      dataIndex: "opportunity_update_next_date_contact",
      key: "opportunity_update_next_date_contact",
      width: "35%",
      align: "center",
      render: (opportunity_update_next_date_contact) => {
        return (
          <label>
            {moment(opportunity_update_next_date_contact).format("DD-MM-YYYY")}
          </label>
        );
      },
    },
    {
      title: "DETAILS",
      dataIndex: "opportunity_progress_details",
      key: "opportunity_progress_details",

      align: "center",
    },
  ];

  const data12 = OpportunityList?.map((item) => [
    item.action,
    item.opportunity_type,
    item.opportunity_from,
    item.opportunity_lead_id,
    item.opportunity_source,
    item.opportunity_party,
  ]);
  console.log("oppurtunity amt iss", oppurtunityamount);

  const disableDate = () => {
    var dd, mm, yyyy;
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div>
      <div className="container-fluid container_fms  pt-3">
        {/* opportunity listing section One */}

        {/* <div> */}
        <div className="row flex-wrap align-items-center">
          <div className="col-xl-4">
            <h5 className="lead_text">Opportunities</h5>
          </div>
          <div className="col-xl-4 ">
            <Input.Search
              className="inputSearch"
              placeholder="Search "
              value={searchSource}
              onChange={(e) => {
                setSearchSource(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchSource(value);
              }}
            />
          </div>
          <div className="col-xl-4 d-flex justify-content-end">
            <LeadlistIcons
              name={"Oppurtunity"}
              datas={OpportunityList}
              columns={columns}
              items={data12}
              xlheading={OppHeads}
              filename="data.csv"
              chechboxes={
                <Checkbox.Group onChange={onChange} value={selectedColumns}>
                  {columnsKeys.map((column) => (
                    <li>
                      <Checkbox value={column} key={column}>
                        {column}
                      </Checkbox>
                    </li>
                  ))}
                </Checkbox.Group>
              }
            />
          </div>
        </div>

        <div className="row my-3">
          <div className="col-xl-4  ">
            <div className="d-flex justify-content-start align-items-center gap-3">
              {totalCount > 0 && (
                <div className="  ">
                  <Select
                    bordered={false}
                    className=" page_size_style"
                    value={numOfItems}
                    onChange={(e) => {
                      setNumOfItems(e);
                      setCurrent(1);
                    }}
                  >
                    <Select.Option value="25">
                      <span style={{ color: "#2f6b8f" }} className="">
                        25
                      </span>
                    </Select.Option>
                    <Select.Option value="50">
                      <span style={{ color: "#2f6b8f" }} className="">
                        50
                      </span>
                    </Select.Option>
                    <Select.Option value="100">
                      <span style={{ color: "#2f6b8f" }} className="">
                        100
                      </span>
                    </Select.Option>
                  </Select>
                </div>
              )}
              {totalCount > 0 && (
                <div className=" d-flex  align-items-center mt-2 ">
                  <label className="font_size">
                    Results: {startcount + 1} -{" "}
                    {getFinalCount(1 * numOfItems * current)}{" "}
                    <span>of {totalCount} </span>{" "}
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="col-4 d-flex py-2 justify-content-center">
            {totalCount > 0 && (
              <MyPagination
                total={parseInt(totalCount)}
                current={current}
                pageSize={numOfItems}
                onChange={(current, pageSize) => {
                  setCurrent(current);
                }}
              />
            )}
          </div>
          {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
          <div className="col-lg-4 col-lg-4 col-md-4 col-sm-12 col-4 d-flex justify-content-end">
            <Link to={ROUTES.ADD_OPPORTUNITY}>
              <Button btnType="add">New Opportunity</Button>
            </Link>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={oppnew}
            // data={allLeadList}
            // data={OpportunityList}
            columns={filteredColumns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {totalCount > 0 && (
            <MyPagination
              total={parseInt(totalCount)}
              current={current}
              pageSize={numOfItems}
              onChange={(current, pageSize) => {
                setCurrent(current);
              }}
            />
          )}
        </div>
        {/* {"mcncncncncncncnc"} */}
        {/* </div> */}
      </div>

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
              <Form
                onFinish={(value) => {
                  console.log("progress submit", value);
                  addOppurtunityProgress(value);
                }}
              >
                <div className="row p-3">
                  <div className="col-6 my-1">
                    <label className="my-1">Response</label>
                    {/* <input type="text" className="input_type_style w-100 "  */}
                    <Form.Item
                      name="opportunity_response"
                      rules={[
                        {
                          required: true,
                          message: "Resonse Is Required",
                        },
                      ]}
                    >
                      <SelectBox onChange={(e) => setProgressResponse(e)}>
                        <Select.Option value="interested">
                          Interested
                        </Select.Option>
                        <Select.Option value="positive">Positive</Select.Option>
                        <Select.Option value="busy">Busy</Select.Option>
                        <Select.Option value="callback">Callback</Select.Option>
                        <Select.Option value="rejected">Rejected</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-6 my-1">
                    <label className=" mb-3">Next Contact Date</label>
                    <Form.Item name="opportunity_nextcontactdate">
                      <DatePicker format={"DD-MM-YYYY"} />
                    </Form.Item>
                  </div>
                  <div className="col-12 my-1">
                    <label className="my-1">Details</label>
                    <Form.Item
                      name="opportunuty_reponse_details"
                      rules={[
                        {
                          required: true,
                          message: "Details Is Required",
                        },
                      ]}
                    >
                      <TextArea
                        type="text"
                        className="input_type_style w-100"
                        // />
                        value={progressDetails}
                        onChange={(e) => setProgressDetails(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-12 d-flex justify-content-center align-items-center gap-3">
                    {/* <Button className="save_button" >Save</Button> */}
                    <Button
                      type="submit"
                      className="save_button"
                      // onClick={() => {
                      // }}
                    >
                      Save
                    </Button>
                    <Button
                      className="cancel_button"
                      onClick={() => setShowProgresssModal(false)}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        }
      />
      <CustomModel
        cancelName={"Opportunity"}
        cancel
        show={cancelPopUp}
        onHide={() => {
          setCancelPopUp(false);
        }}
      />
    </div>
  );
}

export default Opportunitylist;
