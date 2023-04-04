import React, { useState,useEffect } from "react";
import { Form, Input, Select } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import Custom_model from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { ACCOUNTS } from "../../../../api/bootapi";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
export default function CreditNoteType() {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [addCreditNote, setAddCreditNote] = useState(false);
  const [editCreditNote,setEditCreditNote]=useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [searchedText, setSearchedText] = useState("");

  const[credit_note_name,setCredit_note_name]=useState("");
  const[credit_note_desc,setCredit_note_desc]=useState("");
  const[allnotes,setallnotes]=useState("");
  const [creditnote,setcreditnote] = useState();

  const [successPopup, setSuccessPopup] = useState(false);

  const [credit_note_type_id,setcredit_note_type_id]= useState("")
  const getData = (current, pageSize) => {
    return creditnote?.slice((current - 1) * pageSize, current * pageSize);
  };

  
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const handleEditclick  = (e) => {
    console.log("editing id iss", e);
    setcredit_note_type_id(e.credit_note_type_id);
    setCredit_note_name(e.credit_note_type_name);
    setCredit_note_desc(e.credit_note_type_description);
    editForm.setFieldsValue({
      Credit_note_name: e.credit_note_type_name,
      Credit_note_desc: e.credit_note_type_description,
    });
    // setPaymentEditPopup(true);
  };


  const handleupdate = async (data) => {
    console.log("datassssa",data);
    try {
      const updated = await PublicFetch.patch(
        `${ACCOUNTS}/credit-note-type/${credit_note_type_id}`,
        {
          credit_note_type_name:data.Credit_note_name,
          credit_note_type_description:data.Credit_note_desc,
          
        }
      );
      console.log("successfully updated.... ", updated);
      if (updated.data.success) {
        setSuccessPopup(true)
        // setPaymentEditPopup(false);
        getnotes();
  
        close_modal(successPopup,1000 );
      } 
    } catch (err) {
      console.log("error to update payment",err);
    }
  };

const createCreditnotetype = async ()=>{
  try{
    const addCreditnotetype = await PublicFetch.post(`${ACCOUNTS}/credit-note-type`,
    {
      credit_note_type_name:credit_note_name,
      credit_note_type_description:credit_note_desc,
    });
    
    console.log("note added successfully", addCreditnotetype);

    if (addCreditnotetype.data.success) {
      setSuccessPopup(true);
      getnotes();
      addForm.resetFields();
    //   setModalpaymentmode(false);
      close_modal(successPopup, 1000);
    }
  } catch (err) {
    console.log("err to add the note", err);
  } 
}


const getnotes = async () => {
  try {
    const allcreditnotes = await PublicFetch.get(
      `${ACCOUNTS}/credit-note-type`
    );
    console.log("getting all notes", allcreditnotes);
    setcreditnote(allcreditnotes.data.data);
  } catch (err) {
    console.log("error to fetching  notes", err);
  }

}

useEffect(() => {
  getnotes()
  // getpayment()
}, []);


  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "10%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "credit_note_type_name",
      key: "credit_note_type_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.credit_note_type_name)
          .toLowerCase()
          .includes(value.toLowerCase()) || 
          String(record.credit_note_type_description )
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      align: "left",

    },
    {
      title: "DESCRIPTION",
      dataIndex: "credit_note_type_description",
      key: "credit_note_type_description",
      align: "left",

    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      width: "12%",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <div
              className="actionEdit"
              onClick={() => {setEditCreditNote(true)
                handleEditclick(index);
              }}
            >
              <FaEdit />
            </div>
            {/* <div className="actionEdit">
              <MdPageview />
            </div> */}
            <div className="actionDel">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];
  const data = [
    { credit_note_name: "Test name", description: "test Description" },
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
     
      " NAME",
      "DESCRIPTION",
   
    ],
  ];
  //for pdf download
  const data12 = creditnote?.map((item, index) => [
    index + serialNo,
    item.credit_note_type_name,
    item.credit_note_type_description,
  
   
  ]);



  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">Credit Note Type</h5>
          </div>
          <div className="col-sm-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search"
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
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>

        </div>
      
        <div className="row my-3">
          <div className="col-4 ">
            <Select
              bordered={false}
              className="page_size_style"
                value={pageSize}
                onChange={(e) => setPageSize(e)}
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

          <div className="col-4 ">
            {/* <Link to={ROUTES.ADD_JOBPAYMENT}> */}
            <Button 
            btnType="add" 
            onClick={() => {setAddCreditNote(true);
             addForm.resetFields();
            }}   >
              Add Credit Note Type
            </Button>
            {/* </Link> */}
          </div>
        </div>

        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <Custom_model
          show={addCreditNote}
          onHide={() => setAddCreditNote(false)}
          footer={false}
          View_list
          list_content={
            <>
              {" "}
              <div className="row">
                <h5 className="lead_text">Add Credit Note Type</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuee34", data);
                  createCreditnotetype();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="Credit_note_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <InputType 
                       value={credit_note_name}
                       onChange={(e) => {
                         setCredit_note_name(e.target.value);
                         console.log("name name",credit_note_name);
                        //  setUniqueName(false);
                       }}
                      //  onBlur={async () => {
                      //    let n = await CheckUnique({
                      //      type: "credit_note_type_name",
                      //      value: credit_note_name,
                      //    });
                      //    setUniqueName(n);
                      //  }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item
                      name="credit_note_desc"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <TextArea 
                      onChange={(e) => {
                        setCredit_note_desc(e.target.value);
                        console.log("desccccc",e.target.value);
                      }}/>
                    </Form.Item>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-center gap-3">
                    <Button btnType="save">Save</Button>
                    <Button
                      as="input"
                      type="reset"
                      value="Reset"
                      onClick={() => {
                        setAddCreditNote(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          }
        />
        <Custom_model
          size={"sm"}
          show={successPopup}
            onHide={() => setSuccessPopup(false)}
          success
        />
         <Custom_model
          show={editCreditNote}
          onHide={() => setEditCreditNote(false)}
          footer={false}
          View_list
          list_content={
            <><div className="row">
                <h5 className="lead_text">Edit Credit Note Type</h5>
              </div>
              <Form
                form={editForm}
                onFinish={(values) => {
                  console.log("valu12", values);
                  handleupdate(values);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="Credit_note_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <InputType 
                      className="input_type_style w-100"
                      value={credit_note_name}
                      onChange={(e) => {
                        setCredit_note_name(e.target.value);
                        // setUniqueEditName(false);
                      }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item
                      name="Credit_note_desc"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <TextArea 
                      value={credit_note_desc}
                      onChange={(e) => {
                        setCredit_note_desc(e.target.value);
                      }}/>
                    </Form.Item>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-center gap-3">
                    <Button btnType="save">Save</Button>
                    <Button
                      as="input"
                      type="reset"
                      value="Reset"
                      onClick={() => {
                        setEditCreditNote(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                </Form></>}/>
      </div>
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />

    </>
  );
}
