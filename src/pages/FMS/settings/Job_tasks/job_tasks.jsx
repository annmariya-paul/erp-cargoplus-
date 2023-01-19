import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";

export default function JobTasks() {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [modalAddJobTask, setModalAddJobTask] = useState(false);
  const [modalEditJobTask, setModalEditJobTask] = useState(false);
  const [ViewJobTaskModal, setViewJobTaskModal] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [alltaxTypes,setAllTaxTypes] = useState();
  const [jobTask, setJobTask] = useState();
  const [taxType, setTaxType] = useState();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  // { function to get all tax types - Ann - 18/1/23}
  const getAllTaxTypes = async () => {
    try {
      const allTxTypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/tax-types?startIndex=0&perPage=10`
      );
      console.log("all frights are", allTxTypes.data.data);
      setAllTaxTypes(allTxTypes.data.data);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };

  useEffect(() => {
    getAllTaxTypes();
  }, []);

  const JobTaskEdit = (i) => {
    console.log("taxtypppe", i);
    setJobTask(i.jobtask_name);
    setTaxType(i.tax_type);
    editForm.setFieldValue({
      jobtask_id: i.jobtask_id,
      taxType: i.jobtask_name,
      taxPercent: i.tax_type,
    });
    setModalEditJobTask(true);
  };

  const [viewJobTasks, setViewJobTasks] = useState({
    id: "",
    viewjobtaskname: "",
    viewtaxtypename: "",
  });
  const handleViewClick = (item) => {
    console.log("view all tax type", item);
    setViewJobTasks({
      ...viewJobTasks,
      id: item.jobtask_id,
      viewjobtaskname: item.jobtask_name,
      viewtaxtypename: item.tax_type,
    });

    setViewJobTaskModal(true);
  };

  const [jobTasksnamee, setJobTasknamee] = useState();
  const [jobtask_id, setJobtask_id] = useState();

  const handleviewtoedit = (i) => {
    console.log("existing data is", i);
    setJobtask_id(i.id);
    setJobTasknamee(i.viewjobtaskname);

    addForm.setFieldsValue({
      jobtask: i.viewjobtaskname,
    });
    setModalEditJobTask(true);
  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="editIcon m-0" onClick={() => JobTaskEdit(index)}>
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
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
    {
      title: "JOB TASK NAME",
      dataIndex: "jobtask_name",
      key: "jobtask_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.jobtask_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "TAX TYPE",
      dataIndex: "tax_type",
      key: "tax_type",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.tax_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];

  const data = [
    {
      jobtask_name: "Payroll specialist",
      tax_type: "Payroll Tax",
      key: "1",
    },
    {
      jobtask_name: "Sales Tax Analyst",
      tax_type: "Sales Taxes",
      key: "2",
    },
    {
      jobtask_name: " Value-Added Tax Analyst",
      tax_type: "Value-Added Tax",
      key: "3",
    },
  ];
  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Job Tasks</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>

        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Job Task"
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
          <div className="col-9 d-flex justify-content-end">
            <Button btnType="add" onClick={() => setModalAddJobTask(true)}>
              Add Job Tasks
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
      {/* {add job tasks modal} */}
      <CustomModel
        show={modalAddJobTask}
        onHide={() => setModalAddJobTask(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Job Tasks</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Job Task Name</label>
                  <div>
                    <Form.Item
                      name="jobtask_name"
                      rules={[
                        {
                          required: true,
                          //   pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Tax Type</label>
                  <div>
                    <Form.Item
                      name="taxtype"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Tax type",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        onChange={(e) => {setTaxType(parseInt(e));
                        }}
                      >
                        {alltaxTypes &&
                          alltaxTypes.length > 0 &&
                          alltaxTypes.map((i, index) => {
                            return (
                              <Select.Option
                                key={i.tax_type_id}
                                value={i.tax_type_id}
                              >
                                {i.tax_type_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      {/* {edit tax type modal} */}
      <CustomModel
        show={modalEditJobTask}
        onHide={() => setModalEditJobTask(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Job Task</h5>
            </div>
            <Form
              form={editForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Job Task Name</label>
                  <div>
                    <Form.Item
                      // name="jobTask"
                      rules={[
                        {
                          required: true,
                          //   pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Name",
                        },
                      ]}
                    >
                      <InputType value={jobTask} />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Tax Type</label>
                  <div>
                    <Form.Item
                      name="taxType"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Tax type",
                        },
                      ]}
                    >
                      <SelectBox>
                        <Select.Option value="A">Payroll Tax</Select.Option>
                        <Select.Option value="B">Sales Tax</Select.Option>
                        <Select.Option value="C">Value-added Tax</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      {/* {view tax type modal} */}
      <Custom_model
        show={ViewJobTaskModal}
        onHide={() => setViewJobTaskModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row mb-5">
              <div className="col-9">
                <h5 className="lead_text">Tax Type</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewJobTasks);
                    setViewJobTaskModal(false);
                  }}
                >
                  Edit
                  <FiEdit
                    style={{ marginBottom: "4px", marginInline: "3px" }}
                  />
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Job Task Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">
                  {viewJobTasks.viewjobtaskname}
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Tax Type</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">
                  {viewJobTasks.viewtaxtypename}
                </p>
              </div>
            </div>
          </div>
        }
      />
      {/* { sucess popup modal} */}
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </>
  );
}
