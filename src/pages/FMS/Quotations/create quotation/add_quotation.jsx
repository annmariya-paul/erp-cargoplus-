import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import TableData from "../../../../components/table/table_data";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { AiOutlineDelete } from "react-icons/ai";
import FileUpload from "../../../../components/fileupload/fileUploader";
import { Collapse, Form, Input } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import {Select} from "antd";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";

import { DatePicker } from "antd";
import "./quotation.scss";
import { RightOutlined } from "@ant-design/icons";
import Input_Number from "../../../../components/InputNumber/InputNumber";

export default function Add_Quotation(
  custom_table_css,
  expandable,
  expandIconColumnIndex
) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState();
  console.log(date);

  const [addForm] = Form.useForm();
  const navigate = useNavigate();
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [amount, setAmount] = useState(0);

  const handleChange = (value) => {
    setAmount(value);
  };
  // const TableContainer = styled.div`overflow-y: scroll`;
  const [searchType, setSearchType] = useState("");
  const [rows, setRows] = useState([
    {
      id: 1,
      tasks: [],
      cost: "",
      taxtype: "",
      taxamount: "",
      totalamount: "",
    },
  ]);
  console.log("rows are :", rows);

  const [taskList, setTasks] = useState(rows);
  const handleKeyDown = useCallback(
    (e, id) => {
      if (e.keyCode === 13 || e.keyCode === 9) {
        const newId = rows.length + 1;
        setRows([
          ...rows,
          {
            id: newId,
            tasks: [],
            cost: "",
            taxtype: "",
            taxamount: "",
            totalamount: "",
          },
        ]);
      }
    },
    [rows]
  );
  function handleDragEnd(e) {
    console.log("event",e);
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows([...tempData]);
    var updatedArr = tempData.map(function (item, index) {
      return { id: item.key, orderNumber: index + 1 };
    });
  }

  function handleDelete(id) {
    const newRows = rows.filter((li) => li.id !== id);
    setRows(newRows);
  }
  // const columns = [

  //   {
  //     title: "TASKS",
  //     dataIndex: "tasks",
  //     key: "tasks",

  //     render: (data, index) => {
  //       console.log("index is :",index);
  //       return (
  //         <div className="d-flex justify-content-center align-items-center ">

  //               <SelectBox>
  //               <Select.Option value="sales">sales</Select.Option>
  //                       <Select.Option value="support">support</Select.Option>
  //               </SelectBox>

  //         </div>
  //       );
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "COST",
  //     dataIndex: "cost",
  //     key: "cost",
  //     render: (data, index) => {
  //       console.log("index is :",index);
  //       return (
  //         <div className="d-flex justify-content-center align-items-center ">

  //              <InputType/>

  //         </div>
  //       );
  //     },

  //     align: "center",
  //   },
  //   {
  //     title: "TAX TYPE",
  //     dataIndex: "taxtype",
  //     key: "taxtype",

  //     render: (data, index) => {
  //       console.log("index is :",index);
  //       return (
  //         <div className="d-flex justify-content-center align-items-center ">

  //              <InputType/>

  //         </div>
  //       );
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "TAX AMOUNT",
  //     dataIndex: "taxamount",
  //     key: "taxamount",
  //     render: (data, index) => {
  //       console.log("index is :",index);
  //       return (
  //         <div className="d-flex justify-content-center align-items-center ">

  //              <InputType/>

  //         </div>
  //       );
  //     },

  //     align: "center",
  //   },
  //   {
  //     title: "TOTAL AMOUNT",
  //     dataIndex: "totalamount",
  //     key: "totalamount",
  //     render: (data, index) => {
  //       console.log("index is :",index);
  //       return (
  //         <div className="d-flex justify-content-center align-items-center ">

  //              <InputType/>

  //         </div>
  //       );
  //     },

  //     align: "center",
  //   },

  // ];
  // const data = [
  //   {
  //      tasks: "ABC",
  //      cost:"data",
  //      taxtype:"abc",
  //      taxamount:"xyz",
  //      totalamount:"1000",

  //      key: "1",
  //   },
  //   {
  //     tasks: "Test",
  //     cost:"1000",
  //     taxtype:"abc",
  //     taxamount:"xyz",
  //     totalamount:"5000",

  //       key: "2",
  //   },
  //   {
  //     tasks: "Demo",
  //     cost:"data",
  //     taxtype:"abc",
  //     taxamount:"xyz",
  //     totalamount:"1000",

  //       key: "3",
  //   },
  // ];

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
                {/* <div className="containerdesig "> */}
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
                          // defaultValue={today}
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
                          // defaultValue={today}
                          // defaultValue={dayjs()}
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
                        <SelectBox>
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
                        <SelectBox>
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
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="S">Ship</Select.Option>
                          <Select.Option value="A">Air</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="S">Test</Select.Option>
                          <Select.Option value="A">Data</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Mode</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a mode",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
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
                        <SelectBox>
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
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
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
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <SelectBox>
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
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
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
                    <div className="tablecontainer">
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

                                        {/* {rows.map(row => ( */}
                                        {/* <tr key={row.id} className="tablewidth"> */}
                                        <td className="hiddenid">{row.id}</td>
                                        <td className="tborder" width="20%">
                                          <Select
                                           allowClear
                                           showSearch
                                          optionFilterProp="children"
                                         
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
                                          className=" select_search selectwidth mb-2">
                                            <Select.Option value="Airline">
                                              FREIGHT CHARGES WITH EX WORK
                                            </Select.Option>
                                            <Select.Option value="Shipper">
                                              Shipper
                                            </Select.Option>
                                            <Select.Option value="Road">
                                              Road
                                            </Select.Option>
                                          </Select>
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
                                {/* {provided.placeholder} */}
                              </tbody>
                            )}
                          </Droppable>
                      </table>
                      </DragDropContext>

                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4 mx-3 ">
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
