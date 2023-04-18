import { Form, Select, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
import Button from "../../../components/button/button";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import TableData from "../../../components/table/table_data";
function Invoicetemplateselect() {
  const [addform] = Form.useForm();
  // const [tempone, setTempone] = useState("");
  const [templates, setTemplates] = useState("");

  const [defaultTempalate,setdefaultTempalate] =useState(0)

  const getAllinvoicetemp = async () => {
    try {
      const allinvoice = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/invoice-template`
      );
      console.log("all invoice aree", allinvoice.data.data);
      setTemplates(allinvoice.data.data);
      //   setallincoterms(allCountries.data.data)
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  useEffect(() => {
    addform.setFieldsValue({ customer_type: "organization" });
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
    if (e.target.checked) {
      console.log("suceccss checked", e.target.checked);
      setdefaultTempalate(1);
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
{/* <TableData 
data={templates}

columns={columns}
custom_table_css="table_lead_list"
/> */}


            <div className="row my-4">
              {templates &&
                templates.map((itm, indx) => {
                  return (
                    <div className="col-4">
                      <Radio
                        value="invoice_template_default"
                        onChange={handleChecked}
                        checked={defaultTempalate == 1 ? true : false}
                       
                      ></Radio>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/uploads/invoicetemplates/${itm.invoice_template_image}`}
                        height={70}
                        width={70}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Invoicetemplateselect;
