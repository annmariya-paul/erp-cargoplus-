import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import Button from "../../../../components/button/button";

import PublicFetch from "../../../../utils/PublicFetch";
import moment from "moment";
import { ROUTES } from "../../../../routes";

function ViewOpportunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Allopps, setAllOpps] = useState();
  console.log("all datttaa",Allopps);

  const GetSingleOpp = () => {
 
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/${id}`)
      .then((res) => {
        console.log("response ", res);
        if (res.data.success) {
          console.log("success of", res.data.data);
          setAllOpps(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      GetSingleOpp();
    }
  }, [id]);
  return (
    <div className="container-fluid view_quotation  p-3">
      {/* <div className="row ">
        <div className="col-10">
         
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
            </div> */}

            <div className="row mt-1">
          <div className="col-sm-5 col-12 mt-4 ">
            <h5 className="lead_text">View Opportunity</h5>
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
                    navigate(`${ROUTES.EDIT_OPPORTUNITY}/${id}`);
                  }}
                >
                  Edit
                  <FiEdit />
                </Button>
              </div>
            </div>
          </div>
        </div>
            <div className="row mt-3 pb-5">
            <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Opportunity No.</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">
              {Allopps?.opportunity_number}
              </p>
            </div>
           
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Type</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.crm_v1_customer?.opportunity_type}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Customer</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.crm_v1_customer?.customer_name}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Source</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.opportunity_source}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Valid up to</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {moment(Allopps?.opportunity_validity).format(
                          "DD-MM-YYYY"
                        )}
            </p>
          </div>
        </div>

      

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Expecting Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.opportunity_amount}

            </p>
          </div>
        </div>




        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Probability of conversion</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.opportunity_probability === 'L' ? 'Low' : Allopps?.opportunity_probability === 'H' ? 'High' : Allopps?.opportunity_probability === 'M' ? 'Medium' : ''}

            {/* {Allopps?.opportunity_probability} */}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Status</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.opportunity_status === 1 ? 'New' : Allopps?.opportunity_status === 2 ? 'Interested' : Allopps?.opportunity_status === 3 ? 'Converted' : Allopps?.opportunity_status === 4 ? 'Lost'  : ''}

            {/* {Allopps?.opportunity_probability} */}
            </p>
          </div>
        </div>

        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Remarks</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.opportunity_description}
            </p>
          </div>
        </div>

        
        {/* <div className="col-sm-6 d-flex">
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
        </div> */}

<div className="col-sm-6 d-flex">
          <div className="col-4 boldhd pb-3">Attachments</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {Allopps?.opportunity_docs[0]}
            </p>
          </div>
        </div>

        </div>   
           
         
      
    </div>
  );
}

export default ViewOpportunity;
