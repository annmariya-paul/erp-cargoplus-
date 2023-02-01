import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { message, Checkbox } from "antd";
import { Input, Select } from "antd";
import TableData from "../../../components/table/table_data";
import MyPagination from "../../../components/Pagination/MyPagination";
import Custom_model from "../../../components/custom_modal/custom_model";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import { ROUTES } from "../../../routes";
import { Form } from "antd";
import InputType from "../../../components/Input Type textbox/InputType";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiFileSearchFill } from "react-icons/ri";
import PublicFetch from "../../../utils/PublicFetch";

function ListAgent() {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [agentdata, setAgentdata] = useState("");

  const [addForm] = Form.useForm();

  const getData = (current, pageSize) => {
    return agentdata?.slice((current - 1) * pageSize, current * pageSize);
  };

  const getagents = async () => {
    try {
      const allagent = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/agents`
      );
      console.log("all agentss are ::", allagent?.data?.data);
      let array = [];
      allagent?.data?.data?.forEach((item, index) => {
        array.push({
          agent_id: item.agent_id,
          agent_country: item.agent_country,
          agent_emp_id: item.hrms_v1_employee.employee_code,
        });
      });
      setAgentdata(array);
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  useEffect(() => {
    getagents();
  }, []);

  const data = [
    {
      key: "1",
      attribute_name: "color",
      attribute_description: "this is a test",
    },
    {
      key: "2",
      attribute_name: "size",
      attribute_description: "this is a test description",
    },
  ];

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      align: "center",
      key: "ACTION",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="actioneditdelete"
              // className="editIcon m-0"
              // onClick={() =>
              //   handleEditclick(index)}
            >
              <Link to={`${ROUTES.UPDATEAGENT}/${index.agent_id}`}>
                <div className="actioneditdelete">
                  <FaEdit />
                </div>
              </Link>
              {/* <FaEdit /> */}
            </div>
            <div
              className="actioneditdelete "
              // className="viewIcon m-0"
              // onClick={() => handleViewClick(index) }
            >
              <MdDelete />
              {/* <RiFileSearchFill /> */}
            </div>
            <div
              // className="deleteIcon m-0"
              className="actioneditdelete"
            >
              {/* <MdDelete /> */}
            </div>
          </div>
        );
      },
    },
    // {
    //   title: "Oppurtunity Name",
    //   dataIndex: "attribute_name",
    //   key: "NAME",
    //   width: "25%",
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     console.log("valuesss in", record )
    //     return String(record.attribute_name)
    //       .toLowerCase()
    //       .includes(value.toLowerCase()) || String(record.attribute_description)
    //       .toLowerCase()
    //       .includes(value.toLowerCase())
    //   },
    //   align: "left",
    // },
    {
      title: "Country",
      dataIndex: "agent_country",
      key: "NAME",
      width: "25%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        console.log("valuesss in", record);
        return (
          String(record.attribute_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.attribute_description)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
      title: "Employee Code",
      dataIndex: "agent_emp_id",
      width: "30%",
      key: "DESCRIPTION",

      align: "left",
    },
  ];

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">List Agent</h5>
          </div>

          {/* <Leadlist_Icons
              datas={attributes}
              columns={filteredColumns}
              items={data12}
              xlheading={AttributeHeads}
              filename="data.csv"
            
              chechboxes={
                <Checkbox.Group onChange={onChange} value={selectedColumns}>
                  {columnsKeys.map((column) => (
                    <li>
                      <Checkbox value={column} key={column}>
                        {column}
                      </Checkbox>
                    </li>
                  ))}
                </Checkbox.Group>
              }
               /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Name and Description "
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
          <div className="col-4 px-3 ">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-2"> 25</span>
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
          <div className=" col-4 d-flex py-2 justify-content-center">
          <MyPagination
            total={agentdata?.length}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>
          <div className="col-4 mb-2 px-4">
            <Link to={ROUTES.CREATEAGENT} style={{ color: "white" }}>
              <Button btnType="add">Add Agent</Button>
            </Link>
          </div>
        </div>

        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={data}
            columns={columns}
            // columns={filteredColumns}
            custom_table_css="attribute_table"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={agentdata?.length}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>

        <Custom_model
          size={"sm"}
          // show={showModalEdit}
          // onHide={() => setShowModalEdit(false)}
          // header="Attributes"
          footer={false}
          // {...props}
          View_list
          list_content={
            <div className="container-fluid p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="lead_text">Attribute</h5>
                </div>
              </div>

              <Form
                form={addForm}
                onFinish={(values) => {
                  console.log("values iss", values);
                  // handleupdate()
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-1">
                  <div className="col-sm-6 pt-3">
                    <label>Name</label>
                    <Form.Item
                      name="attribute"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid attributename",
                        },
                        {
                          whitespace: true,
                        },
                        {
                          min: 3,
                          message: "attribute name must be 3 characters",
                        },
                        {
                          max: 100,
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 pt-3">
                    <label>Description</label>
                    <Form.Item
                      name="description"
                      rules={[
                        // {
                        //   required: true,
                        //   pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                        //   message: "Please enter valid description",
                        // },

                        {
                          whitespace: true,
                        },
                        {
                          min: 2,
                        },
                        {
                          max: 500,
                        },
                      ]}
                    ></Form.Item>
                  </div>
                </div>
                <div className="row justify-content-center mt-5">
                  <div className="col-1">
                    <Button btnType="save">Save</Button>
                  </div>
                </div>
              </Form>
            </div>
          }
        />
      </div>
    </>
  );
}
export default ListAgent;
