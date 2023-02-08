import { Form } from "antd";
import React, { useEffect} from "react";
import { DatePicker } from "antd";
import { CRM_BASE_URL } from "../../../api/bootapi";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { cargo_typeoptions } from "../../../utils/SelectOptions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import Custom_model from "../../../components/custom_modal/custom_model";

function CreateJob() {
  const [AllQuotations, setAllQuotations] = useState();
  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [leadIdEnq, setLeadIdEnq] = useState('');
  const [Errormsg, setErrormsg] = useState();
  const [error, setError] = useState(false);
  const [filenew, setFilenew] = useState();
  const [leadId, setLeadId] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [date, setDate] = useState();
  const [addForm] = Form.useForm();
  const [currentcount, setCurrentcount] = useState();
  const [noofItems, setNoofItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  const navigate = useNavigate();


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
  
  
  
  const getonequatation = async (id) => {
    try {
      const onequatation = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/quotation/${id}`
      );
      console.log("one quatation iss ::", onequatation?.data?.data);
     
      addForm.setFieldsValue({
        
        job_chargable_weight:onequatation?.data?.data?.quotation_chargeable_wt,
        job_grossweight:onequatation?.data?.data?.quotation_gross_wt,
       
        job_shipper: onequatation?.data?.data?.quotation_shipper,
        job_consignee: onequatation?.data?.data?.crm_v1_leads.lead_customer_name,
        job_freight_type: onequatation?.data?.data?.fms_v1_freight_types.freight_type_name,
        job_cargo_type: onequatation?.data?.data?.quotation_cargo_type,
        job_mode: onequatation?.data?.data?.quotation_mode,
        job_carrier: onequatation?.data?.data?.fms_v1_carrier.carrier_name,
        job_payment_terms:
          onequatation?.data?.data?.fms_v1_payment_terms.payment_term_name,
       
        job_no_of_pieces: onequatation?.data?.data?.quotation_no_of_pieces,
        
        job_uom: onequatation?.data?.data?.crm_v1_units.unit_name,
        job_destination_id:
          onequatation?.data?.data?.fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations.location_name,
          job_origin_id: onequatation?.data?.data?.fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations.location_name
          ,
      });

     
    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };

  const getAllQuotation = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation?startIndex=0&noOfItems=100`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            let date = moment(item.quotation_date).format("DD-MM-YYYY");
            let validity = moment(item.quotation_validity).format("DD-MM-YYYY");
            temp.push({
              quotation_cargo_type: item.quotation_cargo_type,
              quotation_carrier: item.quotation_carrier,
              quotation_id: item.quotation_id,
              quotation_no: item.quotation_no,
              quotation_date: date,
              quotation_validity: validity,
              quotation_consignee: item.quotation_consignee,
              consignee_name: item.crm_v1_leads.lead_customer_name,
              quotation_shipper: item.quotation_shipper,
              quotation_status: item.quotation_status,
              fms_v1_quotation_agents: item.fms_v1_quotation_agents,
            });
            // let name= item.crm_v1_leads.lead_customer_name;
            // console.log("name",name);
            // addForm.setFieldsValue({ consignee:name });
          });
          setAllQuotations(temp);
          // let name= res.data.data.quotation_consignee;
;
          
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllQuotation();
  }, []);
  

 
  const handleLeadIdEnq = (e) => {
    // addForm.setFieldValue("consignee",leadIdenq);
    getonequatation(e);
    setLeadIdEnq(e);
  };
  
  const [allLeadList, setAllLeadList] = useState([]);
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
  
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.JOBTASKS);
      }, time);
    }
  };
  

  console.log("Selected lead id is " ,leadId)
  const handleLeadId = leadId => {
    setLeadId(leadId);
  };
 
  
  useEffect(() => {
    GetAllLeadData();
  }, [noofItems, pageofIndex, pagesizecount]);

  const OnSubmit = (data) => {
    console.log("submitting data", data);
   
    
    const date1 = moment(data.jobdate).format("YYYY-MM-DD");
   
    const docfile = data?.new?.file?.originFileObj;
    const formData = new FormData();
    
    formData.append("job_date", date1);
    formData.append("job_consignee",data.job_consignee);
    formData.append("job_shipper", data.job_shipper);
    formData.append("job_freight_type", data.job_freight_type);
    formData.append("job_cargo_type", data.job_cargo_type);
    formData.append("job_carrier", data.job_carrier);
    formData.append("job_awb_bl_no", data.job_awb);
    formData.append("job_mode", data.job_mode);
    formData.append("job_origin_id", data.job_origin_id);
    
    formData.append("job_destination_id", data.job_destination_id);
   
    formData.append("job_no_of_pieces", data.job_no_of_pieces);
    formData.append("job_uom", data.job_uom);
    formData.append("job_gross_wt", data.job_grossweight);
    formData.append("job_chargeable_wt", data.job_chargable_weight);
    formData.append("job_payment_terms", data.job_payment_terms);
 
    if (filenew) {
      formData.append("attachments", filenew);
    }

    

    console.log("before sending data");
    PublicFetch.post(`${CRM_BASE_URL_FMS}/quotation`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("data is successfully saved", res.data.success);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
        } else {
          setErrormsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError(true);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text">Create Job</h5>
            </div>
          </div>
          <div className="content-tabs">
            <Form
                form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                OnSubmit(values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="container mb-4">
                <div className="row">
                  <div className="row ">
                   

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job Date</label>
                      <Form.Item
                        name="jobdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid date",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ borderWidth: 0, marginTop: 10 }}
                         
                          defaultValue={moment(date)}
                          
                          format={dateFormatList}
                        
                        />
                       
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation No</label>
                      <Form.Item
                        name="quotationno"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid quotation no",
                          },
                        ]}
                      >
                        <SelectBox
                         onChange={e =>
                         
                          handleLeadIdEnq(e)
                        
                          
                        }
                        allowClear
                        showSearch
                        optionFilterProp="children"
                       >
                        {AllQuotations &&
                            AllQuotations.length > 0 &&
                            AllQuotations.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.quotation_id}
                                  value={item.quotation_id}
                                >
                                  {item.quotation_no}
                                </Select.Option>
                              );
                            })}
                       </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="job_consignee"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid  consignee",
                          },
                        ]}
                      >
                        <SelectBox
                          onChange={e => handleLeadId(e)}
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                             {allLeadList &&
                            allLeadList.length > 0 &&
                            allLeadList.map((item, index) => {
                            
                            if ( leadIdEnq && leadIdEnq === item.lead_id) {
                              return (
                                <Select.Option
                                  key={item.lead_id}
                                  value={item.lead_id}
                                >
                                  {item.lead_customer_name}
                                </Select.Option>
                              );
                            } else if( leadIdEnq === undefined) {
                              return (
                                <Select.Option
                                  key={item.lead_id}
                                  value={item.lead_id}
                                >
                                  {item.lead_customer_name}
                                </Select.Option>
                              );
                            }
                           

                             
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                   
                  </div>

                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Shipper</label>
                      <Form.Item
                        name="job_shipper"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid shipper",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name="job_cargo_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid cargotype",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {cargooptions &&
                            cargooptions.length > 0 &&
                            cargooptions.map((item, index) => {
                              return (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Mode</label>
                      <Form.Item
                        name="job_mode"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid mode",
                          },
                        ]}
                      >
                         <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Air</Select.Option>
                          <Select.Option value="S">Sea</Select.Option>
                          <Select.Option value="R">Road</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Origin</label>
                      <Form.Item
                        name="job_origin_id"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid origin",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination</label>
                      <Form.Item
                        name="job_destination_id"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Destination",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name="job_carrier"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid carrier",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>AWB/BL No</label>
                      <Form.Item
                        name="job_awb"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid AWB",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name="job_payment_terms"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid terms",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>No of pieces</label>
                      <Form.Item
                        name="job_no_of_pieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid no of pieces",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>UOM</label>
                      <Form.Item
                        name="job_uom"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid UOM",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross wt</label>
                      <Form.Item
                        name="job_grossweight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid gross wt",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeable wt</label>
                      <Form.Item
                        name="job_chargable_weight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid chargeable wt",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-sm-6 ">
                     
                    
                      <label>Add Attachments</label>
                      <Form.Item className="mt-2" name="new">
                        <FileUpload
                          multiple
                          filetype={"Accept only pdf and docs"}
                          listType="picture"
                          accept=".pdf,.docs,"
                          // aceept=".jpeg,.jpg,.png"
                          onPreview={handlePreview}
                          // value={leadAttachment}
                          // onChange={(e) => setLeadAttachment(e.target.value)}
                          onChange={(file) => {
                            console.log("Before upload", file.file);
                            console.log(
                              "Before upload file size",
                              file.file.size
                            );
                            setFilenew(file.file.originFileObj);

                            // if (
                            //   file.file.size > 1000 &&
                            //   file.file.size < 500000
                            // ) {
                            //   // setLeadimg(file.file.originFileObj);
                            //   // setFileSizeError(false);
                            //   console.log(
                            //     "file greater than 1 kb and less than 500 kb"
                            //   );
                            // } else {
                            //   // setFileSizeError(true);
                            //   console.log("hgrtryyryr");
                            // }
                          }}
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
                     
                     <Link  to={ROUTES.LIST_JOB} >
                      <Button className="qtn_save" btnType="cancel">
                        Cancel
                      </Button>
                      </Link>
                    </div>
                  </div>
                 
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
export default CreateJob;
