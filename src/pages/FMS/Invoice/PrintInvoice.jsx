import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import InvoicePrint from "../../../components/Invoice/InvoicePrint";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";

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
              let grandtotal = 0;
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

  const close_modal = (time) => {
    if (time) {
      setTimeout(() => {
        window.print();
      }, time);
    }
  };

  useEffect(() => {
    if (id) {
      Invoicedata_data();
    }
  }, [id]);
  return (
    <div>
      <InvoicePrint
        invoice_no
        Invoice_type={"Invoice"}
        invoice_number={alldata?.invoice_no}
        invoice_details1={
          <>
            <tr>
              <td>Invoice Date </td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {moment(alldata?.invoice_date).format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr>
              <td>Terms</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.fms_v1_payment_terms?.payment_term_name}
              </td>
            </tr>
            <tr>
              <td>Chargable Weight</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_chargeable_wt}
              </td>
            </tr>
            <tr>
              <td>Carrier</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.fms_v1_carrier?.carrier_name}
              </td>
            </tr>
            <tr>
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
            <tr>
              <td>Project Name</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_number}
              </td>
            </tr>
            <tr>
              <td>AWB/BL</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_awb_bl_no}
              </td>
            </tr>
            <tr>
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
            <tr>
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
            <tr>
              <td>Shipper</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_shipper}
              </td>
            </tr>
            <tr>
              <td>Consignee</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.crm_v1_leads?.lead_customer_name}
              </td>
            </tr>
            <tr>
              <td>No of pieces</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {alldata?.fms_v1_jobs?.job_no_of_pieces}
              </td>
            </tr>
            <tr>
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
            <tr>
              <th>#</th>
              <th>Task & description</th>
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
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.job_task_expense_task_name}</td>
                    {/* <td></td>
                    <td></td>
                    <td></td> */}
                    <td style={{ textAlign: "right" }}>
                      {item.job_task_expense_cost_subtotalfx}
                    </td>
                  </tr>
                );
              })}
          </>
        }
        amount_in_words={
          <>{grandTotal && <>{converter.toWords(grandTotal)}</>}</>
        }
        sub_total={grandTotal}
        total={grandTotal}
      />
    </div>
  );
}

export default PrintInvoice;
