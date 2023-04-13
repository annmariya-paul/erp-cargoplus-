import "./awbblReport.scss";
import { Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select, Form } from "antd";
import moment from "moment";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";
import { ACCOUNTS, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { FaFileExcel } from "react-icons/fa";
import InputType from "../../../components/Input Type textbox/InputType";
import { CRM_BASE_URL } from "../../../api/bootapi";
export default function AwbblReport() {
  const { Option } = Select;
  const [serialNo, setserialNo] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedJob, setSelectedJob] = useState();
  const [allagents, setAllagents] = useState("");
  const [selectedAgent, setSelectedAgent] = useState();
  console.log("selectagent", selectedAgent);
  const [totalCount, setTotalcount] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reportData, setReportData] = useState([]);
  console.log("dataaaa", reportData);
  const [allLeadList, setAllLeadList] = useState([]);
  console.log("all cuss", allLeadList);

  const [currentcount, setCurrentcount] = useState();
  const [jobList, setJobList] = useState();
  const [customerList, setCustomerList] = useState();
  const [allReports, setAllReports] = useState();
  console.log("all dattta",allReports);

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
      dataIndex: "job_date",
      key: "job_date",
      width: "10%",
      align: "left",
      render: (data, index) => {
        return <div>{moment(index.job_date).format("DD-MM-YYYY")}</div>;
      },
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
  const data12 = allReports?.map((item) => [
    // item.action,
    item.sl_no,
    item.customer,
    item.job_no,
    item.date,
    item.awbblno,
    item.salesperson,
  ]);

  const EnquiryHeads = [
    ["sl_no", "customer", "job_no", "date", "awbblno", "sales_person"],
  ];
  const columnsKeys = columns.map((column) => column.key);
  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );

  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  // const getCustomerList = async () => {
  //   try {
  //     const customerList = await PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/customers`
  //     );
  //     if (customerList?.status === 200) {
  //       setCustomerList(customerList?.data.data);
  //     }
  //   } catch (err) {
  //     console.log("Error While fetching customer list");
  //   }
  // };

  const getJobList = async (e) => {
    if (e === "null") e = null;
    try {
      const jobList = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/jobs`,
        {
          customerId: e,
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
    // getCustomerList();
    getJobList(null);
  }, []);
  const GetAllLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        console.log("response data", res);
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          setAllLeadList(res.data.data);
        }
      })

      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };
  useEffect(() => {
    GetAllLeadData();
  }, []);
  const SearchReport = (data) => {
    let data1 = {
      awb_bl_no: data.awb_bl_no,
      customer: data.customer,
      job_no: data.job_no,
    };
    PublicFetch.post(`${CRM_BASE_URL_FMS}/reports/awb-bl`, data1)
      .then((res) => {
        console.log("Responseqq", res);
        if (res.data.success) {
          console.log("success of response of repooorts", res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            temp.push({
              awb_bl_no: item.job_awb_bl_no,
              job_no: item.job_number,
              customer: item?.crm_v1_customer?.customer_name,
              job_date:item?.job_date,

            });
          });
          setAllReports(temp);
          console.log("deu", temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

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
            {allReports && (
              <Leadlist_Icons
                datas={allReports}
                columns={filteredColumns}
                items={data12}
                xlheading={EnquiryHeads}
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
                name="AWBBL Report"
              />
            )}
            {/* </a>
            </li> */}
          </div>
        </div>
        <Form
          onFinish={(value) => {
            console.log("submitted values", value);
            SearchReport(value);
          }}
        >
          <div className="row">
            <div className="col-sm-3 col-12">
              {/* <p className={`${styles.dateTop} mt-4`}></p> */}
              <lable>AWB/BL NO</lable>
              <div className="mt-2">
                <Form.Item name="awb_bl_no">
                  <InputType />
                </Form.Item>
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
                <Form.Item name="customer">
                  <SelectBox
                    name="customer"
                    defaultValue="null"
                    allowClear={true}
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                    }}
                    //   className="w-100 select_box"
                    value={selectedCustomer}
                    onChange={(e) => {
                      setSelectedJob("null");
                      setSelectedCustomer(e);
                      getJobList(e);
                    }}
                  >
                    {/* <Option value="null">All</Option> */}
                    {/* {allLeadList?.map((item) => { */}
                    {allLeadList &&
                      allLeadList.length > 0 &&
                      allLeadList.map((item, index) => {
                        // console.log(index, "Items inside map");
                        return (
                          <Select.Option
                            key={item.customer_id}
                            value={item.customer_id}
                          >
                            {item.customer_name}
                          </Select.Option>
                        );
                      })}
                  </SelectBox>
                </Form.Item>
              </div>
            </div>

            {/* <div className="col-1 pt-3 d-flex justify-content-end">To</div> */}
            <div className="col-sm-3 col-6">
              <label>Job</label>
              <div className="mt-2">
                <Form.Item name="job_no">
                  <SelectBox
                    defaultValue="null"
                    allowClear={true}
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                    }}
                    //   className="w-100 select_box"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e)}
                  >
                    {jobList &&
                      jobList.length > 0 &&
                      jobList.map((item, index) => {
                        return (
                          <Select.Option key={item.job_id} value={item.job_number}>
                            {item.job_number}
                          </Select.Option>
                        );
                      })}
                  </SelectBox>
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-3 d-flex mt-4 pt-1 px-2 justify-content-center gap-3">
              <div>
                <Button btnType="save" type="submit">
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
        </Form>
      </div>
      <div className="container-fluid container_agent_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allReports}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
    </>
  );
}
