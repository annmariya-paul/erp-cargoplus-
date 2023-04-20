import React from 'react';
import { MdPageview } from "react-icons/md";
import { FaDownload, FaEye  } from 'react-icons/fa';


const Attachments = ({ attachments}) => {
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
            <div className='col-12 mb-4'>{fileName}</div>
            </div>
            
            <div className='row '>
            <div className='col-10 col-md-6 mb-3  '>
              <button  style={{marginLeft:"-71%"}} className='editcolor btn_add_borderless w-100' onClick={downloadFile}>Download</button>
            </div>
            <div className='col-2 col-md-6 mb-3'>
              <button className='editcolor btn_add_borderless w-100' onClick={viewFile}>View</button>
            </div>
            </div>
         
          </>
        );
      };
  return (
    <div className="col-sm-6 d-flex">
      <div className="col-4 boldhd pb-3">Attachments</div>
      <div className="col-1">:</div>
      <div className="col-7">
        {attachments.map((attachment) => (
          <Attachment
            key={attachment.id}
            fileUrl={attachment.url}
            fileName={attachment.name}
            // AllAttachments={AllAttachments}
          />
        ))}
      </div>
    </div>
  );
};

export default Attachments;
