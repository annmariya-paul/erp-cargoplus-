import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {AiFillDelete} from "react-icons/ai";
import { DragOutlined } from "@ant-design/icons";
import dragula from "dragula";
import "dragula/dist/dragula.css";
import TableData from "../../../../components/table/table_data";
import { FaTrash } from "react-icons/fa";

import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";

import { GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";

import FileUpload from "../../../../components/fileupload/fileUploader";
import {Form} from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";

import { Select,Popconfirm } from "antd";

import { useNavigate } from "react-router-dom";

import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";

import { DatePicker } from "antd";
import "./quotation.scss";

import Input_Number from "../../../../components/InputNumber/InputNumber";

export default function Add_Quotation(
  custom_table_css,
 
) {
 

  const [saveSuccess, setSaveSuccess] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState();
  console.log(date);

  const [addForm] = Form.useForm();
  
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [amount, setAmount] = useState(0);

  const handleChange = (value) => {
    setAmount(value);
  };
  const getIndexInParent = (el) => Array.from(el.parentNode.children).indexOf(el);
  const [yourTableData, setYourTableData] = useState([
    {
     
      id: "",
      tasks: [],
      cost: "",
      taxtype: "",
      taxamount: "",
      totalamount: "",
    },
  ]);
  const handleReorder = (dragIndex, draggedIndex) => {
    setYourTableData((oldState) => {
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
      handleReorder(start,end);
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
    const newData = yourTableData?.filter((item) => item?.key !== key);
    setYourTableData(newData);
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
                 





                  <div
            
              className="actionEdit m-0 p-0"
            >
              <DragOutlined className="draggable" type="swap" />
            </div>
           
               
                </div>
              );
            },
      
    },
    {
      title: '',
      dataIndex: 'operation',
       render: (_, record) =>
      yourTableData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
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
              value={amount}
              onChange={handleChange}
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
              value={amount}
              onChange={handleChange}
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
              value={amount}
              onChange={handleChange}
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
     
      onCell: (record) => ({
        onKeyDown: (e) => handleKeyDown(e, record.key),
      }),
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              value={amount}
              onChange={handleChange}
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
   
  ];

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
    
      const data = [...yourTableData];

    
      const newRow = {
        key: data.length + 1,
        tasks: [],
        cost: "",
        taxtype: "",
        taxamount: "",
        totalamount: "",
      };

      // Insert the new row in the appropriate position
      data.splice(index + 1, 0, newRow);

      // Update the table data
      setYourTableData(data);
    }
  };
 

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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                    {/* <div className="tablecontainer">
                    <DragDropContext onDragEnd={handleDragEnd}>

                      <table className="table tborder">
                        <thead className="tborder">
                          <tr>
                            <th className="tborder" width="6%">Action</th>
                            
                            <th className="hiddenid">ID</th>
                            <th className="tborder">TASKS</th>
                            <th className="tborder text-right">COST</th>
                            <th className="tborder text-right">TAX TYPE</th>
                            <th className="tborder text-right">TAX AMOUNT</th>
                            <th className="tborder text-right">TOTAL AMOUNT</th>
                          </tr>
                        </thead>
                          <Droppable droppableId="table-rows">
                            {(provided) => (
                              <tbody
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="tborder"
                              >
                                {rows && rows.length > 0 && rows?.map((row, index) => {
                                  console.log("rowwwwws",row);
                                  return(
                                    <Draggable
                                    draggableId={row.id}
                                    key={row.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <tr 
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                      >
                                        <td width="6%"
                                        {...provided.dragHandleProps}
                                        style={{ width: 59,paddingLeft:"4px" }}>
                                        <div className="d-flex">
                                          <div
                                          
                                          >
                                            <MdDragHandle size={16} />
                                          </div>
                                          <div 
                                           onClick={() => handleDelete(row.id)}
                                          >
                                            <AiOutlineDelete size={15}  />
                                          </div>
                                          </div>
                                        </td>

                                       
                                        <td className="hiddenid">{row.id}</td>
                                        <td className="tborder" width="20%">
                                          <SelectBox
                                           allowClear
                                           showSearch
                                          optionFilterProp="children"
                                         
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
                                          className="selectwidth mb-2">
                                            <Select.Option value="Airline">
                                              FREIGHT CHARGES WITH EX WORK
                                            </Select.Option>
                                            <Select.Option value="Shipper">
                                              Shipper
                                            </Select.Option>
                                            <Select.Option value="Road">
                                              Road
                                            </Select.Option>
                                          </SelectBox>
                                        </td>
                                        <td className="tborder my-1 ">
                                    
                                          <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                          />
                                        </td>
                                        <td className="tborder">
                                          <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                          />
                                        </td>
                                        <td className="tborder">
                                          
                                          <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                          />
                                        </td>
                                        <td className="tborder" width="16%">
                                       <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                            onKeyDown={(e) =>
                                              handleKeyDown(e, row.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    )}
                                  </Draggable>
                                  )
                                }
                                  
                                )}
                             
                              </tbody>
                            )}
                          </Droppable>
                      </table>
                      </DragDropContext>

                    </div> */}
                    {/* tablenew */}
                    <TableData
                      data={yourTableData}
                    
                      columns={columns}
                   
                      // custom_table_css="table_lead_list"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4 mx-5">
                <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                  <p style={{ fontWeight: 500 }}>Grand Total</p>
                </div>

                <div className="col-lg-2 col-sm-2 col-xs-2">
                  <Form.Item
                    name="gtotal"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid value",
                      },
                    ]}
                  >
                    {/* <InputType className="text-right" /> */}
                    <Input_Number
                      className="text_right"
                      value={amount}
                      onChange={handleChange}
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
