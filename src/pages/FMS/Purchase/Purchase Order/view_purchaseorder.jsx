// import "../Quotations/create quotation/quotation.scss";
import React, { useState, useRef, useEffect } from "react";
import Button from "../../../../components/button/button";
// import Button from "../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import TableData from "../../../../components/table/table_data";
// import TableData from "../../../components/table/table_data";
import Attachments from "../../../../components/attachments/attachments";
import { Collapse } from "antd";
import html2canvas from "html2canvas";
import PublicFetch from "../../../../utils/PublicFetch";

import { BorderOutlined } from "@ant-design/icons";
// import PublicFetch from "../../../utils/PublicFetch";
// import { ROUTES } from "../../../routes";
import { ROUTES } from "../../../../routes"
import { CRM_BASE_URL_FMS, CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";
// import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const onChange = (key) => {
  console.log(key);
};


export default function ViewpurchaseOrder() {
  const { id } = useParams();
  console.log("id :::::", id);
  const printRef = useRef(null);
  const [allpo, setAllPO] = useState();
  console.log("all po : ", allpo);
  const [qtnno, setQtnno] = useState();
  const [tabledata, setTabledata] = useState();
  const [grandtotal, setGrandTotal] = useState();
  console.log("grand",grandtotal);
  const [detailstable, setAlldetailstable] = useState();
  const [invoice_status, setInvoice_Status] = useState();
  const [serialNo, setserialNo] = useState(1);
  console.log("details", detailstable);
  console.log("qtntable: ", tabledata);
  console.log("qtnno: ", qtnno);
  console.log("grandtotal: ", grandtotal);
  const navigate = useNavigate();
  const [servicename, setService] = useState();
  console.log("service name ", servicename);
  const [tax, setTax] = useState();
  console.log("tax name:", tax);


  const progress = [
    {
        title:"Slno",
        key: "index",
        width: "2%",
        render: (value, item, index) => serialNo + index,
        align: "center",
      },
  {
    title: "TASKS",
    dataIndex: "tasks",
    key: "tasks",
    align: "left",
    width:"20%",
    // render: (value, item, indx) => count + indx,
  },
  {
    title: "AWB/BL NO",
    dataIndex: "awbblno",
    key: "awbblno",
    align: "left",
  },
  {
    title: "JOB NO",
    dataIndex: "jobno",
    key: "jobno",
    align: "left",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
    align: "right",
  },
  {
    title: "TAX",
    dataIndex: "tax",
    key: "tax",
    align: "right",
  },
  {
    title: "TAX %",
    dataIndex: "taxpercent",
    key: "taxpercent",
    align: "right",
  },
  {
    title: "TAX AMT",
    dataIndex: "taxamt",
    key: "taxamt",
    align: "right",
  },
  {
    title: "TOTAL AMT",
    dataIndex: "totalamt",
    key: "totalamt",
    // width: "35%",
    align: "right",
    // render: (opportunity_update_next_date_contact) => {
    //   return (
    //     <label>
    //       {moment(opportunity_update_next_date_contact).format("DD-MM-YYYY")}
    //     </label>
    //   );
    // },
  },
 
];
const { Panel } = Collapse;
// const data = [
//   {
//     tasks: "Data",
//     awbblno: "4223",
//     jobno: "002",
//     amount: "1000",
// tax:"1000",
// taxpercent:"33",
// taxamt:"2000",
//     totalamt: "100022",

//     // key: "1",
//   },
//   {
//     tasks: "Data",
//     awbblno: "4223",
//     jobno: "002",
//     amount: "1000",
// tax:"1000",
// taxpercent:"33",
// taxamt:"2000",
//     totalamt: "100022",

//     // key: "1",
//   },
// ];
  const getSinglepurchaseorder = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/purchase-order/${id}`)
      .then((res) => {
        console.log("response of purchase", res);
        if (res.data.success) {
          console.log("Success of purchase", res.data.data);
          setAllPO(res?.data?.data);

          let total = 0;
          let newdatas = [];
          res?.data?.data?.crm_v1_puchase_order_details
?.forEach((item, index) => {
            newdatas.push(item?.fms_v1_quotation.quotation_no);
            setQtnno(newdatas);
            let servdata = [];
            res.data.data.fms_v1_job_task_expenses.forEach((item, index) => {
              servdata.push({
                quotation_details_service_id: item.crm_v1_services.service_name,
                quotation_details_cost:
                  item.job_task_expense_cost_amountfx.toFixed(2),
                quotation_details_tax_type: item.fms_v1_tax_types.tax_type_name,
                quotation_details_tax_amount:
                  item.job_task_expense_cost_taxfx.toFixed(2),
                quotation_details_total:
                  item.job_task_expense_cost_subtotalfx.toFixed(2),
              });
              setTax(servdata);
              total = Number.parseFloat(total);
              total += item.job_task_expense_cost_subtotalfx;
            });
            let tabletasks = [];
            item.fms_v1_quotation.fms_v1_quotation_details.forEach((item, index) => {
              tabletasks.push({
                quotation_details_service_id : servicename,
                quotation_details_cost :item.quotation_details_cost,
                quotation_details_tax_type : tax,
                quotation_details_tax_amount :item.quotation_details_tax_amount,
                quotation_details_total :item.quotation_details_total,
              })
             setTabledata(tabletasks);
            })

            // setTabledata(item.fms_v1_quotation.fms_v1_quotation_details);
          });
          setGrandTotal(total.toFixed(2));

          let temp = "";

           let tabletasks = [];
           res.data.data.fms_v1_quotation_jobs.fms_v1_quotation.forEach((item,index) => {
            tabletasks.push({
              quotation_details_service_id : servicename,
              quotation_details_cost :item.quotation_details_cost,
              quotation_details_tax_type : tax,
              quotation_details_tax_amount :item.quotation_details_tax_amount,
              quotation_details_total :item.quotation_details_total,
            }
            )
            setAlldetailstable(tabletasks);
               })

          let date = moment(res.data.data.job_date).format("DD-MM-YYYY");
          temp = {
            job_id: res.data.data.job_id,
            job_no: res.data.data.job_number,
            job_cargo_type: res.data.data.job_cargo_type,
            job_mode: res.data.data.job_mode,
            job_no_of_pieces: res.data.data.job_no_of_pieces,
            job_shipper: res.data.data.job_shipper,
            // job_validity: res.data.data.job_validity,
            // job_validity1: validity,
            job_date: res.data.data.job_date,
            job_date1: date,
            job_exchange_rate: res.data.data.job_total_cost_exch,
            job_credit_days: res.data.data.job_credit_days,
            job_gross_wt: res.data.data.job_gross_wt,
            job_chargeable_wt: res.data.data.job_chargeable_wt,
            job_carrier: res.data.data.job_carrier,
            job_carrier1: res.data.data.fms_v1_carrier.carrier_name,
            job_consignee: res.data.data.job_consignee,
            job_consignee1: res.data.data.crm_v1_leads.lead_customer_name,
            job_currency: res.data.data.job_currency,
            job_currency1:
              res.data.data.generalsettings_v1_currency.currency_name,
            job_destination_id: res.data.data.job_destination_id,
            job_destination_id1:
              res.data.data
                .fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                .location_name,
            // job_destination_id1:
            //   res.data.data
            //     .fms_v1_locations_fms_v1_job_job_destination_idTofms_v1_locations
            //     .location_name,
            job_awb_bl_no: res.data.data.job_awb_bl_no,

            job_freight_type: res.data.data.job_freight_type,
            job_freight_type1:
              res.data.data.fms_v1_freight_types.freight_type_name,
            job_origin_id: res.data.data.job_origin_id,
            job_origin_id1:
              res.data.data
                .fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                .location_name,
            job_payment_terms: res.data.data.job_payment_terms,
            job_payment_terms1:
              res.data.data.fms_v1_payment_terms.payment_term_name,
            job_uom: res.data.data.job_uom,
            job_uom1: res.data.data.crm_v1_units.unit_name,
            fms_v1_job_details: res.data.data.fms_v1_job_details,
            fms_v1_enquiry_jobs: res.data.data.fms_v1_enquiry_jobs,
            job_docs: res.data.data.job_docs,
          };
          console.log("datas", temp);
          setInvoice_Status(res?.data?.data?.job_invoice_status);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  console.log("status", invoice_status);

  useEffect(() => {
    if (id) {
      getSinglepurchaseorder();
    }
  }, [id]);

  function setPageSize() {
    const page = document.querySelector(".print-page");
    page.style.width = "210mm";
    page.style.height = "297mm";
    page.style.margin = "10mm";
  }
  const handlePrint = () => {
    setPageSize();
    window.print();
  };

  // const handleviewtoedit = () => {
  //   navigate(`${}`);
  // };

  return (
    <>
      {/* <div className=" container-fluid view_quotation  p-3 px-4">
        <div className="row"> */}
      <div className="container-fluid">
        <div className="row justify-content-md-center mb-2">
          {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <h5 className="lead_text">View Job</h5>
          </div> */}
          <div className="content-tabs ">
            <div className="container-fluid ">
            <div className="row mt-1">
          <div className="col-sm-5 col-12 mt-4 ">
            <h5 className="lead_text">View Purchase Order</h5>
          </div>
          <div className="col-sm-7 col-12">
            <div className="d-flex justify-content-end py-3">
              <div className="col-xl-2 col-md-3 col-4 d-flex justify-content-end mb-3 ">
                <Button style={{width:70}}
                  btnType="add_borderless"
                  className="edit_button"
                  // onClick={handlePrint}
                  onClick={() => {
                    // handleviewtoedit();
                    // navigate(`${ROUTES.QUATATION_INVOICE}/${id}`);
                    window.open(
                      `http://localhost:3000/purchase_invoice/${id}`,
                      `_blank`
                    );
                  }}
                >
                  Print
                </Button>
              </div>
              <div className="col-xl-2 col-md-3 col-4 d-flex justify-content-end mb-3 ">
                <Button style={{width:80}}
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    // handleviewtoedit();
                    navigate(`${ROUTES.EDIT_PUCHASE_ORDER}/${id}`);
                  }}
                >
                  Edit
                  <FiEdit />
                </Button>
              </div>
            </div>
          </div>
        </div>
              <div className="row ms-1 mb-3 ">
                <div className="content-tabs-new row justify-content px-4">
                  <div className="row mt-3 mb-3">
                    <h5 className="lead_text">Basic Info</h5>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-4 boldhd">PO No</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">{allpo?.po_no}</p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Purchase Date</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {moment(allpo?.po_date).format("DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Due Date</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {/* 11-12-2023 */}
                        {/* {allpo?.po_due_date} */}
                        {moment(allpo?.po_due_date).format("DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Bill No</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">{allpo?.po_bill_no}</p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Vendor</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                      
                        {allpo?.crm_v1_vendors?.vendor_name}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              <div className="row ms-1 mb-3 ">
              <div className="content-tabs-new row justify-content px-4">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition={"end"}
            >
              <Panel header="AWB/BL Details" key="1">
                <div>
                  {" "}
                  <TableData
                    columns={progress}
                    // data={data}
                    bordered
                    custom_table_css="table_job_list"
                  />
                </div>
                <div className="d-flex justify-content-end   ">
                  <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 ">
                    <p style={{ fontWeight: 500 }}>Grand Total : </p>
                  </div>
                  <div className="col-lg-2 col-sm-2 col-xs-2 mt-3">
                    {/* <p>{allqoutation?.quotation_grand_total.toFixed(2)}</p> */}
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          </div>
            
              <div className="row ms-1 mb-3 ">
                <div className="content-tabs-new row justify-content px-4">
                  <div className="row mt-3 mb-3">
                    <h5 className="lead_text">Attachments</h5>
                  </div>

                  <div className="col-xl-6 col-sm-12 d-flex">
                    <div className="col-2 boldhd">Remarks</div>
                    <div className="col-1">:</div>

                    <div className="col-9">
                      <p className="modal-view-data">{allpo?.vendor_remarks}</p>
                    </div>
                  </div>

                  <div className="col-xl-6 col-sm-12 d-flex">
                    <div className="col-3 boldhd">Attachments</div>
                    <div className="col-1">:</div>

                    <div className="col-8">
                      <p className="modal-view-data">
                        {/* abc.pdf */}
                        {/* {moment(alljobs?.job_date).format("DD-MM-YYYY")} */}
                        <Attachments Isattachment={allpo?.vendor_docs >0} attachments={allpo?.vendor_docs || []} />
                      </p>
                    </div>
                  </div>


                </div>
              </div>
            </div>

       
          </div>
        </div>
      </div>
    </>
  );
}
