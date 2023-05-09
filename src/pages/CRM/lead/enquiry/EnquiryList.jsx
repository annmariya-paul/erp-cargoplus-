import { Checkbox, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Popconfirm } from "antd";
import { GiCancel } from "react-icons/gi";
import { MdPageview } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import Button from "../../../../components/button/button";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import CustomModel from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
// import Error_model from "../../../../components/Error Modal/errorModal";
import {
  LeadType,
  LeadStatus,
  LeadOrganization,
} from "../../../../utils/SelectOptions";
import moment from "moment";

function EnquiryList() {
  const navigate = useNavigate();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [cancelPopUp, setCancelPopUp] = useState(false);
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
  const [messageApi, contextHolder] = message.useMessage();
  const [startcount, setstartcount] = useState();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setCancelPopUp(false);
      }, time);
    }
  };

  console.log("ggg", AllEnquiries);
  const handleCancelEnq = (index) => {
    PublicFetch.delete(`${CRM_BASE_URL_FMS}/enquiries/${index.enquiry_id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setCancelPopUp(true);
          GetAllEnquiries(searchedText);
          close_modal(cancelPopUp, 1200);
          console.log("success of data", res.data.data);
        }
      })
      .catch((err) => {
        // console.log("Error of delete converted enq", err.response.data.data.err.message);
        // const errorMessage = err.response?.data?.data?.err?.message || "error occurred";
        // message.error(errorMessage);
        // {error}

        const errorMessage =
          err.response?.data?.data?.err?.message || "Error occurred";
        setErrorMessage(errorMessage);
        setErrorModalVisible(true);
      });
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: "4%",
      render: (value, item, index) => {
        return <div>{item?.startindex + index + serialNo}</div>;
      },
      align: "center",
    },
    {
      title: "ENQUIRY NO",
      dataIndex: "enquiry_no",
      key: "enquiry_no",
      width: "10%",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.enquiry_no)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_customer_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_contact_person_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_email)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_phone_1)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //       String(record.enquiry_date)
      //         .toLowerCase()
      //         .includes(value.toLowerCase()) ||
      //         String(record.enquiry_date)
      //           .toLowerCase()
      //           .includes(value.toLowerCase())
      //   );
      // },
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
      // filteredValue: [searchType],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.enquiry_no)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_customer_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_contact_person_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_email)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_phone_1)
      //       .toLowerCase()
      //       .includes(value.toLowerCase())
      //   );
      // },
      align: "left",
    },
    {
      title: "CONTACT PERSON",
      dataIndex: "enquiry_contact_person_name",
      key: "enquiry_contact_person_name",
      // width: "13%",
      align: "left",
      // filteredValue: [searchType],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.enquiry_no)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_customer_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_contact_person_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_email)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_phone_1)
      //       .toLowerCase()
      //       .includes(value.toLowerCase())
      //   );
      // },
    },

    {
      title: "EMAIL",
      dataIndex: "contact_email",
      key: "contact_email",
      width: "17%",
      align: "ledt",
      // filteredValue: [searchType],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.enquiry_no)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_customer_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_contact_person_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_email)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_converted_status)
      //       .toLowerCase()
      //       .includes(value.toLowerCase())
      //   );
      // },
    },

    {
      title: "PHONE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
      width: "5%",
      align: "left",
      // filteredValue: [searchType],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.enquiry_no)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_customer_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.enquiry_contact_person_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_email)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.contact_phone_1)
      //       .toLowerCase()
      //       .includes(value.toLowerCase())
      //   );
      // },
    },

    {
      title: "STATUS",
      dataIndex: "enquiry_converted_status",
      key: "enquiry_converted_status",
      render: (data, index) => {
        if (index.enquiry_converted_status === 0) {
          return <div>Pending</div>;
        } else {
          // return <div>{index.enquiry_converted_status}</div>;
          return <div>Converted</div>;
        }
      },
      align: "left",
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
            <div className="m-0 ms-2">
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
            <div className="deleteIcon m-0">
              <Popconfirm
                title={`Are you sure you want to cancel this Enquiry?`}
                onConfirm={() => {
                  handleCancelEnq(index);
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

  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  console.log("page number isss", pagesizecount);
  // {query === 'pending' ? 0 : query=== "converted" ? 1: query}
  const GetAllEnquiries = (query) => {
    PublicFetch.get(
      `${CRM_BASE_URL_FMS}/enquiries?startIndex=${pageofIndex}&noOfItems=${noofItems}&search=${
        query.toLowerCase() === "pending"
          ? 0
          : query.toLowerCase() === "converted"
          ? 1
          : query.toLowerCase()
      }`
    )
      .then((res) => {
        console.log("Response ", res);
        if (res.data.success) {
          console.log("Success of all enquiries", res.data.data.enquiries);
          setTotalcount(res?.data?.data?.enquiryCount);
          setstartcount(res?.data?.data?.startIndex);

          let temp = [];
          res?.data?.data?.enquiries?.forEach((item, index) => {
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
              enquiry_status: item?.enquiry_status,
              enquiry_converted_status: item?.enquiry_converted_status,
              startindex: res?.data?.data?.startIndex,
            });
          });
          setAllnquires(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totalCount / noofItems);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totalCount;
    return total;
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      GetAllEnquiries(searchedText);
    }, 1000);

    return () => clearTimeout(getData);
  }, [noofItems, pageofIndex, pagesizecount, searchedText]);

  return (
    <div className="container-fluid container_fms pt-3">
      <div className="row flex-wrap align-items-center">
        <div className="col-4 ">
          <h5 className="lead_text mt-3">Enquiry</h5>
        </div>
        <div className="col-4">
          {/* <div className=" "> */}
          {/* <div className="row "> */}

          {/* <div
                // style={{ backgroundColor: "rgb(233, 233, 233)", width: "fit-content"}}
                className="col-4 mb-3 "
              > */}
          <Input.Search
            placeholder="Search "
            style={{
              // margin: "5px",
              borderRadius: "5px",
              backgroundColor: "whitesmoke",
            }}
            className="inputSearch"
            value={searchedText}
            onChange={(e) => {
              console.log("Entered value");
              //
              // if(e.target.value.toLowerCase() === "pending")
              // {
              //   setSearchedText(0);
              // }else if(e.target.value.toLowerCase === "converted")
              // {
              //   setSearchedText(1);
              // }else{
              setSearchedText(e.target.value ? [e.target.value] : []);
              // }
            }}
            onSearch={(value) => {
              setSearchedText(value);
            }}
          />
        </div>

        <div className="col-4 d-flex justify-content-end">
          {AllEnquiries && (
            <Leadlist_Icons
              name={"Enquiry"}
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
        <div className="col-xl-4  ">
          <div className="d-flex justify-content-start align-items-center gap-3">
            {totalCount > 0 && (
              <div className="   ">
                <Select
                  // defaultValue={"25"}
                  bordered={false}
                  className="page_size_style"
                  value={noofItems}
                  // onChange={handleLastNameChange}
                  // onChange={(event, current) => {
                  //   console.log("On page size selected : ", event);
                  //   console.log("nfjnjfv", current);
                  //   setNoofItems(event);
                  //   setCurrent(1);
                  // }}
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
            {totalCount > 0 && (
              <div className="   d-flex  align-items-center mt-2">
                <label className="font_size">
                  Results: {startcount + 1} -{" "}
                  {getFinalCount(1 * noofItems * current)}{" "}
                  <span>of {totalCount} </span>{" "}
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="col-4 d-flex py-2 justify-content-center">
          {totalCount > 0 && (
            <MyPagination
              total={parseInt(totalCount)}
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
      {/* </div> */}
      {/* </div>
      </div> */}

      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
       <CustomModel
        size={"sm"}
        cancelName={errorMessage}
        show={errorModalVisible}
        onHide={() => setErrorModalVisible(false)}
        warning
      />
      <CustomModel
        cancelName={"Enquiry"}
        cancel
        show={cancelPopUp}
        onHide={() => {
          setCancelPopUp(false);
        }}
      />
      {/* <Error_model
       size={"sm"}
        cancelName={errorMessage}
        cancel
        show={errorModalVisible}
        onHide={() => setErrorModalVisible(false)}
        footer={null}
      >
      
      </Error_model> */}
    </div>
  );
}

export default EnquiryList;
