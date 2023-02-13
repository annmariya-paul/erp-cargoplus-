import { Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import moment from "moment";
import { MdDelete } from "react-icons/md";

function InvoiceList() {
  const [oppnew, setOppnew] = useState([]);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input

  const data = [
    {
      invoice_no: 12234444,
      invoice_date: "23/03/2023",
    },
  ];

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            <div className="editcolor">
              <FaEdit
                onClick={() => {
                  if (
                    index.assigned_employee &&
                    index.assigned_employee.length > 0
                  ) {
                    //   handleEditedclick(index)
                  }
                }}
              />
            </div>
            <div className="editcolor">
              {/* <MdPageview
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => {}}
              /> */}
              <MdDelete />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "INVOICE NO",
      dataIndex: "invoice_no",
      key: "invoice_no",
      width: "12%",
      // align: "center",
    },
    {
      title: "DATE",
      dataIndex: "invoice_date",
      key: "invoice_date",
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
      title: "JOB NO",
      dataIndex: "lead_customer_name",
      key: "lead_customer_name",
      width: "15%",
      //  filteredValue: [searchLead],
      onFilter: (value, record) => {
        return String(record.opportunity_from)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },

    {
      title: "CONSIGNEE",
      dataIndex: "opportunity_source",
      key: "SOURCE",
      width: "15%",
      //  filteredValue: [searchSource],
      onFilter: (value, record) => {
        return String(record.opportunity_source)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "SHIPPER",
      dataIndex: "opportunity_party",
      key: "PARTY",
      width: "15%",
      // align: "center",
    },
    {
      title: "STATUS",
      dataIndex: "opportunity_party",
      key: "PARTY",
      width: "15%",
      // align: "center",
    },
    {
      title: "",
      dataIndex: "buttons",
      width: "17%",
      key: "buttons",
      align: "center",
      // display:"flex",
      render: (data, index) => {
        console.log("table data", index);
        return (
          <div className="d-flex justify-content-center p-1">
            {/* {index.assigned_employee && index.assigned_employee.length > 0 ? ( */}
            <div>
              <Button
                btnType="add"
                className="me-1 view_btn"
                onClick={() => {
                  //    handleEditedclick(index);
                }}
              >
                Print
              </Button>
            </div>
            {/* ) : ( */}
            {/* <div>
              <Button
                btnType="add"
                className="me-1 assign_btn"
                onClick={() => {
                  //    navigate(
                  //      `${ROUTES.ASSIGN_OPPORTUNITIES}/${index.opportunity_id}`
                  //    );
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
                  //  navigate(
                  //    `${ROUTES.AGENT_RESPONSE}/${index.opportunity_id}`
                  //  );
                }}
              >
                Response
              </Button>
            </div> */}
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "buttons",
      width: "17%",
      key: "buttons",
      align: "center",
      // display:"flex",
      render: (data, index) => {
        console.log("table data", index);
        return (
          <div className="d-flex justify-content-center p-1">
            {/* {index.assigned_employee && index.assigned_employee.length > 0 ? ( */}
            <div>
              <Button
                btnType="add"
                className="me-1 view_btn"
                onClick={() => {
                  //    handleEditedclick(index);
                }}
              >
                cancel
              </Button>
            </div>
            {/* ) : ( */}
          </div>
        );
      },
    },
  ];

  //   const columnsKeys = columns.map((column) => column.key);

  //   const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  //   const filteredColumns = columns.filter((column) =>
  //     selectedColumns.includes(column.key)
  //   );
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
                    <h5 className="lead_text">Invoices</h5>
                  </div>

                  {/* <Leadlist_Icons
                  // datas={OpportunityList}
                  // columns={columns}
                  // items={data12}
                  // xlheading={OppHeads}
                  // filename="data.csv"
                  // chechboxes={
                  //   <Checkbox.Group
                  //     onChange={onChange}
                  //     value={selectedColumns}
                  //   >
                  //     {columnsKeys.map((column) => (
                  //       <li>
                  //         <Checkbox value={column} key={column}>
                  //           {column}
                  //         </Checkbox>
                  //       </li>
                  //     ))}
                  //   </Checkbox.Group>
                  // }
                  /> */}
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
                  {/* <div className="col-3">
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
                        // setSearchType(event ? [event] : []);
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
                        // setSearchType(event ? [event] : []);
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
                        // setsearchLead(event ? [event] : []);
                      }}
                    >
                      <Select.Option value="L">Lead</Select.Option>
                      <Select.Option value="C">Customer</Select.Option>
                    </Select>
                  </div> */}
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
                    {/* <MyPagination
                    //   total={parseInt(totalCount)}
                    //   current={current}
                    //   pageSize={numOfItems}
                    //   onChange={(current, pageSize) => {
                    //     setCurrent(current);
                    //   }}
                    /> */}
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
                    data={data}
                    // data={allLeadList}
                    // data={OpportunityList}
                    columns={columns}
                    custom_table_css="table_lead_list"
                  />
                </div>
                <div className="d-flex py-2 justify-content-center">
                  {/* <MyPagination
                  // total={parseInt(totalCount)}
                  // current={current}
                  // pageSize={numOfItems}
                  // onChange={(current, pageSize) => {
                  //   setCurrent(current);
                  // }}
                  /> */}
                </div>
                {/* {"mcncncncncncncnc"} */}
              </div>

              {/*  {/* {View model of opportunity  section Two    }  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceList;
