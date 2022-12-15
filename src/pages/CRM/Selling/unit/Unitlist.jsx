import React, { useEffect, useState } from "react";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import "../../../CRM/lead/lead_list/leadlist.scss";
import { Input, Select, Checkbox, Form, message, Popconfirm } from "antd";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiFileSearchFill } from "react-icons/ri";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Custom_model from "../../../../components/custom_modal/custom_model";
import Button from "../../../../components/button/button";
import "./viewunit.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import { useForm } from "react-hook-form";

function Unitlist() {
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //Add Bransearch by type select box
  const [searchStatus, setSearchStatus] = useState("");

  const [editShow, setEditShow] = useState(false);
  const [viewUnitModal, setViewUnitModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
 const [allunit,setAllunit]=useState([]);
 const[unitTable,setunitTable]=useState("");
const [unitName,setUnitName]= useState("");
const [unitcode,setUnitCode]=useState("");
const [unitDescription,setUnitDescription]= useState("");
const[unitid,setUnitid]=useState();
const [editForm]= Form.useForm();

 const getData = (current, pageSize) => {
  return unitTable?.slice((current - 1) * pageSize, current * pageSize);
};

const [viewUnit, setViewUnit]=useState({
  id:"",
  unitname:"",
  unitcode:"",
  unitdescription:"",
  unit_status:"",
  
})

// const [editunit,setEditunit]= useState({
//   unitid:"",
//   units_name:"",
//   units_code:"",
//   units_description:""
// })

// function to view units

const handleViewClick=(item)=>{
console.log("view units iss",item)
setViewUnit({
  ...viewUnit,
  id:item.unit_id,
  unitname:item?.unit_name,
  unitcode:item?.unit_code,
  unitdescription:item?.unit_description,
  
})

}

const handleEditonViewpage=(e)=>{
  console.log("editing unitss iss",e)
  setUnitid(e.id)
  setUnitName(e.unitname)
  setUnitCode(e.unitcode)
  setUnitDescription(e.unitdescription)
 
  setViewUnitModal(false);
  editForm.setFieldsValue({
    // unitid: e.unit_id,
    unit_name: e.unitname,
    unit_code: e.unitcode,
    unit_description: e.unitdescription,
  });
  setEditShow(true);
}
// function to editunits

const handleEditclick=(item)=>{
  console.log("editt valuesss",item)
setUnitid(item?.unit_id)  
setUnitName(item?.unit_name)
setUnitCode(item?.unit_code)
setUnitDescription(item?.unit_description)
 editForm.setFieldsValue({
  //  unitid: item.unit_id,
  unit_name: item.unit_name,
  unit_code: item.unit_code,
  unit_description: item.unit_description,
 });
 setEditShow(true);
}

const updateClick=async (id)=>{
try{
const updating= await PublicFetch.patch(
  `${CRM_BASE_URL_SELLING}/unit/${unitid}`,{
    unit_name:unitName,
    unit_code:unitcode,
    unit_description:unitDescription
  })
  console.log("editedd data is",updating)
  if(updating.data.success){
   console.log("successfully updating ")
   setViewUnitModal(false)
   getallunits()
   setEditShow(false);
   setSaveSuccess(true)
  //  setSaveSuccess(true)
  }
}
catch(err) {
      console.log("error to getting all units",err)
    }
}

// function to delete unit

// const handleDeleteClick = async()=>{
// try{
// const deleting= await PublicFetch.delete(
//   `${CRM_BASE_URL_SELLING}/unit/`
// )
// }
// catch{

// }

// }



const getallunits=async ()=>{
try{
const  allunits =await PublicFetch.get(
  `${CRM_BASE_URL_SELLING}/unit`)
  console.log("all units are ::",allunits?.data?.data)

  // if(allunits?.data.success){}
  setAllunit(allunits?.data?.data)
  setunitTable(allunits?.data?.data)
}
catch(err) {
console.log("error to getting all units",err)
}

}

useEffect(()=>{
  getallunits()
},[])

const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

  const unitdata = [
    {
      unit_name: "Sales",
      unit_code: "Customer",
      unit_description: "HJKGF23456",
      // action: "Refefence",
      // lead_status: "Database",
      key: "1",
    },
    {
      unit_name: "Maintenence",
      unit_code: "Customer",
      unit_description: "HJKGF23456",
      key: "2",
    },
    {
      unit_name: "Sales",
      unit_code: "Customer",
      unit_description: "HJKGF23456",
      key: "3",
    },
  ];
  // {columns is opportunity listing table componenet }

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex  gap-2">
            <span
              onClick={() =>{ 
                handleEditclick(index)
                setEditShow(true)}}
              className="actioneditdelete"
            >
              <FaEdit />
            </span>
            <span
              onClick={() => {
                handleViewClick(index)
                setViewUnitModal(true)}}
              className="actioneditdelete"
            >
              <RiFileSearchFill />
            </span>
            {/* <span className="actioneditdelete" onClick={()=>{
              handleDeleteClick(index)
            }} >
              <MdDelete />
            </span> */}
            <span className="actioneditdelete">
            <Popconfirm
             title="Are you sure to delete the units?"
            //  onConfirm={handleDeleteClick(index)}
             onCancel={cancel}
             okText="Yes"
             cancelText="No"
             >
            <MdDelete />
            </Popconfirm>
            </span>
          </div>
        );
      },
      align: "left",
    },
    {
      title: "NAME",
      dataIndex: "unit_name",
      key: "NAME",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.unit_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
      width: "23%",
    },
    {
      title: "CODE",
      dataIndex: "unit_code",
      key: "CODE",
      width: "23%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.unit_code)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "unit_description",
      key: "DESCRIPTION",
      //   width: "23%",
      align: "left",
    },
  ];

  //heder icons starts --Shahida 25.11.22

  //for show or hide colums 
  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
console.log("filtered columns::",filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = 
  [
    [
      "unit_id",
      "unit_name",
      "unit_code",
      "unit_description",
     

    ],
  ]
  //for pdf download
  const data12 = allunit?.map((item) => [
    item.action,
    item.unit_name,
    item.unit_code,
    item.unit_description,
    
  ]);
  //heder icons end

  return (
    <>
      <div className="container-fluid lead_list py-3">
        <div className=" d-flex justify-content-between">
          <h6 className="lead_text">UNITS</h6>
          <div>
            <Leadlist_Icons
              datas={allunit}
              columns={filteredColumns}
              items={data12}
              xlheading={UnitHeads}
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
            />
          </div>
        </div>

        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Name"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchType(value);
              }}
            />
          </div>
          <div className="col-4">
            <Input.Search
              placeholder="Search by code"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
            />
            {/* <Select
              allowClear
              showSearch
              style={{
                width: "100%",
                marginTop: "8px",
                borderRadius: "5px",
              }}
              placeholder="Search by Code"
              className="select_search"
              optionFilterProp="children"
              onChange={(event) => {
                setSearchType(event ? [event] : []);
              }}
            >
              <Select.Option value="sales">sales</Select.Option>
              <Select.Option value="maintenance">Maintenance</Select.Option>
              <Select.Option value="support">support</Select.Option>
            </Select> */}
          </div>
        </div>

        <div className="row my-3">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12  px-3">
            <Select
              // defaultValue={"25"}
              bordered={false}
              className="w-50 page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              {/* <Select.Option value="5">5 | pages</Select.Option> */}
              <Select.Option value="25">
                Show{" "}
                <span style={{ color: "lightgray" }} className="ms-1">
                  |
                </span>
                <span style={{ color: "#2f6b8f" }} className="ms-2">
                  25
                </span>{" "}
              </Select.Option>
              <Select.Option value="50">
                {" "}
                Show{" "}
                <span style={{ color: "lightgray" }} className="ms-1">
                  |
                </span>
                <span style={{ color: "#2f6b8f" }} className="ms-2">
                  50
                </span>{" "}
              </Select.Option>
              <Select.Option value="100">
                {" "}
                Show{" "}
                <span style={{ color: "lightgray" }} className="ms-1">
                  |
                </span>
                <span style={{ color: "#2f6b8f" }} className="ms-2">
                  100
                </span>{" "}
              </Select.Option>
            </Select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-5  col-12"></div>
          <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12  ">
            <div className="d-flex justify-content-end">
              <Link to={ROUTES.ADD_UNIT}>
                <Button btnType="save">Add Unit</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={allLeadList}
            // data={unitdata}
            columns={filteredColumns}
            custom_table_css="table_lead_list"
          />
        </div>

        <Custom_model
          show={viewUnitModal}
          onHide={() => {
            setViewUnitModal(false);
          }}
          View_list
         
         
          list_content={
            <div className="">
              <div className="d-flex justify-content-between my-1">
                <div className="mt-3">
                  <h5 className="opportunity_heading">Unit Measures</h5>
                </div>
                <div className="">
                  <Button btnType="add_borderless">
                    <span
                      className="d-flex align-items-center justify-content-between gap-1  p-2 button_span"
                      style={{ fontSize: "14px" }}
                      onClick={() =>
                        // handleEditclick(viewUnit)
                        handleEditonViewpage(viewUnit)
                      }
                    >
                      Edit
                      <FiEdit />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <table className=" table  table-borderless ">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td>{viewUnit.unitname} </td>
                    </tr>
                    <tr>
                      <td>Code</td>
                      <td>:</td>
                      <td>{viewUnit.unitcode}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>:</td>
                      <td>{viewUnit.unitdescription}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          }
        />

        <Custom_model
          size={"sm"}
          show={editShow}
          onHide={() => {
            setEditShow(false);
          }}
          View_list
          list_content={
            <div className="container-fluid px-4 my-4 ">
              <h6 className="lead_text">Edits Units and Measurements</h6>
              <Form
                form={editForm}
                onFinish={(value) => {
                  console.log("the formvaluess iss", value);
                  updateClick();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <label>Name</label>
                    <Form.Item
                      name="unit_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                          message: "Please enter a Valid Unit Name",
                        },
                        {
                          whitespace: true,
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
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 py-2">
                    <label>Code</label>
                    <Form.Item
                      name="unit_code"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9]+$"),
                          message: "Please enter a Valid Unit code",
                        },
                        {
                          min: 2,
                          message: "code must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Unit code cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={unitcode}
                        onChange={(e) => setUnitCode(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 py-2">
                    <label>Description</label>
                    <Form.Item
                      name="unit_description"
                      rules={[
                        {
                          min: 2,
                          message: "Description must be at least 2 characters",
                        },
                        {
                          max: 500,
                          message:
                            "Description cannot be longer than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        value={unitDescription}
                        onChange={(e) => setUnitDescription(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-xl-2 col-lg-2 col-12 justify-content-center">
                      <Button
                        btnType="save"
                        // onClick={(id) => {
                        //   updateClick();
                        //   setEditShow(false);
                        // }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          }
        />

        <Custom_model
          size={"sm"}
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />

        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={unitdata.length}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>
      </div>
    </>
  );
}
export default Unitlist;
