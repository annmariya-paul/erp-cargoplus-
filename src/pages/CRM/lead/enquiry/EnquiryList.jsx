import { Checkbox, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import Button from "../../../../components/button/button";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  LeadType,
  LeadStatus,
  LeadOrganization,
} from "../../../../utils/SelectOptions";
import moment from "moment";

function EnquiryList() {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [noofItems, setNoofItems] = useState("25");
  const [totalCount, setTotalcount] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [current, setCurrent] = useState(1);
  const [allLeadList, setAllLeadList] = useState([]);
  const [serialNo, setserialNo] = useState(1);
  const [AllEnquiries, setAllnquires] = useState();


  const columns = [
    {
      title: "#",
      key: "index",
      width: "4%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "ENQUIRY NO",
      dataIndex: "enquiry_no",
      key: "enquiry_no",
      width: "10%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.enquiry_no)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "DATE",
      dataIndex: "enquiry_date",
      key: "enquiry_date",
      width: "8%",
      align: "left",
      render: (data, index) => {
        return <div>{moment(index.enquiry_date).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      title: "CUSTOMER",
      dataIndex: "enquiry_customer_name",
      key: "enquiry_customer_name",
      width: "22%",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.enquiry_customer_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "CONTACT PERSON",
      dataIndex: "enquiry_contact_person_name",
      key: "enquiry_contact_person_name",
      // width: "13%",
      align: "left",
    },

    {
      title: "EMAIL",
      dataIndex: "contact_email",
      key: "contact_email",
      width: "20%",
      align: "ledt",
    },

    {
      title: "PHONE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
       width: "5%",
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return String(record.lead_status)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "center",
    },
    // {
    //   title: "OPPORTUNITY",
    //   dataIndex: "opportunity",
    //   key: "opportunity",
    //   filteredValue: [searchStatus],
    //   onFilter: (value, record) => {
    //     return String(record.lead_status)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
    //   align: "left",
    // },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      // width: "23%",
      align: "left",
    },
    // {
    //   title: "DUE AMOUNT",
    //   dataIndex: "due_amt",
    //   key: "due_amt",
    //   // width: "23%",
    //   align: "ledt",
    // },
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
                to={`${ROUTES.EDIT_ENQUIRY}/${index.enquiry_id}`}
                className="editcolor"
              >
                <FaEdit />
              </Link>{" "}
            </div>

            <div className="actionView m-0">
              <div
                className="editcolor"
                onClick={
                  () => {
                    navigate(`${ROUTES.VIEW_ENQUIRY}/${index.enquiry_id}`);
                  }
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



  const columnsKeys = columns.map((column) => column.key);
  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );

  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  

    const data12 = AllEnquiries?.map((item) => [
    // item.action,
    item.sl_no,
    item.enquiry_no,
    item.enquiry_date,
    item.enquiry_customer_name,
    item.enquiry_contact_person_name,
    item.contact_email,
    item.quotation_status,
  ]);

  const EnquiryHeads = [
    [
       "sl_no",
      "enquiry_no",
      "enquiry_date",
      "enquiry_customer_name",
      "enquiry_contact_person_name",
      "contact_email",
      "contact_phone_1",
     
    ],
  ];


  const GetAllEnquiries = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries`)
      .then((res) => {
        console.log("Response ", res);
        if (res.data.success) {
          console.log("Success of all enquiries", res.data.data);
          let temp = [];
          res?.data?.data?.forEach((item, index) => {
            temp.push({
              enquiry_contact_person_id: item.enquiry_contact_person_id,
              enquiry_contact_person_name:
                item.crm_v1_contacts?.contact_person_name,
              enquiry_customer_id: item.enquiry_customer_id,
              enquiry_customer_name: item?.crm_v1_customer?.customer_name,
              enquiry_customer_ref: item?.enquiry_customer_ref,
              enquiry_date: item.enquiry_date,
              enquiry_id: item.enquiry_id,
              enquiry_no: item.enquiry_no,
              enquiry_remarks: item.enquiry_remarks,
              enquiry_source: item.enquiry_source,
              contact_email: item?.crm_v1_contacts?.contact_email,
              contact_phone_1: item?.crm_v1_contacts?.contact_phone_1,
            });
          });
          setAllnquires(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    GetAllEnquiries();
  }, []);

  return (
    <div className="container-fluid ">
      <div className="row shadow-sm">
        <div className="col-12">
          <div className=" ">
            <div className="row ">
              <div className="col-4 d-flex justify-content-start">
                <h5 className="lead_text mt-3">Enquiry</h5>
              </div>
              <div className="col-4  d-flex justify-content-start">
               <div className="col-1">
               {/* <Input.Search
                  placeholder="Search by Name"
                  style={{ margin: "5px", borderRadius: "5px",boxShadow:"0.5px 0px 2px lightgrey" }}
                  value={searchedText}
                  onChange={(e) => {
                    setSearchedText(e.target.value ? [e.target.value] : []);
                  }}
                  onSearch={(value) => {
                    setSearchedText(value);
                  }}
                /> */}
               </div>
               <div className="col-11 ms-3">

               <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                   
                    borderRadius: "5px",
                    boxShadow:"0.5px 0px 2px lightgrey"
                  }}
                  placeholder="Search "
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
                <div className="col-4 d-flex justify-content-end ">
              {AllEnquiries && (
              <Leadlist_Icons
               datas={allLeadList}
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
              />
              )}
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
                {AllEnquiries?.length > 0 && (
                  <MyPagination
                    total={AllEnquiries?.length}
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
                <Link to={ROUTES.CREATE_ENQUIRY}>
                  <Button
                    btnType="add"
                    // className="add_opportunity"
                  >
                    New Enquiry
                  </Button>
                </Link>
              </div>
            </div>
            <div className="datatable">
              <TableData
                // data={getData(numofItemsTo, pageofIndex)}
                data={AllEnquiries}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
            <div className="d-flex py-2 justify-content-center">
              {AllEnquiries?.length > 0 && (
                <MyPagination
                  total={AllEnquiries?.length}
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
