import "../Quotations/create quotation/quotation.scss";
import React, { useState, useRef, useEffect } from "react";

import Button from "../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import TableData from "../../../components/table/table_data";

import { Alert, Collapse, message, Popconfirm } from "antd";
import html2canvas from "html2canvas";

import { BorderOutlined } from "@ant-design/icons";
import PublicFetch from "../../../utils/PublicFetch";
import { ROUTES } from "../../../routes";

import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Attachments from "../../../components/attachments/attachments";
const onChange = (key) => {
  console.log(key);
};

const progress = [
  {
    title: "TASKS",
    dataIndex: "quotation_details_service_id",
    key: "quotation_details_service_id",
    align: "left",
    // render: (value, item, indx) => count + indx,
  },
  {
    title: "TAX GROUP",
    dataIndex: "job_task_expense_tax_group_name",
    key: "job_task_expense_tax_group_name",
    align: "left",
  },
  {
    title: "COST",
    dataIndex: "quotation_details_cost",
    key: "quotation_details_cost",
    align: "right",
  },
  {
    title: "TAX AMOUNT",
    dataIndex: "quotation_details_tax_amount",
    key: "quotation_details_tax_amount",
    width: "35%",
    align: "right",
    // render: (opportunity_update_next_date_contact) => {
    //   return (
    //     <label>
    //       {moment(opportunity_update_next_date_contact).format("DD-MM-YYYY")}
    //     </label>
    //   );
    // },
  },
  {
    title: "TOTAL AMOUNT",
    dataIndex: "quotation_details_total",
    key: "quotation_details_total",

    align: "right",
  },
];
const { Panel } = Collapse;
const data = [
  {
    tasks: "Data",
    cost: "4223",
    taxtype: "test",
    taxamount: "xyz",

    totalamount: "1000",

    key: "1",
  },
  {
    tasks: "Test",
    cost: "4545",
    taxtype: "test",
    taxamount: "xyz",
    totalamount: "2000",
    key: "2",
  },
];
export default function ViewJob() {
  const { id } = useParams();
  console.log("id :::::", id);
  const printRef = useRef(null);
  const [alljobs, setAllJobs] = useState();
  console.log("all jobs : ", alljobs);
  const [qtnno, setQtnno] = useState();
  const [tabledata, setTabledata] = useState();
  const [grandtotal, setGrandTotal] = useState();
  console.log("grand", grandtotal);
  const [AllAttachments, setAllAttachments] = useState();
  console.log("all attachments ", AllAttachments);
  const [detailstable, setAlldetailstable] = useState();
  const [invoice_status, setInvoice_Status] = useState();
  console.log("details", detailstable);
  console.log("qtntable: ", tabledata);
  console.log("qtnno: ", qtnno);
  console.log("grandtotal: ", grandtotal);
  const navigate = useNavigate();
  const [servicename, setService] = useState();
  console.log("service name ", servicename);
  const [tax, setTax] = useState();
  console.log("tax name:", tax);
  const getSingleJob = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
      .then((res) => {
        console.log("response of job", res);
        if (res.data.success) {
          console.log("Success of job", res.data.data);
          setAllJobs(res?.data?.data);
          setInvoice_Status(res?.data?.data?.job_invoice_status);

          let total = 0;
          let newdatas = [];
          res?.data?.data?.fms_v1_quotation_jobs?.forEach((item, index) => {
            newdatas.push(item?.fms_v1_quotation.quotation_no);
            setQtnno(newdatas);
          });
          let servdata = [];
          res.data.data.fms_v1_job_task_expenses.forEach((item, index) => {
            servdata.push({
              quotation_details_service_id: item.crm_v1_services.service_name,
              quotation_details_cost:
                item.job_task_expense_cost_amountfx.toFixed(2),
              job_task_expense_tax_group_name:
                item.fms_v1_tax_groups.tax_group_name,
              quotation_details_tax_amount:
                item.job_task_expense_cost_taxfx.toFixed(2),
              quotation_details_total:
                item.job_task_expense_cost_subtotalfx.toFixed(2),
            });
            setTax(servdata);
            total = Number.parseFloat(total);
            total += item.job_task_expense_cost_subtotalfx;

            // let tabletasks = [];
            // item.fms_v1_quotation.fms_v1_quotation_details.forEach((item, index) => {
            //   tabletasks.push({
            //     quotation_details_service_id : servicename,
            //     quotation_details_cost :item.quotation_details_cost,
            //     quotation_details_tax_type : tax,
            //     quotation_details_tax_amount :item.quotation_details_tax_amount,
            //     quotation_details_total :item.quotation_details_total,
            //   })
            //  setTabledata(tabletasks);
            // })

            // setTabledata(item.fms_v1_quotation.fms_v1_quotation_details);
          });
          setGrandTotal(total.toFixed(2));

          let temp = "";

          //  let tabletasks = [];
          //  res.data.data.fms_v1_quotation_jobs.fms_v1_quotation.forEach((item,index) => {
          //   tabletasks.push({
          //     quotation_details_service_id : servicename,
          //     quotation_details_cost :item.quotation_details_cost,
          //     quotation_details_tax_type : tax,
          //     quotation_details_tax_amount :item.quotation_details_tax_amount,
          //     quotation_details_total :item.quotation_details_total,
          //   }
          //   )
          //   setAlldetailstable(tabletasks);
          //      })

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
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  console.log("status", invoice_status);

  useEffect(() => {
    if (id) {
      getSingleJob();
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

  const handleviewtoInvoice = () => {
    let tmp = true;
    if (tax?.length > 0) {
      navigate(`${ROUTES.INVOICE_PREVIEW}/${id}`);
    } else {
      message.error("Please Enter Task and Expense");
    }
  };

  return (
    <>
      <div className="container-fluid ms-0 me-2">
        <div className="row ">
          <div className="col-sm-5 col-12 mt-4 ">
            <h5 className="lead_text">View Job</h5>
          </div>
          <div className="col-sm-7 col-12">
            <div className="d-flex justify-content-end py-2">
              {/* <div className="col-1"></div>
                    <div className="col-1"></div> */}

              <div className="col-xl-2 col-md-3 col-4 d-flex justify-content-end ">
                <Button
                  style={{ width: 70, height: 40 }}
                  btnType="add_borderless"
                  className="edit_button"
                  // onClick={handlePrint}
                  onClick={() => {
                    // window.open(

                    //   `${ROUTES.JOB_INVOICE}/${id}`,
                    //   `_blank`
                    // );
                    // navigate(`${ROUTES.JOB_INVOICE}/${id}`);
                    window.open(
                      `http://localhost:3000/job_invoice/${id}`,
                      `_blank`
                    );
                  }}
                >
                  Print
                </Button>
              </div>
              <div className="col-xl-2 col-md-3 col-4 d-flex justify-content-end  me-1">
                <Button
                  style={{ width: 80, height: 40 }}
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    // handleviewtoedit();
                    navigate(`${ROUTES.UPDATEJOB}/${id}`);
                  }}
                >
                  Edit
                  <FiEdit />
                </Button>
              </div>
              <div className="col-xl-2 col-md-3 col-4 d-flex justify-content-end mb-3">
                {invoice_status !== 0 ? (
                  <Button
                    style={{ height: 60 }}
                    btnType="save"
                    className="edit_button "
                    onClick={() => {
                      if (invoice_status == 1) {
                        message.error("Invoice Already Created");
                      } else {
                        handleviewtoInvoice();
                      }
                    }}
                  >
                    Regenerate Invoice
                    {/* <FiEdit /> */}
                  </Button>
                ) : (
                  <Button
                    btnType="save"
                    className="edit_button rounded"
                    onClick={() => {
                      // navigate(`${ROUTES.INVOICE_PREVIEW}/${id}`);
                      handleviewtoInvoice();
                    }}
                  >
                    Generate Invoice
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1 ">
          <div className="content-tabs-new row justify-content mx-1 mb-3 ">
            <div className="row mt-3 ">
              <h6 className="lead_text">Basic Info</h6>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Job No</div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">{alljobs?.job_number}</p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Job Date</div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">
                  {moment(alljobs?.job_date).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Freight type</div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">
                  {alljobs?.fms_v1_freight_types?.freight_type_name}
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Quotation No</div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">{qtnno}</p>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Customer</div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">
                  {alljobs?.crm_v1_customer?.customer_name}
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Shipper</div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">{alljobs?.job_shipper}</p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="row  mt-1 ">
          <div className="content-tabs-new row justify-content mx-1 mb-3">
            {/* <div className="col-md-6 col-12 mt-2">
                <div className="content-tabs-new row justify-content mx-1 mb-3"> */}
            <div className="col-12">
              <h6 className="lead_text">Transportation</h6>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">Mode</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">{alljobs?.job_mode}</p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">Origin</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">
                  {
                    alljobs
                      ?.fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                      ?.location_name
                  }
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">Destination</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">
                  {
                    alljobs
                      ?.fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                      ?.location_name
                  }
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">Carrier</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">
                  {alljobs?.fms_v1_carrier?.carrier_name}
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">AWB/BL No</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">{alljobs?.job_awb_bl_no}</p>
              </div>
            </div>
            {/* </div>
              </div> */}
          </div>
        </div>
        <div className="row  mt-1 ">
          <div className="content-tabs-new row justify-content mx-1 mb-3">
            {/* <div className="content-tabs-new row justify-content mx-1 mb-3 me-3"> */}
            <div className="col-12">
              <h6 className="lead_text">Shipment Details</h6>
            </div>
            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">Cargo Type</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">{alljobs?.job_cargo_type}</p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">No of pieces </div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">{alljobs?.job_no_of_pieces}</p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">UOM</div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">
                  {alljobs?.crm_v1_units?.unit_name}
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-3 boldhd">Gross wt </div>
              <div className="col-1">:</div>

              <div className="col-8">
                <p className="modal-view-data">{alljobs?.job_gross_wt}</p>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 d-flex mt-2 px-3">
              <div className="col-4 boldhd">Chargeable wt </div>
              <div className="col-1">:</div>

              <div className="col-7">
                <p className="modal-view-data">{alljobs?.job_chargeable_wt}</p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="row mt-1 justify-content-between ">
          <div className="col-xl-6 col-lg-12 col-md-12 col-12 ">
            <div
              className="row content-tabs-new justify-content  mb-3 "
              style={{ height: "93%" }}
            >
              <div className="row mt-2">
                <h6 className="lead_text">Payment Info</h6>
              </div>

              <div className="col-12 d-flex ">
                <div className="col-3 boldhd">Payment Terms</div>
                <div className="col-1">:</div>

                <div className="col-8">
                  <p className="modal-view-data">
                    {alljobs?.fms_v1_payment_terms?.payment_term_name}
                  </p>
                </div>
              </div>

              <div className="col-12 d-flex">
                <div className="col-3 boldhd">Currency </div>
                <div className="col-1">:</div>

                <div className="col-8">
                  <p className="modal-view-data">
                    {alljobs?.generalsettings_v1_currency?.currency_name}
                  </p>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-3 boldhd">Exchange Rate </div>
                <div className="col-1">:</div>

                <div className="col-8">
                  <p className="modal-view-data">
                    {alljobs?.job_total_cost_exch}
                  </p>
                </div>
              </div>
              <div className="col-12 d-flex mb-1">
                <div className="col-3 boldhd">Credit Days</div>
                <div className="col-1">:</div>

                <div className="col-xl-8 col-sm-12">
                  <p className="modal-view-data">{alljobs?.job_credit_days}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-12 ">
            <div className="content-tabs-new row justify-content ms-1 mb-3">
              <div className="row mt-2">
                <h6 className="lead_text">Attachments</h6>
              </div>
              <div className="row ">
                <div className="col-6 d-flex  attachment-container">
                  <div className="col-6 ">Attachments </div>
                  <div className="col-1">:</div>
                </div>
                <div className="col-6">
                  <div className="col-12 ">
                    <div className="modal-view-data">
                      <Attachments
                        Isattachment={alljobs?.job_docs.length > 0}
                        attachments={alljobs?.job_docs || []}
                      />

                      {/* {alljobs?.job_docs} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12  mt-2">
            <div className="row justify-content-end">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 my-2"> */}
        {tax ? (
          <div className="row mt-1 ">
            <div className="content-tabs-new row justify-content mx-1 mb-3">
              {/* <div className="row mt-3">
                    <h5 className="lead_text">Task & Description</h5>
                  </div> */}

              {/* <div className="col-1"></div> */}

              <div className=" mt-1">
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={onChange}
                  expandIconPosition={"end"}
                >
                  <Panel header="TASK DETAILS" key="1">
                    <div>
                      {" "}
                      <TableData
                        columns={progress}
                        data={tax}
                        bordered
                        custom_table_css="table_job_list"
                      />
                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-3">
                      <div className="">
                        <p style={{ fontWeight: 600 }}>Grand Total : </p>
                      </div>
                      {/* <div className="col-1">:</div> */}
                      <div className="">
                        <p style={{ fontWeight: 600 }}>{grandtotal}</p>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
        ) : null}
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
}
