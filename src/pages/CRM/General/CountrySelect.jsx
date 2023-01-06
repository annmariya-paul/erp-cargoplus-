import { getData, getNameList } from "country-list";
import { Form, Select, Input } from "antd";
import React, { useMemo, useState } from "react";
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";

export default function  SelectCountry(){
  const [searchedText, setSearchedText] = useState("");
    const [countryis, setCountryis] = useState();
    const options = useMemo(() => getData(), []);

    const handleChange = (e) => {
      setCountryis(e);
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
        dataIndex: "countries",
        key: "key",
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

    const data = [
      {
        countries: "India",
        key: "1",
      },
      {
        countries: "Australia",
        key: "2",
      },
      {
        countries: "USA",
        key: "3",
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
              <Form>
                <div className="row">
                  <div className="col-12">
                    <label>Country</label>
                    <Form.Item>
                      <SelectBox value={countryis} onChange={handleChange}>
                        {options.map((item, index) => {
                          return (
                            <Select.Option key={item.code} value={item.name}>
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
          <h5 className="lead_text my-2">Designation</h5>
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
          {/* <Select
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
          </Select> */}
        </div>
      </div>
      <div className="datatable">
        <TableData
          // data={getData(numofItemsTo, pageofIndex)}
          // data={getData}
          data={data}
          columns={columns}
          custom_table_css="table_lead_list"
        />
      </div>
      </div>
      </>
    );
}