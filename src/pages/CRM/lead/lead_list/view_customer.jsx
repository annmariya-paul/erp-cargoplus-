import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../../components/button/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import { ROUTES } from "../../../../routes";
import TableData from "../../../../components/table/table_data";
import Attachments from "../../../../components/attachments/attachments";

// import { CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";

export default function Viewcustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allcustomer, setAllcustomer] = useState();

  const [allcontacts, setallcontacts] = useState([]);
  const [alladdress, setalladdress] = useState([])
  const [serialNo, setserialNo] = useState(1);

  const getSinglecustomer = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${id}`)
      .then((res) => {
        console.log("customer details iss", res);
        if (res.data.success) {
          console.log("single customer is", res.data.data);
          setAllcustomer(res?.data?.data);
          setallcontacts(res?.data?.data?.crm_v1_contacts)
          setalladdress(res?.data?.data?.crm_v1_addresses
            )
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

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      // width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
,
    {
      title: "EMAIL",
      dataIndex: "contact_email",
      key: "contact_email",
      align: "left",
    },
    {
      title: "CONTACT ",
      dataIndex: "contact_person_name",
      key: "contact_person",
      align: "left",
    },
    {
      title: "PHONE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
      align: "left",
    },
    {
      title: "MOBILE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
      align: "left",
    },
    {
      title: "DESIGNATION",
      dataIndex: "contact_designation",
      key: "contact_designation",
      align: "left",
    },
   
 ]
 const addresscolumn=[
  {
    title: "Sl. No.",
    key: "index",
    // width: "7%",
    render: (value, item, index) => serialNo + index,
    align: "center",
  },

  {
    title: "TITLE",
    dataIndex: "address_title",
    key: "address_title",
    align: "left",
  },
  {
    title: "ADDRESS ",
    dataIndex: "address_content",
    key: "address_content",
    align: "left",
  },
  {
    title: "PIN",
    dataIndex: "address_pin",
    key: "address_pin",
    align: "left",
  },
  {
    title: "CONTACT",
    dataIndex: "address_contact",
    key: "address_contact",
    align: "left",
  },
 
 ]

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
              onClick={() => {
                // handleviewtoedit();
                navigate(`${ROUTES.CUSTOMER_EDIT}/${id}`);
              }}
            >
              Edit
              <FiEdit />
            </Button>
          </div>
        </div>


        <div className="row mt-1 pb-2">
          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Customer Name</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_name}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Customer Type</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_type}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Address</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_address}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Phone</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_phone}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3"> Email</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_email}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Website</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_website}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Country</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.countries?.country_name}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">State</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_state}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">City</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_city  }</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Remarks</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_remarks}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Credit Limit</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_credit_limit}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Tax No</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_tax_no  }</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Credit Days</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_credit_days}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Preferred Freight Type</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_credit_days}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Quotation Validity Days</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">{allcustomer?.customer_qtn_validity_days}</p>
            </div>
          </div>

          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd pb-3">Attachment</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data"> 
              <Attachments  Isattachment={allcustomer?.customer_logo.length>0 }  attachments={allcustomer?.customer_logo || []}/>
              </p>
            </div>
          </div>

         

          </div>
          <div className="mt-2  "><h5 className="lead_text">Contact Details</h5> </div>
          <div className="datatable">
            { allcontacts &&(
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}
            data={allcontacts}
            columns={columns}
            custom_table_css="contact_table"
          />
          )}
        </div>
<div className="mt-2"><h5 className="lead_text">Address Details</h5> </div>
        <div className="datatable">
            { alladdress && (
            <TableData
              // data={getData(numofItemsTo, pageofIndex)}
              data={alladdress}
              columns={addresscolumn}
              custom_table_css="contact_table"
            />
            )}
          </div>
        
      </div>
    </>
  );
}