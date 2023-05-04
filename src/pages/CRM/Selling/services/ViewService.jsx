import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import {CRM_BASE_URL_SELLING} from "../../../../api/bootapi";
import Button from "../../../../components/button/button";

import PublicFetch from "../../../../utils/PublicFetch";
import moment from "moment";
import {ROUTES} from "../../../../routes";

import Attachments from "../../../../components/attachments/attachments";

function ViewService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [AllServices, setAllServices] = useState();
  const [AllAttachments, setAllAttachments] = useState();
  console.log("all attachments ",AllAttachments);
  const GetSingleService = () => {
    PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/service/${id}`)
     
      .then((res) => {
        console.log("response ", res);
        if (res.data.success) {
          console.log("success of enq", res.data.data);
          setAllServices(res?.data?.data);
          setAllAttachments(res?.data?.data?.service_pic);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
        GetSingleService();
    }
  }, [id]);
  return (
    <div className="container-fluid view_quotation " >
     

            <div className="row mt-1">
          <div className="col-sm-5 col-12 mt-4 ">
            <h5 className="lead_text">View Service</h5>
          </div>
          <div className=" col-xl-12 col-sm-9" style={{marginTop:"-4%",marginBottom:"1%"}}>
            <div className="d-flex justify-content-end ">
             
              <div className="col-xl-6 col-md-4 col-4 d-flex justify-content-end mb-3 ">
                {/* <Button style={{width:300}}
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
                </Button> */}
              </div>
              <div className="col-xl-3 col-md-4 col-4 d-flex justify-content-end mb-3 ">
                <Button style={{width:100}}
                  btnType="add_borderless"
                  className="edit_button me-3"
                  onClick={() => {
                    navigate(`${ROUTES.SERVICE_EDIT}/${id}`);
                  }}
                >
                  Edit
                  <FiEdit />
                </Button>
              </div>
              {/* <div className="col-xl-3 col-md-4 col-4 d-flex justify-content-end mb-3 ">
                <Button style={{width: 300 }}
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    navigate(`${ROUTES.ADD_OPPORTUNITY}/${id}`);
                  }}
                >
                  Convert to Opportunity
               
                </Button>
              </div> */}
            </div>
          </div>
        </div>
            <div className="row mt-3 pb-5">
            <div className="col-12 d-flex">
            <div className="col-4 boldhd pb-3">Name</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">
              {AllServices?.service_name}
              </p>
            </div>
           
        </div>
        <div className="col-12 d-flex">
          <div className="col-4 boldhd pb-3">Code</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllServices?.service_code}
            </p>
          </div>
        </div>

        <div className="col-12 d-flex">
          <div className="col-4 boldhd pb-3">Category</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllServices?.crm_v1_categories?.category_name}
            </p>
          </div>
        </div>

        <div className="col-12 d-flex">
          <div className="col-4 boldhd pb-3">Tax Groups</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllServices?.fms_v1_tax_groups?.tax_group_name}
            </p>
          </div>
        </div>
     

        <div className="col-12 d-flex">
          <div className="col-4 boldhd pb-3">Description</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
            {AllServices?.service_description}
            </p>
          </div>
        </div>

       




       


     
      

     
        <div className="col-12 d-flex">
          <div className="col-4 boldhd pb-3">Attachments</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
             {AllServices?.service_pic} 
            {/* <Attachments Isattachment={AllServices?.service_pic.length >0}  attachments={AllServices?.service_pic || []} /> */}
            </p>
          </div>
        </div>



        </div>   
           
         
      
    </div>
  );
}

export default ViewService;
