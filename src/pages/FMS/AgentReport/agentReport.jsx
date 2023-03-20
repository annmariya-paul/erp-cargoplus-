import "./agentReport.scss";
import React, { useState,useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";
import { ACCOUNTS, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { FaFileExcel } from "react-icons/fa";

export default function AgentReport() {
  const [serialNo, setserialNo] = useState(1);
  const [allagents,setAllagents]= useState("")
  const [selectedAgent,setSelectedAgent] = useState();
  console.log("selectagent", selectedAgent);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reportData,setReportData] = useState();
  console.log("dataaaa",reportData);

  const getallagents = async () => {
    try {
      const allagents = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/agents`
      );
      console.log("getting all agent details", allagents.data.data);
      setAllagents(allagents.data.data)
    
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
         console.log("Success Data", res.data.data);
         //  setReportData(res.data.data);
         //  setSuccessPopup(true);
         //  close_modal(successPopup, 1200);
         //  addForm.resetFields();
         //  setModalAddCurrency(false);
         //  getAllCurrency();
         let array = [];
         res?.data?.data?.forEach((i, index) => {
          i?.fms_v1_job_agents?.forEach((item,index)=>{
          console.log("iii", item);
           array.push({
             job_no: item?.fms_v1_jobs.job_number,
             customer: item?.fms_v1_jobs.crm_v1_leads.lead_customer_name,
             currency:
               item?.fms_v1_jobs.generalsettings_v1_currency.currency_name,
             totalcost_fx: item?.fms_v1_jobs.job_total_cost_amountfx,
             totalcost_lx: item?.fms_v1_jobs.job_total_exp_amountlx,
           });
          });
         });
         setReportData(array);
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
      align: "center",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
      width: "18%",
    },
    {
      title: "TOTAL COST (Fx)",
      dataIndex: "totalcost_fx",
      key: "totalcost_fx",
      align: "center",
      width: "16%",
    },
    {
      title: "TOTAL COST (Lx)",
      dataIndex: "totalcost_lx",
      key: "totalcost_lx",
      align: "center",
      width: "16%",
    },
  ];
  const data = [
    {
      job_no: "00111",
      customer: "Test",
      currency: "US Dollar",
      totalcost_fx: "7675",
      totalcost_lx: "9877",
    },
  ];



  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className=" d-flex justify-content-between">
          <div>
            <h5 className="lead_text">Agent Report</h5>
          </div>

          <div className="icon_margin">
            <li className="icon-border">
              <a className="icon icon_color" href="#">
                <FaFileExcel />
              </a>
            </li>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-12">
            <lable>Agent</lable>
            {/* <Form.Item
                    name="job_no"
                    // onChange={(e) => setName(e.target.value)}
                  > */}
            <SelectBox
              showSearch={true}
              allowClear
              //  value={vendortyp}
              optionFilterProp="children"
              //  onChange={(e) => {
              //    setvendortyp(e);
              //  }}
              onChange={(e) => setSelectedAgent(e)}
            >
              {allagents &&
                allagents.length > 0 &&
                allagents.map((itm, indx) => {
                  console.log("agent namee", itm);
                  return (
                    <Select.Option
                      key={itm.agent_id}
                      id={itm.agent_id}
                      value={itm.agent_id}
                    >
                      {itm.crm_v1_vendors.vendor_name}
                    </Select.Option>
                  );
                })}
            </SelectBox>
            {/* </Form.Item> */}
          </div>

          <div className="col-sm-3 col-6">
            <label>Date From</label>
            <div className="mt-2">
              <DatePicker
                format={"DD-MM-YYYY"}
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e)}
              />
            </div>
          </div>

          {/* <div className="col-1 pt-3 d-flex justify-content-end">To</div> */}
          <div className="col-sm-3 col-6">
            <label>To</label>
            <div className="mt-2">
              <DatePicker
                format={"DD-MM-YYYY"}
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e)}
              />
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
