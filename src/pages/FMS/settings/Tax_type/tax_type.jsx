import "../../settings/fms_setting.scss";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
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
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import MyPagination from "../../../../components/Pagination/MyPagination";

export default function TaxType() {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const [error, setError] = useState(false);
  const [modalAddTaxtype, setModalAddTaxtype] = useState(false);
  const [modalEditTaxtype, setModalEditTaxtype] = useState(false);
  const [ViewTaxtypeModal, setViewTaxtypeModal] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [taxtype_id, setTaxtype_id] = useState();
  const [taxTypeName, setTaxTypeName] = useState();
  const [taxPercent, setTaxPercent] = useState();
  const [taxDescription, setTaxDescription] = useState("");
  const [editName, setEditName] = useState();
  const [taxEditPercent, setTaxEditPercent] = useState();
  const [editDescription, setEditDescription] = useState("");

  const [taxTypes, setTaxTypes] = useState();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const pageofIndex = numOfItems * (current - 1) - 1 + 1;

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
        `${CRM_BASE_URL_FMS}/tax-types?startIndex=${pageofIndex}&perPage=${numOfItems}`
      );
      console.log("all frights are", allTxTypes.data.data);
      setTaxTypes(allTxTypes.data.data);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };

  useEffect(() => {
    getAllTaxTypes();
  }, []);

  // { function to add a tax type - Ann - 19/1/23}
  const createTaxTypes = async () => {
    try {
      const addtaxtypes = await PublicFetch.post(
        `${CRM_BASE_URL_FMS}/tax-types`,
        {
          tax_type_name: taxTypeName.trim(" "),
          tax_type_percentage: parseInt(taxPercent),
          tax_type_description: taxDescription,
        }
      );
      console.log("fright added successfully", addtaxtypes);
      if (addtaxtypes.data.success) {
        setSuccessPopup(true);
        getAllTaxTypes();
        addForm.resetFields();
        setModalAddTaxtype(false);
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the frights", err);
    }
  };

  // { function to display a taxtype in input to edit - Ann - 19/1/23}
  const TaxTypeEdit = (i) => {
    console.log("taxtypppe", i);
    setTaxtype_id(i.tax_type_id);
    setEditName(i.tax_type_name);
    setTaxEditPercent(i.tax_type_percentage);
    setEditDescription(i.tax_type_description);
    editForm.setFieldsValue({
      taxtype_id: i.tax_type_id,
      editName: i.tax_type_name,
      taxEditPercent: i.tax_type_percentage,
      editDescription: i.tax_type_description,
    });
    setModalEditTaxtype(true);
  };
  // { function to view a tax type - Ann - 19/1/23}
  const [viewTaxType, setViewTaxType] = useState({});
  const handleViewClick = (item) => {
    console.log("view tax types", item);
    setViewTaxType({
      ...viewTaxType,
      tax_type_id: item.tax_type_id,
      tax_type_name: item.tax_type_name,
      tax_type_percentage: item.tax_type_percentage,
      tax_type_description: item.tax_type_description,
    });
    setViewTaxtypeModal(true);
  };

  const handleviewtoedit = (i) => {
    console.log("existing data is", i);
    setTaxtype_id(i.tax_type_id);
    setEditName(i.tax_type_name);
    setTaxEditPercent(i.tax_type_percentage);
    setEditDescription(i.tax_type_description);
    editForm.setFieldsValue({
      taxtype_id: i.tax_type_id,
      editName: i.tax_type_name,
      taxEditPercent: i.tax_type_percentage,
      editDescription: i.tax_type_description,
    });
    setViewTaxtypeModal(false);
    setModalEditTaxtype(true);
  };

  // { function to update a tax type - Ann - 19/1/23}
  const taxTypeUpdate = async () => {
    try {
      const updated = await PublicFetch.patch(
        `${CRM_BASE_URL_FMS}/tax-types/${taxtype_id}`,
        {
          tax_type_name: editName.trim(" "),
          tax_type_percentage: parseInt(taxEditPercent),
          tax_type_description: editDescription,
        }
      );
      console.log("successfully updated ", updated);
      if (updated.data.success) {
        setModalEditTaxtype(false);
        close_modal(successPopup, 1000);
        getAllTaxTypes();
        setSuccessPopup(true);
      }
    } catch (err) {
      console.log("error to update tax types");
    }
  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "20%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="editIcon m-0" onClick={() => TaxTypeEdit(index)}>
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
      title: "TAX TYPE NAME",
      dataIndex: "tax_type_name",
      key: "tax_type_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.tax_type_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "TAX PERCENTAGE",
      dataIndex: "tax_type_percentage",
      key: "tax_type_percentage",
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "tax_type_description",
      key: "tax_type_description",
      align: "center",
    },
  ];

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Tax Types</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Tax type Name"
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
            <Button btnType="add" onClick={() => setModalAddTaxtype(true)}>
              Add Tax Type
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={taxTypes}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>{" "}
        <div className="d-flex mt-4 justify-content-center">
          <MyPagination
            total={parseInt(totalCount)}
            current={current}
            pageSize={numOfItems}
            onChange={(current, pageSize) => {
              setCurrent(current);
            }}
          />
        </div>
      </div>

      {/* {add tax type modal - Ann} */}
      <CustomModel
        show={modalAddTaxtype}
        onHide={() => setModalAddTaxtype(false)}
        header="Add Tax Type"
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Tax Type</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzz", data);
                createTaxTypes();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Tax Type Name</label>
                  <div>
                    <Form.Item
                      name="tax_type_name"
                      rules={[
                        {
                          required: true,
                          //   pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Name",
                        },
                      ]}
                    >
                      <InputType
                        value={taxTypeName}
                        onChange={(e) => setTaxTypeName(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Tax Percentage</label>
                  <div>
                    <Form.Item
                      name="tax_type_percentage"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid tax percentage",
                        },
                        {
                          pattern: new RegExp("^[0-9]+$"),
                          message: "Tax percentage must be numeric",
                        },
                      ]}
                    >
                      <InputType
                        value={taxPercent}
                        onChange={(e) => setTaxPercent(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Description</label>
                  <Form.Item name="tax_type_description">
                    <TextArea
                      value={taxDescription}
                      onChange={(e) => setTaxDescription(e.target.value)}
                    />
                  </Form.Item>
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
      {/* {edit tax type modal - Ann} */}
      <CustomModel
        show={modalEditTaxtype}
        onHide={() => setModalEditTaxtype(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Tax Type</h5>
            </div>
            <Form
              form={editForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                taxTypeUpdate();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Tax Type Name</label>
                  <div>
                    <Form.Item
                      name="editName"
                      rules={[
                        {
                          required: true,
                          //   pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Name",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Tax Percentage</label>
                  <div>
                    <Form.Item
                      name="taxEditPercent"
                      rules={[
                        {
                          required: true,
                          message: "Please entera valid tax percentage",
                        },
                        {
                          pattern: new RegExp("^[0-9]+$"),
                          message: "Tax percentage must be numeric",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => setTaxEditPercent(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Description</label>
                  <Form.Item name="editDescription">
                    <TextArea
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </Form.Item>
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
      {/* {view tax type modal - Ann} */}

      <Custom_model
        show={ViewTaxtypeModal}
        onHide={() => setViewTaxtypeModal(false)}
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
                    handleviewtoedit(viewTaxType);
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
                <p>Tax Type Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">{viewTaxType.tax_type_name}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Tax Percentage</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">
                  {viewTaxType.tax_type_percentage}%
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">
                  {viewTaxType.tax_type_description}
                </p>
              </div>
            </div>
          </div>
        }
      />
      {/* { success popup modal} */}
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : " "}
    </>
  );
}
