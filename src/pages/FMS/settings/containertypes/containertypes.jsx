import React, { useEffect, useState } from "react";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import TableData from "../../../../components/table/table_data";
import { Input, Select, Checkbox, Form } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";

function Containertypes() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [searchAny, setSearchAny] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [modalAddContainertype, setModalAddContainertype] = useState(false);
  const [modalViewContainertype, setmodalViewContainertype] = useState(false);
  const [modalEditContainertype, setModalEditContainertype] = useState(false);

  const [allcontainertype, setallcontainertype] = useState();
  const [containertypeid, setcontainertypeid] = useState("");

  const getData = (current, pageSize) => {
    return allcontainertype?.slice(
      (current - 1) * pageSize,
      current * pageSize
    );
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const [viewcontainertype, setViewcontainertype] = useState({});
  const handleViewClick = (item) => {
    console.log("view containertype", item);
    setViewcontainertype({
      ...viewcontainertype,
      containertype_id: item.container_type_id,
      containertype_shortname: item.container_type_shortname,
      containertype_description: item.container_type_description,
    });
    setmodalViewContainertype(true);
  };

  const handleViewToEdit = (e) => {
    console.log("viewtoeditt", e);
    setcontainertypeid(e.containertype_id);
    addForm.setFieldsValue({
      // Incoterm_id: e.incoterm_id,
      editcontainertype_shortName: e.containertype_shortname,
      editcontainertype_description: e.containertype_description,
    });
    setModalEditContainertype(true);
  };

  const getallcontainertype = async () => {
    try {
      const allcontainertype = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/container_type`
      );
      console.log("getting all containertype", allcontainertype);
      setallcontainertype(allcontainertype?.data?.data);
    } catch (err) {
      console.log("error to fetching  airports", err);
    }
  };
  const createcontainertype = async (data) => {
    try {
      const addcontainertype = await PublicFetch.post(
        `${CRM_BASE_URL_FMS}/container_type`,
        {
          container_type_shortname: data.containertype_short_name,
          container_type_description: data.containertype_description,
        }
      );
      console.log("containertype added successfully", addcontainertype);
      if (addcontainertype.data.success) {
        setModalAddContainertype(false);
        addForm.resetFields();
        getallcontainertype();
        setSuccessPopup(true);
        close_modal(successPopup, 1000);
      } else if (addcontainertype.data.success === false) {
        alert(addcontainertype.data.data);
      }
    } catch (err) {
      console.log("err to add the containertype", err);
    }
  };

  const handleEditclick = (e) => {
    console.log("handleclick editt", e);
    setcontainertypeid(e.container_type_id);
    addForm.setFieldsValue({
      Incoterm_id: e.incoterm_id,
      editcontainertype_shortName: e.container_type_shortname,
      editcontainertype_description: e.container_type_description,
    });
    setModalEditContainertype(true);
  };

  const updatecontainertype = async (data) => {
    try {
      const updatecontainertype = await PublicFetch.patch(
        `${CRM_BASE_URL_FMS}/container_type/${containertypeid}`,
        {
          container_type_shortname: data.editcontainertype_shortName,
          container_type_description: data.editcontainertype_description,
        }
      );
      console.log("containertype updated successfully", updatecontainertype);
      if (updatecontainertype.data.success) {
        setModalEditContainertype(false);
        addForm.resetFields();
        getallcontainertype();
        setSuccessPopup(true);
        close_modal(successPopup, 1000);
      } else if (updatecontainertype.data.success === false) {
        alert(updatecontainertype.data.data);
      }
    } catch (err) {
      console.log("err to add the containertype", err);
    }
  };

  useEffect(() => {
    getallcontainertype();
  }, []);

  const columns = [
    {
      title: "Sl.No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "SHORT NAME",
      dataIndex: "container_type_shortname",
      key: "container_type_shortname",
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
    // {
    //   title: "FULL NAME",
    //   dataIndex: "incoterm_full_name",
    //   key: "incoterm_full_name",
    //   width: "20%",
    // },
    {
      title: "DESCRIPTION",
      dataIndex: "container_type_description",
      key: "container_type_description",
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
                handleEditclick(index);
              }}
            >
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
              // onClick={() => setmodalViewContainertype(true)}
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
  const data = [
    {
      key: "1",
      incoterm_short_name: "Mike",
      incoterm_description: "chdbjd",
    },
    {
      key: "2",
      incoterm_short_name: "Mike",
      incoterm_description: "chdbjd",
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
  const UnitHeads = [["Slno", "SHORT NAME", "DESCRIPTION"]];
  //for pdf download
  const data12 = allcontainertype?.map((item, index) => [
    index + serialNo,
    item.container_type_shortname,
    item.container_type_description,
    // item.unit_description,
  ]);
  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col-4">
            <h5 className="lead_text">Container Types</h5>
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
                name="containertype"
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
        </div>

        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}></div> */}

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
                setModalAddContainertype(true);
                addForm.resetFields();
              }}
            >
              New Container Types
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allcontainertype}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        {/* {add Incoterm modal - Ann} */}
        <Custom_model
          show={modalAddContainertype}
          onHide={() => setModalAddContainertype(false)}
          header="Add Currency"
          footer={false}
          // {...props}
          View_list
          list_content={
            <>
              <div className="row">
                <h5 className="lead_text">New Container Type</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  createcontainertype(data);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12  pt-1">
                    <label>
                      Short Name<span className="req_star">*</span>
                    </label>
                    <Form.Item
                      name="containertype_short_name"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Short Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>

                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item
                      className="mt-2"
                      name="containertype_description"
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                    <Button btnType="save">Save</Button>
                    <Button
                      btnType="cancel"
                      type="reset"
                      //   onClick={() => {
                      //     setModalAddIncoterm(false);
                      //   }}
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
        <Custom_model
          show={modalEditContainertype}
          onHide={() => setModalEditContainertype(false)}
          header="Edit Intcoterm"
          footer={false}
          // {...props}
          View_list
          list_content={
            <>
              <div className="row">
                <h5 className="lead_text">Edit Container Type</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  updatecontainertype(data);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12  pt-1">
                    <label>
                      Short Name<span className="req_star">*</span>
                    </label>
                    <Form.Item
                      name="editcontainertype_shortName"
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
                    <Form.Item
                      className="mt-2"
                      name="editcontainertype_description"
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                    <Button btnType="save">Save</Button>
                    <Button
                      btnType="cancel"
                      type="reset"
                      //   onClick={() => {
                      //     setModalEditIncoterm(false);
                      //   }}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          }
        />

        <Custom_model
          show={modalViewContainertype}
          onHide={() => setmodalViewContainertype(false)}
          View_list
          list_content={
            <div className="container-fluid p-3">
              <div className="row mb-5">
                <div className="col-9">
                  <h5 className="lead_text">Container Type</h5>
                </div>
                <div className="col-3">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      handleViewToEdit(viewcontainertype);
                      // setModalEditContainertype(true);
                      setmodalViewContainertype(false);
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
                    {viewcontainertype.containertype_shortname}
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
                    {viewcontainertype.containertype_description}
                  </p>
                </div>
              </div>
            </div>
          }
        />

        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </div>
    </>
  );
}
export default Containertypes;
