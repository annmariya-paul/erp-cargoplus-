import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../../components/button/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
// import { CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";

export default function Viewcustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allcustomer, setAllcustomer] = useState();


  const getSinglecustomer = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${id}`)
      .then((res) => {
        console.log("customer details iss", res);
        if (res.data.success) {
          console.log("Success of vendor", res.data.data);
          setAllcustomer(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  console.log("customer isss : ", allcustomer);

  useEffect(() => {
    if (id) {
      getSinglecustomer();
    }
  }, [id]);

  return (
    <>
      <div className=" container-fluid view_quotation  p-3">
        <div className="row">
          <div className="col-10">
            <h5 className="lead_text">View Customer</h5>
          </div>
          <div className="col-2 d-flex justify-content-end">
        
            <Button
              btnType="add_borderless"
              className="edit_button"
            //   onClick={() => {
            //     // handleviewtoedit();
            //     navigate(`${ROUTES.UPDATE_VENDOR}/${id}`);
            //   }}
            >
              Edit
              <FiEdit />
            </Button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <p> Customer Name</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.customer_name}
              </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Customer Type</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.customer_type}
              </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Phone</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.customer_phone}
            </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p>Email</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.customer_email}
              </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Contact </p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.crm_v1_contacts[0]?.contact_person_name} 
              </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p>Website</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.customer_website}
              </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Country</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.countries?.country_name}
            </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> State</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allcustomer?.customer_state}
              </p>
          </div>
        </div>
      </div>
    </>
  );
}