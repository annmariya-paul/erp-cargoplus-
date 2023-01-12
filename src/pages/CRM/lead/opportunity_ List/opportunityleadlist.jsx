import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { Oppor_Status, Prob_conversion } from "../../../../utils/SelectOptions";
import { message } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select, Pagination } from "antd";
import { ROUTES } from "../../../../routes";
import "../../../CRM/lead/lead_list/leadlist.scss";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Custom_model from "../../../../components/custom_modal/custom_model";
import Button from "../../../../components/button/button";
import "./opportunitylist.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link, Route } from "react-router-dom";
// import OpportunityEdit from "../CRM/lead/modals/OpportunityEdit";
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

function OpportunityLeadlist(props) {
  const { id } = useParams();
  console.log("ID is in leadopportunity ...", id);

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

  const [contact, setContact] = useState([]);
  const [progressResponse, setProgressResponse] = useState("");
  const [progressDetails, setProgressDetails] = useState("");
  const [progressUpdatenextDate, setProgressUpdatenextDate] = useState();
  const [progressUpdatestatus, setProgressUpdatestatus] = useState(5);
  const [opportunity_Id, setOpportunity_Id] = useState();
  const [opporStatus, setOpporstatus] = useState(Oppor_Status);
  const [probConversion,setProbConversion] = useState(Prob_conversion);

  //view progress
  const [tableprogress, setTableprogress] = useState("");
  const [count, setcount] = useState(0);
  const [editForm] = Form.useForm();

  // view oppurtunity
  const [viewoppurtunity, setviewoppurtunity] = useState({
    opportunity_id: "",
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
    // opportunity_id: "",
    // opportunity_lead_id: "",
    // opportunity_type: "",
    // opportunity_from: "",
    // opportunity_created_by: "",

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

  const [newOpportunityList, setNewOpportunityList] = useState();
  console.log("QQQQQQQQQQQQQ", newOpportunityList);
  // const [oppurtunityid, setOppurtunityid] = useState();

  const GetOpportunityData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/report/relational/lead/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All opportunity data", res?.data?.data);
          //   setNewOpportunityList(res?.data?.data);
          
          let samplearry = [];
          res?.data?.data?.crm_v1_contacts.forEach((item,index)=>{
            res?.data?.data?.crm_v1_opportunities.forEach((oppo,index)=>{
 samplearry.push({
   opportunity_type: oppo?.opportunity_type,
   opportunity_from: oppo?.opportunity_from,
   opportunity_created_by: oppo?.opportunity_created_by,
   opportunity_source: oppo?.opportunity_source,
   opportunity_probability:oppo?.opportunity_probability,
   opportunity_description:oppo?.opportunity_description,
   opportunity_status:oppo?.opportunity_status,
   opportunity_amount:oppo?.opportunity_amount,
   opportunity_party: item?.contact_person_name,

 });
 setNewOpportunityList(samplearry);
            });

          });
         
// #3#######
      // res?.data?.data?.crm_v1_contacts.forEach((item, index) => {
      //   res?.data?.data?.crm_v1_opportunities.forEach((oppo, index) => {
      //     opporStatus.forEach((s, index) => {
      //       var oppoStatus = parseInt(s.value);
      //       if (oppoStatus === item.opportunity_status) {
      //         samplearry.push({
      //           opportunity_type: oppo?.opportunity_type,
      //           opportunity_from: oppo?.opportunity_from,
      //           opportunity_created_by: oppo?.opportunity_created_by,
      //           opportunity_source: oppo?.opportunity_source,
      //           opportunity_probability: oppo?.opportunity_probability,
      //           opportunity_description: oppo?.opportunity_description,
      //           opportunity_status: s?.name,
      //           opportunity_amount: oppo?.opportunity_amount,
      //           opportunity_party: item?.contact_person_name,
      //         });
      //         setNewOpportunityList(samplearry);
      //       }
      //     });
      //   });
      // });
// ##########
          // res?.data?.data?.leads.forEach((item, index) => {
          //   samplearry.push(item.opportunity_id);
          // });
          // console.log("pushedd ", samplearry);

          // setNewOpportunityList(samplearry);
         
        } else {
          console.log("Failed to load data !");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  // get one oppurtunity
  const [oneoppurtunity, setOneoppurtunity] = useState();

  const getoneoppurtunity = async () => {
    try {
      const oneoppurtunities = await PublicFetch.get(
        `${CRM_BASE_URL}/report/relational/lead/${viewoppurtunity.id}`
      );
      console.log("one oppurtunitiesss::: ", oneoppurtunities.data.data);

      setOneoppurtunity(oneoppurtunities.data.data);
      console.log("typeee:", oneoppurtunities.data?.data?.opportunity_type);
      // console.log(
      //   "oppurtunityidd is",
      //   oneoppurtunities.data?.data?.opportunity_id
      // );
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
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  const getAllContact = async () => {
    try {
      const allNames = await PublicFetch.get(`${CRM_BASE_URL}/contact`);
      if (allNames.data.success) {
        setContact(allNames.data.data);
        console.log("all contact data names ::::", allNames.data.data);
      }
      // else {
      //   message.error("fetch data error");
      // }
      console.log("All leads res : ", allNames);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  useEffect(() => {
    GetOpportunityData();
    // getAllContact();
  }, [numOfItems, pageSize, id]);

  // {timeout set for success popups }
  // console.log("bjfnj", oneoppurtunity);
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };
  // console.log("id oppurtunity is", OpportunityList);
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

  //   const getData = (current, pageSize) => {
  //     return OpportunityList?.slice((current - 1) * pageSize, current * pageSize);
  //   };

  // function to view oppurtunity unnimaya

  const Viewoppurtunties = (item) => {
    console.log("view oppurtunity issss:", item);
    setviewoppurtunity({
      ...viewoppurtunity,
      opportunity_id: item.opportunity_id,
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
      opportunity_lead_id: item.opportunity_lead_id,
    });
    // getOppurtunityProgress(item);
    setOpportunity_Id(item?.opportunity_id);

    setShowViewModal(true);
  };
  // function to view progress

  const getOppurtunityProgress = async () => {
    try {
      const opportunityprogress = await PublicFetch.get(
        `${CRM_BASE_URL}/opportunity/${opportunity_Id}/progress`
      );
      console.log("progresss iss", opportunityprogress.data.data);
      setoppurtunityviewprogress(opportunityprogress.data.data);
      setTableprogress(opportunityprogress.data.data);
    } catch (err) {
      console.log("error while getting oppurtunity progress: ", err);
    }
  };

  useEffect(() => {
    getOppurtunityProgress();
  }, [opportunity_Id]);

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

    editForm.setFieldsValue({
      opportunity_id: i.opportunity_id,
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

    setShowEditModal(true);
  };

  // const handleEditclick = (e) => {
  //   // console.log("edit data is ::", item);
  //   getoneoppurtunity(e);
  //   getAllContact();
  //   setShowEditModal(true);
  // };

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

      console.log("editdata", editoppurtunity);
      if (editoppurtunity.data.success) {
        GetOpportunityData();
        setShowEditModal(false);
        setSuccessPopup(true);
        close_modal(successPopup, 1200);
      }
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  const handleAddclick = () => {
    getoneoppurtunity();
  };

  // function to add oppurtunityprogress

  const close_modal_for_progress = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        setShowViewModal(true);
      }, time);
    }
  };

  const addOppurtunityProgress = async () => {
    try {
      const opportunityprogress = await PublicFetch.post(
        `${CRM_BASE_URL}/opportunity/${viewoppurtunity.opportunity_id}/progress`,
        {
          opportunity_progress_response: progressResponse,
          opportunity_progress_details: progressDetails,
          opportunity_update_next_date_contact: progressUpdatenextDate,
          opportunity_update_status: progressUpdatestatus,
        }
      );

      console.log("progresss iss", opportunityprogress.data.success);
      if (opportunityprogress.data.success) {
        getOppurtunityProgress();
        setoppurtunityviewprogress();
        setShowProgresssModal(false);
        setSuccessPopup(true);
        close_modal_for_progress(successPopup, 1200);
        setProgressDetails("");
        setProgressResponse("");
        setProgressUpdatenextDate("");
        // setProgressUpdatestatus("");
      }
    } catch (err) {
      console.log("error while getting oppurtunity progress: ", err);
    }
  };

  //  columns is opportunity listing table componenet

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
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
      key: "opportunity_type",
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
      key: "opportunity_from",
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
      key: "opportunity_created_by",
      width: "17%",
      align: "center",
    },
    {
      title: "SOURCE",
      dataIndex: "opportunity_source",
      key: "opportunity_source",
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
      key: "opportunity_party",
      align: "center",
    },
  ];

  const progress = [
    {
      title: "SLNo:",
      dataIndex: "opportunity_progress_id",
      key: "opportunity_progress_id",
      align: "center",
      // render:(count)=>{return <p>{setcount(count+1) } </p> }
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

  console.log("oppurtunity amt iss", oppurtunityamount);
  return (
    <div>
      <div className="container-fluid lead_list  my-3 py-3">
        {/* opportunity listing section One */}

        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Opportunities of {id} </h5>
            </div>
            {/* <Leadlist_Icons /> */}
          </div>
          <div className="row pb-2" style={{ backgroundColor: "#f4f4f7" }}>
            <div className="col-4">
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
              <Link to={ROUTES.LEADLIST}>
                <Button btnType="add">Add Opportunity</Button>
              </Link>
            </div>
          </div>
          <div className="datatable">
            <TableData
              //   data={getData(current, numOfItems, pageSize)}
              // data={allLeadList}
              data={newOpportunityList}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              //   total={getData.length}
              //   current={current}
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
      <Custom_model
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
                      handleEditedclick(viewoppurtunity);
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
                    <td>
                      {moment(viewoppurtunity.opportunity_validity).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
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
                      handleAddclick(viewoppurtunity?.opportunity_id);
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

      <Custom_model
        Adding_contents
        show={showAddOpportunity}
        onHide={() => setShowAddOpportunity(false)}
        header="Add Opportunity"
        size={`xl`}
        // footer={[<Button btnType="save">Save</Button>]}
        {...props}
      >
        <Form
        // onSubmit={handleSubmit(submit)}
        >
          <div className="px-5">
            <div className="row px-1">
              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_type">
                  <Form.Label>Typeeeeeeeeeeeeeeeeeeee</Form.Label>
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
      </Custom_model>

      {/* Edit opportunity modal   section THREE */}
      <Custom_model
        Adding_contents
        width={1000}
        show={ShowEditModal}
        onHide={() => setShowEditModal(false)}
        header="Edit Opportunity"
        // size={`xl`}
        centered
        // footer={[
        //   <Button
        //     btnType="save"
        //     onClick={() => {
        //       // updateOppurtunity();
        //       // updatedOppurtunity();
        //     }}
        //   >
        //     Save
        //   </Button>,
        // ]}
        {...props}
        // Form={editformData}
      >
        <Form
          name="editForm"
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
                  name={"opportunity_from"}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Type",
                    },
                  ]}
                  // aria-label="lead_customer_from"
                  // name="lead_customer_from"
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
                <Form.Item name="opportunity_lead_id">
                  <InputType value={oppurtunitylead} />
                </Form.Item>

                {/* </Form.Group> */}
              </div>

              <div className="col-sm-4 pt-2">
                {/* <Form.Group className="mb-2" controlId="lead_source"> */}
                <label>Source</label>

                <Form.Item
                  name={"opportunity_source"}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Type",
                    },
                  ]}
                  // aria-label="lead_customer_from"
                  // name="lead_customer_from"
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
                  name="opportunity_party"
                  rules={[{ required: true, message: "Party is Required" }]}
                >
                  <SelectBox
                    value={oppurtunityparty}
                    onChange={(e) => {
                      setOppurtunityparty(parseInt(e));
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

                <Form.Item name="opportunity_valid" rules={[{}]}>
                  <input
                    type="date"
                    name="lead_validity"
                    style={{ borderWidth: 0, borderRadius: "5px" }}
                    // defaultValue={todaydate}
                    className="p-2 mt-2"
                    value={moment(oppurtunityvalidity).format("YYYY-MM-DD")}
                    onChange={(event) => {
                      console.log("selected datae : ", event.target.value);
                      setOppurtunityvalidity(event.target.value);
                    }}
                  />
                </Form.Item>

                {/* </Form.Group> */}
              </div>

              <div className="col-sm-8 pt-3">
                {/* <Form.Group className="mb-2" controlId="lead_details"> */}
                <label>Details</label>
                <Form.Item
                  className="mt-2"
                  name="opportunity_description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid details",
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
                  name="opportunity_amount"
                  rules={[
                    {
                      pattern: new RegExp("^([0-9]+([.][0-9]*)?|[.][0-9]+)$"),
                      message: "Amount must be positive Number",
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
                  name="opportunity_probability"
                  rules={[
                    { required: true, message: "Probability is Required" },
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
                  name="opportunity_status"
                  rules={[
                    {
                      required: true,
                      message: "Status is Required",
                    },
                  ]}
                >
                  <SelectBox
                    value={oppurtunitystatus}
                    onChange={(e) => setOppurtunitystatus(e)}
                  >
                    <Select.Option value={1}>quotation</Select.Option>
                    <Select.Option value={2}>interested</Select.Option>
                    <Select.Option value={3}>converted</Select.Option>
                    <Select.Option value={4}>lost</Select.Option>
                    <Select.Option value={5}>DND</Select.Option>
                  </SelectBox>
                </Form.Item>
                {/* </Form.Group> */}
              </div>
              <div className="col-12 d-flex justify-content-center my-2">
                <Button type="submit" btnType="save">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Custom_model>

      {/* {Success successPopup Modal } */}
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {/* ADD OPPORTUNITY PROGRESS MODAL    SECTION FOUR */}
      <Custom_model
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
                      name="progress_response"
                      rules={[
                        {
                          required: true,
                          message: "Response is Required",
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
                    <Form.Item
                      name="progress_next_date"
                      rules={[
                        { required: true, message: "Date should not be empty" },
                      ]}
                    >
                      <input
                        type="date"
                        className=" mt-2 p-2 input_type_style w-100"
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
                      name="response_details"
                      rules={[
                        { required: true, message: "Details is Required" },
                      ]}
                    >
                      <textarea
                        type="text"
                        className="input_type_style w-100"
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

export default OpportunityLeadlist;
