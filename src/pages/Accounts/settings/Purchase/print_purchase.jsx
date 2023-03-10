import InvoicePrint from "../../../../components/Invoice/InvoicePrint";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Print_purchase() {
  var converter = require("number-to-words");

  const { id } = useParams();
  const [tabledata, setTabledata] = useState();
  const [alldata, setAllData] = useState();
  const [grandTotal, setGrandTotal] = useState();

  return (
    <>
      <InvoicePrint
        invoice_no
        Invoice_type={"Purchase"}
        invoice_number={alldata?.invoice_no}
        invoice_details1={
          <>
            <tr>
              <td>Po No </td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                90
                {/* {moment(alldata?.invoice_date).format("DD-MM-YYYY")} */}
              </td>
            </tr>
            <tr>
              <td>Purchase Date</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {moment(alldata?.invoice_date).format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr>
              <td>Due Date</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                {moment(alldata?.invoice_date).format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr>
              <td>Vendor</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                rgthgyh
                {/* {alldata?.fms_v1_jobs?.fms_v1_payment_terms?.payment_term_name} */}
              </td>
            </tr>
            <tr>
              <td>Payment Mode</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                snhd
                {/* {alldata?.fms_v1_jobs?.job_chargeable_wt} */}
              </td>
            </tr>
            <tr>
              <td>Credit days</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                7
                {/* {alldata?.fms_v1_jobs?.fms_v1_carrier?.carrier_name} */}
              </td>
            </tr>
          </>
        }
        invoice_details2={
          <>
            <tr>
              <td>Taxable</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                s
                {/* {alldata?.fms_v1_jobs?.job_mode} */}
              </td>
            </tr>

            <tr>
              <td>Tax No</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                3r43r5435t65

                {/* {alldata?.fms_v1_jobs?.job_number} */}
              </td>
            </tr>
            <tr>
              <td>Bill No</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                1232454555555556
                {/* {alldata?.fms_v1_jobs?.job_awb_bl_no} */}
              </td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                t53q345r
                {/* {
                  alldata?.fms_v1_jobs
                    ?.fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                    ?.location_name
                } */}
              </td>
            </tr>
            <tr>
              <td>Tax Amount</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                5tqfgvx
                {/* {
                  alldata?.fms_v1_jobs
                    ?.fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                    ?.location_name
                } */}
              </td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>:</td>
              <td style={{ fontWeight: 600 }}>
                trhty
                {/* {alldata?.fms_v1_jobs?.job_shipper} */}
              </td>
            </tr>
          </>
        }
        // invoice_table_header={
        //   <>
        //     <tr>
        //       <th>#</th>
        //       <th>Task & description</th>
        //       {/* <th>Tax Type</th>
        //       <th>Cost</th>
        //       <th>Tax amount</th> */}
        //       <th id="amount">Amount</th>
        //     </tr>
        //   </>
        // }
        // invoice_table_data={
        //   <>
        //     {tabledata &&
        //       tabledata.length > 0 &&
        //       tabledata.map((item, index) => {
        //         return (
        //           <tr>
        //             <td>{index + 1}</td>
        //             <td>{item?.job_task_expense_task_name}</td>
        //             {/* <td></td>
        //             <td></td>
        //             <td></td> */}
        //             <td style={{ textAlign: "right" }}>
        //               {item.job_task_expense_cost_subtotalfx}
        //             </td>
        //           </tr>
        //         );
        //       })}
        //   </>
        // }
        // amount_in_words={
        //   <>{grandTotal && <>{converter.toWords(grandTotal)}</>}</>
        // }
        // sub_total={grandTotal}
        // total={grandTotal}
      />
    </>
  );
}
