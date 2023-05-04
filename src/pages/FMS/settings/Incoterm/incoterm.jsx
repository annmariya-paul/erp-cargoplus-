import { Input, Select, Checkbox, Form } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import TableData from "../../../../components/table/table_data";
import CustomModal from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import { useEffect } from "react";
import PublicFetch from "../../../../utils/PublicFetch";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
// import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

export default function Incoterm() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [searchAny, setSearchAny] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [modalAddIncoterm, setModalAddIncoterm] = useState(false);
  const [modalViewIncoterm, setmodalViewIncoterm] = useState(false);
  const [modalEditIncoterm, setModalEditIncoterm] = useState(false);
  const [incotermId, setIncotermId] = useState();
  const [allIncoterms, setAllIncoterms] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  // { function to get all Incoterms - Ann - 23/3/23}
  const getAllIncoterms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/incoterms?startIndex=0&noOfItems=10`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setAllIncoterms(res.data.data.incoterms);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllIncoterms();
  }, []);

  // { function to add Incoterm - Ann - 23/3/23}
  const AddIntercorm = (data) => {
    PublicFetch.post(`${CRM_BASE_URL_FMS}/incoterms`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success Data", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          addForm.resetFields();
          setModalAddIncoterm(false);
          getAllIncoterms();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // { function to view an Incoterm - Ann - 23/3/23}
  const [viewIncoterm, setViewIncoterm] = useState({});
  const handleViewClick = (item) => {
    console.log("view incoterms", item);
    setViewIncoterm({
      ...viewIncoterm,
      incoterm_id: item.incoterm_id,
      incoterm_short_name: item.incoterm_short_name,
      incoterm_full_name: item.incoterm_full_name,
      incoterm_description: item.incoterm_description,
    });
    setmodalViewIncoterm(true);
  };

  // {function to repopulate data to view->edit - Ann - 23/3/23}
  const IncotermViewToEdit = (e) => {
    setIncotermId(e.incoterm_id);
    addForm.setFieldsValue({
      Incoterm_id: e.incoterm_id,
      Inco_shortName: e.incoterm_short_name,
      Inco_fullName: e.incoterm_full_name,
      Inco_description: e.incoterm_description,
    });
    setModalEditIncoterm(true);
  };

  // {function to repopulate incoterm to edit - Ann - 23/3/23}
  const IncotermEdit = (e) => {
    setIncotermId(e.incoterm_id);
    addForm.setFieldsValue({
      Incoterm_id: e.incoterm_id,
      Inco_shortName: e.incoterm_short_name,
      Inco_fullName: e.incoterm_full_name,
      Inco_description: e.incoterm_description,
    });
    setModalEditIncoterm(true);
  };

  // { function to edit Incoterm - Ann - 23/3/23}
  const updateIncoterm = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/incoterms/${incotermId}`, {
      incoterm_short_name: data.Inco_shortName,
      incoterm_full_name: data.Inco_fullName,
      incoterm_description: data.Inco_description,
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          getAllIncoterms();
          setModalEditIncoterm(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "SHORT NAME",
      dataIndex: "incoterm_short_name",
      key: "incoterm_short_name",
      width: "13%",
      filteredValue: [searchAny],
      onFilter: (value, record) => {
        return (
          String(record.incoterm_short_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.incoterm_full_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.incoterm_description)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "FULL NAME",
      dataIndex: "incoterm_full_name",
      key: "incoterm_full_name",
      width: "20%",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "incoterm_description",
      key: "incoterm_description",
      width: "25%",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "15%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0"
              onClick={() => {
                IncotermEdit(index);
              }}
            >
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
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [["Slno", "SHORT NAME", "FULL NAME", "DESCRIPTION"]];
  //for pdf download
  const data12 = allIncoterms?.map((item, index) => [
    index + serialNo,
    item.incoterm_short_name,
    item.incoterm_full_name,
    item.incoterm_description,
  ]);

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col-4 pt-2">
            <h5 className="lead_text">Incoterm</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchAny}
              onChange={(e) => {
                setSearchAny(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchAny(value);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                name="Incoterm"
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
        </div>

        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
         
        </div> */}

        <div className="row my-3">
          <div className="col-4 ">
            {/* <Select
              bordered={false}
              className="page_size_style"
              //   value={pageSize}
              //   onChange={(e) => setPageSize(e)}
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

          <div className="col-4 d-flex  align-items-center justify-content-center">
            {/* <MyPagination
              total={parseInt(paymentmode?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            /> */}
          </div>

          <div className="col-4">
            <Button
              btnType="add"
              onClick={() => {
                setModalAddIncoterm(true);
                addForm.resetFields();
              }}
            >
              New Incoterm
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allIncoterms}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        {/* {add Incoterm modal - Ann} */}
        <CustomModal
          show={modalAddIncoterm}
          onHide={() => setModalAddIncoterm(false)}
          header="Add Currency"
          footer={false}
          // {...props}
          View_list
          list_content={
            <>
              <div className="row">
                <h5 className="lead_text">New Incoterm</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  AddIntercorm(data);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 col-sm-6 pt-1">
                    <label>
                      Short Name<span className="req_star">*</span>
                    </label>
                    <Form.Item
                      name="incoterm_short_name"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Short Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-6 pt-1">
                    <label>
                      Full Name<span className="req_star">*</span>
                    </label>
                    <Form.Item
                      name="incoterm_full_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Valid Full Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item className="mt-2" name="incoterm_description">
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                    <Button btnType="save">Save</Button>
                    <Button
                      btnType="cancel"
                      type="reset"
                      onClick={() => {
                        setModalAddIncoterm(false);
                      }}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          }
        />

        {/* {edit Incoterm modal - Ann} */}
        <CustomModal
          show={modalEditIncoterm}
          onHide={() => setModalEditIncoterm(false)}
          header="Edit Intcoterm"
          footer={false}
          // {...props}
          View_list
          list_content={
            <>
              <div className="row">
                <h5 className="lead_text">Edit Incoterm</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  updateIncoterm(data);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 col-sm-6 pt-1">
                    <label>
                      Short Name<span className="req_star">*</span>
                    </label>
                    <Form.Item
                      name="Inco_shortName"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-6 pt-1">
                    <label>
                      Full Name<span className="req_star">*</span>
                    </label>
                    <Form.Item
                      name="Inco_fullName"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item className="mt-2" name="Inco_description">
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                    <Button btnType="save">Save</Button>
                    <Button
                      btnType="cancel"
                      type="reset"
                      onClick={() => {
                        setModalEditIncoterm(false);
                      }}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          }
        />

        {/* {view location modal - Ann} */}
        <CustomModal
          show={modalViewIncoterm}
          onHide={() => setmodalViewIncoterm(false)}
          View_list
          list_content={
            <div className="container-fluid p-3">
              <div className="row mb-5">
                <div className="col-9">
                  <h5 className="lead_text">Incoterm</h5>
                </div>
                <div className="col-3">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      IncotermViewToEdit(viewIncoterm);
                      setmodalViewIncoterm(false);
                    }}
                  >
                    Edit
                    <FaEdit
                      style={{ marginBottom: "4px", marginInline: "3px" }}
                    />
                  </Button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 boldhd">
                  <p>Short Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 ">
                  <p className="modal-view-data">
                    {viewIncoterm.incoterm_short_name}
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 boldhd">
                  <p>Full Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 ">
                  <p className="modal-view-data">
                    {viewIncoterm.incoterm_full_name}
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 boldhd">
                  <p>Description</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 ">
                  <p className="modal-view-data">
                    {viewIncoterm.incoterm_description}
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
