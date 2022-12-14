import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import Dropdown from "react-bootstrap/Dropdown";
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

import "./opportunitylist.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link, Route } from "react-router-dom";
import OpportunityEdit from "../modals/OpportunityEdit";
import { useForm } from "react-hook-form";
// import { Form } from "react-bootstrap";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
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

import CopyToClipboard, { copyToClipboard } from "react-copy-to-clipboard"; //copy to clipboard
import { Toaster, toast } from "react-hot-toast"; // copy to clip board

// import {forwardRef} from "react";
// import {useTable} from "react-table";

function Opportunitylist(props) {
  const { id } = useParams();
  console.log("ID is ...", id);
  const today = new Date();
  const [EditForm] = Form.useForm();
  const [numOfItems, setNumOfItems] = useState("25");
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
  const [oppurtunitylead, setOppurtunitylead] = useState("");
  const [oppurtunitytype, setoppurtunitytype] = useState();
  const [oppurtunityfrom, setOppurtunityfrom] = useState();
  const [oppurtunitysource, setOppurtunitysource] = useState();
  const [oppurtunityparty, setOppurtunityparty] = useState("");
  const [oppurtunityvalidity, setOppurtunityvalidity] = useState();
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

  const componentRef = useRef();

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
  });

  const [editOppurtunity, setEditOppurtunity] = useState({
    opportunity_id: "",
    opportunity_lead_id: oppId,
    opportunitytype: "",
    opportunityfrom: "",
    convertedby: "",
    opportunitysource: "",
    opportunityparty: "",
    opportunityvalidity: "",
    opportunitydescription: "",
    opportunityamount: "",
    opportunityprobability: "",
    opportunitystatus: "",
  });

  // { function to get all opportunity data - Ann mariya(27/10/22)}

  const [OpportunityList, setOpportunityList] = useState([]);
  const [totalCount, setTotalcount] = useState();
  // const [oppurtunityid, setOppurtunityid] = useState();

  const pageofIndex = numOfItems * (current - 1) - 1 + 1;

  const pagesizecount = Math.ceil(totalCount / numOfItems);
  console.log("page number isss", pagesizecount);

  const GetOpportunityData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/opportunity?startIndex=${pageofIndex}&noOfItems=${numOfItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All opportunity dataqqq", res?.data?.data.leads);
          
          let tempArr = [];
          res?.data?.data?.leads.forEach((item, index) => {
          tempArr.push({
            opportunity_id: item?.opportunity_id,
            opportunity_type: item?.opportunity_type,
            opportunity_party: item?.crm_v1_contacts?.contact_person_name,
            opportunity_from: item?.opportunity_from,
            opportunity_created_by: item?.opportunity_created_by,
            opportunity_source: item?.opportunity_source,
            opportunity_probability: item?.opportunity_probability,
            opportunity_description: item?.opportunity_description,
            opportunity_amount:item?.opportunity_amount,
            opportunity_status: item?.opportunity_status,
          });
        });
        console.log("hellooooqqqqq", tempArr);
        setOppnew(tempArr);
          setOpportunityList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          console.log("totalcount iss", res?.data?.data?.totalCount);
          // let samplearry = [];
          // res?.data?.data?.leads.forEach((item, index) => {
          //   samplearry.push(item.opportunity_id);
          // });
          // console.log("pushedd ", samplearry);

          // setOppurtunityid(samplearry);
        } else {
          console.log("Failed to load data !");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetOpportunityData();
    // getAllContact();
  }, [numOfItems, pageofIndex, pagesizecount]);

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
      id: item.opportunity_id,
      opportunity_type: item.opportunity_type,
      opportunity_from: item.opportunity_from,
      convertedby: item.opportunity_created_by,
      opportunity_source: item.opportunity_source,
      opportunity_party: item.opportunity_party,
      opportunity_validity: moment(item.opportunity_validity).format(
        "DD/MM/YYYY"
      ),
      opportunity_description: item.opportunity_description,
      opportunity_amount: item.opportunity_amount,
      opportunity_probability: item.opportunity_probability,
      opportunity_status: item.opportunity_status,
      opportunity_leadid: item.opportunity_lead_id,
    });
    getOppurtunityProgress(item);

    setShowViewModal(true);
  };
  // function to view progress

  const getOppurtunityProgress = async (viewoppurtunity) => {
    try {
      const opportunityprogress = await PublicFetch.get(
        `${CRM_BASE_URL}/opportunity/${viewoppurtunity.opportunity_id}/progress`
      );
      console.log("progresss iss", opportunityprogress.data.data);
      setoppurtunityviewprogress(opportunityprogress.data.data);
      setTableprogress(opportunityprogress.data.data);
    } catch (err) {
      console.log("error while getting oppurtunity progress: ", err);
    }
  };

  const handleEditedclick = (i) => {
    console.log("edittingg in list::: ", i);

    setOppurtunityid(i.opportunity_id);
    setoppurtunitytype(i.opportunity_type);
    setOppurtunityfrom(i.opportunity_from);
    setOppurtunityparty(i.opportunity_party);
    setOppurtunitysource(i.opportunity_source);
    setOppurtunityvalidity(i.opportunity_validity);
    setOppurtunityamount(i.opportunity_amount);
    setOpportunitydescription(i.opportunity_description);
    setOppurtunityProbability(i.opportunity_probability);
    setOppurtunitystatus(i.opportunity_status);
    setOppurtunitylead(i.opportunity_lead_id);
    getAllContact();
    setShowEditModal(true);
    editForm.setFieldsValue({
      opportunity_type: i.opportunity_type,
      opportunity_from: i.opportunity_from,
      opportunity_party: i.opportunity_party,
      opportunity_source: i.opportunity_source,
      opportunity_validity: i.opportunity_validity,
      opportunity_amount: i.opportunity_amount,
      opportunity_description: i.opportunity_description,
      opportunity_probability: i.opportunity_probability,
      opportunity_status: i.opportunity_status,
      opportunity_lead_id: i.opportunity_lead_id,
    });
  };

  //for xlsx download

  // const handleExport = () => {
  //   var wb = XLSX.utils.book_new();
  //   var ws = XLSX.utils.json_to_sheet(OpportunityList);
  //   XLSX.utils.book_append_sheet(wb, ws, "Reports");
  //   XLSX.utils.sheet_add_aoa(
  //     ws,
  //     [
  //       [
  //         "opportunity_id",
  //         "opportunity_type",
  //         "opportunity_source",
  //         "opportunity_validity",
  //         "opportunity_description",
  //         "opportunity_status",
  //         "opportunity_amount",
  //       ],
  //     ],
  //     { origin: "A1" }
  //   );
  //   // ws["!cols"] = [{ wch: 15 }];
  //   let row = [
  //     { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
  //     {
  //       v: "bold & color",
  //       t: "s",
  //       s: { font: { bold: true, color: { rgb: "FF0000" } } },
  //     },
  //     {
  //       v: "fill: color",
  //       t: "s",
  //       s: { fill: { fgColor: { rgb: "E9E9E9" } } },
  //     },
  //     { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
  //   ];
  //   var wscols = [
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 17 },
  //     { wch: 15 },
  //   ];
  //   ws["!cols"] = wscols;

  //   XLSX.writeFile(wb, "Student Report.xlsx");
  //   console.log("xlsx data", ws);
  //   return addStyle();
  // };
  // const addStyle = () => {
  //   console.log("xlsx downloaded");
  // };

  const handleEditclick = (e) => {
    // console.log("edit data is ::", item);
    getoneoppurtunity(e);
    getAllContact();
    setShowEditModal(true);
  };

  const updatedOppurtunity = async (updatedData) => {
    const UpdatedFormdata = {
      // id: viewoppurtunity.id,
      opportunity_lead_id: oppurtunitylead,
      opportunity_type: oppurtunitytype,
      opportunity_from: oppurtunityfrom,
      opportunity_source: oppurtunitysource,
      opportunity_party: oppurtunityparty,
      opportunity_validity: oppurtunityvalidity,
      opportunity_description: opportunitydescription,
      opportunity_amount: oppurtunityamount,
      opportunity_probability: oppurtunityprobability,
      opportunity_status: oppurtunitystatus,
    };

    try {
      const editoppurtunity = await PublicFetch.patch(
        `${CRM_BASE_URL}/opportunity/${oppurtunityid}`,
        UpdatedFormdata
      );

      console.log("editdataaa", editoppurtunity);
      if (editoppurtunity.data.success) {
        setShowEditModal(false);
        GetOpportunityData();
        setSuccessPopup(true);
        close_modal(successPopup, 1200);
      }
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  // function to add oppurtunityprogress

  const addOppurtunityProgress = async () => {
    try {
      const opportunityprogress = await PublicFetch.post(
        `${CRM_BASE_URL}/opportunity/${viewoppurtunity.id}/progress`,
        {
          opportunity_progress_response: progressResponse,
          opportunity_progress_details: progressResponse,
          opportunity_update_next_date_contact: progressUpdatenextDate,
          opportunity_update_status: progressUpdatestatus,
        }
      );

      console.log("progresss iss", opportunityprogress.data.success);
      if (opportunityprogress.data.success) {
        setoppurtunityviewprogress();
        setShowProgresssModal(false);
        setSuccessPopup(true);
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

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            <div className="editcolor">
              <FaEdit onClick={() => handleEditedclick(index)} />
            </div>
            <div className="editcolor">
              <MdPageview
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => Viewoppurtunties(index)}
              />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "TYPE",
      dataIndex: "opportunity_type",
      key: "TYPE",

      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.opportunity_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "FROM",
      dataIndex: "opportunity_from",
      key: "FROM",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.opportunity_from)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },

    {
      title: "CONVERTED BY",
      dataIndex: "opportunity_created_by",
      key: "CONVERTED BY",
      width: "17%",
      align: "center",
    },
    {
      title: "SOURCE",
      dataIndex: "opportunity_source",
      key: "SOURCE",
      align: "left",
      filteredValue: [searchSource],
      onFilter: (value, record) => {
        return String(record.opportunity_source)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "PARTY",
      dataIndex: "opportunity_party",
      key: "PARTY",
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
      render: (value, item, indx) => count + indx,
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
      <div className="container-fluid lead_list  my-3 py-3">
        {/* opportunity listing section One */}

        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Opportunities</h5>

              {/* //for csv download */}
              {/* <CSVLink data={OpportunityList} filename="data.csv">
                Export userdata
              </CSVLink>{" "} */}

              {/* //for pdf */}
              {/* <button onClick={() => exportPDF()}>Generate PDF Report</button>{" "} */}

              {/* //for xls */}
              {/* <button onClick={() => handleExport()}>
                Generate XLS Report
              </button> */}
            </div>

            <Leadlist_Icons
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
            {/* //show or hide columns */}
            {/* <Checkbox.Group onChange={onChange} value={selectedColumns}>
           
                {columnsKeys.map((column) => (
                  <li>
                    <Checkbox value={column} key={column}>
                        {column}
                    </Checkbox>
                    </li> 
                ))}
               
            </Checkbox.Group>
 */}
            {/* <Dropdown>
      <Dropdown.Toggle >
      <FaBookOpen /> 
      </Dropdown.Toggle>
              
            
      <Dropdown.Menu style={{backgroundColor:"white"}}>
              
              
       </Dropdown.Menu>
                     
                         </Dropdown> */}
            {/* //print the page */}
            {/* <ReactToPrint
              trigger={() => {
                return <button onClick={handlePrint()}>Print the table</button>;
              }}
            /> */}
            {/* //copy data on clipboard */}
            {/* <CopyToClipboard text={JSON.stringify(OpportunityList)}>
              <button
                onClick={() => toast("Text Copied", { positon: "top-right" })}
              >
                COPY
              </button>
            </CopyToClipboard> */}
            {/* <button onClick={handlePrint}>Print this out!</button> */}
          </div>
          <div className="row pb-2" style={{ backgroundColor: "#f4f4f7" }}>
            <div className="col-3">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by Source"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchSource(event ? [event] : []);
                }}
              >
                <Select.Option value="reference">Reference</Select.Option>
                <Select.Option value="direct visit">Direct visit</Select.Option>
                <Select.Option value="online registration">
                  Online Registration
                </Select.Option>
              </Select>
            </div>
            <div className="col-3">
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
            <div className="col-3">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by Name"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
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
                {/* <Select.Option value="sales">sales</Select.Option> */}
                {/* <Select.Option value="maintenance">Maintenance</Select.Option>
                <Select.Option value="support">support</Select.Option> */}
              </Select>
            </div>
            <div className="col-3">
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
                onChange={(e) => {
                  setNumOfItems(e);
                  setCurrent(1);
                }}
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
              <Link to={ROUTES.LEADLIST}>
                <Button btnType="add">Add Opportunity</Button>
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
            <MyPagination
              total={parseInt(totalCount)}
              current={current}
              pageSize={numOfItems}
              onChange={(current, pageSize) => {
                setCurrent(current);
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
                      // setShowEditModal(true);
                      // handleEditclick(viewoppurtunity?.id);
                      handleEditclick(viewoppurtunity);
                      console.log("edit :::", viewoppurtunity);
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
                    <td>Type</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_type}</td>
                  </tr>
                  <tr>
                    <td>From</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_from}</td>
                  </tr>
                  <tr>
                    <td>Converted By</td>
                    <td>:</td>
                    <td>{viewoppurtunity.convertedby}</td>
                  </tr>
                  <tr>
                    <td>Source</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_source}</td>
                  </tr>
                  <tr>
                    <td>Party</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_party}</td>
                  </tr>
                  <tr>
                    <td>Valid up to</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_validity}</td>
                  </tr>
                  <tr>
                    <td>details</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_description}</td>
                  </tr>
                  <tr>
                    <td>expecting Amount</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_amount}</td>
                  </tr>
                  <tr>
                    <td>Probability of conversion</td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_probability}</td>
                  </tr>
                  <tr>
                    <td>status </td>
                    <td>:</td>
                    <td>{viewoppurtunity.opportunity_status}</td>
                  </tr>
                </tbody>
              </table>
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
                      handleAddclick(viewoppurtunity.id);
                      console.log("id is inn", viewoppurtunity);
                      setShowProgresssModal(true);
                      setShowViewModal(false);
                    }}
                  >
                    <BsPlusCircleFill fontSize={18} /> Add
                  </span>
                </Button>
              </div>
            </div>
            {tableprogress ? (
              tableprogress && (
                <div>
                  <TableData columns={progress} data={tableprogress} />
                </div>
              )
            ) : (
              <div> </div>
            )}
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
        // footer={[<Button btnType="save">Save</Button>]}
        {...props}
        footer={false}
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
                  <Form.Label>From </Form.Label>
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
                    value={oppurtunitylead}
                    onChange={(e) => {}}
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
        width={1000}
        show={ShowEditModal}
        onHide={() => setShowEditModal(false)}
        header="Edit Opportunity"
        // size={`xl`}

        // footer={[
        //   <Button
        //     btnType="save"
        //     onClick={() => {

        //       updatedOppurtunity();
        //     }}
        //   >
        //     Save
        //   </Button>,
        // ]}
        // {...props}

        centered
        {...props}

        // Form={editformData}
      >
        <Form
          form={editForm}
          onFinish={(value) => {
            console.log("values111333", value);
            // setDescription(value.description);
            // setBrand(value.brand);
            updatedOppurtunity();
          }}
          // onSubmit={handleSubmit(submit)}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="px-5">
            <div className="row px-1">
              <div className="col-sm-4 pt-2">
                <label>Lead Type</label>
                <Form.Item
                  name={"opportunity_type"}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Type",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunitytype}
                    onChange={(e) => {
                      setoppurtunitytype(e);
                    }}
                  >
                    <Select.Option value="sales">Sales</Select.Option>
                    <Select.Option value="support">Support</Select.Option>
                    <Select.Option value="maintenance">
                      Maintenance
                    </Select.Option>
                  </SelectBox>
                </Form.Item>
                {/* </Form.Group> */}
              </div>

              <div className="col-sm-4 pt-2">
                {/* <Form.Group className="mb-2" controlId="lead_customer_from"> */}
                {/* <Form.Label>From</Form.Label> */}
                <label>Lead From</label>
                <Form.Item
                  name="opportunity_from"
                  rules={[
                    {
                      required: true,
                      message: "Please select a From",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunityfrom}
                    onChange={(e) => {
                      setOppurtunityfrom(e);
                    }}
                  >
                    <Select.Option value="lead">Lead</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </SelectBox>
                </Form.Item>
              </div>

              <div className="col-sm-4 pt-2">
                {/* <Form.Group
                  className="mb-2"
                  controlId="lead_customer_generated"
                > */}
                <label>Generated/Converted by</label>
                <Form.Item
                  name={"opportunity_lead_id"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Lead Id",
                    },
                  ]}
                >
                  <InputType value={oppurtunitylead} />
                </Form.Item>

                {/* </Form.Group> */}
              </div>

              <div className="col-sm-4 pt-2">
                {/* <Form.Group className="mb-2" controlId="lead_source"> */}
                <label>Source</label>

                <Form.Item
                  name="opportunity_source"
                  rules={[
                    {
                      required: true,
                      message: "Please select a Source",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunitysource}
                    onChange={(e) => {
                      setOppurtunitysource(e);
                    }}
                  >
                    <Select.Option value="reference">Reference</Select.Option>
                    <Select.Option value="direct visit">
                      Direct Visit
                    </Select.Option>
                    <Select.Option value="online registration">
                      Online Registration
                    </Select.Option>
                  </SelectBox>
                </Form.Item>
                {/* </Form.Group> */}
              </div>

              <div className="col-sm-4 pt-2">
                <label>Party</label>
                <Form.Item
                  name={"opportunity_party"}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Valid Party",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunityparty}
                    onChange={(e) => {
                      setOppurtunityparty(parseInt(e.target.value));
                    }}
                    // value={item?.contact_person_name}

                    // value={ oppurtunityparty ===item?.contact_lead_id ? item.contact_person_name:"" }
                  >
                    {contact &&
                      contact.length > 0 &&
                      contact.map((item, index) => {
                        console.log("item innn", item);
                        if (oppurtunitylead == item.contact_lead_id) {
                          return (
                            <Select.Option
                              key={item.contact_id}
                              value={item.contact_id}
                            >
                              {item.contact_person_name}
                            </Select.Option>
                          );
                        }
                        //  else{
                        //   <Select.Option></Select.Option>
                        //  }
                      })}
                  </SelectBox>
                </Form.Item>
              </div>

              <div className=" col-4 col-sm-4  pt-2">
                {/* <label>Valid Up To</label>
                <DatePicker
                  defaultValue={moment("10-09-2022", dateFormat)}
                  format={dateFormat}
                /> */}
                {/* <Form.Group className="mb-2" controlId="lead_valid_up_to"> */}
                <label>Valid Up to</label>
                <div className="">
                  <Form.Item
                    // name={"opportunity_validity"}
                    rules={[
                      {
                        required: true,
                        message: "Please select a Valid Date",
                      },
                    ]}
                  >
                    <input
                      type="date"
                      name="lead_validity"
                      className="p-2 mt-2"
                      style={{ borderWidth: 0, borderRadius: "5px" }}
                      // defaultValue={todaydate}
                      // disabled={(d) => !d || d.isBefore(today)}
                      value={moment(oppurtunityvalidity).format("YYYY-MM-DD")}
                      onChange={(event) => {
                        console.log("selected datae : ", event.target.value);
                        setOppurtunityvalidity(event.target.value);
                        setIsDate(event);
                      }}
                      min={disableDate()}
                    />
                  </Form.Item>
                  {oppurtunityvalidity ? (
                    <></>
                  ) : (
                    <lable style={{ color: "red" }}>Please enter Date</lable>
                  )}
                </div>
                {/* </Form.Group> */}
              </div>

              <div className="col-sm-8 pt-3">
                {/* <Form.Group className="mb-2" controlId="lead_details"> */}
                <label>Details</label>
                <Form.Item
                  name={"opportunity_description"}
                  rules={[
                    {
                      min: 3,
                      message: "Please enter above 3 character",
                    },
                    {
                      max: 100,
                    },
                  ]}
                >
                  {/* as="textarea"
                    name="lead_details"
                    rows={3}
                    // className={`${errors.lead_details && "invalid"}`} */}

                  <TextArea
                    value={opportunitydescription}
                    onChange={(e) => {
                      setOpportunitydescription(e.target.value);
                    }}
                  />
                </Form.Item>
                {/* </Form.Group> */}
              </div>

              <div className="col-sm-4 pt-3">
                {/* <label>Expecting Amount</label>
                  <Form.Item
                    // type="text"
                    name="lead_expecting_amt"
                  >
                  <InputType value={oppurtunityamount} />
                  </Form.Item> */}

                <label>Expecting Amount</label>
                <Form.Item
                  name={"opportunity_amount"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Amount",
                    },
                  ]}
                >
                  <InputType
                    value={oppurtunityamount}
                    onChange={(e) => {
                      setOppurtunityamount(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 pt-2">
                {/* <Form.Group className="mb-2" controlId="lead_probability"> */}
                <label>Probability of conversion</label>
                <Form.Item
                  name={"opportunity_probability"}
                  rules={[
                    {
                      required: true,
                      message: "please select valid Name",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunityprobability}
                    onChange={(e) => {
                      setOppurtunityProbability(e);
                    }}
                  >
                    <Select.Option value="L">low</Select.Option>
                    <Select.Option value="M">medium</Select.Option>
                    <Select.Option value="H">high</Select.Option>
                  </SelectBox>
                </Form.Item>
                {/* </Form.Group> */}
              </div>

              <div className="col-sm-4 pt-2">
                {/* <Form.Group className="mb-2" controlId="lead_status"> */}
                <label>Status</label>
                <Form.Item
                  name={"opportunity_status"}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Status",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunitystatus}
                    onChange={(e) => setOppurtunitystatus(e)}
                  >
                    <Select.Option value={1}>Quotation</Select.Option>
                    <Select.Option value={2}>Interested</Select.Option>
                    <Select.Option value={3}>Converted</Select.Option>
                    <Select.Option value={4}>Lost</Select.Option>
                    <Select.Option value={5}>DND</Select.Option>
                  </SelectBox>
                </Form.Item>
                {/* </Form.Group> */}
              </div>
              <div className="col-12 d-flex justify-content-center my-2">
                <Button
                  onClick={() => {
                    // updatedOppurtunity();
                  }}
                  btnType="save"
                  type="submit"
                >
                  Save
                </Button>
              </div>
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
              <Form>
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
                    <label className="my-1">Next Contact Date</label>
                    <Form.Item name="opportunity_nextcontactdate">
                      <input
                        type="date"
                        className="mt-2 p-2 input_type_style w-100"
                        // />
                        value={progressUpdatenextDate}
                        onChange={(e) =>
                          setProgressUpdatenextDate(e.target.value)
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 my-1">
                    <label className="my-1">Details</label>
                    <Form.Item
                      name="opportunuty_details"
                      rules={[
                        {
                          required: true,
                          message: "Details Is Required",
                        },
                      ]}
                    >
                      <textarea
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
                      onClick={() => {
                        addOppurtunityProgress();
                      }}
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
    </div>
  );
}

export default Opportunitylist;
