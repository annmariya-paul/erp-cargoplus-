import React, { useState } from "react";
import "./attributes.styles.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../api/bootapi";
import { Input, Select, Pagination } from "antd";
import { FiEdit } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import TableData from "../../../components/table/table_data";
import MyPagination from "../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import Button from "../../../components/button/button";
import { ROUTES } from "../../../routes";

export default function Attribute(props) {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const data = [
    {
      key: "1",
      attribute_name: "test",
      attribute_description: "this is a test",
    },
    {
      key: "2",
      attribute_name: "testREon",
      attribute_description: "this is a test description",
    },
  ];

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div>
            <a href="" className="actionEdit">
              <FaEdit />
            </a>
            <a href="" className="actionView">
              <MdPageview />
            </a>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "NAME",
      dataIndex: "attribute_name",
      key: "key",
      width: "23%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.attribute_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "attribute_description",
      key: "key",
      align: "center",
    },
  ];
  return (
    <>
      <div className="container-fluid attribute_list pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Attributes</h5>
          </div>
          <Leadlist_Icons />
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
        </div>
        <div className="row my-3">
          <div className="col-3 px-3 ">
            <Select
              bordered={false}
              className="w-50 page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-2"> 25</span>
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
          <div className="col mb-2">
            <Link to={ROUTES.ADD_ATTRIBUTES} style={{ color: "white" }}>
              <Button btnType="add">Add Attribute</Button>
            </Link>
          </div>
        </div>

        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            columns={columns}
            custom_table_css="attribute_table"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={data.length}
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
    </>
  );
}
