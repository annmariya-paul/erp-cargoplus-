import React, { useEffect, useState} from "react";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Button from "../../../components/button/button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import moment from "moment";


function Listjob(){
    const [searchedText, setSearchedText] = useState("");
    const [pageSize, setPageSize] = useState("25");
    const [searchedNo, setSearchedNo] = useState("");
    const navigate = useNavigate();
    // const [searchedText, setSearchedText] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
    const columns = [
        {
          title: "ACTION",
          dataIndex: "action",
          key: "key",
          width: "10%",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2 me-2">
                <div
                  className="editIcon m-0 "
                //   onClick={() => {
                //     navigate(`/edit_quotation`);
                //   }}
                >
                  <Link  to={ROUTES.UPDATEJOB} >
                  <FaEdit style={{ marginLeft: 15 }} />
                  </Link>
                </div>

                <div
              className="viewIcon m-0"
              onClick={() => {
                navigate(`${ROUTES.VIEW_JOB}/${index.job_id}`);
              }}
              // onClick={()=>{
              //   setShowViewModal(true);
              // }}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
                {/* <div
                  className="viewIcon m-0"
                //   onClick={() => {
                //     navigate(`/view_quotation`);
                //   }}
                  // onClick={()=>{
                  //   setShowViewModal(true);
                  // }}
                >
                  <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
                </div> */}
                <div className="deleteIcon m-0">
                  <FaTrash />
                </div>
              </div>
            );
          },
          align: "center",
        },
        {
          title: "JOB NO",
          dataIndex: "job_number",
          key: "job_number",
          filteredValue: [searchedText],
          onFilter: (value, record) => {
            return String(record.job_number).toLowerCase().includes(value.toLowerCase());
          },
          align: "center",
        },
        {
          title: "DATE",
          dataIndex: "job_date",
          key: "job_date",
          align: "center",
        },
        {
          title: "AWB/BL",
          dataIndex: "job_awb_bl_no",
          key: "job_awb_bl_no",
          filteredValue: [searchedNo],
          onFilter: (value, record) => {
            return String(record.job_awb_bl_no).toLowerCase().includes(value.toLowerCase());
          },
          align: "center",
        },
        {
          title: "CONSIGNEE",
          dataIndex: "job_consignee_name",
          key: "job_consignee_name",
          filteredValue: [searchName],
          onFilter: (value, record) => {
            return String(record.job_consignee_name).toLowerCase().includes(value.toLowerCase());
          },
          align: "center",
        },
        {
          title: "SHIPPER",
          dataIndex: "job_shipper",
          key: "job_shipper",
          align: "center",
        },
        {
          title: "STATUS",
          dataIndex: "job_status",
          key: "job_status",
          align: "center",
        },
        {
          title: "",
          dataIndex: "action",
          key: "key",
          width: "14%",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2 me-2">
                <div
                  className="editIcon m-0 "
                //   onClick={() => {
                //     navigate(`/edit_quotation`);
                //   }}
                >
                   <Link to={ROUTES.TASKANDEXPENSES } style={{ color: "white" }}>
                <Button btnType="add"  className="view_btn"> Tasks & Expenses</Button>
              
              </Link>
                 {/* <Button
                      btnType="add"
                      className="view_btn"
                      onClick={() => {
                        navigate(`${ROUTES.ASSIGN_QUOTATION}/${index.id}`);
                      }}
                    >
                      Tasks & Expenses
                    </Button> */}
                </div>
                </div>
                );
            }
        },
        {
          title: "",
          dataIndex: "assign",
          key: "assign",
          align: "center",
          width: "5%",
          render: (data, index) => {
            return (
              <>
                {index.assigned_employee && index.assigned_employee.length > 0 ? (
                  <div className="">
                    <Button btnType="add" className="me-1 view_btn">
                      view
                    </Button>
                  </div>
                ) : (
                  <div className="">
                    <Button
                      btnType="add"
                      className="me-1 view_btn"
                    //   onClick={() => {
                    //     navigate(`${ROUTES.ASSIGN_QUOTATION}/${index.id}`);
                    //   }}
                    >
                      Assign
                    </Button>
                  </div>
                )}
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



const [AllJobs, setAllJobs] = useState();
      const getAllJobs= () => {
        PublicFetch.get(`${CRM_BASE_URL_FMS}/job?startIndex=0&noOfItems=100`)
          .then((res) => {
            console.log("Response", res);
            if (res.data.success) {
              console.log("success", res.data.data);
              let temp = [];
              res.data.data.forEach((item, index) => {
                let date = moment(item.job_date).format("DD-MM-YYYY");
                
                temp.push({
                  job_number: item.job_number,
                  // quotation_carrier: item.quotation_carrier,
                  job_id: item.job_id,
                  job_consignee: item.job_consignee,
                  job_consignee_name:item.crm_v1_leads.lead_customer_name,
                  job_date: date,
                  job_shipper: item.job_shipper,
                  job_freight_type: item.job_freight_type,
                  job_cargo_type: item.job_cargo_type,
                  job_carrier: item.job_carrier,
                  job_awb_bl_no: item.job_awb_bl_no,
                  job_mode: item.job_mode,
                  job_origin_id: item.job_origin_id,
                  job_destination_id: item.job_destination_id,
                  job_no_of_pieces: item.job_no_of_pieces,
                  job_uom: item.job_uom,
                  job_status: item.job_status,
                });
              });
              setAllJobs(temp);
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      };
    
      useEffect(() => {
        getAllJobs();
      }, []);

    return(
        <>
        
        <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Job</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Job Number"
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
              placeholder="Search by AWB/BL Number"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedNo}
              onChange={(e) => {
                setSearchedNo(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedNo(value);
              }}
            />
          </div>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Consignee"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchName(value);
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
            
              <Link to={ROUTES.CREATEJOB } style={{ color: "white" }}>
                <Button btnType="add">Add Job</Button>
              
              </Link>
            </div>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}

            data={AllJobs}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
        </>
    )
}
export default Listjob;