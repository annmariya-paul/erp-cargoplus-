import React, { useState } from "react";
import "./attributes.styles.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import { Input, Select, Pagination } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Form } from "react-bootstrap";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { ROUTES } from "../../../../routes";

// { List all attibutes, view and edit an attribute - Ann mariya }
export default function Attribute(props) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const data = [
    {
      key: "1",
      attribute_name: "color",
      attribute_description: "this is a test",
    },
    {
      key: "2",
      attribute_name: "size",
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
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div
              className="editIcon m-0"
              onClick={() => setShowModalEdit(true)}
            >
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => setShowViewModal(true)}
            >
              <MdPageview />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
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
              className="page_size_style"
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
        <Custom_model
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          View_list
          list_content={
            <div className="container-fluid p-4">
              <div className="row">
                <div className="col-10">
                  <h5 className="lead_text">Attribute</h5>
                </div>
                <div className="col">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      setShowModalEdit(true);
                      setShowViewModal(false);
                    }}
                  >
                    Edit
                    <FiEdit
                      style={{ marginBottom: "4px", marginInline: "3px" }}
                    />
                  </Button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">Test</p>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-4">
                  <p>Description</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-7 justify-content-start">
                  <p className="modal-view-data">
                    Simply dummy text of the printing and typesetting
                  </p>
                </div>
              </div>
            </div>
          }
        />
        <Custom_model
          size={"sm"}
          show={showModalEdit}
          onHide={() => setShowModalEdit(false)}
          header="Attributes"
          footer={false}
          {...props}
          View_list
          list_content={
            <div className="container-fluid p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="lead_text">Attribute</h5>
                </div>
                <div
                  onClick={() => {
                    setShowModalEdit(false);
                  }}
                >
                  <AiOutlineClose className="closeModal" />
                </div>
              </div>
              <div className="row px-2 my-3">
                <Form.Group className="mb-3" controlId="attribute_name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
              </div>
              <div className="row px-2">
                <Form.Group className="mb-3" controlId="attribute_description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    // value={leadDescription}
                    // onChange={(e) => setLeadDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="row justify-content-center my-3">
                <div className="col-4">
                  <Button btnType="save"> Save </Button>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
