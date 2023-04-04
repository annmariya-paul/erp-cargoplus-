import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Checkbox } from "antd";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Custom_model from "../../../../components/custom_modal/custom_model";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { TreeSelect } from "antd";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { ROUTES } from "../../../../routes";
import { NavLink } from "react-router-dom";
import { ACCOUNTS, CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";
import { useNavigate } from "react-router-dom";
import PublicFetch from "../../../../utils/PublicFetch";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";

export default function Purchase() {
  const [pageSize, setPageSize] = useState("25");
  const [purchase, setpurchase] = useState("");
  console.log("purchase ", purchase);
  const [current, setCurrent] = useState(1);
  const [modalpurchase, setModalpurchase] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [purchaseEditPopup, setPurchaseEditPopup] = useState(false);

  const [adForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [po_no, setPo_no] = useState("");
  const [purchasedate, setPurchasedate] = useState("");
  const [due_date, setDue_date] = useState("");
  const [img, setImg] = useState([]);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [remarks, setremarks] = useState("");
  const newDate = new Date();
  const [selectedDate, setSelectedDate] = useState();
  const [showViewModal, setShowViewModal] = useState(false);
  const [serialNo, setserialNo] = useState(1);

  const [editpurchasebillno, seteditpurchasebillno] = useState("");
  const [editpurchasedate, seteditpurchasedate] = useState("");
  const [editpurchaseduedate, seteditpurchaseduedate] = useState("");
  const [editpurchasepono, seteditpurchasepono] = useState("");
  const [editpurchasestatus, seteditpurchasestatus] = useState("");
  const [editpurchasetotalamount, seteditpurchasetotalamount] = useState("");
  const [editpurchasevendor, seteditpurchasevendor] = useState("");
  const [editpurchasepaymentmode, seteditpurchasepaymentmode] = useState("");
  const [editpurchasecreditdays, seteditpurchasecreditdays] = useState("");
  const [editpurchasetaxable, seteditpurchasetaxable] = useState("");
  const [editpurchasetaxno, seteditpurchasetaxno] = useState("");
  const [editpurchaseremarks, seteditpurchaseremarks] = useState("");
  const [editpurchaseattachments, seteditpurchaseattachments] = useState("");
  const [editpurchaseamount, seteditpurchaseamount] = useState("");
  const [editpurchasetaxamount, seteditpurchasetaxamount] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [searchSource, setSearchSource] = useState(""); // search by text input

  const [viewpurchasemode, setViewpurchasemode] = useState({
    po_no: "",
    date: "",
    vendor: "",
    bill_no: "",
    total_amount: "",
    due_date: "",
    status: "",
  });
  const [dailyexpenseList, setDailyexpenseList] = useState([]);

  const handleupdate = () => {};

  const handleEditclick = (e) => {
    setPurchaseEditPopup(true);
  };
  const handleViewClick = (e) => {
    setShowViewModal(true);
  };

  const handleviewtoedit = (i) => {
    setPurchaseEditPopup(true);
  };

  const getallpurchase = async () => {
    try {
      const allpurchases = await PublicFetch.get(
        `${ACCOUNTS}/purchase?startIndex=0&noOfItems=100`
      );
      console.log("getting all purchases", allpurchases);
      let temp = [];

      allpurchases.data.data.purchases.forEach((item, index) => {
        console.log("itemj", item);
        let datep = moment(item.purchase_purchase_date).format("DD-MM-YYYY");
        let datedue = moment(item.purchase_due_date).format("DD-MM-YYYY");
        let total = parseInt(item?.purchase_total_amount);
        temp.push({
          purchase_vendor_id: item.purchase_vendor_id,
          purchase_id: item.purchase_id,
          vendor_name: item.crm_v1_vendors.vendor_name,
          purchase_po_no: item.purchase_po_no,
          purchase_bill_no: item.purchase_bill_no,
          purchase_total_amount: total.toFixed(2),
          purchase_status: item.purchase_status,
          purchase_purchase_date: datep,
          purchase_due_date: datedue,
        });
      });
      setpurchase(temp);
    } catch (err) {
      console.log("error to fetching  purchases", err);
    }
  };
  useEffect(() => {
    getallpurchase();
  }, []);

  const columns = [
    {
      title: "SI.NO",
      key: "index",
      // width: "20%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "PO NO",
      dataIndex: "purchase_po_no",
      key: "purchase_po_no",
      filteredValue: [searchSource],
      onFilter: (value, record) => {
        return (
          String(record.purchase_po_no)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.purchase_purchase_date)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.vendor_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.purchase_bill_no)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.purchase_total_amount)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.purchase_due_date)
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
      title: "DATE",
      dataIndex: "purchase_purchase_date",
      key: "purchase_purchase_date",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },

    {
      title: "VENDOR",
      dataIndex: "vendor_name",
      key: "vendor_name",
      width: "24%",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "BILL NO",
      dataIndex: "purchase_bill_no",
      key: "purchase_bill_no",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "purchase_total_amount",
      key: "purchase_total_amount",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "right",
    },

    {
      title: "DUE DATE",
      dataIndex: "purchase_due_date",
      key: "purchase_due_date",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "STATUS",
      dataIndex: "purchase_status",
      key: "purchase_status",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      // width: "10%",
      render: (data, index) => {
        console.log("table index", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0"
              // onClick={() => {
              //   handleEditclick(index);
              // }}
            >
              {" "}
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to={`${ROUTES.EDIT_PURCHASE}/${index?.purchase_id}`}
              >
                <FaEdit />
              </NavLink>
            </div>
            <div
              className="viewIcon m-0"
              // onClick={() => handleViewClick(index)}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to={`${ROUTES.VIEW_PURCHASE}/${index?.purchase_id}`}
              >
                <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
              </NavLink>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  const data12 = dailyexpenseList?.map((item) => [
    item.action,
    item.opportunity_type,
    item.opportunity_from,
    item.opportunity_lead_id,
    item.opportunity_source,
    item.opportunity_party,
  ]);
  const OppHeads = [
    [
      "opportunity_id",
      "opportunity_type",
      "opportunity_source",
      "opportunity_validity",
      "opportunity_description",
      "opportunity_status",
      "opportunity_amount",
    ],
  ];
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  return (
    <div>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">Purchase</h5>
          </div>
          <div className="col-4">
            <Input.Search
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
              className="inputSearch"
              value={searchSource}
              onChange={(e) => {
                setSearchSource(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchSource(value);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Leadlist_Icons
              datas={dailyexpenseList}
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
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          
        </div> */}
        <div className="row my-3">
          <div className="col-4 ">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
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
            <MyPagination
              total={parseInt(purchase?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            />
          </div>

          <div className="col-4 ">
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to={ROUTES.ADD_PURCHASE}
            >
              <Button btnType="add">Add Purchase</Button>
            </NavLink>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={purchase}
            // data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={parseInt(purchase?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}
