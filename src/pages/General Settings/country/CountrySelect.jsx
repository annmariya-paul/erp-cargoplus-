import { Form, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import Button from "../../../components/button/button";
import TableData from "../../../components/table/table_data";
import { countryList } from "../../../utils/countries";
import CustomModel from "../../../components/custom_modal/custom_model";
import SelectBox from "../../../components/Select Box/SelectBox";
import MyPagination from "../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
export default function SelectCountry() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState("");
  const [getCountries,setGetCountries] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [modalAddCountry, setmodalAddCountry] = useState(false);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return getCountries?.slice((current - 1) * pageSize, current * pageSize);
  };

  // { function to get all tax types - Ann - 18/1/23}
  const getAllCountries = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/country`
      );
      console.log("countries are", allCountries.data.data);
      setGetCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  // { function to add country - Ann - 19/1/23}
  const addCountry = async () => {
    try {
      const addCountries = await PublicFetch.post(
        `${GENERAL_SETTING_BASE_URL}/country`,
        {
          country_name: countryName,
        }
      );
      console.log("country added successfully", addCountries);
      if (addCountries.data.success) {
        setSuccessPopup(true);
        getAllCountries();
        setmodalAddCountry(false);
        addForm.resetFields();
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the country", err);
    }
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width:"10%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "COUNTRIES",
      dataIndex: "country_name",
      key: "country_name",
      // width: "70%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.country_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",

      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div
                className="editIcon m-0"
                // onClick={() => handleEditclick(index)}
              >
                <FaTrash />
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
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

   //for Xlsx data
   const UnitHeads = [
    [
      "Slno",
      "COUNTRY NAME",
      // "BRANCH CODE",
      // "CUSTOMER",
      // "COST",
      // "EXPENSE",
      // "PROFIT/LOSS",
    ],
  ];

  const data12 = getCountries?.map((item, index) => [
    index + serialNo,
    item.country_name,
    // item.branch_code,
    // item.lead,
    // item.cost,
    // item.expense,
    // item.profit,
  ]);

  return (
    <>
      <div className="container-fluid container_hrms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text ">Countries</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}> */}
          <div className="col-sm-4">
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
          </div>
       
        <div className="row my-3">
          <div className="col-4 px-3">
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
          <div className=" col-4 d-flex align-items-center justify-content-center">
            {getCountries && (
            <MyPagination
              total={parseInt(getCountries?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
            )}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              onClick={() => setmodalAddCountry(true)}
              className="add_opportunity"
            >
              Add Country
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={countries}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {getCountries && (
          <MyPagination
            total={parseInt(getCountries?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
          )}
        </div>
      </div>
      <CustomModel
        show={modalAddCountry}
        onHide={() => setmodalAddCountry(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Country</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzz", data);
                addCountry();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row">
                <div className="col-12 mt-2">
                  {/* <label>Country</label> */}
                  <Form.Item
                    name="country_name"
                    rules={[
                      {
                        required: true,
                        message: "Please Select country",
                      },
                    ]}
                  >
                    <SelectBox
                      allowClear
                      showSearch
                      placeholder="Select Country"
                      optionFilterProp="children"
                      value={countryName}
                      onChange={(event) => {
                        setCountries(event ? [event] : []);
                        setCountryName(event);
                      }}
                    >
                      {countryList &&
                        countryList.map((item, index) => {
                          return (
                            <Select.Option key={item.id} value={item.name}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                  <Button btnType="save">Save</Button>
                  <Button
                    btnType="cancel"
                    type="reset"
                    onClick={() => {
                      setmodalAddCountry(false);
                    }}
                  >
                    cancel
                  </Button>
              </div>
            </Form>
          </>
        }
      />

      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </>
  );
}
