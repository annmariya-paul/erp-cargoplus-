import { Checkbox, Select } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import CustomModel from "../../../../components/custom_modal/custom_model";

function Enquiries() {
  const navigate = useNavigate();
  const [numOfItems, setNumOfItems] = useState("25");
  const [pageSize, setPageSize] = useState(0); // page size
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchLead, setsearchLead] = useState(""); //search by status select box
  const [showViewModal, setShowViewModal] = useState(false); //oppertunity view modal
  const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
  const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
  const [successPopup, setSuccessPopup] = useState(false); //success popups
  const [date, setDate] = useState(); //for date
  const [showAddOpportunity, setShowAddOpportunity] = useState(false); //adding opportunity
  const [oppId, setOppID] = useState(parseInt());
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
  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);
  const [contact, setContact] = useState([]);
  const [progressResponse, setProgressResponse] = useState("");
  const [progressDetails, setProgressDetails] = useState("");
  const [progressUpdatenextDate, setProgressUpdatenextDate] = useState();
  const [progressUpdatestatus, setProgressUpdatestatus] = useState(5);
  const [isDate, setIsDate] = useState();
  //view progress
  const [tableprogress, setTableprogress] = useState("");
  const [count, setcount] = useState(0);
  const [OpportunityList, setOpportunityList] = useState([]);

  const columns = [
    // {
    //   title: "ACTION",
    //   dataIndex: "action",
    //   key: "ACTION",
    //   width: "15%",
    //   render: (data, index) => {
    //     return (
    //       <div className="d-flex justify-content-center gap-2">
    //         <div className="editcolor">
    //           <FaEdit onClick={() => {
    //             if (index.assigned_employee && index.assigned_employee.length > 0 ){
    //               handleEditedclick(index)
    //             }

    //           }} />
    //         </div>
    //         {/* <div className="editcolor">
    //           <MdPageview
    //             // onClick={()=>viewprogressoppurtunity(index)}
    //             onClick={() => {}}
    //           />
    //         </div> */}
    //       </div>
    //     );
    //   },
    //   align: "center",
    // },
    {
      title: "ENQUIRY NO",
      dataIndex: "opportunity_number",
      key: "opportunity_number",
      width: "12%",
      // align: "center",
    },
    {
      title: "DATE",
      dataIndex: "opportunity_created_at",
      key: "opportunity_created_at",
      width: "10%",
      render: (record) => {
        return (
          <div>
            {moment(record.opportunity_created_at).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      title: "LEAD",
      dataIndex: "lead_customer_name",
      key: "lead_customer_name",
      width: "20%",
      filteredValue: [searchLead],
      onFilter: (value, record) => {
        return String(record.opportunity_from)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },

    {
      title: "SOURCE",
      dataIndex: "opportunity_source",
      key: "SOURCE",
      width: "17%",
      filteredValue: [searchSource],
      onFilter: (value, record) => {
        return String(record.opportunity_source)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "CONTACT PERSON",
      dataIndex: "opportunity_party",
      key: "PARTY",
      width: "25%",
      // align: "center",
    },
    {
      title: "ACTIONS",
      dataIndex: "buttons",
      width: "17%",
      key: "buttons",
      align: "center",
      // display:"flex",
      render: (data, index) => {
        console.log("table data", index);
        return (
          <div className="d-flex justify-content-center p-1">
            {index.assigned_employee && index.assigned_employee.length > 0 ? (
              <div>
                <Button
                  btnType="add"
                  className="me-1 view_btn"
                  onClick={() => {
                    handleEditedclick(index);
                  }}
                >
                  View
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  btnType="add"
                  className="me-1 assign_btn"
                  onClick={() => {
                    navigate(
                      `${ROUTES.ASSIGN_OPPORTUNITIES}/${index.opportunity_id}`
                    );
                  }}
                >
                  Assign
                </Button>
              </div>
            )}
            <div>
              <Button
                btnType="add"
                className="response_btn"
                onClick={() => {
                  navigate(`${ROUTES.AGENT_RESPONSE}/${index.opportunity_id}`);
                }}
              >
                Response
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  const data12 = OpportunityList?.map((item) => [
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
            tempArr.push({
              opportunity_id: item?.opportunity_id,
              opportunity_number: item?.opportunity_number,
              opportunity_type: item?.opportunity_type,
              opportunity_party: item?.crm_v1_contacts?.contact_person_name,
              opportunity_from: item?.opportunity_from,
              lead_customer_name: item?.crm_v1_leads?.lead_customer_name,
              opportunity_created_at: item?.opportunity_created_at,
              opportunity_created_by: item?.opportunity_created_by,
              opportunity_source: item?.opportunity_source,
              opportunity_probability: item?.opportunity_probability,
              opportunity_description: item?.opportunity_description,
              opportunity_amount: item?.opportunity_amount,
              opportunity_status: item?.opportunity_status,
              assigned_employee: item?.assigned_employee,
            });
          });
          console.log("hellooooqqqqq", tempArr);
          setOppnew(tempArr);
          setOpportunityList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          console.log("totalcount iss", res?.data?.data?.totalCount);
          // let samplearry = [];
          // res?.data?.data?.leads.forEach((item, index) => {
          //   samplearry.push(item.opportunity_id);
          // });
          // console.log("pushedd ", samplearry);

          // setOppurtunityid(samplearry);
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
  }, [pageofIndex, numOfItems]);

  const handleEditedclick = (index) => {
    navigate(`${ROUTES.ASSIGN_OPPORTUNITIES}/${index.opportunity_id}`);
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="container-fluid lead_list  my-3 py-3">
              {/* opportunity listing section One */}

              <div>
                <div className="row flex-wrap">
                  <div className="col">
                    <h5 className="lead_text">Opportunities</h5>
                  </div>

                  <Leadlist_Icons
                    datas={OpportunityList}
                    columns={columns}
                    items={data12}
                    xlheading={OppHeads}
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
                </div>
                <div
                  className="row pb-2"
                  style={{ backgroundColor: "#f4f4f7" }}
                >
                  <div className="col-3">
                    <Select
                      allowClear
                      showSearch
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        borderRadius: "5px",
                      }}
                      placeholder="Search by Source"
                      className="select_search"
                      optionFilterProp="children"
                      onChange={(event) => {
                        setSearchSource(event ? [event] : []);
                      }}
                    >
                      <Select.Option value="reference">Reference</Select.Option>
                      <Select.Option value="direct visit">
                        Direct visit
                      </Select.Option>
                      <Select.Option value="online registration">
                        Online Registration
                      </Select.Option>
                    </Select>
                  </div>
                  <div className="col-3">
                    <Select
                      allowClear
                      showSearch
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        borderRadius: "5px",
                      }}
                      placeholder="Search by Type"
                      className="select_search"
                      optionFilterProp="children"
                      onChange={(event) => {
                        setSearchType(event ? [event] : []);
                      }}
                    >
                      <Select.Option value="sales">sales</Select.Option>
                      <Select.Option value="maintenance">
                        Maintenance
                      </Select.Option>
                      <Select.Option value="support">support</Select.Option>
                    </Select>
                  </div>
                  <div className="col-3">
                    <Select
                      allowClear
                      showSearch
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        borderRadius: "5px",
                      }}
                      placeholder="Search by Name"
                      className="select_search"
                      optionFilterProp="children"
                      onChange={(event) => {
                        setSearchType(event ? [event] : []);
                      }}
                    ></Select>
                  </div>
                  <div className="col-3">
                    <Select
                      allowClear
                      showSearch
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        borderRadius: "5px",
                      }}
                      placeholder="Search by From"
                      className="select_search"
                      optionFilterProp="children"
                      onChange={(event) => {
                        setsearchLead(event ? [event] : []);
                      }}
                    >
                      <Select.Option value="L">Lead</Select.Option>
                      <Select.Option value="C">Customer</Select.Option>
                    </Select>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-4   px-3">
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
                  <div className="col-4 d-flex align-items-center justify-content-center">
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
                  <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
                    {/* <Link to={ROUTES.LEADLIST}>
                      <Button btnType="add">Add Opportunity</Button>
                    </Link> */}
                  </div>
                </div>
                <div className="datatable">
                  <TableData
                    data={oppnew}
                    // data={allLeadList}
                    // data={OpportunityList}
                    columns={filteredColumns}
                    custom_table_css="table_lead_list"
                  />
                </div>
                <div className="d-flex py-2 justify-content-center">
                  <MyPagination
                    total={parseInt(totalCount)}
                    current={current}
                    pageSize={numOfItems}
                    onChange={(current, pageSize) => {
                      setCurrent(current);
                    }}
                  />
                </div>
                {/* {"mcncncncncncncnc"} */}
              </div>

              {/*  {/* {View model of opportunity  section Two    }  */}
            </div>
          </div>
        </div>
      </div>

      <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container">
            <div></div>
          </div>
        }
      />
    </div>
  );
}

export default Enquiries;
