import React, { useEffect, useState, useMemo } from "react";
// import Button from "../../../../components/button/button";
import { getData, getNameList } from "country-list";
import "./currency.scss";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import SelectBox from "../../../components/Select Box/SelectBox";
import { Link } from "react-router-dom";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../components/custom_modal/custom_model";
import { GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import MyPagination from "../../../components/Pagination/MyPagination";
import { Checkbox } from "antd";
export default function Currency(props) {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [searchedText, setSearchedText] = useState("");

  const [modalAddCurrency, setModalAddCurrency] = useState(false);

  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const [CodeInput, setCodeInput] = useState();
  const [CountryInput, setCountryInput] = useState();
  const [SymbolInput, setSymbolInput] = useState();

  const [Errormsg, setErrormsg] = useState();
  const [NameInput, setNameInput] = useState();
  const [coinInput, setCoinInput] = useState();

  const [showViewModal, setShowViewModal] = useState(false);
  const [CurrencyEditPopup, setCurrencyEditPopup] = useState(false);
  const [AllCurrency, setAllCurrency] = useState();
  const [currencyname, setCurrencyname] = useState();
  const [currency_id, setCurrency_id] = useState();
  const [currency_ids, setCurrency_ids] = useState();
  const [country, setCountry] = useState();
  const [currencyDefault, setCurrencyDefault] = useState();
  console.log("checkeeddd", currencyDefault);

  const [isdefault, setisdefault] = useState(false);
  // const [editForm] = Form.useForm();

  const onChange = (e) => {
    console.log(`checked iss ${e.target.checked}`);
  };

  const handleChecked = (e, key) => {
    console.log("isChecked", e);
    if (e.target.checked) {
      // getdefaultcurrency()

      PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/misc/default?type=currencydefault`)
      .then((res) => {
       
        console.log("exist currency", res?.data?.data?.exist);
        if (res?.data?.data?.exist == true) {
          setisdefault(true);
          setCurrencyDefault(1);
        } else {
          setisdefault(false);
          setCurrencyDefault(1);
          
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
      console.log("suceccss checked", e.target.checked);
      // setCurrencyDefault(1);
    }
    else {
      setisdefault(false);
      setCurrencyDefault(0)
    
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return AllCurrency?.slice((current - 1) * pageSize, current * pageSize);
  };

  const currencyEdit = (e) => {
    console.log("currency edit", e);
    setCurrency_ids(e.currency_id);
    setNameInput(e.currency_name);
    setCountryInput(e.currency_country);
    setCodeInput(e.currency_code);
    setCoinInput(e.currency_coin);
    setSymbolInput(e.symbol);
    setCurrencyDefault(e.currencyDefault);

    addForm.setFieldsValue({
      currency_id: e.currency_id,
      currencyInput: e.currency_name,
      country: e.currency_country,
      code: e.currency_code,
      symbol: e.currency_symbol,
      coin: e.currency_coin,
    });
    setCurrencyEditPopup(true);
  };
  const [viewcurrencys, setViewCurrencys] = useState({
    currency_id: "",
    currency_name: "",
    currency_country: "",
    currency_symbol: "",
    currency_code: "",
    currency_coin: "",
  });
  const handleViewClick = (item) => {
    console.log("view all currency", item);
    setViewCurrencys({
      ...viewcurrencys,
      currency_id: item.currency_id,
      currency_name: item.currency_name,
      currency_country: item.currency_country,
      currency_code: item.currency_code,
      currency_symbol: item.currency_symbol,
      currency_coin: item.currency_coin,
    });

    setShowViewModal(true);
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "COUNTRY",
      dataIndex: "country_name",
      key: "country_name",
      width: "23%",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => {
      //   return String(record.country_name)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
    },
    {
      title: "CURRENCY NAME",
      dataIndex: "currency_name",
      key: "currency_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.currency_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.currency_code)
            .toLowerCase()
            .includes(value.toLowerCase())  ||
            String(record.country_name)
              .toLowerCase()
              .includes(value.toLowerCase())  ||
              String(record.currency_coin)
                .toLowerCase()
                .includes(value.toLowerCase())  ||
                String(record.currency_symbol)
                  .toLowerCase()
                  .includes(value.toLowerCase()) 
        );
      },
    },
    {
      title: "COIN",
      dataIndex: "currency_coin",
      key: "currency_coin",
      width: "10%",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => {
      //   return String(record.currency_coin)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
    },
    {
      title: "CODE",
      dataIndex: "currency_code",
      key: "currency_code",
      align: "center",
    },
    {
      title: "SYMBOL",
      dataIndex: "currency_symbol",
      key: "currency_symbol",
      width: "10%",
      align: "center",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "15%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="editIcon m-0" onClick={() => currencyEdit(index)}>
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const AddCurrency = (data) => {
    PublicFetch.post(`${GENERAL_SETTING_BASE_URL}/currency`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success Data", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          addForm.resetFields();
          setModalAddCurrency(false);
          getAllCurrency();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getdefaultcurrency = async () => {
    try {
      const defaultbank = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/misc/default?type=currencydefault`
      );
      console.log("hdjsjk", defaultbank?.data?.data?.exist);
      if (defaultbank?.data?.data?.exist == true) {
        setisdefault(true);
      } else {
        setisdefault(false);
      // seteditbankdefault(1);
        
      }
      
      console.log("getting all  defaultbank", defaultbank);

      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  defaultbank", err);
    }
  };




  const getAllCurrency = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success data", res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            temp.push({
              country_name: item.countries.country_name,
              currency_code: item.currency_code,
              currency_coin: item.currency_coin,
              currency_country: item.currency_country,
              currency_id: item.currency_id,
              currency_name: item.currency_name,
              currency_symbol: item.currency_symbol,
              currency_status: item.currency_statuss,
              currencyDefault: item.currency_is_default,
            });
          });
          setAllCurrency(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const updateCurrency = (data) => {
    PublicFetch.patch(`${GENERAL_SETTING_BASE_URL}/currency/${currency_ids}`, {
      currency_name: data.currencyInput,
      currency_code: data.code,
      currency_coin: data.coin,
      currency_symbol: data.symbol,
      currency_country: data.country,
      currency_is_default: currencyDefault,
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          getAllCurrency();
          setCurrencyEditPopup(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    setCurrency_id(i.currency_id);
    setCurrencyname(i.currency_name);
    setCurrency_ids(i.currency_id);
    addForm.setFieldsValue({
      currency_id: i.currency_id,
      currencyInput: i.currency_name,
      country: i.currency_country,
      code: i.currency_code,
      symbol: i.currency_symbol,
      coin: i.currency_coin,
    });
    setCurrencyEditPopup(true);
  };

  const [countryis, setCountryis] = useState();
  const options = useMemo(() => getData(), []);

  const handleChange = (e) => {
    setCountryis(e);
  };

  const getAllCountries = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/country`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success", res.data.data);

          setCountry(res.data.data);
          // console.log("jefhw", temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllCurrency();
    getAllCountries();
  }, []);


  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "COUNTRY",
      "COUNTRY NAME",
      "COIN",
      "CODE",
      "SYMBOL",
      // "PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = AllCurrency?.map((item, index) => [
    index + serialNo,
    item.country_name,
    item.currency_name,
  
    item.currency_coin,
    item.currency_code,
    item.currency_symbol,
    // item.lead,
    // item.cost,
    // item.expense,
    // item.profit,
  ]);

  return (
    <>
      <div className="container-fluid container_hrms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">Currency</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        {/* </div> */}
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}> */}
        <div className="col-sm-4">
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
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
          </div>
        {/* </div> */}
        <div className="row my-3">
          <div className="col-4 px-3">
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
          <div className=" col-4 d-flex align-items-center  justify-content-center">
            {AllCurrency && (
            <MyPagination
              total={parseInt(AllCurrency?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
            )}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button btnType="add" onClick={() => setModalAddCurrency(true)}>
              New Currency
            </Button>
          </div>
          
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={AllCurrency}
            columns={columns}
            
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {AllCurrency && (
          <MyPagination
            total={parseInt(AllCurrency?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
          )}
        </div>
      </div>

      <CustomModel
        show={modalAddCurrency}
        onHide={() => setModalAddCurrency(false)}
        header="Add Currency"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">New Currency</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                AddCurrency(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-6 pt-1">
                  <label>Country</label>
                  <div>
                    <Form.Item
                      name="currency_country"
                      rules={[
                        {
                          required: true,
                          message: "Please select ",
                        },
                      ]}
                    >
                      <SelectBox value={countryis} onChange={handleChange}>
                        {country &&
                          country.length > 0 &&
                          country.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.country_id}
                                value={item.country_id}
                              >
                                {item.country_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-6 pt-1">
                  <label>Currency Name</label>
                  <div>
                    <Form.Item
                      name="currency_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6 pt-1">
                  <label>Coin</label>
                  <div>
                    <Form.Item
                      name="currency_coin"
                      rules={[
                        {
                          required: true,
                          message: "Coin is required",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6 pt-1">
                  <label>Code</label>
                  <div>
                    <Form.Item
                      name="currency_code"
                      rules={[
                        {
                          required: true,
                          message: "Code is required",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Symbol</label>
                  <div>
                    <Form.Item
                      name="currency_symbol"
                      rules={[
                        {
                          required: true,
                          message: "Symbol is required",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Default Currency</label>
                  <div>
                    <Form.Item
                      name="currency_country"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Symbol is Required",
                      //   },
                      // ]}
                    >
                      <Checkbox
                      // onChange={onChange}
                      //  value={}
                      ></Checkbox>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                  <Button btnType="save">Save</Button>
                  <Button
                    btnType="cancel"
                    type="reset"
                    onClick={() => {
                      setModalAddCurrency(false);
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>
            </Form>
          </>
        }
      >
        <CustomModel
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </CustomModel>

      <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-10">
                <h5 className="lead_text">Currency</h5>
              </div>
              <div className="col-2">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewcurrencys);
                    // setShowModalEdit(true);
                    setShowViewModal(false);
                  }}
                >
                  Edit
                  <FiEdit
                    style={{ marginBottom: "4px", marginInline: "3px" }}
                  />
                </Button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Country Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewcurrencys.currency_country}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Currency Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewcurrencys.currency_name}</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Currency Coin</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewcurrencys.currency_coin}</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Currency Code</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewcurrencys.currency_code}</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Currency Symbol</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewcurrencys.currency_symbol}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <CustomModel
        show={CurrencyEditPopup}
        onHide={() => setCurrencyEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Currency</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={addForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    updateCurrency(values);
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row py-4">
                    <div className="col-6 pt-1">
                      <label>Country</label>
                      <div>
                        <Form.Item
                          name="country"
                          rules={[
                            {
                              required: true,
                              message: "please select Country",
                            },
                          ]}
                        >
                          <SelectBox value={countryis} onChange={handleChange}>
                            {country &&
                              country.length > 0 &&
                              country.map((item, index) => {
                                return (
                                  <Select.Option
                                    key={item.country_id}
                                    value={item.country_id}
                                  >
                                    {item.country_name}
                                  </Select.Option>
                                );
                              })}
                          </SelectBox>
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-6 pt-1">
                      <label> Currency Name</label>
                      <Form.Item
                        name="currencyInput"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Currency Name",
                          },
                        ]}
                      >
                        <InputType className="input_type_style w-100" />
                      </Form.Item>
                    </div>

                    <div className="col-6 pt-1">
                      <label>Coin</label>
                      <div>
                        <Form.Item
                          name="coin"
                          rules={[
                            {
                              required: true,
                              message: "Coin is Required",
                            },
                          ]}
                        >
                          <InputType />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 pt-1">
                      <label>Code</label>
                      <div>
                        <Form.Item
                          name="code"
                          rules={[
                            {
                              required: true,
                              message: "Code is Required",
                            },
                          ]}
                        >
                          <InputType />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 pt-1">
                      <label>Symbol</label>
                      <div>
                        <Form.Item
                          name="symbol"
                          rules={[
                            {
                              required: true,
                              message: "Symbol is Required",
                            },
                          ]}
                        >
                          <InputType />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-12 pt-1">
                      <label>Default Currency</label>
                      <div>
                        <Form.Item
                          name="currencyDefault"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Symbol is Required",
                          //   },
                          // ]}
                        >
                          <Checkbox
                            // value={currencyDefault}
                            onChange={handleChecked}
                            checked={currencyDefault === 1 ? true : false}
                          ></Checkbox>
                        </Form.Item>
                      </div>
                    </div>

                    {isdefault ? (
                <label style={{ color: "red" }}>Another Currency is changed to this Currency </label>
              ) : (
                ""
              )}
                    <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                      <Button btnType="save">Save</Button>
                      <Button
                        btnType="cancel"
                        type="reset"
                        onClick={() => {
                          setCurrencyEditPopup(false);
                        }}
                      >
                        cancel
                      </Button>
                    </div>
                  </div>

                 
                </Form>
              </div>
              {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        }
      />
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : " "}
    </>
  );
}
