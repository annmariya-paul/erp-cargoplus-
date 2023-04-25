import React from 'react';
import { MdPageview } from "react-icons/md";
import { FaDownload, FaEye  } from 'react-icons/fa';


const Attachments = ({ attachments,Isattachment}) => {
    console.log("attachments datttaa",attachments);


    const Attachment = ({ fileUrl, fileName }) => {

        const downloadFile = () => {
          console.log("wertyu");
          window.open(`https://api.erp.refogen.com/${attachments[0]}`, '_blank');
        };
      
        const viewFile = () => {
          window.open(`https://api.erp.refogen.com/${attachments[0]}`, '_blank');
        };
      
        return (
            <>
            <div className='row'>
            <div className='col-12 mb-4'>{fileName} <button className='editcolor btn_add_borderless w-100' onClick={viewFile}>View</button></div>
            
            </div>
            
            {/* <div className='row '> */}
            {/* <div className='col-10 col-md-6 mb-3  '>
              <button  style={{}} className='editcolor btn_add_borderless w-100' onClick={downloadFile}>Download</button>
            </div> */}
            {/* <div className='col-2 col-md-6 mb-3'>
              <button className='editcolor btn_add_borderless w-100' onClick={viewFile}>View</button>
            </div> */}
            {/* </div> */}
         
          </>
        );
      };
  return (
    <>
    {Isattachment &&(
    <div className="">
        {attachments.map((attachment) => {
          console.log("attache", attachment);
          return(
          <Attachment
            key={attachment}
            fileUrl={attachment}
            fileName={attachment}
            // AllAttachments={AllAttachments}
          />
        )})}
      
    </div>
    )}
    </>
  );
};

export default Attachments;
