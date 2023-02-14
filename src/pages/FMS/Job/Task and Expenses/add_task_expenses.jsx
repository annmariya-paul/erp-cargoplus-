import React, { useState, useEffect } from "react";

import { Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { InputNumber } from "antd";

import {
  BorderBottomOutlined,
  DragOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import dragula from "dragula";

import "dragula/dist/dragula.css";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import TableData from "../../../../components/table/table_data";
import { FaTrash } from "react-icons/fa";

import { Form } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { Popconfirm } from "antd";
import Custom_model from "../../../../components/custom_modal/custom_model";

import "../job.scss";

export default function Taskexpenses() {
  const [successPopup, setSuccessPopup] = useState(false);

  const [addForm] = Form.useForm();

  const dataSource = [
    {
      key: uuidv4(),
      quotation_details_service_id: "",
      quotation_details_cost: "",
      quotation_details_tax_type: "",
      quotation_details_tax_amount: "",
      quotation_details_total: "",
    },
  ];

  const [tableData, setTableData] = useState(dataSource);
  const [newGrandTotal, setNewGrandTotal] = useState();
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);

  const handleEnter = (e) => {
    console.log("Hello");
    console.log("Key ::::::: ", e.key);
    if (e.key === "Enter" || e.key === "Tab") {
      setTableData([
        ...tableData,
        {
          // key: `${tableData.length + 1}`,
          key: uuidv4(),
          quotation_details_service_id: "",
          quotation_details_cost: "",
          quotation_details_tax_type: "",
          quotation_details_tax_amount: "",
          quotation_details_total: "",
        },
      ]);
    }
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
  const [noofItems, setNoofItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  console.log("page number isss", pagesizecount);
  useEffect(() => {
    GetAllLeadData();
  }, [noofItems, pageofIndex, pagesizecount]);

  const numofItemsTo = noofItems * current;

  const [currentcount, setCurrentcount] = useState();

  const [allLeadList, setAllLeadList] = useState([]);
  console.log("Lead names :", allLeadList);

  const handleDelete = (key) => {
    const newData = tableData?.filter((item) => item?.key !== key);
    setTableData(newData);
    let grandTotal = 0;
    for (let item of newData) {
      grandTotal += item["quotation_details_total"];
    }
    setNewGrandTotal(grandTotal);
    addForm.setFieldsValue({ grandtotal: grandTotal });
  };

  const columns = [
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      width: 30,
      className: "firstrow",

      render: (data, record, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="actionEdit m-0 p-0">
              <DragOutlined className="draggable" type="swap" />
            </div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <div className="deleteIcon m-0">
                <FaTrash />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },

    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks",
      width: "40%",
      align: "center",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_service_id",
              ]}
              rules={[{ required: true, message: "Please select" }]}
            >
              <Select
                bordered={false}
                showArrow={false}
                allowClear
                showSearch
                optionFilterProp="children"
                width={30}
                className="selectwidthexp mb-2"
                value={index.quotation_details_service_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                }}
              >
                {services &&
                  services.length > 0 &&
                  services.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.service_id}
                        value={item.service_id}
                      >
                        {item.service_name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Tax Type",
      dataIndex: "taxtype",
      key: "taxtype",
      width: "15%",
      align: "center",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_service_id",
              ]}
              rules={[{ required: true, message: "Required" }]}
            >
              <InputType
                style={{ border: "none" }}
                className="input_type_style_new"
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Tax %",
      dataIndex: "taxp",
      key: "taxp",
      width: "5%",
      align: "center",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_service_id",
              ]}
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber
                bordered={false}
                className="text_right"
                value={index.quotation_details_cost}
                onChange={(value) => {
                  console.log(" input numberevent ", value, index.key);
                }}
                align="right"
                min={0}
                precision={2}
                controlls={false}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
      width: 150,
      align: "center",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_service_id",
              ]}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                bordered={false}
                showArrow={false}
                width={"1000px"}
                allowClear
                showSearch
                optionFilterProp="children"
               
 
                value={index.quotation_details_service_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                }}
              >
                {services &&
                  services.length > 0 &&
                  services.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.service_id}
                        value={item.service_id}
                      >
                        {item.service_name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
        );
      },
    },

    {
      title: "Cost",
      width: 200,
      align: "center",
      className: "secondrow",
      children: [
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          width: 60,
          align: "center",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_service_id",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Tax",
          dataIndex: "tax",
          key: "tax",
          width: 60,
          align: "center",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Total",
          dataIndex: "total",
          key: "total",
          width: 100,
          //   width: 80,
          //   fixed: 'right',
          align: "center",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Expense",
      width: 200,
      align: "center",
      className: "thirdrow",
      children: [
        {
          title: "Currency",
          dataIndex: "currency",
          key: "currency",
          width: 60,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_service_id",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Select
                    bordered={false}
                    showArrow={false}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    className="selectwidthexp mb-2"
                    value={index.quotation_details_service_id}
                    onChange={(e) => {
                      console.log("servicess11123", e);
                    }}
                  >
                    {services &&
                      services.length > 0 &&
                      services.map((item, index) => {
                        return (
                          <Select.Option
                            key={item.service_id}
                            value={item.service_id}
                          >
                            {item.service_name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </div>
            );
          },
        },

        {
          title: "Exchange",
          dataIndex: "exchange",
          key: "exchange",
          width: 60,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Amount Fx",
          dataIndex: "amountfx",
          key: "amountfx",
          width: 100,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Amount Lx",
          dataIndex: "amountlx",
          key: "amountlx",
          width: 100,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    onKeyDown={(e) => handleEnter(e, index.key)}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
          //   fixed: 'right',
        },
      ],
    },
  ];

  const [total, setTotal] = useState(0);
  const [leadId, setLeadId] = useState("");

  console.log("Selected lead id is ", leadId);
  const handleLeadId = (leadId) => {
    setLeadId(leadId);
  };

  console.log("total ", total);
  const GetAllLeadData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/lead?startIndex=${pageofIndex}&noOfItems=${noofItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          setCurrentcount(res?.data?.data?.currentCount);
          let array = [];
          res?.data?.data?.leads?.forEach((item, index) => {
            array.push({
              lead_id: item?.lead_id,
              lead_customer_name: item?.lead_customer_name,
            });
            setAllLeadList(array);
            handleLeadId(item.lead_id);
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);

  const [leadIdEnq, setLeadIdEnq] = useState("");

  console.log("Selected  enquiry lead id is ", leadIdEnq);
  const handleLeadIdEnq = (leadIdenq) => {
    addForm.setFieldValue("consignee", leadIdenq);
    setLeadIdEnq(leadIdenq);
  };

  const [oppleadid, setOppleadid] = useState();
  console.log("Opportunities lead id :::", oppleadid);
  const [numOfItems, setNumOfItems] = useState("25");

  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);
  const [allservices, setAllservices] = useState();
  const [allLocations, setAllLocations] = useState();
  console.log("locations ", allLocations);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Task & Expenses</h5>
            </div>
          </div>

          <div className="content-tabs">
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values iss", value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="d-flex justify-content mt-2 mx-1 me-5 mb-5">
                <div className=" d-flex justify-content mt-3 me-5 ">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: "90px", fontWeight: "bold" }}>
                          {" "}
                          Job No
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "190px" }}>JQ 003</td>

                        <td style={{ width: "90px", fontWeight: "bold" }}>
                          Job Date
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "90px" }}>120000</td>

                        <td style={{ width: "190px", fontWeight: "bold" }}>
                          Quotation No
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "70px" }}>QP 003</td>
                      </tr>
                      <tr>
                        <td style={{ width: "120px", fontWeight: "bold" }}>
                          Consignee
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "70px" }}>Test</td>

                        <td style={{ width: "120px", fontWeight: "bold" }}>
                          {" "}
                          Shipper
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "160px" }}>Test </td>

                        <td style={{ width: "120px", fontWeight: "bold" }}>
                          AWB/BL No
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "190px" }}>QP 00399</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="datatable">
                  <TableData
                    data={tableData}
                    columns={columns}
                    rowKey={(record) => record.key}
                    bordered
                    custom_table_css="table_qtn task_expense_table"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-2 mx-1 me-5">
                <div className=" d-flex justify-content mt-3 me-5 ">
                  <table>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          Total Cost
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                          120000
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            width: "120px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          Total Expenses
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                          10000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex justify-content-center my-4">
                <div className="col-lg-1 ">
                  <Button type="submit" className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
              </div>
            </Form>

            <Custom_model
              size={"sm"}
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
              success
            />
          </div>
        </div>
      </div>
    </>
  );
}
