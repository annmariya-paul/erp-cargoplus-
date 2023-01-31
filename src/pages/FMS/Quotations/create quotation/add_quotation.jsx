import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { DragOutlined, FontColorsOutlined } from "@ant-design/icons";
import dragula from "dragula";
import "dragula/dist/dragula.css";
import TableData from "../../../../components/table/table_data";
import { FaTrash } from "react-icons/fa";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import { GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import FileUpload from "../../../../components/fileupload/fileUploader";
import { Form } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { Select, Popconfirm } from "antd";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { DatePicker } from "antd";
import "./quotation.scss";
import Input_Number from "../../../../components/InputNumber/InputNumber";

export default function Add_Quotation(custom_table_css) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState();
  const [addForm] = Form.useForm();
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const dataSource = [
    {
      key: "1",
      tasks: "",
      cost: "",
      taxtype: "",
      taxamount: "",
      totalamount: "",
    },
  ];
  const [tableData, setTableData] = useState(dataSource);
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);
  const handleInputChange = (e, key, col,) => {
    setTableData(
      tableData.map((item) => {
        if (item.key === key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
  };
  const handleInputChange2 = (e, index, col,) => {
    setTableData(
      tableData.map((item) => {
        if (item.key === index.key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
  };

  const handleEnter = (e) => {
    console.log("Hello");
    console.log("Key ::::::: ", e.key);
    if (e.key === "Enter" || e.key === "Tab") {
      setTableData([
        ...tableData,
        {
          key: `${tableData.length + 1}`,
          tasks: "",
          cost: "",
          taxtype: "",
          taxamount: "",
          totalamount: "",
        },
      ]);
     
    }
    console.log("tabledata",tableData)
    let sum = 0;
    tableData.forEach((item)=>{
      sum += item.cost + item.taxamount
    })
    console.log("sum",sum)
    setTotal(sum)
  };

  const handleReorder = (dragIndex, draggedIndex) => {
    setTableData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      return newState;
    });
  };
  React.useEffect(() => {
    let start;
    let end;
    const container = document.querySelector(".ant-table-tbody");
    const drake = dragula([container], {
      moves: (el) => {
        start = getIndexInParent(el);
        return true;
      },
    });

    drake.on("drop", (el) => {
      end = getIndexInParent(el);
      handleReorder(start, end);
    });
  }, []);

  const [frighttype, setFrighttype] = useState();
  const [currencydata, setCurrencydata] = useState();
  const [carrierdata, setCarrierdata] = useState();


  const getallcarrier = async () => {
    try {
      const getcarrier = await PublicFetch.get(`${CRM_BASE_URL_FMS}/carrier`);
      console.log("Getting all carrier : ", getcarrier.data.data);
      setCarrierdata(getcarrier.data.data);
    } catch (err) {
      console.log("Error in getting carrier : ", err);
    }
  };

  const getallcurrency = async () => {
    try {
      const allcurrency = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/currency`
      );
      console.log("Getting all currency : ", allcurrency.data.data);
      setCurrencydata(allcurrency.data.data);
    } catch (err) {
      console.log("Error in getting currency : ", err);
    }
  };

  const getallfrighttype = async () => {
    try {
      const allfrighttypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/freightTypes`
      );
      console.log("Getting all frieght types : ", allfrighttypes.data.data);
      setFrighttype(allfrighttypes.data.data);
    } catch (err) {
      console.log("Error in fetching fright types : ", err);
    }
  };
  useEffect(() => {
    getallfrighttype();
    getallcurrency();
    getallcarrier();
  }, []);

  const handleDelete = (key) => {
    const newData = tableData?.filter((item) => item?.key !== key);
    setTableData(newData);
  };
  const handleadd = (index) => {
   console.log("hello",index);
   
  };
  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "drag-visible",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="actionEdit m-0 p-0">
              <DragOutlined className="draggable" type="swap" />
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        tableData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </Popconfirm>
        ) : null,
    },
    {
      title: "TASKS",
      dataIndex: "tasks",
      key: "tasks",
      width: "40%",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <SelectBox
              allowClear
              showSearch
              optionFilterProp="children"
              className="selectwidth mb-2"
              value={index.tasks}
              onChange={(e) => handleInputChange(e, index.key, "tasks")}
            >
              <Select.Option value="Airline">
                FREIGHT CHARGES WITH EX WORK
              </Select.Option>
              <Select.Option value="Shipper">Shipper</Select.Option>
              <Select.Option value="Road">Road</Select.Option>
            </SelectBox>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "COST",
      dataIndex: "cost",
      key: "cost",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              value={index.cost}
              onChange={(value) => {
                handleInputChange(value, index.key, "cost");
                console.log(" input numberevent ", value, index.key);
              }}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            />
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TAX TYPE",
      dataIndex: "taxtype",
      key: "taxtype",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder">
            <Input_Number
              className="text_right"
              value={index.taxtype}
              onChange={(e) => handleInputChange(e, index.key, "taxtype")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            />
          </div>
        );
      },
      align: "right",
    },
    {
      title: "TAX AMOUNT",
      dataIndex: "taxamount",
      key: "taxamount",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              value={index.taxamount}
              onChange={(e) => handleInputChange(e, index.key, "taxamount")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            />
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "totalamount",
      key: "totalamount",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              // value={    index.totalamount=(index.cost + index.taxamount)
              // }
              value={   index.cost + index.taxamount
              }
              onChange={(e) => handleInputChange2(e, index, "totalamount")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
              onKeyDown={(e) => handleEnter(e, index.key) }
            />
          </div>
        );
      },

      align: "right",
    },
  ];

  const [total, setTotal] = useState(0);
  console.log("total ",total);

  // useEffect(() => {
  //   setTotal(tableData.reduce((acc, cur) =>
  //   acc + cur.totalamount , 0));
  // }
  // , [tableData]);
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Quotation</h5>
            </div>
          </div>

          <div className="content-tabs" style={{ maxHeight: "2000px" }}>
            <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="container mb-4">
                <div className="row">
                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation No</label>
                      <Form.Item
                        name="quotation_no"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid number",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation date</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ borderWidth: 0, marginTop: 10 }}
                          defaultValue={dayjs()}
                          format={dateFormatList}
                          disabledDate={(d) => !d || d.isBefore(today)}
                          onChange={(e) => {
                            console.log("date mmm", e);
                            setDate(e);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Validity date</label>
                      <Form.Item
                        name="vdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ borderWidth: 0, marginTop: 10 }}
                          disabledDate={(d) => !d || d.isBefore(today)}
                          onChange={(e) => {
                            console.log("date mmm", e);
                            setDate(e);
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="consignee"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Shipper</label>
                      <Form.Item
                        name="shipper"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Origin Agent</label>
                      <Form.Item
                        name="OrginAgent"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination Agent</label>
                      <Form.Item
                        name="corgin"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name="freighttype"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {frighttype &&
                            frighttype.length > 0 &&
                            frighttype.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.freight_type_id}
                                  value={item.freight_type_id}
                                >
                                  {item.freight_type_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name="cargotype"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="S">Test</Select.Option>
                          <Select.Option value="A">Data</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Mode</label>
                      <Form.Item
                        name="mode"
                        rules={[
                          {
                            required: true,
                            message: "Please select a mode",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="S">Shipment</Select.Option>
                          <Select.Option value="B">Cargo</Select.Option>
                          <Select.Option value="C">Airline</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Origin</label>
                      <Form.Item
                        name="corgin"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Destination</label>
                      <Form.Item
                        name="cdest"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name="carrier"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {carrierdata &&
                            carrierdata.length > 0 &&
                            carrierdata.map((item, index) => {
                              return (
                                <Select.Option
                                  value={item.carrier_id}
                                  key={item.carrier_id}
                                >
                                  {item.carrier_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name="terms"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6  mt-2">
                      <label>Number of pieces</label>
                      <Form.Item
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>UOM</label>
                      <Form.Item
                        name="uom"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross Weight</label>
                      <Form.Item
                        name="gweight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={amount}
                          // onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeable Weight</label>
                      <Form.Item
                        name="weight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={amount}
                          // onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Currency</label>
                      <Form.Item
                        name="currency"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {currencydata &&
                            currencydata.length > 0 &&
                            currencydata.map((item, index) => {
                              return (
                                <Select.Option
                                  value={item.currency_id}
                                  key={item.currency_id}
                                >
                                  {item.currency_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Exchange Rate</label>
                      <Form.Item
                        name="exchnagerate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={amount}
                          // onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-6 ">
                  <label>Add Attachments</label>
                  <Form.Item className="mt-2" name="new">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      // onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 2000 && file.file.size < 500000) {
                          // setImg(file.file.originFileObj);
                          console.log("selet imggg", file.file.originFileObj);
                          // setImageSize(false);
                        } else {
                          // setImageSize(true);
                          console.log(
                            "Error in upload, upload image size between 1 kb and  500 kb"
                          );
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="datatable">
                  <div
                    className={`row mt-2 mx-3 qtable_data ${custom_table_css}`}
                  >
                    <TableData data={tableData} columns={columns} />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4 mx-5">
                <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                  <p style={{ fontWeight: 500 }}>Grand Total</p>
                </div>

                <div className="col-lg-2 col-sm-2 col-xs-2">
                  <Form.Item
                   
                  >
                    <Input_Number 
              
                      className="text_right"
                      value={total}
                      fontWeight={1000}
                   
                      // onChange={handleChange}
                      align="right"
                      step={0.01}
                      min={0}
                      precision={2}
                      controlls={false}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
                <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="save">
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>

            <Custom_model
              size={"sm"}
              show={saveSuccess}
              onHide={() => setSaveSuccess(false)}
              success
            />
          </div>
        </div>
      </div>
    </>
  );
}
