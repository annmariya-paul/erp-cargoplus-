import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import InvoicePrint from "../../../components/Invoice/InvoicePrint";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";
import { camelize } from "../../../utils/camelcaseconvert";


function PrintInvoice() {
  var converter = require("number-to-words");

  const { id } = useParams();
  const [tabledata, setTabledata] = useState();
  const [alldata, setAllData] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const Invoicedata_data = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/invoice/${id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success of invoice", res.data.data);
          let temp = [];
          let grandtotal = 0;

          res?.data?.data?.fms_v1_jobs?.fms_v1_job_task_expenses.forEach(
            (item, index) => {
              temp.push({
                job_task_expense_id: item.job_task_expense_id,
                job_task_expense_cost_subtotalfx:
                  item.job_task_expense_cost_subtotalfx,
                job_task_expense_cost_taxfx: item.job_task_expense_cost_taxfx,
                job_task_expense_cost_amountfx:
                  item.job_task_expense_cost_amountfx,
                job_task_expense_job_id: item.job_task_expense_job_id,
                job_task_expense_task_id: item.job_task_expense_task_id,
                job_task_expense_tax_perc: item.job_task_expense_tax_perc,
                job_task_expense_taxtype_id: item.job_task_expense_taxtype_id,
                job_task_expense_task_name: item?.crm_v1_services?.service_name,
              });
              grandtotal += item.job_task_expense_cost_subtotalfx;
              grandtotal = Number.parseFloat(grandtotal);
              setGrandTotal(grandtotal.toFixed(2));
            }
          );
          setTabledata(temp);
          setAllData(res.data.data);
          close_modal(1200);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)

  const close_modal = (time) => {
    if (time) {
      setTimeout(() => {
        window.print();
      }, time);
    }
  };

  // let totalAmount = converter.toWords(grandTotal)
//  let inWords = camelize(totalAmount)
  // console.log("grand total", inWords);
  useEffect(() => {
    if (id) {
      Invoicedata_data();
    }
  }, [id]);
  return (
    <div>
      <InvoicePrint
        invoice_no
        billto
        Invoice_type={"Invoice"}
        invoice_number={alldata?.invoice_no}
        invoice_details1={
          <>
            <tr className="invoice_header">
              <td>Invoice Date</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {moment(alldata?.invoice_date).format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Terms</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.fms_v1_payment_terms?.payment_term_name}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Chargable Weight</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_chargeable_wt}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Carrier</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.fms_v1_carrier?.carrier_name}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Mode</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_mode}
              </td>
            </tr>
          </>
        }
        invoice_details2={
          <>
            <tr className="invoice_header">
              <td>Project Name</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_number}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>AWB/BL</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_awb_bl_no}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Origin</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {
                  alldata?.fms_v1_jobs
                    ?.fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                    ?.location_name
                }
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Destination</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {
                  alldata?.fms_v1_jobs
                    ?.fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                    ?.location_name
                }
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Shipper</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_shipper}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Consignee</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.crm_v1_leads?.lead_customer_name}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>No of pieces</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_no_of_pieces}
              </td>
            </tr>
            <tr className="invoice_header">
              <td>Grows weight</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_gross_wt}
              </td>
            </tr>
          </>
        }
        invoice_table_header={
          <>
            <tr className="invoice_header">
              <th className="th_center">#</th>
              <th className="tsk_exp">Task & description</th>
              {/* <th>Tax Type</th>
              <th>Cost</th>
              <th>Tax amount</th> */}
              <th id="amount">Amount</th>
            </tr>
          </>
        }
        invoice_table_data={
          <>
            {tabledata &&
              tabledata.length > 0 &&
              tabledata.map((item, index) => {
                return (
                  <tr className="invoice_header">
                    <td align="center">{index + 1}</td>
                    <td className="tsk_exp">
                      {item?.job_task_expense_task_name}
                    </td>
                    {/* <td></td>
                    <td></td>
                    <td></td> */}
                    <td style={{ textAlign: "right" }}>
                      {item.job_task_expense_cost_subtotalfx.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
          </>
        }
        amount_in_words={
          <>{grandTotal && <>{camelize(converter.toWords(grandTotal))}</>}</>
        }
        sub_total={grandTotal}
        total={grandTotal}
      />
    </div>
  );
}

export default PrintInvoice;
