
import React, { useState } from "react";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import TableData from "../../../../components/table/table_data";
import { Input, Select, Checkbox, Form } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Custom_model from "../../../../components/custom_modal/custom_model";

function Containertypes(){

    const [addForm] = Form.useForm();
    const [serialNo, setserialNo] = useState(1);
    const [searchAny, setSearchAny] = useState("");
    const [successPopup, setSuccessPopup] = useState(false);

    const [modalAddContainertype, setModalAddContainertype] = useState(false);
    const [modalViewContainertype, setmodalViewContainertype] = useState(false);
    const [modalEditContainertype, setModalEditContainertype] = useState(false);


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
        // {
        //   title: "FULL NAME",
        //   dataIndex: "incoterm_full_name",
        //   key: "incoterm_full_name",
        //   width: "20%",
        // },
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
                  // onClick={() => {
                  //   IncotermEdit(index);
                  // }}
                  onClick={() => setModalEditContainertype(true)}
                >
                  <FaEdit />
                </div>
                <div
                  className="viewIcon m-0"
                  // onClick={() => handleViewClick(index)}
                  onClick={() => setmodalViewContainertype(true)}
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
          key: '1',
          incoterm_short_name: 'Mike',
          incoterm_description: "chdbjd",
        },
        {
          key: '2',
          incoterm_short_name: 'Mike',
          incoterm_description: "chdbjd",
        },
      ];
    return(
        <>

        <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Container Types</h5>
          </div>
        </div>

        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
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
        </div>

        <div className="row my-3">
          <div className="col-4 ">
            <Select
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
            </Select>
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
             New ContainerTypes
            </Button>
          </div>
        </div>
        <div className="datatable">
           
          <TableData
            // data={getData(current, pageSize)}
            data={data}
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
                <h5 className="lead_text">New Containertype</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                //   AddIntercorm(data);
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
                <h5 className="lead_text">Edit ContainerType</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                //   updateIncoterm(data);
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
                  <h5 className="lead_text">Containertype</h5>
                </div>
                <div className="col-3">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      setModalEditContainertype(true)
                      // IncotermViewToEdit(viewIncoterm);
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
                    {/* {viewIncoterm.incoterm_short_name} */}
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
                    {/* {viewIncoterm.incoterm_full_name} */}
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
                    {/* {viewIncoterm.incoterm_description} */}
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </div>
        </>
    )
}
 export default Containertypes;