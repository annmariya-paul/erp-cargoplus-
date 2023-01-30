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

export default function SelectCountry() {
  const [addForm] = Form.useForm();
  const [searchedText, setSearchedText] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

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
    return countries?.slice((current - 1) * pageSize, current * pageSize);
  };

  // { function to get all tax types - Ann - 18/1/23}
  const getAllCountries = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/country`
      );
      console.log("countries are", allCountries.data.data);
      setCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  // { function to add a tax type - Ann - 19/1/23}
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
        addForm.resetFields();
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the country", err);
    }
  };

  const columns = [
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
    {
      title: "COUNTRIES",
      dataIndex: "country_name",
      key: "country_name",
      width: "70%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.countries)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="containerdesig p-4">
            <div className="row">
              <h5 className="lead_text">Add Country</h5>
            </div>{" "}
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
                <div className="col-12">
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
                      // style={{
                      //   width: "100%",
                      //   marginTop: "8px",
                      //   borderRadius: "5px",
                      //   backgroundColor
                      // }}
                      placeholder="Select Country"
                      // className="select_search"
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
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="container-fluid container2 mt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text my-2">Countries</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Countries"
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
        </div>
        <div className="row my-3">
          <div className="col-3 px-3">
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
          
      
          <MyPagination
          
           total={parseInt(countries?.length)}
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
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </>
  );
}
