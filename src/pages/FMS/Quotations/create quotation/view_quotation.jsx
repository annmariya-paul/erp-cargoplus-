import "./quotation.scss";
import React, { useState ,useRef} from "react";
import Button from "../../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import TableData from "../../../../components/table/table_data";
import { Collapse } from 'antd';
import html2canvas from 'html2canvas';

import { BorderOutlined } from "@ant-design/icons";
const onChange = (key) => {
  console.log(key);
};



const progress = [
  {
    title: "TASKS",
    dataIndex: "tasks",
    key: "tasks",
    align: "center",
    // render: (value, item, indx) => count + indx,
  },
  {
    title: "COST",
    dataIndex: "cost",
    key: "cost",
    align: "center",
  },
  {
    title: "TAX TYPE",
    dataIndex: "taxtype",
    key: "taxtype",
    align: "center",
  },
  {
    title: "TAX AMOUNT",
    dataIndex: "taxamount",
    key: "taxamount",
    width: "35%",
    align: "center",
    // render: (opportunity_update_next_date_contact) => {
    //   return (
    //     <label>
    //       {moment(opportunity_update_next_date_contact).format("DD-MM-YYYY")}
    //     </label>
    //   );
    // },
  },
  {
    title: "TOTAL AMOUNT",
    dataIndex: "totalamount",
    key: "totalamount",

    align: "center",
  },
];
const { Panel } = Collapse;
const data = [
  {
    tasks: "Data",
     cost: "4223",
     taxtype:"test",
     taxamount:"xyz",
    
     totalamount:"1000",

     key: "1",
  },
  {
    tasks: "Test",
     cost: "4545",
     taxtype:"test",
     taxamount:"xyz",
     totalamount:"2000",
     key: "2",
  },
 
];  
export default function ViewQuotation(){
  const printRef = useRef(null);

  const handlePrint = () => {
    // window.print({printable: printRef.current, type: 'html'});
    window.print({printable: document.getElementById("myPrintableDiv"), type: 'html'});
    // window.print();
  }


    return (
      <>
        <div className="container-fluid view_quotation print-preview p-3 px-4"   >
          <div className="row" >
            <div className="col-6">
              <h5 className="lead_text">View Quotation</h5>
               </div>
               <div className="col-6 d-flex justify-content-end mt-2">
               <div className="col-2">
             
             <Button 
               btnType="add_borderless"
               className="edit_button"
               onClick={handlePrint}
             >
               Print
              
             </Button>
           </div>
           <div className="col-2 ">
             <Button
               btnType="add_borderless"
               className="edit_button"
               onClick={() => {
                 //   handleviewtoedit();
               }}
             >
               Edit
               <FiEdit  />
             </Button>
           </div>

               </div>
           
         

          
          
          </div>
          <div className="row mt-3" ref={printRef} id="myPrintableDiv">
           
            <div className="col-6 d-flex">
              <div className="col-4">Quotation No</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">001</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Quotation Date</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">22-2-2023</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Quotation Date </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">22-2-2023</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Consignee</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Shipper</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Origin Agent</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Destination Agent</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Freight type</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Air</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Cargo Type</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Air</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Mode</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Air</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Origin</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Data</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Destination</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Carrier</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Air</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Freight type</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Terms</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">No of pieces </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">4</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">UOM</div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Gross wt </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">33</p>
            </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Chargeable wt </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">25</p>
            </div>
             </div>

             <div className="col-6 d-flex">
              <div className="col-4">Currency </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">25</p>
            </div>
             </div>
             <div className="col-6 d-flex">
              <div className="col-4">Exchange Rate </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">25</p>
            </div>
             </div>
             <div className="col-6 d-flex">
              <div className="col-4">Attachments </div>
              <div className="col-1">:</div>
            
            <div className="col-7">
              <p className="modal-view-data">Test file</p>
            </div>
             </div>

             <div>
             <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={"end"}>
      <Panel  header="TASK DETAILS" key="1">
     <div> <TableData  columns={progress} data={data} bordered/></div>
     <div className="d-flex justify-content-end mt-4 mx-3 ">
                <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                  <p style={{ fontWeight: 500 }}>Grand Total : </p>
                </div>
                {/* <div className="col-1">:</div> */}
                <div className="col-lg-2 col-sm-2 col-xs-2 mt-3">
                  <p>2000</p>
                
                   
                </div>


              </div>
      </Panel>
      </Collapse>

      
      
                 
                </div>
            
            
           
          </div>
         


       
        </div>
      </>
    );
}