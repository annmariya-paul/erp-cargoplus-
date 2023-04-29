import { Pagination } from "antd";
import React from "react";
// import "./Pagination.scss"

function MyPagination({ total, onChange, current, defaultPageSize,  pageSize, totalposts,postperpage ,setcurrentpage}) {

// let pages =[]

// for (let i=1 ; i<= Math.ceil(totalposts/postperpage);i++){
//   pages.push(i)
// }



  return (
    <div>

{/* {pages.map((page, indx)=>{
  return <button key={indx}  onClick={()=> setcurrentpage(page)} >{page} </button>
}) } */}

 
     
     <Pagination style={{paddingTop:"3px"}}
        size="small"
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
        showSizeChanger={false}
        // defaultCurrent={1}
        // pageSizeOptions={("25", "50", "100")}
        // showSizeChanger={showSizeChanger}
      />
  
    </div>
  );
}

export default MyPagination;


