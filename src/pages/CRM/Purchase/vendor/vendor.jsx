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

  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const [allvendor, setAllvendor] = useState();
  const [allCountries, setAllCountries] = useState("");

  const [vendortypes, setvendortypes] = useState();

  const navigate = useNavigate();

  const [totalvendor, settotalvendor] = useState("");
  const [serialNo, setserialNo] = useState(1);

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

  const getData = (current, pageSize) => {
    return allvendor?.slice((current - 1) * pageSize, current * pageSize);
  };

  const getallvendors = async () => {
    try {
      const allvendor = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendors`
      );
      console.log("getting all vendorss", allvendor.data.data);
      settotalvendor(allvendor.data.data);
      // setAllvendor(allvendor.data.data)
      let arry = [];
      allvendor.data.data.map((i, indx) => {
        vendor_Organisation.forEach((itm, index) => {
          console.log("vndr", itm);
          if (itm.value == i.vendor_org_type) {
            arry.push({
              vendor_name: i.vendor_name,
              vendor_email: i.vendor_email,
              vendor_org_type: itm.name,
              vendor_country: i.countries.country_name,
              vendor_country_id: i.vendor_country_id,
              vendor_contact: i.vendor_phone,
              vendor_city: i.vendor_city,
              vendor_address: i.vendor_address,
              vendor_description: i.vendor_desc,
              vendor_type_id: i.vendor_type_id,
              vender_id: i.vendor_id,
              vender_taxno: i.vendor_tax_no,
              vendor_country_id: i.vendor_country_id,
            });
          }
        });
      });
      console.log("arryss", arry);
      setAllvendor(arry);

      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendor", err);
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        // navigate(ROUTES.ATTRIBUTES);
      }, time);
    }
  };

  useEffect(() => {
    getallvendortype();
    getallvendors();
    getCountry();
  }, []);

  const columns = [
    {
      title: "Sl.No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
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
      <div className="container-fluid container_fms pt-3">
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
          <div className="col-4 ">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">25</span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1"> 50</span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">100</span>
              </Select.Option>
            </Select>
          </div>

          <div className="col-4 d-flex  align-items-center justify-content-center">
            <MyPagination
              total={parseInt(totalvendor?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
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
            data={getData(current, pageSize)}
            // data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={parseInt(totalvendor?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
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
