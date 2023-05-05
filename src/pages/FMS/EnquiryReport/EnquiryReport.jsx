import { DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaArrowCircleDown, FaArrowDown, FaFileExcel } from "react-icons/fa";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import Button from "../../../components/button/button";
import MyPagination from "../../../components/Pagination/MyPagination";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";
import PublicFetch from "../../../utils/PublicFetch";
import "../AgentReport/agentReport.scss";
import moment from "moment";
import { CRM_BASE_URL } from "../../../api/bootapi";
import { Oppor_Status } from "../../../utils/SelectOptions";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import PageSizer from "../../../components/PageSizer/PageSizer"

function EnquiryReport() {
  const [serialNo, setserialNo] = useState(1);
  const [numOfItems, setNumOfItems] = useState(localStorage.getItem("noofitem"));
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [allEnquiryNo, setAllEmquiryNo] = useState();
  console.log("enquiry", allEnquiryNo);
  const [isAllenquires, setIsAllEnquires] = useState(false);
  const [reportData, setReportData] = useState();
  const [opStatus, setOppStatus] = useState(Oppor_Status);
  console.log(" staopptus", opStatus);
  console.log("reportsss", reportData);

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totalCount / numOfItems);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totalCount;
    return total;
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  };

  const getData = (current, pageSize) => {
    return reportData?.slice((current - 1) * pageSize, current * pageSize);
  };



  
  const data = [
    {
      job_no: "00111",
      customer: "Test",
      currency: "US Dollar",
      totalcost_fx: "7675",
      totalcost_lx: "9877",
    },
  ];

  const allEnquirys = () => {
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/minimal`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success of miniml", res.data.data);
          setAllEmquiryNo(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedEnquiry, setSelectedEnquiry] = useState();
  console.log("selectedEnquiry", selectedEnquiry);
  const [selectedState, setSelectedState] = useState("converted");
  console.log("selectedState", selectedState);
  const SearchBydate = () => {
    let startdate = moment(startDate).format("MM-DD-YYYY");
    let enddate = moment(endDate).format("MM-DD-YYYY");
    PublicFetch.post(`${CRM_BASE_URL_FMS}/reports/enquiry-report`, {
      enquiry_no: selectedEnquiry,
      start_date: startdate,
      end_date: enddate,
      status: selectedState,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success Data", res.data.data);
          setTotalcount(res?.data?.data)
          //  setReportData(res.data.data);
          //  setSuccessPopup(true);
          //  close_modal(successPopup, 1200);
          //  addForm.resetFields();
          //  setModalAddCurrency(false);
          //  getAllCurrency();
          if (res.data.data.length === 0) {
            setReportData("");
          } else {
            let array = [];
            res?.data?.data?.forEach((i, indx) => {
              opStatus.forEach((item, index) => {
                var oppStat = parseInt(item.value);
                console.log("oppStat", oppStat);
                console.log("iii", i.opportunity_status);
                if (oppStat === i.opportunity_status) {
                  array.push({
                    enquiry_no: i?.opportunity_number,
                    enquiry_date: i?.opportunity_created_at,
                    validity_date: i?.opportunity_validity,
                    status: item?.name,
                    customer_id: i?.opportunity_customer_id,
                    customer: i?.crm_v1_leads?.customer_name,
                    slno:   indx+1,
                  });
                  setReportData(array);
                  console.log("temoeray aray", array);
                }
              });
            });
          }
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const handleAllSelected = () => {
    setIsAllEnquires(true);
  };

  useEffect(() => {
    allEnquirys();
    SearchBydate();
  }, []);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
    render: (value, item, index) => {
      console.log("dataaa",item?.slno )
      // <div>{index+1 } </div>
     },
      align: "center",
    },
    {
      title: "ENQUIRY NO",
      dataIndex: "enquiry_no",
      key: "enquiry_no",
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
      title: "ENQUIRY DATE",
      dataIndex: "enquiry_date",
      key: "enquiry_date",
      render: (record) => {
        return <div>{moment(record.enquiry_date).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      title: "VALIDITY DATE",
      dataIndex: "validity_date",
      key: "validity_date",
      width: "18%",
      render: (record) => {
        return <div>{moment(record.validity_date).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      align: "left",
      width: "16%",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
      align: "left",
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
      "ENQUIRY NO",
      "ENQUIRY DATE",
      "VALIDITY DATE",
      "STATUS",
      "CUSTOMER",
    ],
  ];
  //for pdf download
  const data12 = reportData?.map((item, index) => [
    index + serialNo,
    item.enquiry_no,
    item.enquiry_date,
    item.validity_date,
    item.status,
    item.lead,
  ]);




  console.log("totall",totalCount?.length)
  return (
    <div>
      <div className="container-fluid container_agent_report p-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between pb-3">
              <div>
                <h5 className="lead_text">Enquiry Report</h5>
              </div>
              <div className={`p-0`}>
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
            </div>
            <div className="content-tabs-new row justify-content mb-3 ">
              <div className="col-xl-12">
                <div className="row">
                  <div className="col-xl-3 ">
                    <label>Enquiry No</label>
                    {/* <div className="d-flex justify-content-center align-items-center"> */}
                    {/* <div style={{ width: "100px" }} className=" mx-0 mt-2">
                        <Button
                          onClick={() => {
                            handleAllSelected();
                          }}
                          style={{ backgroundColor: "whitesmoke" }}
                          className="p-2 rounded"
                        >
                          All <AiOutlineCaretDown />
                        </Button>
                      </div> */}
                    <div className="w-100 mx-0 ">
                      <SelectBox
                        defaultValue={"All"}
                        className="w-100"
                        onChange={(e) => setSelectedEnquiry(e)}
                      >
                        <Select.Option value="All">All</Select.Option>
                        {allEnquiryNo &&
                          allEnquiryNo.length > 0 &&
                          allEnquiryNo.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.opportunity_id}
                                value={item.opportunity_number}
                              >
                                {item.opportunity_number}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="col-xl-3">
                    <label className="mb-2">Date From</label>
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      placeholder="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e)}
                    />
                  </div>
                  <div className="col-xl-3">
                    <label className="mb-2">Date To</label>
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      placeholder="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e)}
                    />
                  </div>
                  <div className="col-xl-3">
                    <label>Status</label>
                    <SelectBox
                      allowClear={true}
                      defaultValue="converted"
                      onChange={(e) => setSelectedState(e)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="converted">Converted</Select.Option>
                      <Select.Option value="missed">Missed</Select.Option>
                    </SelectBox>
                  </div>
                  <div className="col-xl-12 d-flex justify-content-center align-items-center gap-4 pt-4">
                    {/* <label>Status</label> */}
                    <div>
                      <Button btnType="save" onClick={SearchBydate}>
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
               
              <div className="row">
              <div className="col-xl-4">
            <div className="d-flex justify-content-start align-items-center gap-3">
           
              <div className="  ">
              <PageSizer/>
              </div>
         
              {totalCount > 0 && (
              <div className=" d-flex  align-items-center mt-2 ">
                <label className="font_size">
                  {/* Results: {  + 1} -
                  {getFinalCount(1 * numOfItems * current)}{" "}
                  <span>of {totalCount} </span>{" "} */}
                </label>
              </div>
              )}
            </div>
             </div>
             <div className="col-xl-4 d-flex  align-items-center justify-content-center">
            
            <MyPagination
              total={parseInt(totalCount?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={numOfItems}
              onChange={(current, pageSize) => {
                console.log("page index isss", pageSize);
                setCurrent(current);
              }}
              // onChange={(current, pageSize) => {
              //   setCurrent(current);
              //   setPageSize(pageSize);
              // }}
            />
      
          </div>

              </div>

            </div>
            {/* {isAllenquires ? (
              <div className="row ">
                <div className="col-4 mt-4">
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

                <div className="col-4 d-flex  justify-content-center align-items-center">
                  <MyPagination
                    total={parseInt(totalCount)}
                    current={current}
                    pageSize={numOfItems}
                    onChange={(current, pageSize) => {
                      setCurrent(current);
                    }}
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
                  <div className="">
             
                  </div>
                </div>
              </div>
            ) : (
              ""
            )} */}

            <div className="row ">
              <div className="col-12">
                <TableData 
                //  data={reportData}
                data={getData(current, numOfItems)}
                columns={columns} 
                />
              </div>
              {/* {isAllenquires ? (
                <div className="col-12 d-flex justify-content-center">
                  <MyPagination
                    total={parseInt(totalCount)}
                    current={current}
                    pageSize={numOfItems}
                    onChange={(current, pageSize) => {
                      setCurrent(current);
                    }}
                  />
                </div>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryReport;
