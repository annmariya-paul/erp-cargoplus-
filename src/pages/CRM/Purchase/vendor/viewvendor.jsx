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
        console.log("one of vendor", res);
        if (res.data.success) {
          console.log("one  vendor isss", res.data.data);
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

        <div className="row mt-1 pb-2">
          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Vendor Name</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allvendor?.vendor_name}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Organisation Type</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.vendor_org_type}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Type</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data"> {allvendor?.crm_v1_vendor_types?.vendor_type_name}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Address</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data"> {allvendor?.vendor_address}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Email</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.vendor_email}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Phone</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.vendor_phone} </p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Website</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.vendor_website} </p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">State</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data"> {allvendor?.vendor_state}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">City</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data"> {allvendor?.vendor_city}</p>
            </div>
          </div>
          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Tax No</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.vendor_tax_no}</p>
            </div>
          </div>
          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Credit Days</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.vendor_credit_days}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Preferred frighttype</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">Test One</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Incoterm</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">Test One</p>
            </div>
          </div>

        </div>

       
      </div>
    </>
  );
}
