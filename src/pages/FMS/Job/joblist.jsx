import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Popconfirm } from "antd";
import TableData from "../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Button from "../../../components/button/button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import moment from "moment";
import MyPagination from "../../../components/Pagination/MyPagination";
import { JobStatus } from "../../../utils/SelectOptions";
import { Checkbox } from "antd";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import Custom_model from "../../../components/custom_modal/custom_model";
import { GiCancel } from "react-icons/gi";
function Listjob() {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [searchedNo, setSearchedNo] = useState("");
  const navigate = useNavigate();
  // const [searchedText, setSearchedText] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [jobStatus, setJobStatus] = useState(JobStatus);
  const [startcount, setstartcount] = useState();
  const [noofItems, setNoofItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [cancelPopup, setCancelPopup] = useState(false);
  const [totaljob, settotaljob] = useState("");
  const [serialNo, setserialNo] = useState(1);

  const [quatationList, setQuatationList] = useState([]);
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => {
        return <div>{item?.startindex + index + serialNo}</div>;
      },
      align: "center",
    },

    {
      title: "JOB NO",
      dataIndex: "job_number",
      key: "job_number",
      width: "10%",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.job_number)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.job_date).toLowerCase().includes(value.toLowerCase()) ||
      //     String(record.job_awb_bl_no)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.job_consignee_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.job_shipper)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.job_status).toLowerCase().includes(value.toLowerCase())
      //   );
      // },
      align: "left",
    },
    {
      title: "DATE",
      dataIndex: "job_date",
      key: "job_date",
      width: "9%",
      align: "left",
    },
    {
      title: "AWB/BL",
      dataIndex: "job_awb_bl_no",
      key: "job_awb_bl_no",
      width: "9%",
      // filteredValue: [searchedNo],
      // onFilter: (value, record) => {
      //   return String(record.job_awb_bl_no)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "CONSIGNEE",
      dataIndex: "job_consignee_name",
      key: "job_consignee_name",
      // filteredValue: [searchName],
      // onFilter: (value, record) => {
      //   return String(record.job_consignee_name)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
    },
    {
      title: "SHIPPER",
      dataIndex: "job_shipper",
      key: "job_shipper",
      width: "14%",
    },
    {
      title: "STATUS",
      dataIndex: "job_status",
      key: "job_status",
      render: (data, index) => {
        console.log("index of job status", index);
        if (index.job_status === 0) {
          return <div>Pending</div>;
        } else if (index.job_status === 1) {
          return <div>Converted</div>;
        } else {
          // return <div>{index.enquiry_converted_status}</div>;
          return <div>Cancelled</div>;
        }
      },
      width: "5%",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "8%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2 me-2">
            <div
              className="editIcon m-0 "
              onClick={() => {
                navigate(`${ROUTES.UPDATEJOB}/${index.job_id}`);
              }}
            >
              <Link>
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
              <Popconfirm
                title={`Are you sure you want to Cancel Quotation `}
                onConfirm={() => {
                  cancelJob(index?.job_id);
                }}
              >
                <GiCancel style={{ marginRight: 18 }} />
              </Popconfirm>
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "key",
      width: "16%",
      render: (data, index) => {
        console.log("index is new:", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2 me-2">
            <div
              className="editIcon m-0 "
              //   onClick={() => {
              //     navigate(`/edit_quotation`);
              //   }}
            >
              {/* <Link to={ROUTES.TASKANDEXPENSES } style={{ color: "white" }}> */}
              <Button
                btnType="save"
                className="assign_btn"
                onClick={() => {
                  navigate(`${ROUTES.TASKANDEXPENSES}/${index.job_id}`);
                }}
              >
                {" "}
                Tasks & Expenses
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const [AllJobs, setAllJobs] = useState();
  const getAllJobs = (query) => {
    PublicFetch.get(
      `${CRM_BASE_URL_FMS}/job?startIndex=${pageofIndex}&noOfItems=${noofItems}&search=${
        query.toLowerCase() === "pending"
          ? 0
          : query.toLowerCase() === "converted"
          ? 1
          : query.toLowerCase() === "cancelled"
          ? 2
          : query.toLowerCase()
      }`
    )
      .then((res) => {
        console.log("Responseeee", res);
        if (res.data.success) {
          console.log("success of job", res.data.data);
          // setTotalcount(res?.data?.data?.enquiryCount);
          setstartcount(res?.data?.data?.startIndex);
          let temp = [];
          res?.data?.data?.job?.forEach((item, index) => {
            let date = moment(item.job_date).format("DD-MM-YYYY");
            // jobStatus.forEach((status, index) => {
            // var jobsts = parseInt(status.value);
            // if (jobsts === item.job_status) {
            temp.push({
              job_number: item.job_number,
              // quotation_carrier: item.quotation_carrier,
              job_id: item.job_id,
              job_consignee: item.job_consignee,
              job_consignee_name: item.crm_v1_customer.customer_name,
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
              // job_status: item.job_invoice_status === 0 ? "Pending" :item.job_invoice_status === 1 ? "Converted" : item.job_invoice_status === 2 && "Cancelled" ,
              job_status: item.job_invoice_status,
              startindex: res?.data?.data?.startIndex,
            });
            // }
            // });
          });
          setAllJobs(temp);
          settotaljob(res.data.data.totalCount);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totaljob / noofItems);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totaljob;
    return total;
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  };

  const cancelJob = (data) => {
    if (data) {
      PublicFetch.delete(`${CRM_BASE_URL_FMS}/job/${data}`)
        .then((res) => {
          console.log("Response from job delete");
          if (res.data.success) {
            console.log("success from job delete");
            setCancelPopup(true);
            getAllJobs(searchedText);
            setTimeout(() => {
              setCancelPopup(false);
            }, 1200);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      getAllJobs(searchedText);
    }, 1000);
    return () => clearTimeout(getData);
  }, [pageofIndex, noofItems, searchedText]);

  // useEffect(() => {
  //   getAllJobs(searchedText);
  // }, [pageofIndex,noofItems,searchedText]);

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  const data12 = quatationList?.map((item) => [
    item.action,
    item.opportunity_type,
    item.opportunity_from,
    item.opportunity_lead_id,
    item.opportunity_source,
    item.opportunity_party,
  ]);
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
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col-4">
            <h5 className="lead_text">Job</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search"
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
          <div className="col-4 d-flex justify-content-end">
            <Leadlist_Icons
              datas={quatationList}
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
          </div>
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}> */}

        {/* <div className="col-4">
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
          </div> */}
        {/* </div> */}
        <div className="row my-3">
          <div className="col-xl-4  ">
            <div className="d-flex justify-content-start align-items-center gap-3">
              {totaljob > 0 && (
                <div className="   ">
                  <Select
                    bordered={false}
                    className="page_size_style"
                    value={noofItems}
                    onChange={(e) => setNoofItems(e)}
                  >
                    <Select.Option value="25">
                      <span style={{ color: "#2f6b8f" }} className="ms-1">
                        25
                      </span>
                    </Select.Option>
                    <Select.Option value="50">
                      <span style={{ color: "#2f6b8f" }} className="ms-1">
                        50
                      </span>
                    </Select.Option>
                    <Select.Option value="100">
                      <span style={{ color: "#2f6b8f" }} className="ms-1">
                        100
                      </span>
                    </Select.Option>
                  </Select>
                </div>
              )}
              {totaljob > 0 && (
                <div className=" d-flex  align-items-center mt-2">
                  <label className="font_size">
                    Results: {startcount + 1} -{" "}
                    {getFinalCount(1 * noofItems * current)}{" "}
                    <span>of {totaljob} </span>{" "}
                  </label>
                </div>
              )}
              <div className=" col-4 d-flex py-2 justify-content-center "></div>
            </div>
          </div>

          <div className="col-4 d-flex py-2 justify-content-center">
            {/* {totaljob > 0 && (
              <MyPagination
                total={parseInt(totaljob)}
                current={current}
                pageSize={noofItems}
                // defaultPageSize={noofItems}
                showSizeChanger={false}
                onChange={(current, pageSize) => {
                  console.log("page index isss", pageSize);
                  setCurrent(current);
                  // setPageSize(pageSize);
                  // setNoofItems(pageSize);
                  // setCurrent(noofItems !== pageSize ? 0 : current);
                }}
              />
            )} */}
            {totaljob > 0 && (
              <MyPagination
                total={parseInt(totaljob)}
                // total={parseInt(AllEnquiries)}
                current={current}
                pageSize={noofItems}
                // defaultPageSize={noofItems}
                showSizeChanger={false}
                onChange={(current, pageSize) => {
                  console.log("page index isss", pageSize);
                  setCurrent(current);
                  // setPageSize(pageSize);
                  // setNoofItems(pageSize);
                  // setCurrent(noofItems !== pageSize ? 0 : current);
                }}
              />
            )}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <div className="col mb-2 px-4">
              <Link to={ROUTES.CREATEJOB} style={{ color: "white" }}>
                <Button btnType="add">New Job</Button>
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

        <div className="d-flex justify-content-center ">
          {totaljob > 0 && (
            <MyPagination
              total={parseInt(totaljob)}
              current={current}
              pageSize={noofItems}
              // defaultPageSize={noofItems}
              showSizeChanger={false}
              onChange={(current, pageSize) => {
                console.log("page index isss", pageSize);
                setCurrent(current);
              }}
            />
          )}
        </div>
      </div>
      <Custom_model
        cancel
        cancelName={"Job"}
        show={cancelPopup}
        onHide={() => {
          setCancelPopup(false);
        }}
      />
    </>
  );
}
export default Listjob;
