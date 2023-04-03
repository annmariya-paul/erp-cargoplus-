import "./awbblReport.scss";
import { Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";
import { ACCOUNTS, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { FaFileExcel } from "react-icons/fa";
import InputType from "../../../components/Input Type textbox/InputType";

export default function AwbblReport() {
    const { Option } = Select;
  const [serialNo, setserialNo] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedJob,setSelectedJob] = useState();
  const [allagents, setAllagents] = useState("");
  const [selectedAgent, setSelectedAgent] = useState();
  console.log("selectagent", selectedAgent);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reportData, setReportData] = useState([]);
  console.log("dataaaa", reportData);
  const [jobList, setJobList] = useState();
  const [customerList, setCustomerList] = useState();
  const getallagents = async () => {
    try {
      const allagents = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/agents`
      );
      console.log("getting all agent details", allagents.data.data);
      setAllagents(allagents.data.data);
    } catch (err) {
      console.log("error to agent details", err);
    }
  };

  useEffect(() => {
    getallagents();
    SearchBydate();
  }, []);

  const SearchBydate = () => {
    let startdate = moment(startDate).format("MM-DD-YYYY");
    let enddate = moment(endDate).format("MM-DD-YYYY");
    PublicFetch.post(`${CRM_BASE_URL_FMS}/reports/agent`, {
      agent_id: selectedAgent,
      start_date: startdate,
      end_date: enddate,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success Data", res.data.data.fms_v1_job_agents);
          //  setReportData(res.data.data);
          //  setSuccessPopup(true);
          //  close_modal(successPopup, 1200);
          //  addForm.resetFields();
          //  setModalAddCurrency(false);
          //  getAllCurrency();
          let temp = [];
          var totalCostFx = 0;
          let exchange_rate = "";
          let isagents = "";
          let isjob = "";
          res?.data?.data?.forEach((i, index) => {
            i?.fms_v1_job_agents?.forEach((item, index) => {
              i?.fms_v1_job_task_expenses?.forEach((itm, index) => {
                if (item?.fms_v1_jobs.job_id === itm?.job_task_expense_job_id)
                totalCostFx += itm?.job_task_expense_cost_amountfx;
                isagents = item;
                isjob = itm;
                exchange_rate = item?.fms_v1_jobs?.job_total_cost_exch;
              });
            });
          });
          var converted = totalCostFx / exchange_rate;
          temp.push({
            job_no: isagents?.fms_v1_jobs.job_number,
            customer: isagents?.fms_v1_jobs.crm_v1_leads.lead_customer_name,
            currency:
              isagents?.fms_v1_jobs.generalsettings_v1_currency.currency_name,
            totalcost_fx: totalCostFx.toFixed(2),
            totalcost_lx: converted.toFixed(2),
          });
          setReportData(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
        title: "CUSTOMER",
        dataIndex: "customer",
        key: "customer",
        align: "left",
      },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      width: "18%",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "left",
    },
   
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      width: "10%",
      align: "left",
    },
    {
      title: "AWB/BL NO",
      dataIndex: "awb_bl_no",
      key: "awb_bl_no",
      align: "left",
      width: "16%",
    },
    {
      title: "SALES PERSON",
      dataIndex: "sales_person",
      key: "sales_person",
      align: "left",
      width: "26%",
    },
  ];
  const data12 = reportData?.map((item) => [
    // item.action,
    item.sl_no,
    item.customer,
    item.job_no,
    item.date,
    item.awbblno,
    item.salesperson
  ]);

  const EnquiryHeads = [
    [
      "sl_no",
      "customer",
      "job_no",
      "date",
      "awbblno",
      "sales_person",
     
    ],
  ];
  const columnsKeys = columns.map((column) => column.key);
  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );

  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };
  const getCustomerList = async () => {
    try {
      const customerList = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/customers`
      );
      if (customerList?.status === 200) {
        setCustomerList(customerList?.data.data);
      }
    } catch (err) {
      console.log("Error While fetching customer list");
    }
  };

  const getJobList = async (e) => {
    if(e === "null") e=null;
    try {
      const jobList = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/jobs`,
        {
          customerId: e
        }
      );
      if (jobList?.status === 200) {
        //console.log("Job List are:", jobList?.data.data);
        setJobList(jobList?.data.data);
      }
    } catch (err) {
      console.log("Error in fetching job list");
    }
  };

  useEffect(() => {
    getCustomerList();
    getJobList(null);
  }, []);



  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className=" d-flex justify-content-between">
          <div>
            <h5 className="lead_text">AWB/BL Report</h5>
          </div>

          {/* <div className="icon_margin">
            <li className="icon-border">
              <a className="icon icon_color" href="#"> */}
                {/* <FaFileExcel /> */}
                <div className="">
{/*            
             {reportData && ( */}
                <Leadlist_Icons
                  datas={reportData}
                  columns={filteredColumns}
                  items={data12}
                  xlheading={EnquiryHeads}
                  filename="data.csv"
                  chechboxes={
                    <Checkbox.Group
                      onChange={onChange}
                      value={selectedColumns}
                    >
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
              {/* )} */}
              {/* </a>
            </li> */}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-12">
          {/* <p className={`${styles.dateTop} mt-4`}></p> */}
            <lable>AWB/BL NO</lable>
            <div className="mt-2">
           <InputType/>
           </div>
          </div>

          <div className="col-sm-3 col-6">
            <label>Customer</label>
            <div className="mt-2">
              {/* <DatePicker
                format={"DD-MM-YYYY"}
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e)}
              /> */}
              <SelectBox
                      name="customer"
                      defaultValue="null"
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                    //   className="w-100 select_box"
                      value={selectedCustomer}
                      onChange={(e) => {
                        setSelectedJob("null");
                        setSelectedCustomer(e);
                        getJobList(e)
                      }
                      }
                    >
                      <Option value="null">All</Option>
                      {customerList?.map((item) => {
                        // console.log(item, "Items inside map");
                        return (
                          <Option value={item.lead_id}>
                            {item.lead_customer_name}
                          </Option>
                        );
                      })}
                    </SelectBox>
            </div>
          </div>

          {/* <div className="col-1 pt-3 d-flex justify-content-end">To</div> */}
          <div className="col-sm-3 col-6">
            <label>Job</label>
            <div className="mt-2">
            <SelectBox
                      name="Job"
                      defaultValue="null"
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                    //   className="w-100 select_box"
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e)}
                    >
                      <Option value="null">All</Option>
                      {jobList?.map((item)=> {
                        return <Option value={item.job_id}>{item.job_number}</Option>;
                      })}
                    </SelectBox>
            </div>
          </div>
          <div className="col-sm-3 d-flex mt-4 pt-1 px-2 justify-content-center gap-3">
            <div>
              <Button btnType="save" onClick={SearchBydate}>
                Search
              </Button>
            </div>
          </div>

          {/* <div className="col-sm-1 mt-4  pt-3d-flex justify-content-center">
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFileExcel />
            </a>
          </li>
          </div> */}
        </div>
      </div>
      <div className="container-fluid container_agent_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={reportData}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
    </>
  );
}
