import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import "./lead_list_icon.scss"
import jsPDF from "jspdf";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
} from "react-icons/fa";
import { message,Checkbox } from "antd";
import { MdFileCopy } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx/xlsx.js"; //for xl download
import CopyToClipboard, { copyToClipboard } from "react-copy-to-clipboard"; //copy to clipboard
import { Toaster, toast } from "react-hot-toast"; // copy to clip board

 const Leadlist_Icons=({datas ,columns, items,filename,chechboxes,xlheading})=>{
  console.log("vdsfud",datas);
  console.log("1123fud",columns);
  console.log("11234453443",items);
 



//pdf file start
// const exportPDF = () => {
//   const unit = "pt";
//   const size = "A4"; // Use A1, A2, A3 or A4
//   const orientation = "portrait"; // portrait or landscape

//   const marginLeft = 40;
//   const doc = new jsPDF(orientation, unit, size);

//   doc.setFontSize(15);

//   const title = "My Awesome Report";
//   const headers = [["NAME", "PROFESSION"]];

//   const data = {datas}.map((elt) => [elt.name, elt.profession]);

//   let content = {
//     startY: 50,
//     head: headers,
//     body: data,
//   };

//   // doc.text(title, marginLeft, 40);
//   doc.autoTable({
//     columns: columns.map((col) => ({ ...col, dataIndex: col.key })),
//     body: OpportunityList,
//   });
//   doc.save("report.pdf");
// };
//pdf end
//for show or hide colums start
// const columnsKeys = columns.map((column) => column.key);
// console.log("columnsKeys",columnsKeys);
 
// const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
// const filteredColumns = columns.filter((column) => selectedColumns.includes(column.key));

// const onChange = (checkedValues) => {
//   console.log("wwwww",checkedValues);
//     setSelectedColumns(checkedValues);
// };
//end
// console.log("onchange values",selectedColumns);


const columnsKeys = columns.map((column) => column.key);

// const [newvalue,setNewvalue]=useState([]);
// setNewvalue(filteredColumns);
// console.log("GGGGGGGG",newvalue);

 
const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
const filteredColumns = columns.filter((column) => selectedColumns.includes(column.key));
console.log("filtered columns ", filteredColumns);
const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
};

const exportPDF = () => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  // const title = "My Awesome Report";
  // const headers = [["NAME", "PROFESSION"]];

  // const data = datas.map((item) => [data] );
// console.log("good evening",items);
  let content = {
    startY: 50,
    // head: headers,
    // body: data,
  };

  // doc.text(title, marginLeft, 40);
  doc.autoTable({
    columns: columns.map((col) => ({ ...col, dataIndex: col.key })),
    body: items,
  });
  doc.save("report.pdf");
};



// console.log("SSSSSSSS",xlheading);

const handleExport = () => {
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.json_to_sheet(datas);
  XLSX.utils.book_append_sheet(wb, ws, "Reports");
  XLSX.utils.sheet_add_aoa(
    ws,xlheading,
   
    { origin: "A1" }
  );
  // ws["!cols"] = [{ wch: 15 }];
  let row = [
    { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
    {
      v: "bold & color",
      t: "s",
      s: { font: { bold: true, color: { rgb: "FF0000" } } },
    },
    {
      v: "fill: color",
      t: "s",
      s: { fill: { fgColor: { rgb: "E9E9E9" } } },
    },
    { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
  ];
  var wscols = [
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 17 },
    { wch: 15 },
  ];
  ws["!cols"] = wscols;
 
  XLSX.writeFile(wb, "Student Report.xlsx");
  console.log("xlsx data", ws);
  return addStyle();
};
const addStyle = () => {
  console.log("xlsx downloaded");
};
 



return (
  <>
    <div className="col-auto">
      <div className="row flex-wrap">
        <ul className="leadlist_icons_panel">
          <li className="icon-border">
            <a className="icon" href="#">

            <CopyToClipboard text={JSON.stringify(datas)}>
             
                
            {/* message.success(content, [duration], onClose) */}
                 <MdFileCopy onClick={() =>alert("Text Copied") } />
             
            </CopyToClipboard>
             
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFileExcel onClick={handleExport} />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
            <CSVLink style={{color:"grey"}} data={datas} filename={filename}><FaFileCsv /></CSVLink>
            

           
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFilePdf onClick={exportPDF} />
              {/* <CSVLink>export</CSVLink> */}
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" href="#">
              <AiFillPrinter />
            </a>
          </li>
          <li className="icon-border">
            <a className="icon" style={{zIndex:"10"}} href="#">

            <Dropdown  style={{boxShadow:"none",outline:"none",margin:"0%",padding:"0%",zIndex:"9",backgroundColor:"transparent",border:"none"}} >
      <Dropdown.Toggle style={{borderRadius:"74%",color:"grey",backgroundColor:"white",zIndex:"9",border:"none"}}>
      <FaBookOpen  style={{marginTop:"3px"}} /> 
      </Dropdown.Toggle>
              
            
      <Dropdown.Menu style={{backgroundColor:"white"}}>
             {chechboxes}
       </Dropdown.Menu>
                         {/* //show or hide columns */}
                         </Dropdown>
          </a>
          </li>
        </ul>
      </div>
    </div>
  </>
);
 }
export default Leadlist_Icons;