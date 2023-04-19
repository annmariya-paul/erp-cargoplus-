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
        console.log("response ", res);
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
    <div className="container-fluid view_quotation  p-3">
      <div className="row ">
        <div className="col-10">
          {/* <div className="row"> */}
            {/* <div className="col-4"> */}
            <h5 className="lead_text">
                View Enquiry
              </h5>
            </div>

            
            <div className="col-2 d-flex justify-content-end">
              <Button
                btnType="add_borderless"
                className="edit_button"
                onClick={() => {
                  navigate(`${ROUTES.EDIT_ENQUIRY}/${id}`);
                }}
              >
                Edit <FaEdit />
              </Button>
            </div>
            </div>
            <div className="row mt-3 pb-5">
            <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Enquiry No</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">
              {AllEnquiries?.enquiry_no}
              </p>
            </div>
           
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Customer Name</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.crm_v1_customer?.customer_name}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Contact Person Name</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.crm_v1_contacts?.contact_person_name}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Source</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.enquiry_source}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Freight Type</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.fms_v1_freight_types?.freight_type_name}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Remarks</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.enquiry_remarks}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Enquiry Date</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {moment(AllEnquiries?.enquiry_date).format(
                          "DD-MM-YYYY"
                        )}

            </p>
          </div>
        </div>




        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Sale Person</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.hrms_v1_employee_sales_person
?.employee_name}

            </p>
          </div>
        </div>



        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Email</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.crm_v1_contacts?.contact_email}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Phone</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.crm_v1_contacts?.contact_phone_1}
            </p>
          </div>
        </div>


        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Customer Reference</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.enquiry_customer_ref}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Attachments</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllEnquiries?.enquiry_docs}
            </p>
          </div>
        </div>



        </div>   
           
         
      
    </div>
  );
}

export default ViewEnquiry;
