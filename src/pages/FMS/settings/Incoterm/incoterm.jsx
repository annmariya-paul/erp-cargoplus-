import { Input, Select, Checkbox } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { ACCOUNTS } from "../../../../api/bootapi";
import { useEffect } from "react";
import PublicFetch from "../../../../utils/PublicFetch";
// import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

export default function JobPayments() {
 const [serialNo, setserialNo] = useState(1);
 return (
   <>
     <div className="container-fluid container_fms pt-3">
       <div className="row flex-wrap">
         <div className="col">
           <h5 className="lead_text">Job Payments</h5>
         </div>
       </div>
     </div>

     <div className="row my-3">
       <div className="col-4 ">
         <Select
           bordered={false}
           className="page_size_style"
           //   value={pageSize}
           //   onChange={(e) => setPageSize(e)}
         >
           <Select.Option value="25">
             Show
             <span className="vertical ms-1">|</span>
             <span className="sizes ms-1">25</span>
           </Select.Option>
           <Select.Option value="50">
             Show
             <span className="vertical ms-1">|</span>
             <span className="sizes ms-1"> 50</span>
           </Select.Option>
           <Select.Option value="100">
             Show
             <span className="vertical ms-1">|</span>
             <span className="sizes ms-1">100</span>
           </Select.Option>
         </Select>
       </div>

       <div className="col-4 d-flex  align-items-center justify-content-center">
         {/* <MyPagination
              total={parseInt(paymentmode?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            /> */}
       </div>

       <div className="col-4 ">
         {/* <Link to={ROUTES.ADD_JOBPAYMENT}> */}
           <Button btnType="add">Add Incoterm</Button>
         {/* </Link> */}
       </div>
     </div>
   </>
 );
}