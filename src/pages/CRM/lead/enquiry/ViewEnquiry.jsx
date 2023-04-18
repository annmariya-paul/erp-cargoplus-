import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import moment from "moment";
import { ROUTES } from "../../../../routes";

function ViewEnquiry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [AllEnquiries, setAllEnquires] = useState();

  const GetSingleEnquiry = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries/${id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllEnquires(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      GetSingleEnquiry();
    }
  }, [id]);
  return (
    <div className="container-fluid p-4">
      <div className="row report-content-tabs shadow-sm p-3">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <h5 style={{}} className="lead_text">
                View Enquiry
              </h5>
            </div>
            <div className="col-4"></div>
            <div className="col-3 d-flex justify-content-end">
              <Button
                className="edit_button"
                btnType="add_borderless"
                onClick={() => {
                  navigate(`${ROUTES.EDIT_ENQUIRY}/${id}`);
                }}
              >
                Edit <FaEdit />
              </Button>
            </div>
            <div className="col-1"></div>
            <div className="col-6 p-3 mt-5">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p
                        style={{ color: "black", fontWeight: "500" }}
                        className=""
                      >
                        {" "}
                        Enquiry No
                      </p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.enquiry_no}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Customer Name</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.crm_v1_customer?.customer_name}{" "}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className=""> Contact Person Name</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.crm_v1_contacts?.contact_person_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Source</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.enquiry_source}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Freight Type</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.fms_v1_freight_types?.freight_type_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Remarks</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.enquiry_remarks}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6 p-3 mt-5">
              <table>
                <tbody>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className=""> Enquiry Date</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {moment(AllEnquiries?.enquiry_date).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Sale Person</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                      {AllEnquiries?.hrms_v1_employee_sales_person
?.employee_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className=""> Email</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.crm_v1_contacts?.contact_email}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className=""> Phone</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.crm_v1_contacts?.contact_phone_1}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Customer Reference</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.enquiry_customer_ref}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "500" }}>
                      <p className="">Attachments</p>
                    </td>
                    <td>
                      {" "}
                      <p>:</p>
                    </td>
                    <td>
                      <p className="modal_view_p_sub">
                        {AllEnquiries?.enquiry_docs}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEnquiry;
