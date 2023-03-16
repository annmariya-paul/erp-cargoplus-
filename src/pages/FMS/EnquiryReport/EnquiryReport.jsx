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
import "../AgentReport/agentReport.scss"
function EnquiryReport() {
  const [serialNo, setserialNo] = useState(1);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [allEnquiryNo, setAllEmquiryNo] = useState();
  const [isAllenquires, setIsAllEnquires] = useState(false);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "ENQUIRY NO",
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
      title: "ENQUIRY DATE",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "VALIDITY DATE",
      dataIndex: "currency",
      key: "currency",
      width: "18%",
    },
    {
      title: "STATUS",
      dataIndex: "totalcost_fx",
      key: "totalcost_fx",
      align: "center",
      width: "16%",
    },
    {
      title: "LEAD",
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

  const allEnquirys = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/Minimal`)
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

  const handleAllSelected = () => {
    setIsAllEnquires(true);
  };

  useEffect(() => {
    allEnquirys();
  }, []);

  return (
    <div>
      <div className="container-fluid container_agent_report p-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between py-3">
              <div>
              <h5 className="lead_text">Enquiry Report</h5>
              </div>
              <div className={`p-0`} >
            <li className="icon-border">
            <a className= {` icon  icon_color`} href="#">
              <FaFileExcel  />
            </a>
          </li>
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
                      <SelectBox defaultValue={"All"} className="w-100">
                        <Select.Option value="All">All</Select.Option>
                        {allEnquiryNo &&
                          allEnquiryNo.length > 0 &&
                          allEnquiryNo.map((item, index) => {
                            return (
                              <Select.Option key={item.quotation_id}>
                                {item.quotation_no}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="col-xl-3">
                    <label className="mb-2">Date From</label>
                    <DatePicker />
                  </div>
                  <div className="col-xl-3">
                    <label className="mb-2">Date To</label>
                    <DatePicker />
                  </div>
                  <div className="col-xl-3">
                    <label>Status</label>
                    <SelectBox>
                      <Select.Option>pending</Select.Option>
                      <Select.Option>converted</Select.Option>
                      <Select.Option>mixing</Select.Option>
                    </SelectBox>
                  </div>
                  <div className="col-xl-12 d-flex justify-content-center align-items-center gap-4 pt-4">
                    {/* <label>Status</label> */}
                    <div>

                    <Button className="p-2" btnType="add">
                      Search
                    </Button>
                    </div>
                   
           

                  </div>
                </div>
              </div>
            </div>
            {isAllenquires ? (
              <div className="row ">
                <div className="col-4 mt-4">
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
                {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
                <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
                  <div className="">
                    {/* <Link to={ROUTES.CREATE_EXPENSE} style={{ color: "white" }}>
                    <Button btnType="save">Add Daily Expense</Button>
                  </Link> */}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="row ">
              <div className="col-12">
                <TableData columns={columns} data={data} />
              </div>
              {isAllenquires ? (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryReport;
