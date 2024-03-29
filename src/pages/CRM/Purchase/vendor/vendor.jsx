import React, { useEffect, useState } from "react";
import CustomModel from "../../../../components/custom_modal/custom_model";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { MdPageview } from "react-icons/md";

import { Form, Input, Select, DatePicker } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

import Button from "../../../../components/button/button";

import PublicFetch from "../../../../utils/PublicFetch";
import { ROUTES } from "../../../../routes";
import { Link, useNavigate } from "react-router-dom";
import {
  CRM_BASE_URL_PURCHASING,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { vendor_Organisation } from "../../../../utils/SelectOptions";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";

function Vendor() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  // const [pageSize, setPageSize] = useState("25");
  const [noofItems, setNoofItems] = useState("25");
  const [current, setCurrent] = useState(1);

  const [allvendor, setAllvendor] = useState([]);
  const [allCountries, setAllCountries] = useState("");

  const [vendortypes, setvendortypes] = useState();

  const navigate = useNavigate();

  const [totalvendor, settotalvendor] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const [startcount, setstartcount] = useState();

  const getCountry = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/country`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllCountries(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getallvendortype = async () => {
    try {
      const allvendortypes = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendorTypes`
      );
      console.log("getting all vendorTypes", allvendortypes);
      setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendortypes", err);
    }
  };

  // const getData = (current, pageSize) => {
  //   return allvendor?.slice((current - 1) * pageSize, current * pageSize);
  // };

  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);

  // const getallvendors = async () => {
  //   PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors?startIndex=${pageofIndex}&noOfItems=${noofItems}`).then((res)=>{
  //     let arry = [];

  //     res?.data?.data?.vendors?.map((i?, indx) => {
  //       vendor_Organisation.forEach((itm, index) => {
  //         if (itm.value == i?.vendor_org_type) {
  //           console.log("vndr", itm);

  //           // setAllvendor((prev)=>([...prev, {vendor_name: i?.vendor_name,
  //           //   vendor_email: i?.vendor_email,
  //           //   vendor_org_type: itm.name,
  //           //   vendor_country: i?.countries.country_name,
  //           //   vendor_country_id: i?.vendor_country_id,
  //           //   vendor_contact: i?.vendor_phone,
  //           //   vendor_city: i?.vendor_city,
  //           //   vendor_address: i?.vendor_address,
  //           //   vendor_description: i?.vendor_desc,
  //           //   vendor_type_id: i?.vendor_type_id,
  //           //   vender_id: i?.vendor_id,
  //           //   vender_taxno: i?.vendor_tax_no,
  //           //   vendor_country_id: i?.vendor_country_id,
  //           //   startindex:allvendor?.data?.data?.startIndex}]));
  //           arry.push({
  //             vendor_name: i??.vendor_name,
  //             vendor_email: i??.vendor_email,
  //             vendor_org_type: itm?.name,
  //             vendor_country: i?.countries?.country_name,
  //             vendor_country_id: i?.vendor_country_id,
  //             vendor_contact: i?.vendor_phone,
  //             vendor_city: i?.vendor_city,
  //             vendor_address: i?.vendor_address,
  //             vendor_description: i?.vendor_desc,
  //             vendor_type_id: i?.vendor_type_id,
  //             vender_id: i?.vendor_id,
  //             vender_taxno: i?.vendor_tax_no,
  //             vendor_country_id: i?.vendor_country_id,
  //             startindex:allvendor?.data?.data?.startIndex
  //           });
  //         }
  //       });
  //     });
  //     console.log("arryss", arry);
  //     setAllvendor(arry);
  //   })
  //   try {
  //     const allvendor = await PublicFetch.get(
  //       `${CRM_BASE_URL_PURCHASING}/vendors?startIndex=${pageofIndex}&noOfItems=${noofItems}`
  //     );
  //     console.log("getting all vendor detailss", allvendor?.data?.data?.vendors);
  //     settotalvendor(allvendor.data.data);
  //     setTotalcount(allvendor.data.data.total)
  //     // setAllvendor(allvendor.data.data)
  //     let arry = [];
  //     allvendor?.data?.data?.vendors.map((i, indx) => {
  //       vendor_Organisation.forEach((itm, index) => {
  //         if (itm.value == i.vendor_org_type) {
  //           // console.log("vndr", itm);
  //           arry.push({
  //             vendor_name: i.vendor_name,
  //             vendor_email: i.vendor_email,
  //             vendor_org_type: itm.name,
  //             vendor_country: i.countries.country_name,
  //             vendor_country_id: i.vendor_country_id,
  //             vendor_contact: i.vendor_phone,
  //             vendor_city: i.vendor_city,
  //             vendor_address: i.vendor_address,
  //             vendor_description: i.vendor_desc,
  //             vendor_type_id: i.vendor_type_id,
  //             vender_id: i.vendor_id,
  //             vender_taxno: i.vendor_tax_no,
  //             vendor_country_id: i.vendor_country_id,
  //             startindex:allvendor?.data?.data?.startIndex
  //           });
  //         }
  //       });
  //     });

  //     // setvendortypes(allvendortypes.data.data);
  //   } catch (err) {
  //     console.log("error to fetching  vendor", err);
  //   }
  // };

  const getallvendordata = async (query) => {
    try {
      const allvendor = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendors?startIndex=${pageofIndex}&noOfItems=${noofItems}&search=${query}`
      );
      console.log(
        "getting all vendor detailss",
        allvendor?.data?.data?.vendors
      );
      settotalvendor(allvendor.data.data);
      setTotalcount(allvendor.data.data.total);

      setstartcount(allvendor?.data?.data?.startIndex);

      // setAllvendor(allvendor.data.data)
      let arry = [];
      allvendor?.data?.data?.vendors.map((i, indx) => {
        vendor_Organisation.forEach((itm, index) => {
          if (itm.value == i.vendor_org_type) {
            console.log("vndr", itm);

            arry.push({
              vendor_name: i?.vendor_name,
              vendor_email: i?.vendor_email,
              vendor_org_type: itm?.name,
              vendor_country: i?.countries?.country_name,
              vendor_country_id: i?.vendor_country_id,
              vendor_contact: i?.vendor_phone,
              vendor_city: i?.vendor_city,
              vendor_address: i?.vendor_address,
              vendor_description: i?.vendor_desc,
              vendor_type_id: i?.vendor_type_id,
              vender_id: i?.vendor_id,
              vender_taxno: i?.vendor_tax_no,
              vendor_country_id: i?.vendor_country_id,
              startindex: allvendor?.data?.data?.startIndex,
            });
          }
        });
      });
      setAllvendor(arry);
      console.log("newArray", arry);
    } catch (err) {
      console.log("error to fetching  vendor", err);
    }
  };

  console.log("totaaal", startcount);

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totalCount / noofItems);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totalCount;
    return total;
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  };

  useEffect(() => {
    getallvendortype();
    getCountry();

    const getData = setTimeout(() => {
      getallvendordata(searchedText);
    }, 1000);

    return () => clearTimeout(getData);
  }, [noofItems, pageofIndex, pagesizecount,searchedText]);

  const columns = [
    {
      title: "#",
      key: "index",
      // render: (value, item, index) => serialNo + index,
      render: (value, item, index) => {
        return <div>{item?.startindex + index + serialNo}</div>;
      },
      align: "center",
    },

    {
      title: "VENDOR ",
      dataIndex: "vendor_name",
      key: "vendor_name",
      width: "18%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.vendor_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.vendor_contact)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.vendor_phone)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.vendor_email)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.vendor_org_type)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
      title: "CONTACT",
      dataIndex: "vendor_contact",
      key: "freight_type_prefix",
      width: "10%",
      // onFilter: (value, record) => {
      //   return ;
      // },
      align: "left",
    },
    {
      title: "PHONE",
      dataIndex: "vendor_contact",
      key: "freight_type_prefix",
      width: "10%",
      // onFilter: (value, record) => {
      //   return String(record.freight_type_prefix)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "EMAIL",
      dataIndex: "vendor_email",
      key: "freight_type_prefix",
      width: "18%",
      // onFilter: (value, record) => {
      //   return String(record.freight_type_prefix)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "VENDOR TYPE",
      dataIndex: "vendor_org_type",
      key: "freight_type_prefix",
      width: "18%",
      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    // {
    //   title: "COUNTRY",

    //   dataIndex: "vendor_country",
    //   key: "freight_type_prefix",
    //   width: "12%",
    //   onFilter: (value, record) => {
    //     return String(record.freight_type_prefix)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
    //   align: "left",
    // },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "20%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0 "
              onClick={() => {
                navigate(`${ROUTES.UPDATE_VENDOR}/${index.vender_id}`);
              }}
            >
              <Link>
                <FaEdit style={{ marginLeft: 15 }} />
              </Link>
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => {
                navigate(`${ROUTES.VIEW_VENDOR}/${index.vender_id}`);
              }}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];
  // console.log()

  const data = [
    {
      vendor_name: "Fright X",
      vendor_type: "testemail.com",
      // vendor_email:"testemail.com",
      vendor_organisation: "organisation",
      vendor_country: "1",
    },
    {
      vendor_name: "Fright X",
      vendor_type: "testemail.com",
      // vendor_email:"testemail.com",
      vendor_organisation: "organisation",
      vendor_country: "1",
    },
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "VENDOR",
      "CONTACT",
      "PHONE",
      "EMAIL",
      "VENDOR TYPE",
      // "PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = allvendor?.map((item, index) => [
    index + serialNo,
    item.vendor_name,
    item.vendor_contact,
    item.vendor_contact,
    item.vendor_email,
    item.vendor_org_type,
    // item.profit,
  ]);

  return (
    <>
      <div className="container-fluid container_fms pt-3 py-5">
        <div className="row flex-wrap align-items-center ">
          <div className="col-4">
            <h5 className="lead_text">Vendor</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedText}
              onChange={(e) => {
                // getallvendordata(searchedText);
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                name={"vendor"}
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}></div> */}
        <div className="row my-3">
          <div className="col-xl-4">
            <div className="d-flex justify-content-start align-items-center gap-3">
            {totalCount > 0 && (
              <div className="  ">
                <Select
                  bordered={false}
                  className="page_size_style"
                  value={noofItems}
                  // onChange={(e) => setPageSize(e)}
                  onChange={(event, current) => {
                    console.log("On page size selected : ", event);
                    console.log("nfjnjfv", current);
                    setNoofItems(event);
                    setCurrent(1);
                  }}
                >
                  <Select.Option value="25">
                    <span className="sizes ms-1">25</span>
                  </Select.Option>
                  <Select.Option value="50">
                    <span className="sizes ms-1"> 50</span>
                  </Select.Option>
                  <Select.Option value="100">
                    <span className="sizes ms-1">100</span>
                  </Select.Option>
                </Select>
              </div>
            )}
              {totalCount > 0 && (
              <div className=" d-flex  align-items-center mt-2 ">
                <label className="font_size">
                  Results: {startcount + 1}-
                   {getFinalCount(1 * noofItems * current)}{" "}
                  <span>of {totalCount} </span>{" "}
                </label>
              </div>
              )}
            </div>
          </div>

          <div className="col-4 d-flex  align-items-center justify-content-center">
          {totalCount > 0 && (
            <MyPagination
              total={parseInt(totalCount)}
              current={current}
              showSizeChanger={true}
              pageSize={noofItems}
              onChange={(current, pageSize) => {
                console.log("page index isss", pageSize);
                setCurrent(current);
              }}
              // onChange={(current, pageSize) => {
              //   setCurrent(current);
              //   setPageSize(pageSize);
              // }}
            />
          )}
          </div>

          <div className="col-4 d-flex justify-content-end">
            <div className="col mb-2 px-4">
              <Link to={ROUTES.ADDVENDOR} style={{ color: "white" }}>
                <Button btnType="add">New Vendor</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={allvendor}
            // data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
        {totalCount > 0 && (
          <MyPagination
            total={parseInt(totalCount)}
            current={current}
            showSizeChanger={true}
            pageSize={noofItems}
            onChange={(current, pageSize) => {
              console.log("page index isss", pageSize);
              setCurrent(current);
            }}
          />
        )}
        </div>
      </div>

      {/* edit vendor */}

      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {/* {error ? <ErrorMsg code={"500"} /> : " "} */}
    </>
  );
}
export default Vendor;
