import "./agentReport.scss";
import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";
import { ACCOUNTS, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { FaFileExcel } from "react-icons/fa";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import PageSizer from "../../../components/PageSizer/PageSizer";
import MyPagination from "../../../components/Pagination/MyPagination";

export default function AgentReport() {
  const [serialNo, setserialNo] = useState(1);
  const [allagents, setAllagents] = useState("");
  const [selectedAgent, setSelectedAgent] = useState();
  console.log("selectagent", selectedAgent);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reportData, setReportData] = useState();
  const [pageSize, setPageSize] = useState(localStorage.getItem("noofitem"));
  const [current, setCurrent] = useState(1); 
  console.log("dataaaa", reportData);

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
      align: "right",
      width: "16%",
    },
    {
      title: "TOTAL COST (Lx)",
      dataIndex: "totalcost_lx",
      key: "totalcost_lx",
      align: "right",
      width: "16%",
    },
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "JOB NO",
      "CUSTOMER",
      "CURRENCY",
      "TOTAL COST (Fx)",
      "TOTAL COST (Lx)",
    ],
  ];
  //for pdf download
  const data12 = reportData?.map((item, index) => [
    index + serialNo,
    item.job_no,
    item.customer,
    item.currency,
    item.totalcost_fx,
    item.totalcost_lx,
  ]);

  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className=" d-flex justify-content-between">
          <div>
            <h5 className="lead_text">Agent Report</h5>
          </div>

          <div className="icon_margin1">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
          {/* <li className="icon-border">
            <a className="icon icon_color" href="#">
              <FaFileExcel />
            </a>
          </li> */}
        </div>
        <div className="row">
          <div className="col-sm-3 mt-2 col-12">
            <lable>Agent</lable>
            {/* <Form.Item
                    name="job_no"
                    // onChange={(e) => setName(e.target.value)}
                  > */}
            <SelectBox
              showSearch={true}
              allowClear
              optionFilterProp="children"
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


        <div className="row">
              <div className="col-xl-4">
            <div className="d-flex justify-content-start align-items-center gap-3">
           
              <div className="  ">
            
             <PageSizer/>
              </div>
         
            
              <div className=" d-flex  align-items-center mt-2 ">
                <label className="font_size">
                  {/* Results: {  + 1} -
                  {getFinalCount(1 * numOfItems * current)}{" "}
                  <span>of {totalCount} </span>{" "} */}
                </label>
              </div>
            
            </div>
             </div>
             <div className="col-xl-4 d-flex  align-items-center justify-content-center">
            {reportData &&(
            <MyPagination
              total={parseInt(reportData?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                console.log("page index isss", pageSize);
                setCurrent(current);
              }}
              // onChange={(current, pageSize) => {
              //   setCurrent(current);
              //   setPageSize(pageSize);
              // }}
            />
            )} 
      
          </div>

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
