import { Checkbox, Form, InputNumber } from "antd";
import Button from "../../../../components/button/button";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import InputType from "../../../../components/Input Type textbox/InputType";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import { DatePicker } from "antd";
import TableData from "../../../../components/table/table_data";
function Addpurchasebill(){

    const [addForm] = Form.useForm();

    return(
        <>

<div className="container-fluid">
        <div className="row justify-content-md-center mb-2">
          <Form
            name="addForm"
            // form={addForm}
            onFinish={(value) => {
              console.log("values iss", value);
              // OnSubmit(value);
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="container-fluid ms-0 me-2 ">
              <div className="row  mt-3">
                <h5 className="lead_text"> New Purchase Bill</h5>
              </div>
              <div className="row mt-1">
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3 ">
                    <h6 className="lead_text">Basic Info</h6>
                  </div>
                  {/* <div className="row mb-2  "> */}
                  {/* <div className="col-md-6 col-12"> */}
                  {/* <div className="row"> */}

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label className="mb-1">Vendor<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="vendor"
                      rules={[
                        {
                          required: true,
                          message: "Please select Vendor",
                        },
                      ]}
                    >
                      
                       <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          // onChange={(e) => {
                          //   console.log("ann", e);
                          //   getCurrencyRate(e);
                          // }}
                        >
                          {/* {allvendor &&
                            allvendor.length > 0 &&
                            allvendor.map((item, index) => {
                              return (
                                <Select.Option
                                  value={item.vender_id}
                                  key={item.vender_id}
                                >
                                  {item.vendor_name}
                                </Select.Option>
                              );
                            })} */}
                        </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label className="mb-1">PO No<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="pono"
                      rules={[
                        {
                          required: true,
                          message: "Please select a PO No",
                        },
                      ]}
                    >
                      {/* <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        onChange={(e) => {
                          console.log("date mmm", e);
                          setFrightmode(e);
                          mode(e);
                        }}
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
                      </SelectBox> */}
                      <InputType/>
                    
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 ">
                  <label className="mb-1">Bill No 
                    </label>
                    <Form.Item
                      name="billno"
                      rules={[
                        {
                          required: true,

                          message: "Please select bill no",
                        },
                      ]}
                    >
                     <InputType/>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>Due date
                    </label>

                    <Form.Item
                      name="duedate"
                      rules={[
                        {
                          required: true,
                          message: "Please select due date",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ borderWidth: 0, marginTop: 3 }}
                        // defaultValue={moment(date)}
                        // format={dateFormatList}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                  
                    <label className=" mt-2">Purchase Date<span className="required">*</span>
                    </label>
                    <Form.Item name="purchasedate">
                      
                    <DatePicker 
                        style={{ borderWidth: 0, marginTop: 5}}
                        // defaultValue={moment(date)}
                        // format={dateFormatList}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                  <label>Due date
                    </label>

                    <Form.Item
                      name="duedate"
                      rules={[
                        {
                          required: true,
                          message: "Please select due date",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ borderWidth: 0, marginTop: 3 }}
                        // defaultValue={moment(date)}
                        // format={dateFormatList}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label className="mb-2">
                        Currency<span className="required">*</span>
                      </label>
                      <Form.Item
                        name="currency"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please select currency",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          // onChange={(e) => {
                          //   console.log("ann", e);
                          //   getCurrencyRate(e);
                          // }}
                        >
                          {/* {currencydata &&
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
                            })} */}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>
                        Exchange Rate<span className="required">*</span>
                      </label>
                      <Form.Item
                        name="exchnagerate"
                        rules={[
                          {
                            required: true,

                            message: "Please enter a Valid Rate",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={currencyRates}
                          // onChange={handleChange}
                          align="right"
                          // step={0.01}
                          min={0}
                          precision={4}
                          controlls={false}
                          // disabled={true}
                        />
                      </Form.Item>
                    </div>


                

                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="row mt-1  ">
                <div className="content-tabs-tablenew row justify-content mx-1 mb-3">
                  <div className="row mt-2">
                    <div className="col-9">  <h6 className="lead_text">AWB/BL Details</h6></div>
                    <div  className="col-3 d-flex justify-content-end"> <Button
              btnType="add_borderless"
              
              // onClick={() => {
              //  handleEnter()
              // }}
            >
             Add New Row
            </Button></div>
                  </div>
          
                  
                  <div className="datatable">
               
                    {/* <TableData
                      // data={tableData}
                      columns={columns}
                      rowKey={(record) => record.key}
                      custom_table_css="table_qtn qtn_table_brdr"
                    /> */}
                  </div>

                  <div className="row">
                  <div className="d-flex justify-content-end mt-3 ms-5">
                    <div className="col-xl-11 col-lg-2 col-sm-8 col-xs-3 d-flex justify-content-end mt-3">
                      <p style={{ fontWeight: 600 }}>Total :</p>
                    </div>

                    <div className="col-xl-1 col-lg-2 col-sm-2 col-xs-2 me-5 mt-1">
                      <Form.Item name="grandtotal">
                        <Input_Number
                          className="text_right grandtotal"
                          // value={total}
                          align="right"
                          min={0}
                          precision={2}
                          controlls={false}
                          disabled={true}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className="row  mt-1 ">
                {/* <div className="col-md-6 col-12"> */}
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3">
                    <h6 className="lead_text">Attachments</h6>
                  </div>
                  <div className="col-sm-6 pt-2">
              <label className="mb-1">Remarks</label>
              <Form.Item name="purchasePoRef">
                
                <TextArea
                />
              </Form.Item>
            </div>

            {/* <div className="col-sm-6 pt-2">
              <label  className="mb-1">Attachments</label>
              <Form.Item name="attachments" className="">
                <FileUpload
                  name="attachments"
                  //   value={attachments}
                  multiple
                  listType="file"
                  accept=".pdf,.doc,.zip"
                  height={100}
                  // onPreview={handlePreview}
                  beforeUpload={false}
                  onChange={(file) => {
                    console.log("Before upload", file.file);
                    console.log("Before upload file size", file.file.size);

                    if (file.file.size > 1000 && file.file.size < 500000) {
                      setImg(file.file.originFileObj);
                      setImgSizeError(false);
                      console.log(
                        "Image must be greater than 1 kb and less than 500 kb"
                      );
                    } else {
                      console.log("failed beacuse of large size");
                      setImgSizeError(true);
                    }
                  }}
                />
              </Form.Item>
            </div> */}
                 
                </div>
           
              </div>
          
             
            </div>
            

            <div className="col-12 d-flex justify-content-center my-4 gap-3">
              {/* <div className="col-lg-1 "> */}
              <Button className="save_button" btnType="save">
                Save
              </Button>
             
              <Button
                as="input"
                type="reset"
                value="Reset"
                // onClick={() => {
                //   navigate(`${ROUTES.QUATATIONS}`);
                // }}
                // className="qtn_save"
                // btnType="save"
              >
                Cancel
              </Button>
              {/* </div> */}
            </div>
          </Form>

          
        </div>
      </div>
        </>
    )
}
export default Addpurchasebill