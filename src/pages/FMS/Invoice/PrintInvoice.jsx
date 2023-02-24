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
              <td>Invoice Job No </td>
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
