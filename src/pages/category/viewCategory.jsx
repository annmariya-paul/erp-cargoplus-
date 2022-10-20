import React, { useState } from "react";
import { Modal } from "antd";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { TreeSelect } from "antd";
import FileUpload from "../../components/fileupload/fileUploader";
import { FormGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import Custom_model from "../../components/custom_modal/custom_model";
import { useForm } from "react-hook-form";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select, Pagination } from "antd";
import "../CRM/lead/lead_list/leadlist.scss";
import TableData from "../../components/table/table_data";
import MyPagination from "../../components/Pagination/MyPagination";
import CustomModel from "../../components/custom_modal/custom_model";
import Button from "../../components/button/button";
import "./viewCategory.scss";
import { Link } from "react-router-dom";

function Categorylist(props) {
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [modalShow, setModalShow] = useState();
  const [showViewModal, setShowViewModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [State, setState] = useState("null");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    submit();

    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };
  const submit = (data) => {
    console.log(data);
    localStorage.setItem("Form", JSON.stringify(data));
    setModalShow(true);
    close_modal(modalShow, 1200);
    props.onHide();
    reset();
  };
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

  const treeData = [
    {
      title: "Parent Node-1",
      value: "Parent-1",

      children: [
        {
          title: "01 Node1",
          value: "0-0-1",

          children: [
            {
              title: "Child Node1.1",
              value: "0-0-1-1",
            },
          ],
        },
        {
          title: "Child Node2",
          value: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: " Parent Node2",
      value: "0-1",
      key: "0-1",
    },
  ];

  const valueMap = {};
  function loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (valueMap[value] = {
        parent,
        value,
      });
      node.children = loops(children, node);
      return node;
    });
  }

  loops(treeData);

  function getPath(value) {
    const path = [];
    let current = valueMap[value];
    while (current) {
      path.unshift(current.value);
      current = current.parent;
    }
    return path;
  }
  const onChange = (value) => {
    console.log("Change", getPath(value));
    setState({ value });
  };

  const onSelect = (value) => {
    console.log("Select:", getPath(value));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const data = [
    {
      category_name: "Electronics",
      category_code: "C006",
      parent_category: "AXZ",
      cat_description: "Refefence",

      key: "1",
    },
  ];

  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div>
            <div className="row">
              <div className="action col">
                <div
                  onClick={() => setShowViewModal(true)}
                  className="actionView"
                >
                  <MdPageview />
                </div>
              </div>
              <div className="actiondel col">
                <a href="" className="actionTrash">
                  <FaTrash />
                </a>
              </div>
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "CATEGORY NAME",
      dataIndex: "category_name",
      key: "key",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "CODE",
      dataIndex: "category_code",
      key: "key",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "PARENT CATEGORY",
      dataIndex: "parent_category",
      key: "key",
      width: "23%",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.lead_status)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "cat_description",
      key: "key",
      width: "23%",
      align: "center",
    },
  ];

  return (
    <div>
      <div className="container-fluid lead_list  my-3 py-3">
        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Category</h5>
            </div>
            <div className="col-auto" style={{ marginBottom: 12 }}>
              <Link to="/category">
                <Button btnType="add">Add Category</Button>
              </Link>
              <Modal
                title="Edit Category"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="container-fluid p-3">
                  <Form.Group className="mb-2" controlId="Category_name">
                    <div className="row">
                      <div className="col-5">
                        <Form.Label>Category Name</Form.Label>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <Form.Control
                          type="text"
                          name="Cat_name"
                          placeholder="Electronics"
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="Category_code">
                    <div className="row">
                      <div className="col-5">
                        <Form.Label>Category Code</Form.Label>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <Form.Control
                          type="text"
                          name="Cat_code"
                          placeholder="C006"
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="Category_description">
                    <div className="row" style={{ marginTop: 10 }}>
                      <div className="col-5">
                        <Form.Label>Description</Form.Label>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <Form.Control
                          as="textarea"
                          rows={7}
                          name="Cat_description"
                          placeholder=" Aenean commodo ligula eget dolor. Aenean massa. Cum sociis"
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <div>
                    <Form.Group className="mb-2" controlId="Category_code">
                      <div className="row">
                        <div className="col-5">
                          <Form.Label>category Image</Form.Label>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <FileUpload
                            className={`${errors.attachments && "invalid"}`}
                            {...register("attachments")}
                            onKeyUp={() => {
                              trigger("attachments");
                            }}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <div className="row">
                      <div className="col-5">
                        <p className="form-group">Parent Category</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <div className="trdata">
                          <TreeSelect
                            className="tree"
                            name="tree"
                            style={{ width: "100%" }}
                            value={setState.value}
                            dropdownStyle={{
                              maxHeight: 400,
                              overflow: "auto",
                            }}
                            treeData={treeData}
                            placeholder="Please select"
                            treeDefaultExpandAll
                            onChange={onChange}
                            onSelect={onSelect}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
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
            <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by Type"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
              >
                <Select.Option value="Electronics">Electronics</Select.Option>
                <Select.Option value="Laptop">Laptop</Select.Option>
                <Select.Option value="Mobile">Mobile</Select.Option>
              </Select>
            </div>
            <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by From"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchStatus(event ? [event] : []);
                }}
              >
                <Select.Option value="L">Lead</Select.Option>
                <Select.Option value="C">Customer</Select.Option>
              </Select>
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
                  Show{" "}
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-2">
                    25
                  </span>{" "}
                </Select.Option>
                <Select.Option value="50">
                  {" "}
                  Show{" "}
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-2">
                    50
                  </span>{" "}
                </Select.Option>
                <Select.Option value="100">
                  {" "}
                  Show{" "}
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-2">
                    100
                  </span>{" "}
                </Select.Option>
              </Select>
            </div>
          </div>
          <div className="datatable">
            <TableData
              data={getData(current, pageSize)}
              columns={columns}
              custom_table_css="table_lead_list"
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
      </div>
      <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="d-flex justify-content-between my-1">
              <div className="mt-3">
                <h5 className="opportunity_heading">Category</h5>
              </div>
              <div className="">
                <Button
                  onClick={() => {
                    showModal(true);
                    setShowViewModal(false);
                  }}
                  btnType="add_borderless"
                >
                  <span
                    className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                    style={{ fontSize: "14px" }}
                  >
                    Edit <FiEdit />
                  </span>
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Category Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Electronics</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Code</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">C006</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Parent Category</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">EZX</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                </p>
              </div>
            </div>
          </div>
        }
      />
      <Custom_model
        centered
        size={`sm`}
        success
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Categorylist;
