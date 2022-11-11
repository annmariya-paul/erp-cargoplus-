import React, { useEffect, useState } from "react";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import "../../../CRM/lead/lead_list/leadlist.scss";
import { Input, Select, Pagination } from "antd";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiFileSearchFill } from "react-icons/ri";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Custom_model from "../../../../components/custom_modal/custom_model";
import Button from "../../../../components/button/button";
import "./viewunit.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
// import { ROUTES } from "../../../routes";
function Unitlist() {
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //Add Bransearch by type select box
  const [searchStatus, setSearchStatus] = useState("");

  const [editShow, setEditShow] = useState(false);
  const [viewUnitModal, setViewUnitModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
 const [allunit,setAllunit]=useState()
const [unitName,setUnitName]= useState("")
const [unitcode,setUnitCode]=useState("")
const [unitDescription,setUnitDescription]= useState("")


 const getData = (current, pageSize) => {
  return allunit?.slice((current - 1) * pageSize, current * pageSize);
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
  // console.log("editing unitss iss",e)
  setUnitName(e.unitname)
  setUnitCode(e.unitcode)
  setUnitDescription(e.unitdescription)
  setEditShow(true);
  setViewUnitModal(false);
}
// function to editunits

const handleEditclick=(item)=>{
  console.log("edittjf",item)
setUnitName(item?.unit_name)
setUnitCode(item?.unit_code)
setUnitDescription(item?.unit_description)
  // getoneunit(id)

}

const updateClick=async (id)=>{
try{
const updating= await PublicFetch.patch(
  `${CRM_BASE_URL_SELLING}/unit/${viewUnit.id}`,{
    unit_name:unitName,
    unit_code:unitcode,
    unit_description:unitDescription
  })
  console.log("editedd data is",updating)
  if(updating.data.success){
   console.log("successfully updating ")
   setViewUnitModal(false)
    
  }
}
catch(err) {
      console.log("error to getting all units",err)
    }
}


// const getoneunit = async(id)=>{
//   try{
//  const oneunit =await PublicFetch.get(
//   `${CRM_BASE_URL_SELLING}/unit/${id}`
//  )
//   }
//   catch(err) {
//     console.log("error to getting all units",err)
//   }
// }


// function to get allunits

const getallunits=async ()=>{
try{
const  allunits =await PublicFetch.get(
  `${CRM_BASE_URL_SELLING}/unit`)
  console.log("all units are ::",allunits?.data?.data)

  // if(allunits?.data.success){}
  setAllunit(allunits?.data?.data)
}
catch(err) {
console.log("error to getting all units",err)
}

}

useEffect(()=>{
  getallunits()
},[])


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
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center gap-2">
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
            <span className="actioneditdelete">
              <MdDelete />
            </span>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "NAME",
      dataIndex: "unit_name",
      key: "unit_name",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.unit_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
      width: "23%",
    },
    {
      title: "CODE",
      dataIndex: "unit_code",
      key: "unit_code",
      width: "23%",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.unit_code)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "unit_description",
      key: "unit_description",
      //   width: "23%",
      align: "center",
    },
  ];

  return (
    <>
      <div className="container-fluid lead_list py-3">
        <div className=" d-flex justify-content-between">
          <h6 className="lead_text">UNITS</h6>
          <div>
            <Leadlist_Icons />
          </div>
        </div>

        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Name"
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
          <div className="col-4">
            <Select
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
            </Select>
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
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>

        <Custom_model
          show={viewUnitModal}
          onHide={() => {
            setViewUnitModal(false);
          }}
          Adding_contents
          children={
            <div className="">
              <div className="d-flex justify-content-between my-1">
                <div className="mt-3">
                  <h5 className="opportunity_heading">Unit Measures</h5>
                </div>
                <div className="">
                  <Button btnType="add_borderless">
                    <span
                      className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                      style={{ fontSize: "14px" }}
                      onClick={() => 
                        // handleEditclick(viewUnit)
                        handleEditonViewpage(viewUnit)}
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

              <div className="row">
                <div className="col-12">
                  <label>Name</label>
                  <div>
                    <input
                      type="text"
                      className="input_style"
                      value={ unitName }
                      onChange={(e)=>setUnitName(e.target.value) }
                      rules={{ required: true, message: "Please enter name" }}
                    />
                  </div>
                </div>
                <div className="col-12 py-2">
                  <label>Code</label>
                  <div>
                    <input type="text" className="input_style"
                    value={unitcode}
                    onChange={(e)=>setUnitCode(e.target.value) }
                    />
                  </div>
                </div>
                <div className="col-12 py-2">
                  <label>Description</label>
                  <div>
                    <textarea className="input_style " 
                    value={unitDescription }
                    onChange={(e)=>setUnitDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-xl-2 col-lg-2 col-12 justify-content-center">
                    <Button
                      btnType="save"
                      onClick={(id) => {
                        updateClick()
                        setEditShow(false);
                        // setSaveSuccess(true);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
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
