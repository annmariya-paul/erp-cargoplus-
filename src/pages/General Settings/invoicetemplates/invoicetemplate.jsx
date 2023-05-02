import { Form, Select, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
import Button from "../../../components/button/button";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import TableData from "../../../components/table/table_data";
function Invoicetemplateselect() {
  const [editForm] = Form.useForm();
  // const [tempone, setTempone] = useState("");
  const [templates, setTemplates] = useState("");

  const [defaultTempalate, setdefaultTempalate] = useState(1);

const[defltinvoice,setdefltinvoice]= useState()
 
  const getAllinvoicetemp = async () => {
    try {
      const allinvoice = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/invoice-template`
      );
      console.log("all invoice aree", allinvoice.data.data);
      console.log("default value is",allinvoice?.data?.data)
      setTemplates(allinvoice.data.data);
      
  
      allinvoice?.data?.data.forEach((itm,indx)=>{
      // (itm.invoice_template_default)
     console.log("onee dataa",itm)
     if(itm?.invoice_template_default == 1){
      console.log("dattat",itm.invoice_template_id)
      editForm.setFieldsValue({
        invoicedfult:itm.invoice_template_id
      })
     }
     setdefltinvoice(itm.invoice_template_id)
    //  console.log("dattat",itm.)
      })
  
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

console.log("dnjd",defltinvoice)
  const createinvoicetmp = async (data) => {
    const formData = new FormData();
    formData.append(`invoice_template_default`, data.invoicedfult);
    // formData.append(`attachments`, data.invoicedfult);
    try {
      const allinvoice = await PublicFetch.patch(
        `${CRM_BASE_URL_FMS}/invoice-template/default/${data.invoicedfult}`,formData,{
          "Content-Type": "Multipart/form-Data",
        }
      );
      console.log("updated in",allinvoice)
      getAllinvoicetemp()
     
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  useEffect(() => {
   
    getAllinvoicetemp();
  }, []);

  // const columns = [
  //   {
  //       title: "Radio",
  //       dataIndex: "invoice_template_default",
  //       key: "index",
  //       // render: (value, item, index) => serialNo + index,
  //       align: "center",
  //     },
  //     {
  //       title: "Image",
  //       key: "index",
  //       dataIndex:"invoice_template_image",
  //       align: "center",
  //       render: (theImageURL, records) => (
  //           <>
  //             {theImageURL ? (
  //               <img
  //                 src={`${process.env.REACT_APP_BASE_URL}/${theImageURL}`}
  //                 height="20px"
  //                 width={"20px"}
  //               />
  //             ) : (
  //               ""
  //             )}
  //           </>
  //         ),
  //     },
  // ]

  const handleChecked = (e, key) => {
    console.log("isChecked", e);

    if (e.target.checked === true ) {
      console.log("suceccss checked", e.target.checked);
      setdefaultTempalate(1);
    } else {
      setdefaultTempalate(0);
    }
  };

  console.log("templateees", templates);
  return (
    <>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="modal-title w-100">Select Invoice Template</h5>
            </div>
           

            <Form 
            form={editForm}
            onFinish={(value) => {
              console.log("values111333", value);
              // Submit();
              createinvoicetmp(value);
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
            >
              <Form.Item name="invoicedfult" >
              <Radio.Group 
               onChange={handleChecked}
               value={defaultTempalate}
              //  checked={defaultTempalate}
              >
              <div className="row ">
                
                {templates &&
                  templates.map((itm, indx) => {
                    return (
                      <div className="col-4">
                        <Radio
                          id={itm.invoice_template_id}
                          value={itm.invoice_template_id}
                        
                         
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/${itm?.invoice_template_image}`}
                            height={180}
                            width={150}
                          />
                        </Radio>
                      </div>
                    );
                  })}
              </div>

              </Radio.Group>
              </Form.Item>

              <div className="d-flex justify-content-center">
              <Button type="submit" btnType="save" className="mt-3" >Save</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Invoicetemplateselect;
