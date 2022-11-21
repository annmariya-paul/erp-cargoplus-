import React, { useEffect, useState } from "react";
import "./attributes.styles.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL, CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import { Input, Select, Pagination } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Form } from "react-bootstrap";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { ROUTES } from "../../../../routes";

// { List all attibutes, view and edit an attribute - Ann mariya }
export default function Attribute(props) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [attributes,setAttributes]=useState("")
  const [attributeName,setAttributeName]=useState("")
  const [attributedescription,setAttributeDescription]=useState("")
  const [attributeId,setAttributeId] =useState()
  const [searcheddesText, setSearcheddesText] = useState("");

  const [viewattributes,setViewAttributes]=useState({
    id:"",
    attributename:"",
    attributedescription:"",
    attriutestatus:""
  })

  const getData = (current, pageSize) => {
    return attributes?.slice((current - 1) * pageSize, current * pageSize);
  };

// function to viewattributes unnimaya 11/11/22
const handleViewClick=(item)=>{
  console.log("view all attributes",item)
  setViewAttributes({
    ...viewattributes,
  id:item.attribute_id,
  attributename:item.attribute_name,
  attributedescription:item.attribute_description,
  attriutestatus:item.attribute_status
  })

  setShowViewModal(true)
}

// function to edit attributes unnimaya 

const handleviewtoedit=(i)=>{
  console.log("editing data iss",i)
setAttributeId(i.id)
setAttributeName(i.attributename)
setAttributeDescription(i.attributedescription)
  setShowModalEdit(true);
}



const handleEditclick=(e)=>{
console.log("editing id iss",e)
setAttributeId(e.attribute_id)
setAttributeName(e.attribute_name)
setAttributeDescription(e.attribute_description)
setShowModalEdit(true)
}

const handleupdate =async()=>{
  try{
const updated = await PublicFetch.patch(
  `${CRM_BASE_URL_SELLING}/attribute/${attributeId}`,{
    attribute_name:attributeName,
    attribute_description:attributedescription
  })
console.log("successfully updated ",updated)
if(updated.data.success){
  setShowModalEdit(false)
  getallattributes()
}
  }
  catch(err) {
 console.log("error to update attributes")
  }
}


// function to getting attributes  unnimaya 11/11/22
const getallattributes= async()=>{
try{
  const allattributes = await PublicFetch.get(
    `${CRM_BASE_URL_SELLING}/attribute`
  )
  console.log("getting all attributes",allattributes.data.data)
  setAttributes(allattributes.data.data)
}
catch(err) {
console.log("error to fetching  attributes",err)
}
}


useEffect(()=>{
getallattributes()
},[])

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
      align: "left",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex  align-items-center gap-3">
            <div
              className="editIcon m-0"
              onClick={() =>
                handleEditclick(index)}
            >
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index) }
            >
              <MdPageview />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </div>
        );
      },
    
    },
    {
      title: "NAME",
      dataIndex: "attribute_name",
      key: "key",
      width: "25%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        console.log("valuesss in", record )
        return String(record.attribute_name) 
          .toLowerCase()
          .includes(value.toLowerCase()) || String(record.attribute_description)
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      align: "left",
    },
    {
    
      title: "DESCRIPTION",
      dataIndex: "attribute_description",
      width:"30%",
      key: "key",
     
      align: "left",
    },
  ];
  return (
    <>
      <div className="container-fluid attribute_list pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Attributes</h5>
          </div>
          <Leadlist_Icons />
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
          <div className="col-3 px-3 ">
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
          <div className="col mb-2 px-4">
            <Link to={ROUTES.ADD_ATTRIBUTES} style={{ color: "white" }}>
              <Button btnType="add">Add Attribute</Button>
            </Link>
          </div>
        </div>

        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            columns={columns}
            custom_table_css="attribute_table"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={data.length}
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
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          View_list
          list_content={
            <div className="container-fluid p-3">
              <div className="row">
                <div className="col-10">
                  <h5 className="lead_text">Attribute</h5>
                </div>
                <div className="col-2">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      handleviewtoedit(viewattributes)
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
                  <p>Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">{viewattributes.attributename}</p>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-4">
                  <p>Description</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-7 justify-content-start">
                  <p className="modal-view-data">
                   {viewattributes.attributedescription}
                  </p>
                </div>
              </div>
            </div>
          }
        />
        <Custom_model
          size={"sm"}
          show={showModalEdit}
          onHide={() => setShowModalEdit(false)}
          // header="Attributes"
          footer={false}
          {...props}
          View_list
          list_content={
            <div className="container-fluid p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="lead_text">Attribute</h5>
                </div>
              </div>
              <div className="row px-2 my-3">
                <Form.Group className="mb-3" controlId="attribute_name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={ attributeName } onChange={(e)=> setAttributeName(e.target.value)}  placeholder="Name" />
                </Form.Group>
              </div>
              <div className="row px-2">
                <Form.Group className="mb-3" controlId="attribute_description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={attributedescription}
                    onChange={(e) =>  setAttributeDescription (e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="row justify-content-center my-3">
                <div className="col-4">
                  <Button btnType="save" onClick={()=>handleupdate()} > Save </Button>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
