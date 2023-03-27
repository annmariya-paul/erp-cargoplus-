import React, { useEffect, useState } from "react";

import { FiEdit } from "react-icons/fi";

import Button from "../../../../components/button/button";

import PublicFetch from "../../../../utils/PublicFetch";
import { ROUTES } from "../../../../routes";

import { Link, useNavigate, useParams } from "react-router-dom";
import { CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";

export default function Viewvendor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allvendor, setAllvendor] = useState();

  console.log("all vendor : ", allvendor);
  const getSinglevendor = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${id}`)
      .then((res) => {
        console.log("response of vendor", res);
        if (res.data.success) {
          console.log("Success of vendor", res.data.data);
          setAllvendor(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      getSinglevendor();
    }
  }, [id]);

  return (
    <>
      <div className=" container-fluid view_quotation  p-3">
        <div className="row">
          <div className="col-10">
            <h5 className="lead_text">View Vendor</h5>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <Button
              btnType="add_borderless"
              className="edit_button"
              onClick={() => {
                // handleviewtoedit();
                navigate(`${ROUTES.UPDATE_VENDOR}/${id}`);
              }}
            >
              Edit
              <FiEdit />
            </Button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <p> Vendor Name</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">{allvendor?.vendor_name}</p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Organisation Type</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">{allvendor?.vendor_org_type}</p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Type</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allvendor?.crm_v1_vendor_types?.vendor_type_name}
            </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p>Email</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">{allvendor?.vendor_email}</p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Contact </p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">{allvendor?.vendor_contact} </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p>Tax No</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">{allvendor?.vendor_tax_no}</p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Country</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">
              {allvendor?.countries?.country_name}
            </p>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <p> Vendortype Description</p>
          </div>
          <div className="col-1">:</div>
          <div className="col-6 justify-content-start">
            <p className="modal-view-data">{allvendor?.vendor_desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
