import React, { useEffect, useState } from "react";

import { FiEdit } from "react-icons/fi";

import Button from "../../../../components/button/button";

import PublicFetch from "../../../../utils/PublicFetch";
import { ROUTES } from "../../../../routes";

import { Link, useNavigate, useParams } from "react-router-dom";
import { CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";
import TableData from "../../../../components/table/table_data";

export default function Viewvendor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allvendor, setAllvendor] = useState();
  const [allcontact,setallcontact]= useState()
  const [serialNo, setserialNo] = useState(1);

  console.log("all vendor : ", allvendor);
  const getSinglevendor = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${id}`)
      .then((res) => {
        console.log("one of vendor", res);
        if (res.data.success) {
          console.log("one  vendor isss", res.data.data);
          setAllvendor(res?.data?.data);
          setallcontact(res?.data?.data?.crm_v1_vendor_contacts)
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

  const addresscolumn=[
    {
      title: "Sl. No.",
      key: "index",
      // width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
  
    {
      title: "EMAIL",
      dataIndex: "ven_contact_email",
      key: "ven_contact_email",
      align: "left",
    },
    {
      title: "CONTACT ",
      dataIndex: "ven_contact_person_name",
      key: "contact_person",
      align: "left",
    },
    {
      title: "PHONE",
      dataIndex: "ven_contact_phone_1",
      key: "contact_phone_1",
      align: "left",
    },
    {
      title: "MOBILE",
      dataIndex: "ven_contact_phone_2",
      key: "contact_phone_1",
      align: "left",
    },
    {
      title: "DESIGNATION",
      dataIndex: "ven_contact_designation",
      key: "contact_designation",
      align: "left",
    },
   
   ]
  

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
            <p className="modal-view-data">{allvendor?.crm_v1_vendor_freight_types?.fms_v1_freight_types?.freight_type_name}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Incoterm</div>
            <div className="col-1">:</div>
            <div className="col-7">
            <p className="modal-view-data">{allvendor?.crm_v1_vendor_incoterms?.fms_v1_incoterms?.incoterm_full_name}</p>
            </div>
          </div>

        </div>

        <div className="mt-2"><h5>Contact Details</h5> </div>
        <div className="datatable">
            { allcontact && (
            <TableData
              // data={getData(numofItemsTo, pageofIndex)}
              data={allcontact}
              columns={addresscolumn}
              custom_table_css="contact_table"
            />
            )}
          </div>
      </div>
    </>
  );
}
