//Opportunity adding model created 14.10.22 shahida

import React, { useState, useEffect, useRef } from "react";
import { Oppor_Status } from "../../../../utils/SelectOptions";
import { useNavigate, useParams } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { DatePicker, Form, Select } from "antd";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL, CRM_BASE_URL_HRMS } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { message } from "antd";
import moment from "moment";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CustomerModal from "../../../../components/CustomerModal.jsx/CustomerModal";
// import TextArea from "antd/lib/input/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { ROUTES } from "../../../../routes";
import "../opportunity_ List/opportunitylist.scss";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import FileUpload from "../../../../components/fileupload/fileUploader";
// export default function AddOpportunity(props) {
export default function EditOpportunity() {
  const { id } = useParams();
  console.log("ID is ...", id);

  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  // const typevalues = [
  //   {
  //     value: "sales",
  //     label: "sales",
  //   },
  //   {
  //     value: "support",
  //     label: "support",
  //   },
  //   {
  //     value: "maintenance",
  //     label: "maintenance",
  //   },
  // ];
  const navigate = useNavigate();
  const today = new Date();
  const [EditForm] = Form.useForm();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [modalAddCustomer, setModalAddCustomer] = useState(false);
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
  console.log("opp party", oppurtunityparty);
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
  const [oppvalidity, setOppValidity] = useState();
  const [oppamount, setOppAmount] = useState();
  const [oppdescription, setOppDescription] = useState();
  // const [oppstatus, setOppStatus] = useState();
  const [leadName, setLeadName] = useState("");
  const [opporFrom, setOpporFrom] = useState("customer");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageSize, setImageSize] = useState(false);
  const [fileAttach, setFileAttach] = useState([]);
  // const [allSalesPerson, setAllSalesPerson] = useState();
  const [selectedValues, setSelectedValues] = useState([]);
  const [Customer_Id, setCustomer_Id] = useState();
  const [AllCustomers, setAllCustomers] = useState();
  const [allIncoterms, setAllIncoterms] = useState();
  console.log("incoterm", allIncoterms);
  const [Customer, setCustomer] = useState();
  const [AllContacts, setAllContacts] = useState();
  console.log("all contacts data", AllContacts);

  const [customersData, setCustomersData] = useState();
  console.log("ssssss", customersData);
  const getCustomers = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        console.log("response of customersss", res);
        if (res.data.success) {
          setCustomersData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllEnquiry();
    getCustomers();
    // GetLeadData();
  }, []);
  //view progress
  const [tableprogress, setTableprogress] = useState("");
  const [count, setcount] = useState(0);
  const [editForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const componentRef = useRef();
  const [oppstatuss, setOppStatus] = useState();
  // const [successPopup, setSuccessPopup] = useState(false);
  const [allSalesPerson, setAllSalesPerson] = useState();
  const [customername, setCustomerName] = useState();
  console.log("customer id", customername);
  const [customernew, setCustomernew] = useState();
  console.log("customer nameee", customernew);
  useEffect(() => {
    //
    if (customername) {
      GetAllCustomers();
      GetAllContacts();
      addForm.setFieldsValue({ oppo_customer: customername });
      setCustomer_Id(customername);
      handleclicknew(customername);
      // GetSingleCustomer(customername);
    }
  }, [customername]);
  const handleclicknew = (e) => {
    console.log("reached", e);
    GetSingleCustomer(e);
    // GetSingleContact(e);
  };

  const GetAllCustomers = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success og gettimg customers", res?.data?.data);
          setAllCustomers(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const [enquiryData, setEnquiryData] = useState();
  const getAllEnquiry = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries/minimal`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setEnquiryData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const [contactdetail, setContactdetail] = useState();
  const oneContact = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact/${e}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success data of contact", res.data.data);
          setContactdetail(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const GetAllContacts = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of contact", res.data.data);
          // setAllContacts(res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            if (e == item.enquiry_contact_person_id) {
              temp.push(item);
            }
          });
          setAllContacts(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  // const close_modal = (mShow, time) => {
  //   if (!mShow) {
  //     setTimeout(() => {
  //       setSuccessPopup(false);
  //       navigate(`${ROUTES.OPPORTUNITY}`)
  //     }, time);
  //   }
  // };
  const handleDatas = (data) => {
    console.log("data", data);
    getOneEnquiry(data);
    // oneContact(Customer_Id)
    GetAllContacts(Customer_Id);
  };

  const [allenqdata, setAllEnqdata] = useState();
  console.log("all data", allenqdata);
  const getOneEnquiry = (e) => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries/${e[0]}`).then((res) => {
      console.log("responsewww", res);
      if (res.data.success) {
        console.log("Success from one enquiry", res.data.data);
        setAllEnqdata(res.data.data);
        setCustomer(res.data.data.crm_v1_customer?.customer_id);
        setCustomer_Id(res.data.data.enquiry_contact_person_id);
        let a = res.data.data.crm_v1_contacts[0];
        addForm.setFieldsValue({
          oppo_customer: res.data.data.crm_v1_customer.customer_id,
          // contact_person:res.data.data.crm_v1_contacts.contact_id,
          // contactemail:res.data.data.crm_v1_contacts.contact_email,
          // contactphone:res.data.data.crm_v1_contacts.contact_phone_1,
        });
        PublicFetch.get(
          `${CRM_BASE_URL}/customer/${res.data.data.crm_v1_customer?.customer_id}`
        )
          .then((res) => {
            console.log("Response from single customer", res);
            if (res.data.success) {
              let a = res.data.data.crm_v1_contacts[0];
              setAllContacts(res.data.data.crm_v1_contacts);
              // let b =res.data.data.crm_v1_customer_accounting[0];
              let b = res.data.data.customer_preferred_freight_type;
              addForm.setFieldsValue({
                contact_person: a?.contact_id,
                contactemail: a?.contact_email,
                contactphone: a?.contact_phone_1,
                // customerfrighttype: b,
              });
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    });
  };

  const handleclick = (e) => {
    GetSingleCustomer(e);
  };
  const GetSingleCustomer = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${e}`)
      .then((res) => {
        console.log("Response from single customer", res);
        if (res.data.success) {
          console.log("Success from single customer", res.data.data);
          console.log("contact data", res.data.data.crm_v1_contacts[0]);
          console.log(
            "accounts data",
            res.data.data.customer_preferred_freight_type
          );
          let a = res.data.data.crm_v1_contacts[0];
          setAllContacts(res.data.data.crm_v1_contacts);
          // let b =res.data.data.crm_v1_customer_accounting[0];
          let b = res.data.data.customer_preferred_freight_type;
          addForm.setFieldsValue({
            contact_person: a?.contact_id,
            contactemail: a?.contact_email,
            contactphone: a?.contact_phone_1,
            customerfrighttype: b,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  // const GetSalesPersons = () => {
  //   PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
  //     .then((res) => {
  //       console.log("response", res);
  //       if (res.data.success) {
  //         console.log("Success from sales person", res.data.data);
  //         setAllSalesPerson(res.data.data);
  //         const personName = localStorage.getItem('UserID');
  //   res.data.data.forEach((item,index)=> {
  //     if(personName == item.employee_id){
  //       addForm.setFieldsValue({
  //         sales_person: item.employee_id
  //       })
  //       }
  //     })

  //   }
  // })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };
  const [validityDate, setValidityDate] = useState();
  useEffect(() => {
    GetSalesPersons();
  }, []);
  const beforeUpload = (file, fileList) => {};

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

  // const [editOppurtunity, setEditOppurtunity] = useState({
  //   opportunity_id: "",
  //   opportunity_lead_id: oppId,
  //   opportunity_number: "",
  //   opportunitytype: "",
  //   opportunityfrom: "",
  //   convertedby: "",
  //   opportunitysource: "",
  //   opportunityparty: "",
  //   opportunityvalidity: "",
  //   opportunitydescription: "",
  //   opportunityamount: "",
  //   opportunityprobability: "",
  //   opportunitystatus: "",
  // });

  // { function to get all opportunity data - Ann mariya(27/10/22)}
  const GetSingleContact = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact/${e}`)
      .then((res) => {
        console.log("Response from single contact", res);
        if (res.data.success) {
          console.log("success from single contact", res.data.data);
          addForm.setFieldsValue({
            contactemail: res.data.data.contact_email,
            contactphone: res.data.data.contact_phone_1,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
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
                });
              }
            });
          });
          setOppnew(tempArr);
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
    GetOpportunityData();
    // getAllContact();
  }, [numOfItems, pageofIndex, pagesizecount]);

  // get one oppurtunity
  const [oneoppurtunity, setOneoppurtunity] = useState();

  useEffect(() => {
    if (id) {
      getoneoppurtunity();
    }
  }, [id]);

  // const getoneoppurtunity = async () => {
  //   try {
  //     const oneoppurtunities = await PublicFetch.get(
  //       `${CRM_BASE_URL}/opportunity/${id}`
  //     );
  //     console.log("one oppurtunitiesss::: ", oneoppurtunities?.data?.data);
  //     let date = moment(oneoppurtunities?.data?.data.opportunity_validity);

  //     setOneoppurtunity(oneoppurtunities.data?.data);
  //     // console.log("typeee:", oneoppurtunities.data?.data?.opportunity_type);

  //     setOppurtunityid(oneoppurtunities.data?.data?.opportunity_id);
  //     setOpportunityNum(oneoppurtunities.data?.data?.opportunity_number);
  //     setoppurtunitytype(oneoppurtunities.data?.data?.opportunity_type);
  //     setOppurtunityfrom(oneoppurtunities.data?.data?.opportunity_from);
  //     setOppurtunitysource(oneoppurtunities.data?.data?.opportunity_source);
  //     setOppurtunityvalidity(date);
  //     setOpportunitydescription(
  //       oneoppurtunities.data?.data?.opportunity_description
  //     );
  //     setOppurtunityamount(oneoppurtunities.data?.data?.opportunity_amount);
  //     setOppurtunityProbability(
  //       oneoppurtunities.data?.data?.opportunity_probability
  //     );
  //     setOppurtunitystatus(oneoppurtunities.data?.data?.opportunity_status);
  //     setOppurtunitylead(oneoppurtunities.data?.data?.opportunity_lead_id);
  //     setOppurtunityparty(oneoppurtunities.data?.data?.opportunity_party);
  //     // setOppurtunityparty()
  //     editForm.setFieldsValue({
  //       opportunity_number: oneoppurtunities.data?.data?.opportunity_number,
  //       opportunity_type: oneoppurtunities.data?.data?.opportunity_type,
  //       opportunity_from: oneoppurtunities.data?.data?.opportunity_from,
  //       opportunity_party: oneoppurtunities.data?.data?.opportunity_party1,
  //       // opportunity_party: item?.crm_v1_contacts?.contact_person_name,
  //       // opportunity_party1: item?.crm_v1_contacts?.contact_id,
  //       opportunity_source: oneoppurtunities.data?.data?.opportunity_source,
  //       opportunity_validity: date,
  //       opportunity_amount: oneoppurtunities.data?.data?.opportunity_amount,
  //       opportunity_description:
  //         oneoppurtunities.data?.data?.opportunity_description,
  //       opportunity_probability:
  //         oneoppurtunities.data?.data?.opportunity_probability,
  //       opportunity_status: oneoppurtunities.data?.data?.opportunity_status,
  //       opportunity_lead_id: oneoppurtunities.data?.data?.opportunity_lead_id,
  //     });
  //   } catch (err) {
  //     console.log("error while getting all leads: ", err);
  //   }
  // };
  const getAllIncoterms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/incoterms?startIndex=0&noOfItems=10`)
      .then((res) => {
        addForm.setFieldsValue({
          oppo_incoterm: res.data.data.incoterms[0].incoterm_id,
        });
        console.log("response", res);
        if (res.data.success) {
          setAllIncoterms(res.data.data.incoterms);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllIncoterms();
  }, []);

  const getoneoppurtunity = () => {
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/${id}`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of Data of opp", res.data.data);
          let a = res?.data?.data;
          // console.log("one oppurtunitiesss::: ", oneoppurtunities?.data?.data);
          // let date = moment(a.opportunity_validity);

          let enquiry_date = moment(a.enquiry_date);
          let enqs = a.fms_v1_enquiry_opportunities.map(
            (item, index) => item.enq_opp_enquiry_id
          );
          let date1 = moment(a.opportunity_date);
          let date2 = moment(a.opportunity_validity);
          console.log("enqs", enqs);
          addForm.setFieldsValue({
            oppo_customer: a.opportunity_customer_id,
            oppo_enquiries: enqs,
            oppo_date: date1,
            oppo_source: a.opportunity_source,
            oppo_customer_ref: a.opportunity_customer_ref,
            contact_person: a.opportunity_contact_id,
            oppo_type: a.opportunity_type,
            sales_person: a.opportunity_salesperson_id,
            job_freight_type: a.enquiry_freight_type,
            enquiry_docs: a.attachments,
            oppo_amount: a.opportunity_amount,
            oppo_probability: a.opportunity_probability,
            oppo_incoterm: a.opportunity_incoterm_id,
            oppo_status: a.opportunity_status,
            oppo_description: a.opportunity_description,
            oppo_validity: date2,
            // opportunity_lead_id: oneoppurtunities.data?.data?.opportunity_lead_id,
          });
          GetSingleContact(a?.opportunity_contact_id);
          GetSingleCustomer(a.enquiry_customer_id);
          GetAllContacts(a.enquiry_customer_id);
        }
      })

      .catch((err) => {
        console.log("error while getting all leads: ", err);
      });
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
        navigate(ROUTES.OPPORTUNITY);
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

  // const Viewoppurtunties = (item) => {
  //   console.log("view oppurtunity issss:", item);
  //   setviewoppurtunity({
  //     ...viewoppurtunity,
  //     id: item?.opportunity_Id,
  //     opportunity_number: item.opportunity_number,
  //     opportunity_type: item.opportunity_type,
  //     opportunity_from: item.opportunity_from,
  //     convertedby: item.opportunity_created_by,
  //     opportunity_source: item.opportunity_source,
  //     opportunity_party: item.opportunity_party,
  //     opportunity_validity: item.opportunity_validity,
  //     opportunity_description: item.opportunity_description,
  //     opportunity_amount: item.opportunity_amount,
  //     opportunity_probability: item.opportunity_probability,
  //     opportunity_status: item.opportunity_status,
  //     opportunity_leadid: item.opportunity_lead_id,
  //     opportunity_lead_name: item.opportunity_created_by,
  //     opportunity_statusname: item.opportunity_statusname,
  //   });
  //   getOppurtunityProgress(item);

  //   setShowViewModal(true);
  // };
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

  const handleEditedclick = (i) => {
    console.log("edittingg in list::: ", i);

    setOppurtunityid(i.opportunity_Id);
    setOpportunityNum(i.opportunity_number);
    setoppurtunitytype(i.opportunity_type);
    setOppurtunityfrom(i.opportunity_from);
    setOppurtunityparty(i.opportunity_party1);
    setOppurtunitysource(i.opportunity_source);
    setOppurtunityvalidity(i.opportunity_validity);
    setOppurtunityamount(i.opportunity_amount);
    setOpportunitydescription(i.opportunity_description);
    setOppurtunityProbability(i.opportunity_probability);
    setOppurtunitystatus(i.opportunity_status);
    setOppurtunitylead(i.opportunity_created_by1);
    getAllContact();
    setShowEditModal(true);
    let validityDate = moment(i.opportunity_validity);
    editForm.setFieldsValue({
      opportunity_id: i.opportunity_id,
      opportunity_number: i.opportunity_number,
      opportunity_type: i.opportunity_type,
      opportunity_from: i.opportunity_from,
      opportunity_party: i.opportunity_party,
      opportunity_source: i.opportunity_source,
      opportunity_validity: validityDate,
      opportunity_amount: i.opportunity_amount,
      opportunity_description: i.opportunity_description,
      opportunity_probability: i.opportunity_probability,
      opportunity_status: i.opportunity_status,
      opportunity_lead_id: i.opportunity_created_by,
    });
    setShowEditModal(true);
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
    // getoneoppurtunity(e);
    getAllContact();
    setShowEditModal(true);
  };

  const updatedOppurtunity = async (data) => {
    const formData = new FormData();
    let date = moment(data?.oppo_date);
    let date2 = moment(data?.oppo_validity);
    formData.append("opportunity_date", date);
    formData.append("opportunity_customer_id", data.oppo_customer);
    formData.append("opportunity_from", opporFrom);
    if(data.oppo_customer_ref){
      formData.append("opportunity_customer_ref", data.oppo_customer_ref);
    }
    
    formData.append("opportunity_source", data.oppo_source);
    formData.append("opportunity_contact_id", data.contact_person);
    formData.append("opportunity_party", data.contact_person);
    formData.append("opportunity_type", data.oppo_type);
    formData.append("opportunity_incoterm_id", data.oppo_incoterm);
    formData.append("opportunity_validity", date2);
    if(data.oppo_amount){
      formData.append("opportunity_amount", data.oppo_amount);
    }
   
    if(data.oppo_probability){
      formData.append("opportunity_probability", data.oppo_probability);
    }
    if(data.oppo_description){
      formData.append("opportunity_description", data.oppo_description);
    }
  
    formData.append("opportunity_status", data.oppo_status);
    formData.append("opportunity_salesperson_id", data.sales_person);

    //  formData.append("opportunity_enquiries",JSON.stringify(data.oppo_enquiries));
    // data.oppo_enquiries?.length &&
    //   data.oppo_enquiries.map((item, index) => {
    //     console.log("userdata task", index);

    //     formData.append(`opportunity_enquiries[${index}]`, item);
    //   });

    // formData.append("opportunity_enquiries",JSON.stringify(["8","9"]));
    // formData.append("opportunity_enquiries[0]",8);
    // formData.append("opportunity_enquiries[1]",9);
    // selectedValues.forEach((value) => {
    //   formData.append("opportunity_enquiries", value);
    // });

    if (fileAttach) {
      formData.append(`attachments`, fileAttach);
    }

    try {
      const editoppurtunity = await PublicFetch.patch(
        `${CRM_BASE_URL}/opportunity/${id}`,
        formData,
        {
          "Content-Type": "Multipart/form-Data",
        }
      );

      console.log("editdataaa", editoppurtunity);
      if (editoppurtunity.data.success) {
        setShowEditModal(false);
        GetOpportunityData();
        setSuccessPopup(true);
        close_modal(SuccessPopup, 1200);
      }
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

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
        close_modal(SuccessPopup, 1200);
      }
    } catch (err) {
      console.log("error while getting oppurtunity progress: ", err);
    }
  };

  const handleAddclick = () => {
    // getoneoppurtunity();
  };

  //   const handlePrint = () => {
  //     console.log("hhhhhhhhhh");
  //     window.print();
  //     setTimeout(function () { window.close(); }, 100);
  // }

  //  columns is opportunity listing table componenet

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "ENQUIRY NO",
      dataIndex: "opportunity_number",
      key: "opportunity_number",
      width: "12%",
      // align: "center",
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
      align: "left",
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
      align: "left",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        console.log("indexx", index);
        return (
          <div className="d-flex justify-content-center gap-2">
            {/* <div className="editcolor">
              <FaEdit onClick={() => handleEditedclick(index)} />
            </div> */}
            {/* <div className="editcolor">
              <MdPageview
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => Viewoppurtunties(index)}
              />
            </div> */}
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

  const GetSalesPersons = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success from sales person", res.data.data);
          setAllSalesPerson(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    GetSalesPersons();
  }, []);
  //   <Form
  //   form={editForm}
  //   onFinish={(value) => {
  //     console.log("values111333", value);
  //     // setDescription(value.description);
  //     // setBrand(value.brand);
  //     updatedOppurtunity();
  //   }}
  //   // onSubmit={handleSubmit(submit)}
  //   onFinishFailed={(error) => {
  //     console.log(error);
  //   }}
  // >

  return (
    <>
      <div className="container-fluid">
        <Form
          name="addForm"
          form={addForm}
          onFinish={(values) => {
            console.log("jobpayvalues", values);
            updatedOppurtunity(values);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row pt-2">
            <h5 className="lead_text">Edit Opportunity</h5>
          </div>

          <div className="row crm_cards mt-2 mx-0 px-2 py-4">
            <div className="col-12">
              <h6 className="lead_text">Basic Info</h6>
            </div>
            <div className="col-sm-4 pt-1 d-flex">
              <div className="col-12">
                <label className="mb-1">
                  Customer<span className="req_star">*</span>
                </label>
                <Form.Item
                  name="oppo_customer"
                  rules={[
                    {
                      required: true,
                      message: "Please Select a Customer",
                    },
                  ]}
                >
                  <SelectBox
                   filterOption={(input, option) =>


                    option.children.toUpperCase().includes(input.toUpperCase())
        
                  }
        
                  showSearch={true}
                  allowClear={true}
                  optionFilterProp="children"
                    placeholder={"--Please Select--"}
                    // value={opptype}
                    onChange={(e) => {
                      setCustomer_Id(e);
                      GetAllContacts(e);
                      // addForm.resetFields();
                      handleclick(e);
                    }}
                  >
                    {customersData &&
                      customersData.length > 0 &&
                      customersData.map((item, index) => {
                        return (
                          <Select.Option
                            value={item.customer_id}
                            key={item.customer_id}
                          >
                            {item.customer_name}
                          </Select.Option>
                        );
                      })}
                  </SelectBox>
                </Form.Item>
              </div>
              {/* <div className="col-1 mt-4 ps-1">
                {" "}
                <BsPlusCircleFill
                  style={{
                    fontSize: "21px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    color: "#0891d1",
                  }}
                  onClick={() => {
                    setModalAddCustomer(true);
                    addForm.resetFields();
                  }}
                />
              </div> */}
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">Enquiry No.</label>
              <Form.Item
                name="oppo_enquiries"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Select an Enquiry Number",
                //   },
                // ]}
              >
                <SelectBox
                  disabled={true}
                  // placeholder={"--Please Select--"}
                  mode="multiple"
                  // maxTagCount="responsive"
                  // value={selectedValues}
                  // onChange={handleMultiSelectChange}
                  onChange={(e) => {
                    handleDatas(e);
                    console.log("reached", e);
                  }}
                  // value={oppoNumber}
                  // onChange={(e) => setOppoNumber(e.target.value)}
                >
                  {enquiryData &&
                    enquiryData.length > 0 &&
                    enquiryData.map((item, index) => {
                      return (
                        <Select.Option
                          value={item.enquiry_id}
                          key={item.enquiry_id}
                        >
                          {item.enquiry_no}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-1">
              <label className="mb-1">
                Date<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_date"
                rules={[
                  {
                    required: true,
                    message: "Please select an Date",
                  },
                ]}
              >
                <DatePicker
                  style={{ borderWidth: 0, marginTop: 2 }}
                  format={"DD-MM-YYYY"}
                  defaultValue={moment(date)}
                />
              </Form.Item>
            </div>

            {/* <div className="col-sm-4 pt-2">
            <label>
              From<span className="req_star">*</span>
            </label>
            <Form.Item
              name="oppo_from"
              rules={[
                {
                  required: true,
                  message: "Please Select a value",
                },
              ]}
            >
              <SelectBox placeholder={"--Please Select--"}>
                <Select.Option value="customer">Customer</Select.Option>
                <Select.Option value="lead">Lead</Select.Option>
              </SelectBox>
            </Form.Item>
          </div> */}

            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Source<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_source"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox
                  // defaultValue="reference"
                  placeholder={"--Please Select--"}
                  // value={oppsource}
                  // onChange={(e) => setOppSource(e)}
                >
                  <Select.Option value="reference">reference</Select.Option>
                  <Select.Option value="direct visit">
                    direct visit
                  </Select.Option>
                  <Select.Option value="online registration">
                    online registration
                  </Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">Customer Reference</label>
              <Form.Item
                name="oppo_customer_ref"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter a valid Customer Reference",
                //   },
                // ]}
              >
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Sale Person<span className="required">*</span>
              </label>
              <Form.Item
                name="sales_person"
                rules={[
                  {
                    required: true,
                    message: "Sales Person is Required",
                  },
                ]}
              >
                <SelectBox>
                  {allSalesPerson &&
                    allSalesPerson.length > 0 &&
                    allSalesPerson.map((item, index) => {
                      return (
                        <Select.Option
                          key={item.employee_id}
                          value={item.employee_id}
                        >
                          {item.employee_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
          </div>
          <div className="row crm_cards mt-3 mx-0 px-2 py-4">
            <div className="col-12">
              <h6 className="lead_text">Contact Details</h6>
            </div>
            <div className="col-sm-4 pt-1">
              <label className="mb-1">
                Contact Person<span className="req_star">*</span>
              </label>
              <Form.Item
                name="contact_person"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox
                  onChange={(e) => {
                    GetSingleContact(e);
                  }}
                  // value={oppprobability}
                  // onChange={(e) => oneContact(e)}
                >
                  {AllContacts &&
                    AllContacts.length > 0 &&
                    AllContacts.map((item, index) => {
                      console.log("item", item);
                      return (
                        <Select.Option
                          value={item.contact_id}
                          key={item.contact_id}
                        >
                          {item.contact_person_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">Email</label>
              <Form.Item name="contactemail">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
              {/* <InputType disabled value={contactdetail?.contact_email} /> */}
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">Phone</label>
              <Form.Item name="contactphone">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
              {/* <InputType disabled value={contactdetail?.contact_phone_1} /> */}
            </div>
          </div>
          <div className="row crm_cards mt-3 mx-0 px-2 py-4">
            <div className="col-12">
              <h6 className="lead_text">Extra Info</h6>
            </div>
            <div className="col-sm-4 pt-1">
              <label className="mb-1">
                Opportunity Type<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_type"
                rules={[
                  {
                    required: true,
                    message: "Please select a Type",
                  },
                ]}
              >
                <SelectBox
                // defaultValue="sales"
                // value={oppurtunitytype}
                // onChange={(e) => {
                //   setoppurtunitytype(e);
                // }}
                >
                  <Select.Option value="sales">Sales</Select.Option>
                  <Select.Option value="support">Support</Select.Option>
                  <Select.Option value="maintenance">Maintenance</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4  pt-1">
              <label className="mb-1">
                Valid Up to<span className="req_star">*</span>
              </label>
              <Form.Item name="oppo_validity" {...config}>
                <DatePicker
                  style={{ borderWidth: 0 }}
                  format={"DD-MM-YYYY"}
                  // defaultValue={moment(validityDate)}
                  // initialValues={oppurtunityvalidity}
                  // format={dateFormatList}
                  // disabledDate={(d) => !d || d.isBefore(today)}
                  // onChange={(e) => {
                  //   console.log("date mmm", e);
                  //   setOppurtunityvalidity(e);
                  // }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-1">
              <label className="mb-1">Expecting Amount</label>
              <Form.Item
                name="oppo_amount"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter a valid amount",
                //   },
                // ]}
              >
                <Input_Number precision={2} />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">Probability of conversion</label>
              <Form.Item
                name="oppo_probability"
                // rules={[
                //   {
                //     required: true,
                //     message: "please select valid Name",
                //   },
                // ]}
              >
                <SelectBox
                // defaultValue="M"
                // value={oppurtunityprobability}
                // onChange={(e) => {
                //   setOppurtunityProbability(e);
                // }}
                >
                  <Select.Option value="L">low</Select.Option>
                  <Select.Option value="M">medium</Select.Option>
                  <Select.Option value="H">high</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Incoterm<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_incoterm"
                rules={[
                  {
                    required: true,
                    message: "please select an incoterm",
                  },
                ]}
              >
                <SelectBox
                  placeholder={"--Please Select--"}
                  // value={oppprobability}
                  // onChange={(e) => oneContact(e)}
                >
                  {allIncoterms &&
                    allIncoterms.length > 0 &&
                    allIncoterms.map((item, index) => {
                      console.log("item", item);
                      return (
                        <Select.Option
                          value={item.incoterm_id}
                          key={item.incoterm_id}
                        >
                          {item.incoterm_short_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Status<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_status"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox
                  //  defaultValue={1}
                  placeholder={"--Please Select--"}
                  value={oppstatuss}
                  onChange={(e) => setOppStatus(e)}
                >
                  <Select.Option value={1}>New</Select.Option>
                  <Select.Option value={2}>Interested</Select.Option>
                  <Select.Option value={3}>Converted</Select.Option>
                  <Select.Option value={4}>Lost</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-6 pt-2">
              <label>Remarks</label>
              <Form.Item
                className="mt-2"
                name="oppo_description"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter valid details",
                //   },
                // ]}
              >
                <TextArea
                  value={oppdescription}
                  onChange={(e) => setOppDescription(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-6 mt-2">
              <label>Attachments</label>
              <Form.Item name="attachments" className="mt-2">
                <FileUpload
                  multiple
                  // filetype={"Accept only pdf, docx and zip"}
                  listType="picture"
                  accept=".pdf,.docx,.zip,.jpeg"
                  height={100}
                  beforeUpload={beforeUpload}
                  onChange={(file) => {
                    console.log("Before upload file size", file.file.size);
                    if (file.file.size > 2000 && file.file.size < 500000) {
                      setFileAttach(file.file.originFileObj);
                      setImageSize(false);
                      console.log("select imaggg", file.file.originFileObj);
                      console.log(
                        "image is greater than 2 kb and less than 500 kb"
                      );
                    } else {
                      setImageSize(true);
                      console.log("Error in image upload");
                    }
                  }}
                />
                {imageSize ? (
                  <p style={{ color: "red" }}>
                    Upload File size between 2 kb and 500 kb
                  </p>
                ) : (
                  ""
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center py-3 gap-3">
            <Button btnType="save">Save</Button>
            <Button
              as="input"
              type="reset"
              value="Reset"
              onClick={() => {
                navigate(ROUTES.OPPORTUNITY);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
        {/* </>
      }
      // {...props}
    ></Custom_model> */}

        {/* Modal for add Customer */}
        <CustomerModal
          setCustomerName={setCustomerName}
          setCustomernew={setCustomernew}
          show={modalAddCustomer}
          onHide={() => {
            setModalAddCustomer(false);
          }}
        />
        <Custom_model
          // size={`sm`}
          success
          show={SuccessPopup}
          onHide={() => setSuccessPopup(false)}
          footer={false}
        />
      </div>
    </>
  );
}
