import { Checkbox, Input, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/button";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import {
  LeadType,
  LeadStatus,
  LeadOrganization,
} from "../../../../utils/SelectOptions";

function EnquiryList() {
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [noofItems, setNoofItems] = useState("25");
  const [totalCount, setTotalcount] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [current, setCurrent] = useState(1);
  const [allLeadList, setAllLeadList] = useState([]);
  const [serialNo, setserialNo] = useState(1);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "NAME",
      dataIndex: "customer_name",
      key: "customer_name",
      // width: "23%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.customer_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "CONTACT PERSON",
      dataIndex: "contact_person",
      key: "contact_person",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "PHONE",
      dataIndex: "customer_phone",
      key: "customer_phone",
      // width: "23%",
      align: "left",
    },

    {
      title: "EMAIL",
      dataIndex: "customer_email",
      key: "customer_email",
      // width: "23%",
      align: "ledt",
    },

    {
      title: "CREDIT DAYS",
      dataIndex: "customer_credit_days",
      key: "customer_credit_days",
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return String(record.lead_status)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "center",
    },
    {
      title: "OPPORTUNITY",
      dataIndex: "opportunity",
      key: "opportunity",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.lead_status)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },

    {
      title: "JOBS",
      dataIndex: "jobs",
      key: "jobs",
      // width: "23%",
      align: "ledt",
    },

    {
      title: "INVOICE AMT",
      dataIndex: "invoice_amt",
      key: "invoice_amt",
      // width: "23%",
      align: "ledt",
    },
    {
      title: "DUE AMOUNT",
      dataIndex: "due_amt",
      key: "due_amt",
      // width: "23%",
      align: "ledt",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      // width: "14%",

      render: (data, index) => {
        // console.log("id is : ",index.lead_id);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <Link
                to={`${ROUTES.CUSTOMER_EDIT}/${index.customer_id}`}
                className="editcolor"
              >
                <FaEdit />
              </Link>{" "}
            </div>

            <div className="actionView m-0">
              <div
                className="editcolor"
                onClick={
                  () => {}
                  //   handleViewData(index)
                }
              >
                <MdPageview />
              </div>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className=" ">
            <div className="row flex-wrap">
              <div className="col">
                <h5 className="lead_text">Enquiry</h5>
              </div>
              {/* <Leadlist_Icons
              // datas={allLeadList}
              // columns={filteredColumns}
              // items={data12}
              // xlheading={LeadHeads}
              // filename="data.csv"
              // chechboxes={
              //   <Checkbox.Group onChange={onChange} value={selectedColumns}>
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
            <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              <div className="col-4">
                <Input.Search
                  placeholder="Search by Name"
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
              {/* <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by Type"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
              >
                <Select.Option value="L">Lead</Select.Option>
                <Select.Option value="C">Customer</Select.Option>
              </Select>
            </div> */}
              <div className="col-4">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                  placeholder="Search by status"
                  className="select_search"
                  optionFilterProp="children"
                  onChange={(event) => {
                    setSearchStatus(event ? [event] : []);
                  }}
                >
                  {/* {LeadStatus &&
                    LeadStatus.map((item, index) => {
                      return (
                        <Select.Option key={item.id} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })} */}
                </Select>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-4 px-3">
                <Select
                  // defaultValue={"25"}
                  bordered={false}
                  className="page_size_style"
                  value={noofItems}
                  // onChange={handleLastNameChange}
                  onChange={(event, current) => {
                    console.log("On page size selected : ", event);
                    console.log("nfjnjfv", current);
                    setNoofItems(event);
                    setCurrent(1);
                  }}
                >
                  {/* <Select.Option value="5">5 | pages</Select.Option> */}
                  {/* <Select.Option value="10">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    10
                  </span>
                </Select.Option> */}
                  <Select.Option value="25">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      25
                    </span>
                  </Select.Option>
                  <Select.Option value="50">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      50
                    </span>
                  </Select.Option>
                  <Select.Option value="100">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      100
                    </span>{" "}
                  </Select.Option>
                </Select>
              </div>
              <div className="col-4 d-flex py-2 justify-content-center">
                <MyPagination
                  total={parseInt(totalCount)}
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
              </div>
              <div className="col-4 d-flex justify-content-end">
                <Link to={ROUTES.CREATE_ENQUIRY}>
                  <Button
                    btnType="add"
                    // className="add_opportunity"
                  >
                    Add Enquiry
                  </Button>
                </Link>
              </div>
            </div>
            <div className="datatable">
              <TableData
                // data={getData(numofItemsTo, pageofIndex)}
                data={allLeadList}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
            <div className="d-flex py-2 justify-content-center">
              {totalCount > 0 && (
                <MyPagination
                  total={parseInt(totalCount)}
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

            {/* <Custom_model
              show={modalViewLead}
              onHide={() => setModalViewLead(false)}
              View_list
              list_content={
                <>
                  <div className="container-fluid p-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="lead_text">Lead</h5>
                      </div>
                    </div>

                    <div className="mt-2">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>Type</td>
                            <td>:</td>
                            <td>{viewLead.type}</td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>{viewLead.lead_name}</td>
                          </tr>
                          <tr>
                            <td>User Type</td>
                            <td>:</td>
                            <td>{viewLead.user_type}</td>
                          </tr>
                          <tr>
                            <td>Organisation</td>
                            <td>:</td>
                            <td>{viewLead.organisation}</td>
                          </tr>
                          <tr>
                            <td>Source</td>
                            <td>:</td>
                            <td>{viewLead.source}</td>
                          </tr>
                          <tr>
                            <td>Attachments</td>
                            <td>:</td>
                            <td className="lead_text">
                              {viewLead.attachments}
                            </td>
                          </tr>
                          <tr>
                            <td>Description</td>
                            <td>:</td>
                            <td>{viewLead.description}</td>
                          </tr>
                          <tr>
                            <td>Lead Status</td>
                            <td>:</td>
                            <td>{viewLead.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              }
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryList;
