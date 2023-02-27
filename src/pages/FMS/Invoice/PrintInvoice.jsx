import React from "react";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import InvoicePrint from "../../../components/Invoice/InvoicePrint";
import PublicFetch from "../../../utils/PublicFetch";

function PrintInvoice() {
  const JobForInvoice = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/`);
  };
  return (
    <div>
      <InvoicePrint
        invoice_details1={
          <>
            <tr>
              <td>Invoice Date </td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Terms</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Chargable Weight</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Carrier</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Mode</td>
              <td>:</td>
              <td>1000</td>
            </tr>
          </>
        }
        invoice_details2={
          <>
            <tr>
              <td>Project Name</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>AWB/BL</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Origin</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Destination</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Shipper</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Consignee</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>No of pieces</td>
              <td>:</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Grows weight</td>
              <td>:</td>
              <td>1000</td>
            </tr>
          </>
        }
      />
    </div>
  );
}

export default PrintInvoice;
