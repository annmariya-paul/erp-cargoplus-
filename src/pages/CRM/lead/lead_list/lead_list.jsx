import React, { useEffect, useState } from "react";
import "./leadlist.scss";
import { Link, useParams } from "react-router-dom";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import {
  LeadType,
  LeadStatus,
  LeadOrganization,
} from "../../../../utils/SelectOptions";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import { Input, Select, Pagination, Checkbox } from "antd";
import "antd/dist/antd.css";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import Custom_model from "../../../../components/custom_modal/custom_model";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import MyPagination from "../../../../components/Pagination/MyPagination";

export default function LeadList() {
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [noofItems, setNoofItems] = useState("25");
  const [totalCount, setTotalcount] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [current, setCurrent] = useState(1);
  const [modalViewLead, setModalViewLead] = useState(false);
  const [ldStatus, setLdStatus] = useState(LeadStatus);
  const [ldType, setLdType] = useState(LeadType);
  const [ldUserType, setLdUserType] = useState(LeadOrganization);
  const [allLeadList, setAllLeadList] = useState([]);

  const [currentcount, setCurrentcount] = useState();
  const [serialNo, setserialNo] = useState(1);
  // pageindex =0 ->  25 * (1-1)- 1+1

  const [viewLead, setViewLead] = useState({
    type: "",
    lead_name: "",
    user_type: "",
    organisation: "",
    source: "",
    attachments: "",
    description: "",
    status: "",
  });
  // { function to view selected Lead's data - Ann mariya (18/11/22)}
  const handleViewData = (item) => {
    console.log("view all attributes", item);
    setViewLead({
      ...viewLead,
      type: item.lead_type,
      lead_name: item.lead_customer_name,
      user_type: item.lead_user_type,
      organisation: item.lead_organization,
      source: item.lead_source,
      attachments: item.attachments,
      description: item.lead_description,
      status: item.lead_status,
    });

    setModalViewLead(true);
  };

  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const numofItemsTo = noofItems * current;

  const pagesizecount = Math.ceil(totalCount / noofItems);
  console.log("page number isss", pagesizecount);

  // console.log("saag eywrbzxcjhasdbf yryeraeuif:::::", allLeadList);
  // console.log("page size", pageIndex);
  // console.log(totalCount / noofItems);

  const GetAllLeadData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/customer?startIndex=${pageofIndex}&noOfItems=${noofItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.total);
          setCurrentcount(res?.data?.data?.currentCount);
          let array = [];

          res?.data?.data?.customers?.forEach((item, index) => {
            // ldStatus.forEach((i, index) => {
            //   ldType.forEach((t, index) => {
            //     ldUserType.forEach((usrtyp, index) => {
            //       var leadStat = parseInt(i.value);
            //       if (
            //         leadStat === item.customer_status &&
            //         t.value === item.customer_type &&
            //         usrtyp.value === item.customer_type
            //       ) {
            array.push({
              customer_id: item?.customer_id,
              customer_type: item?.customer_type,
              customer_name: item?.customer_name,
              customer_address: item?.customer_address,
              customer_phone: item?.customer_phone,
              customer_website: item?.customer_website,
              customer_email: item?.customer_email,
              customer_logo: item?.customer_logo,
              customer_remarks: item?.customer_remarks,
              customer_credit_days:
                item?.crm_v1_customer_accounting
                  ?.customer_accounting_credit_days,
              customer_country: item.customer_country,
              customer_state: item.customer_state,
              customer_city: item.customer_city,
              customer_status: item.customer_status,
              customer_jobs_no: item?.fms_v1_jobs?.length,
              customer_opportunity_no: item?.crm_v1_opportunities?.length,
            });
            //       }
            //     });
            //   });
            // });
          });
          setAllLeadList(array);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetAllLeadData();
  }, [noofItems, pageofIndex, pagesizecount]);

  const getData = (numofItemsTo, pageofIndex) => {
    return allLeadList?.slice(
      noofItems * (current - 1) - 1 + 1,
      noofItems * current
    );
  };

  // const pageofSize = Math.ceil(totalCount / numofItemsTo);
  // console.log("ffgsdgsd,", pageofSize);
  // console.log("ffgsdgsd%$%^$%^,", pageofIndex);
  // console.log("%$%^$%^,", numofItemsTo);

  // const MyPagination = ({
  //   total,
  //   onChange,
  //   current,
  //   pageSizeOptions,
  //   defaultPageSize,
  // }) => {
  //   return (
  //     <Pagination
  //       size="small"
  //       onChange={onChange}
  //       total={total}
  //       current={current}
  //       pageSize={pageofSize}
  //       defaultPageSize={false}
  //       pageSizeOptions={false}
  //       // showSizeChanger={showSizeChanger}
  //     />
  //   );
  // };

  // <Link to={ROUTES.OPPORTUNITY} className="nav-link">
  //                     <Button onClick={Submit} btnType="add_borderless">
  //                       <BsPlusCircleFill style={{ fontSize: "16px" }} /> View
  //                       Opportunity
  //                     </Button>
  //                   </Link>

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "4%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "CUSTOMER NAME",
      dataIndex: "customer_name",
      key: "customer_name",
      // width: "23%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.customer_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.contact_person)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customer_phone)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customer_email)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customer_credit_days)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customer_jobs_no)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.invoice_amt)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.due_amt).toLowerCase().includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
      title: "CONTACT ",
      dataIndex: "contact_person",
      key: "contact_person",
      // filteredValue: [searchType],
      // onFilter: (value, record) => {
      //   return String(record.lead_type)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "right",
    },
    {
      title: "PHONE",
      dataIndex: "customer_phone",
      key: "customer_phone",
      // width: "23%",
      align: "right",
    },

    {
      title: "EMAIL",
      dataIndex: "customer_email",
      key: "customer_email",
      // width: "23%",
      align: "left",
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
      align: "right",
    },
    {
      title: "OPPORTUNITY",
      dataIndex: "customer_opportunity_no",
      key: "customer_opportunity_no",
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return String(record.lead_status)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "right",
    },

    {
      title: "JOBS",
      dataIndex: "customer_jobs_no",
      key: "customer_jobs_no",
      // width: "23%",
      align: "right",
    },

    {
      title: "INVOICE AMT",
      dataIndex: "invoice_amt",
      key: "invoice_amt",
      // width: "23%",
      align: "right",
    },
    {
      title: "DUE AMT",
      dataIndex: "due_amt",
      key: "due_amt",
      // width: "23%",
      align: "right",
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
              <div className="editcolor" onClick={() => handleViewData(index)}>
                <MdPageview />
              </div>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  //for show or hide colums start--Shahida 25.11.22
  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const data12 = allLeadList?.map((item) => [
    item.action,
    item.lead_type,
    item.lead_customer_name,
    item.lead_organization,
    item.lead_status,
  ]);

  // const LeadHeads = [
  //   [
  //     "lead_id",
  //     "lead_type",
  //     "lead_customer_name",
  //     "lead_user_type",
  //     "lead_organization",
  //     "lead_source",
  //     "lead_description",

  //     "lead_status",
  //   ],
  // ];

  const LeadHeads = [
    [
      "SL.NO",
      "CUSTOMER NAME",
      "CONTACT",
      "PHONE",
      "EMAIL",
      "CREDIT DAYS",
      "OPPURTUNITY",
      "JOBS",
      "INVOICE AMT",
      "DUE AMT",
    ],
  ];

  return (
    <>
      <div className="container-fluid lead_list pt-3">
        <div className=" ">
          <div className="row flex-wrap align-items-center">
            <div className="col-4">
              <h5 className="lead_text">Customer</h5>
            </div>
            <div className="col-4">
              <Input.Search
                className="inputSearch"
                placeholder="Search "
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
                name={"customer"}
                datas={allLeadList}
                columns={filteredColumns}
                items={data12}
                xlheading={LeadHeads}
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
          {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
            
           
            <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by status"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchStatus(event ? [event] : []);
                }}
              >
                {LeadStatus &&
                  LeadStatus.map((item, index) => {
                    return (
                      <Select.Option key={item.id} value={item.name}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </div> */}
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
              <Link to={ROUTES.CUSTOMER}>
                <Button
                  btnType="add"
                  // className="add_opportunity"
                >
                  New Customer
                </Button>
              </Link>
            </div>
          </div>
          <div className="datatable">
            <TableData
              // data={getData(numofItemsTo, pageofIndex)}
              data={allLeadList}
              columns={filteredColumns}
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

          <Custom_model
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
                          <td className="lead_text">{viewLead.attachments}</td>
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
          />
        </div>
      </div>
    </>
  );
}
