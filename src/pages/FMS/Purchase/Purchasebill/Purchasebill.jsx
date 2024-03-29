import PageSizer from "../../../../components/PageSizer/PageSizer"
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination" 
import { useState } from "react";
import { Checkbox, Input } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
function Purchasebill () {
    const [searchedText, setSearchedText] = useState("");
    const columns = [
        {
          title: "Sl. No.",
          key: "index",
          width: "7%",
          render: (value, item, index) => serialNo + index,
          align: "center",
        },
    
        {
          title: "PO NO",
          dataIndex: "po_no",
          key: "po_no",
        //   width: "10%",
          filteredValue: [searchedText],
          onFilter: (value, record) => {
            return (
              String(record.po_no)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
              String(record.purchase_date).toLowerCase().includes(value.toLowerCase()) ||
              String(record.vendor)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
              String(record.billno)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
              String(record.purchase_status)
                .toLowerCase()
                .includes(value.toLowerCase())
            );
          },
          align: "left",
        },
        {
          title: "PURCHASE DATE",
          dataIndex: "purchase_date",
          key: "purchase_date",
          width: "14%",
          align: "left",
        },
        {
          title: "VENDOR",
          dataIndex: "vendor",
          key: "vendor",
          width: "19%",
          // filteredValue: [searchedNo],
          // onFilter: (value, record) => {
          //   return String(record.job_awb_bl_no)
          //     .toLowerCase()
          //     .includes(value.toLowerCase());
          // },
          align: "left",
        },
        {
          title: "BILL NO",
          dataIndex: "billno",
          key: "billno",
          // filteredValue: [searchName],
          // onFilter: (value, record) => {
          //   return String(record.job_consignee_name)
          //     .toLowerCase()
          //     .includes(value.toLowerCase());
          // },
          align: "left",
        },
        
        {
          title: "STATUS",
          dataIndex: "purchase_status",
          key: "purchase_status",
          align: "left",
        },
        {
          title: "ACTION",
          dataIndex: "action",
          key: "key",
          width: "8%",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2 me-1">
                <div
                  className="editIcon m-0 "
                //   onClick={() => {
                //     navigate(`${ROUTES.EDIT_PUCHASE_ORDER}/${index.purchase_order_id}`);
                //   }}
                >
                    
                  {/* <Link> */}
                    <FaEdit style={{ marginLeft: 15 }} />
                  {/* </Link> */}
                </div>
    
                <div
                  className="viewIcon m-0"
                //   onClick={() => {
                //     navigate(`${ROUTES.VIEW_PURCHASE_ORDER}/${1}`);
                //   }}
                  // onClick={()=>{
                  //   setShowViewModal(true);
                  // }}
                >

                  <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
                </div>
                {/* <div
                      className="viewIcon m-0"
                    //   onClick={() => {
                    //     navigate(`/view_quotation`);
                    //   }}
                      // onClick={()=>{
                      //   setShowViewModal(true);
                      // }}
                    >
                      <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
                    </div> */}
                <div className="deleteIcon m-0">
                  <FaTrash />
                </div>
              </div>
            );
          },
          align: "center",
        },
      
      ];

 
    const [quatationList, setQuatationList] = useState([]);
    const [serialNo, setserialNo] = useState(1);
    const [noofItems, setNoofItems] = useState("25");
    const [current, setCurrent] = useState(1);
   
    
    const columnsKeys = columns.map((column) => column.key);

    const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
    const filteredColumns = columns.filter((column) =>
      selectedColumns.includes(column.key)
    );

    const onChange = (checkedValues) => {
        setSelectedColumns(checkedValues);
      };

    const data12 = quatationList?.map((item) => [
        item.action,
        item.po_no,
        item.purchase_date,
        item.vendor,
        item.billno,
        item.purchase_status,
      ]);
      const OppHeads = [
        [
          "purchase_order_id",
          "po_no",
          "purchase_date",
          "vendor",
          "billno",
          "purchase_status",
        
        ],
      ];
  

      const data=[{
        po_no:"001",
        purchase_date:"10-12-2022",
        vendor:"ARUN",
        billno:"003"
       }]
    
return(
    <>
  
  <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col-4">
            <h5 className="lead_text">Purchase Bill</h5>
          </div>
          <div className="col-4">
           
            <Input.Search
              className="inputSearch"
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end">
            
            <Leadlist_Icons
              datas={quatationList}
              name="purchase order"
              columns={columns}
              items={data12}
              xlheading={OppHeads}
              filename="data.csv"
              chechboxes={
                <Checkbox.Group onChange={onChange} value={selectedColumns}>
                  {columnsKeys.map((column) => (
                    <li>
                      <Checkbox value={column} key={column}>
                        {column}
                      </Checkbox>
                    </li>
                  ))}
                </Checkbox.Group>
              }
            />
          </div>
        </div>
    
      
        <div className="row my-3">
          <div className="col-4">
            <PageSizer/>
          </div>

          <div className="col-4 d-flex py-2 justify-content-center">
            {/* {totaljob > 0 && ( */}
              <MyPagination
                // total={parseInt(totaljob)}
                current={current}
                pageSize={noofItems}
                // defaultPageSize={noofItems}
                showSizeChanger={false}
                onChange={(current, pageSize) => {
                  console.log("page index isss", pageSize);
                  setCurrent(current);
                  // setPageSize(pageSize);
                  // setNoofItems(pageSize);
                  // setCurrent(noofItems !== pageSize ? 0 : current);
                }}
              />
            {/* )} */}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <div className="col mb-2 ">
              {/* <Link to={ROUTES.PURCHASEORDER} style={{ color: "white" }}> */}
                <Button btnType="add">New Purchase Bill</Button>
              {/* </Link> */}
              
            </div>
          </div>
        </div>
        <div className="datatable">
            
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}

            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>

        <div className="d-flex justify-content-center ">
          {/* {totaljob > 0 && ( */}
          
            <MyPagination
            //   total={parseInt(totaljob)}
              current={current}
              pageSize={noofItems}
              // defaultPageSize={noofItems}
              showSizeChanger={false}
              onChange={(current, pageSize) => {
                console.log("page index isss", pageSize);
                setCurrent(current);
              }}
            />
          {/* )} */}
        </div>
      </div>
    </>
)
}
export default Purchasebill