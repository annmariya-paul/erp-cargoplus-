import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";

import { MdPageview } from "react-icons/md";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import CheckUnique from "../../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import PageSizer from "../../../../components/PageSizer/PageSizer";

export default function Carrierlist(props) {
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [successPopup, setSuccessPopup] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [searchedCode, setSearchedCode] = useState("");
  const [searchType, setSearchType] = useState("");
  const [modalAddCarrier, setModalAddCarrier] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [CarrierEditPopup, setCarrierEditPopup] = useState(false);
  const [carrierdata, setcarrierdata] = useState();
  const [addcarriername, setAddcarriername] = useState();
  const [addcarriercode, setAddcarriercode] = useState();
  const [addcarriertype, setAddcarriertype] = useState();

  const [editcarriercode, setEditcarriercode] = useState();
  const [editcarriertype, setEditcarriertype] = useState();
  const [editcarriername, setEditcarriername] = useState();
  const [editcarrierid, seteditcarrierid] = useState();
  const [uniqueCode, setuniqueCode] = useState(false);
  const [pageSize, setPageSize] = useState(localStorage.getItem("noofitem"));
  const [current, setCurrent] = useState(1);
  const [editUniqueCode, setEditUniqueCode] = useState();

  // setPageSize(localStorage.getItem("noofitem"))
  console.log("locaal itmm", localStorage.getItem("noofitem"), pageSize);

  const [editForm] = Form.useForm();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return carrierdata?.slice((current - 1) * pageSize, current * pageSize);
  };

  const getallcarrier = async () => {
    try {
      const allcarrier = await PublicFetch.get(`${CRM_BASE_URL_FMS}/carrier`);
      console.log("getting all carrier", allcarrier);
      setcarrierdata(allcarrier.data.data);
      // setAllairports(allairports.data.data)
      // setAttributes(allattributes.data.data);
    } catch (err) {
      console.log("error to fetching  airports", err);
    }
  };

  useEffect(() => {
    getallcarrier();
  }, []);

  const [nameSearch, setNamesearch] = useState();
  const createcarrier = async () => {
    try {
      const addcarrier = await PublicFetch.post(`${CRM_BASE_URL_FMS}/carrier`, {
        carrier_name: addcarriername,
        carrier_code: addcarriercode,
        carrier_type: addcarriertype,
      });
      console.log("airports added successfully", addcarrier);
      if (addcarrier.data.success) {
        setSuccessPopup(true);
        getallcarrier();
        addForm.resetFields();
        setModalAddCarrier(false);
        close_modal(successPopup, 1000);
      } else if (addcarrier.data.success === false) {
        // alert(addcarrier.data.data);
      }
    } catch (err) {
      console.log("err to add the carrier", err);
    }
  };

  const handleupdate = async () => {
    try {
      const updated = await PublicFetch.patch(
        `${CRM_BASE_URL_FMS}/carrier/${editcarrierid}`,
        {
          carrier_name: editcarriername,
          carrier_code: editcarriercode,
          carrier_type: editcarriertype,
        }
      );
      console.log("successfully updated ", updated);
      if (updated.data.success) {
        setSuccessPopup(true);
        setCarrierEditPopup(false);
        getallcarrier();
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("error to update carrier");
    }
  };

  const carrierEdit = (e) => {
    console.log("carrier edit", e);
    seteditcarrierid(e.carrier_id);
    setEditcarriername(e.carrier_name);
    setEditcarriercode(e.carrier_code);
    setEditcarriertype(e.carrier_type);

    // setCarrier_id(e.carrier_id);
    editForm.setFieldsValue({
      carrier_id: e.carrier_id,
      carriername: e.carrier_name,
      carriercode: e.carrier_code,
      carriertype: e.carrier_type,
    });
    setCarrierEditPopup(true);
  };
  const [viewcarriers, setViewCarriers] = useState({
    id: "",
    carrierviewname: "",
    carrierviewcode: "",
    carrierviewtype: "",
  });
  const handleViewClick = (item) => {
    console.log("view all carrier", item);
    setViewCarriers({
      ...viewcarriers,
      id: item.carrier_id,
      carrierviewname: item.carrier_name,
      carrierviewcode: item.carrier_code,
      carrierviewtype: item.carrier_type,
    });

    setShowViewModal(true);
  };

  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    seteditcarrierid(i.id);
    setEditcarriername(i.carrierviewname);
    setEditcarriercode(i.carrierviewcode);
    setEditcarriertype(i.carrierviewtype);

    editForm.setFieldsValue({
      // unitid: e.unit_id,
      // carrier: i.carrierviewname,
      carriername: i.carrierviewname,
      carriercode: i.carrierviewcode,
      carriertype: i.carrierviewtype,
    });
    setCarrierEditPopup(true);
  };

  const [serialNo, setserialNo] = useState(1);
  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "13%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "CARRIER NAME",
      dataIndex: "carrier_name",
      key: "carrier_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.carrier_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.carrier_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.carrier_type)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
      title: "CARRIER CODE",
      dataIndex: "carrier_code",
      key: "carrier_code",
      // filteredValue: [searchedCode],
      // onFilter: (value, record) => {
      //   return String(record.carrier_code)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "CARRIER TYPE",
      dataIndex: "carrier_type",
      key: "carrier_type",
      // filteredValue: [searchType],
      // onFilter: (value, record) => {
      //   return ;
      // },
      align: "left",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        // console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="editIcon m-0" onClick={() => carrierEdit(index)}>
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

  const [carriername, setCarriername] = useState();
  const [carrier_id, setCarrier_id] = useState();

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
  const UnitHeads = [["Slno", "CARRIER NAME", "CARRIER CODE", "	CARRIER TYPE"]];
  //for pdf download
  const data12 = carrierdata?.map((item, index) => [
    index + serialNo,
    item.carrier_name,
    item.carrier_code,
    item.carrier_type,
  ]);
  //heder icons end

  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col-4">
            <h5 className="lead_text">Carriers</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search "
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
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                name="carrier"
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Select
              allowClear
              showSearch
              style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
              placeholder="Search by Carrier Type"
              className="select_search"
              optionFilterProp="children"
              onChange={(event) => {
                setSearchType(event ? [event] : []);
              }}
            >
              <Select.Option value="Airline">Airline</Select.Option>
              <Select.Option value="Shipping line">Shipping line</Select.Option>
              <Select.Option value="Road">Road</Select.Option>
            </Select>
          </div>

        </div> */}
        <div className="row my-3">
          <div className="col-4 px-3">{/* <PageSizer/> */}</div>
          <div className=" col-4 d-flex  align-items-center justify-content-center">
            {/* {carrierdata && (
              <MyPagination
                total={parseInt(carrierdata?.length)}
                current={current}
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={(current, pageSize) => {
                  setCurrent(current);
                  setPageSize(pageSize);
                }}
              />
            )} */}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button btnType="add" onClick={() => setModalAddCarrier(true)}>
              New Carrier
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={carrierdata}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {/* {carrierdata && (
            <MyPagination
              total={parseInt(carrierdata?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          )} */}
        </div>
      </div>

      <CustomModel
        show={modalAddCarrier}
        onHide={() => setModalAddCarrier(false)}
        header="Add Carrier"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">New Carrier</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                createcarrier();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Carrier Name</label>
                  <div>
                    <Form.Item
                      name="carrier_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },

                        {
                          min: 3,
                          message: "Name must be at least 3 characters",
                        },
                        {
                          max: 100,
                          message: " Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={addcarriername}
                        onChange={(e) => {
                          setAddcarriername(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Carrier Code</label>
                  <div>
                    <Form.Item
                      name="carrier_code"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Code",
                        },

                        {
                          min: 2,
                          message: "code must be at least 2 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={addcarriercode}
                        onChange={(e) => {
                          setAddcarriercode(e.target.value);
                          setuniqueCode(false);
                        }}
                        onBlur={async () => {
                          // checkAttributeNameis();
                          let a = await CheckUnique({
                            type: "carriercode",
                            value: addcarriercode,
                          });
                          console.log("hai how are u", a);
                          setuniqueCode(a);
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <div>
                        <label style={{ color: "red" }}>
                          carrier Code {UniqueErrorMsg.UniqueErrName}
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Carrier Type</label>
                  <div>
                    <Form.Item
                      name="carrier_type"
                      rules={[
                        {
                          required: true,

                          message: "Please select a Valid Carrier Type",
                        },
                      ]}
                    >
                      <SelectBox
                        value={addcarriertype}
                        onChange={(e) => {
                          setAddcarriertype(e);
                        }}
                      >
                        <Select.Option value="Airline">Airline</Select.Option>
                        <Select.Option value="Shipping line">
                          Shipping Line
                        </Select.Option>
                        <Select.Option value="Road">Road</Select.Option>
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
      >
        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </CustomModel>

      <Custom_model
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-9">
                <h5 className="lead_text">Carrier</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewcarriers);
                    // setShowModalEdit(true);
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
                <p> Carrier Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewcarriers.carrierviewname}{" "}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Carrier Code</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewcarriers.carrierviewcode}{" "}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Carrier Type</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewcarriers.carrierviewtype}{" "}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <Custom_model
        show={CarrierEditPopup}
        onHide={() => setCarrierEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Carrier</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    handleupdate();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="carriername"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid  Name",
                        },
                        {
                          min: 2,
                          message: "Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message: "Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        className="input_type_style w-100"
                        value={editcarriername}
                        onChange={(e) => {
                          setEditcarriername(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Carrier Code</label>
                    <div>
                      <Form.Item
                        name="carriercode"
                        rules={[
                          {
                            required: true,

                            message: "Please enter a Valid  Code",
                          },
                          {
                            min: 2,
                            message: "code must be at least 2 characters",
                          },
                        ]}
                      >
                        <InputType
                          value={editcarriercode}
                          onChange={(e) => {
                            setEditcarriercode(e.target.value);
                            setUniqueEditCode(false);
                          }}
                          onBlur={async () => {
                            if (editUniqueCode !== editcarriercode) {
                              let c = await CheckUnique({
                                type: "carriercode",
                                value: editcarriercode,
                              });
                              setUniqueEditCode(c);
                            }
                          }}
                        />
                      </Form.Item>
                      {uniqueEditCode ? (
                        <p style={{ color: "red" }}>
                          Carrier code {uniqueErrMsg.UniqueErrName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Carrier Type</label>
                    <div>
                      <Form.Item
                        name="carriertype"
                        rules={[
                          {
                            required: true,

                            message: "Please select a Valid Carrier Type",
                          },
                        ]}
                      >
                        <SelectBox
                          value={editcarriertype}
                          onChange={(e) => {
                            setEditcarriertype(e);
                          }}
                        >
                          <Select.Option value="Airline">Airline</Select.Option>
                          <Select.Option value="Shipping line">
                            Shipping line
                          </Select.Option>
                          <Select.Option value="Road">Road</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
              </div>
              {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        }
      />
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : " "}
    </>
  );
}
