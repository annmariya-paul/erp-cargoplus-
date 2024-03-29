import "../../settings/fms_setting.scss";
import React, { useEffect, useState, useMemo } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select } from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import {
  GENERAL_SETTING_BASE_URL,
  CRM_BASE_URL_FMS,
} from "../../../../api/bootapi";
import MyPagination from "../../../../components/Pagination/MyPagination";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PageSizer from "../../../../components/PageSizer/PageSizer";

export default function Locations() {
  const [addForm] = Form.useForm();
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchbyType, setSearchbyType] = useState("");
  let a = localStorage.getItem("noofitem");
  const [pageSize, setPageSize] = useState(a);
  const [current, setCurrent] = useState(1);

  const [error, setError] = useState(false);
  const [modalAddLocation, setModalAddLocation] = useState(false);
  const [modalEditLocation, setModalEditLocation] = useState(false);
  const [modalViewLocation, setmodalViewLocation] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [locationType, setLocationType] = useState("");
  const [selectCountry, setSelectCountry] = useState("");
  console.log("select Country", selectCountry);
  const [allLocations, setAllLocations] = useState();
  const [locationId, setLocationId] = useState();
  const [totallocation, settotallocation] = useState();
  const [startcount, setStartCount] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };
  console.log("PageSize", pageSize);

  const pageofIndex = pageSize * (current - 1) - 1 + 1;

  const getData = (current, pageSize) => {
    return allLocations?.slice((current - 1) * pageSize, current * pageSize);
  };

  // { API to fetch countries- Ann - 23/1/23  }
  const getAllCountries = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/country/minimal`
      );
      console.log("countries are", allCountries.data.data);
      setSelectCountry(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  // { API to fetch all locations - Ann - 25/1/23  }
  const getAllLocations = async (name) => {
    try {
      const locations = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/locations?startIndex=${pageofIndex}&noOfItems=${pageSize}&search=${name}`
      );
      console.log("all locations are", locations.data.data);
      settotallocation(locations.data.data?.locationCount);
      setStartCount(locations.data.data?.startIndex);
      // setAllLocations(locations.data.data);
      let temp = [];
      locations.data.data.locations.forEach((item, index) => {
        temp.push({
          location_id: item.location_id,
          location_code: item.location_code,
          location_name: item.location_name,
          location_type: item.location_type,
          location_country: item.countries.country_id,
          location_countryname: item.countries.country_name,
          slno: index + 1,
        });
        setAllLocations(temp);
      });
    } catch (err) {
      console.log("error while getting the locations: ", err);
    }
  };

  useEffect(() => {
    getAllCountries();
    if (pageSize) {
      const getData = setTimeout(() => {
        getAllLocations(searchCode);
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [pageSize, pageofIndex, searchCode]);

  // { API to add a tax type - Ann - 19/1/23}
  const createLocation = (data) => {
    PublicFetch.post(`${CRM_BASE_URL_FMS}/locations`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success Data", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          addForm.resetFields();
          setModalAddLocation(false);
          getAllLocations(searchCode);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // { function to view a Location - Ann - 23/1/23}
  const [viewLocation, setViewLocation] = useState({});
  const handleViewClick = (item) => {
    console.log("view locations", item);
    setViewLocation({
      ...viewLocation,
      location_id: item.location_id,
      location_code: item.location_code,
      location_name: item.location_name,
      location_type: item.location_type,
      location_country: item.location_country,
      location_countryname: item.location_countryname,
    });
    setmodalViewLocation(true);
  };
  // {function to repopulate data to view-edit - Ann - 25/1/23}
  const locationViewToEdit = (e) => {
    setLocationId(e.location_id);
    addForm.setFieldsValue({
      locationId: e.location_id,
      locationName: e.location_name,
      locationCode: e.location_code,
      locationType: e.location_type,
      locationCountry: e.location_country,
    });
    setModalEditLocation(true);
  };

  // {function to repopulate data to edit - Ann - 25/1/23}
  const locationEdit = (e) => {
    setLocationId(e.location_id);
    addForm.setFieldsValue({
      locationId: e.location_id,
      locationName: e.location_name,
      locationCode: e.location_code,
      locationType: e.location_type,
      locationCountry: e.location_country,
    });
    setModalEditLocation(true);
  };

  const updateLocation = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/locations/${locationId}`, {
      location_code: data.locationCode,
      location_name: data.locationName,
      location_type: data.locationType,
      location_country: data.locationCountry,
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          getAllLocations(searchCode);
          setModalEditLocation(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const [serialNo, setserialNo] = useState(1);
  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "13%",
      render: (value, item, index) => item?.slno,
      align: "center",
    },

    {
      title: "CODE",
      dataIndex: "location_code",
      key: "location_code",
      width: "13%",
      // filteredValue: [searchCode],
      // onFilter: (value, record) => {
      //   return String(record.location_code)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "NAME",
      dataIndex: "location_name",
      key: "location_name",
      // filteredValue: [searchCode],
      // onFilter: (value, record) => {
      //   return (
      //     String(record.location_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.location_code)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.location_countryname)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.location_type)
      //       .toLowerCase()
      //       .includes(value.toLowerCase())
      //   );
      // },
      align: "left",
    },
    {
      title: "TYPE",
      dataIndex: "location_type",
      key: "location_type",
      width: "17%",
      // filteredValue: [searchbyType],
      // onFilter: (value, record) => {
      //   return String(record.location_type)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "COUNTRY",
      dataIndex: "location_countryname",
      key: "location_countryname",
      align: "left",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: "25%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="editIcon m-0" onClick={() => locationEdit(index)}>
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

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [["Slno", "CODE", "NAME", "TYPE", "COUNTRY"]];
  //for pdf download
  const data12 = allLocations?.map((item, index) => [
    index + serialNo,
    item.location_code,
    item.location_name,
    item.location_type,
    item.location_countryname,
  ]);

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totallocation / pageSize);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totallocation;
    return total;
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  };

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col-4">
            <h5 className="lead_text">Locations</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchCode}
              onChange={(e) => {
                setSearchCode(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchCode(value);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                name="location"
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          
          <div className="col-4">
            <Select
              allowClear
              showSearch
              style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
              placeholder="Search by Type"
              className="select_search"
              optionFilterProp="children"
              onChange={(event) => {
                setSearchbyType(event ? [event] : []);
              }}
            >
              <Select.Option value="Airport">Airport</Select.Option>
              <Select.Option value="Seaport">Seaport</Select.Option>
              <Select.Option value="City">City</Select.Option>
            </Select>
          </div>
        </div> */}
        <div className="row my-3">
          <div className="col-4 px-3">
            <div className="d-flex justify-content-start align-items-center gap-2">
              <PageSizer
                pageValue={(e) => {
                  console.log("Pge Sizer in location", e);
                  setPageSize(e);
                }}
              />

              {/* <Select
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
            </Select> */}
              {totallocation > 0 && (
                <div className=" col-xl-10 col-lg-9 col-md-8 col-sm-12  d-flex  align-items-center ">
                  <label className="font_size">
                    Results: {startcount + 1} -{" "}
                    {getFinalCount(1 * pageSize * current)}{" "}
                    <span>of {totallocation} </span>{" "}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className=" col-4 d-flex align-items-center justify-content-center">
            {totallocation > 0 && (
              <MyPagination
                total={parseInt(totallocation)}
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
            <Button
              btnType="add"
              onClick={() => {
                setModalAddLocation(true);
                addForm.resetFields();
              }}
            >
              New Location
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allLocations}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex mt-4 justify-content-center">
          {totallocation > 0 && (
            <MyPagination
              total={parseInt(totallocation)}
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

      {/* {add location modal - Ann} */}
      <CustomModel
        show={modalAddLocation}
        onHide={() => setModalAddLocation(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">New Location</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzz", data);
                createLocation(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>
                    Code<span className="required">*</span>
                  </label>
                  <div>
                    <Form.Item
                      name="location_code"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Valid Location Code",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12  mt-1">
                  <label>
                    Name<span className="required">*</span>
                  </label>
                  <div>
                    <Form.Item
                      name="location_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid Location Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12  mt-1">
                  <label>
                    Type<span className="required">*</span>
                  </label>
                  <Form.Item
                    name="location_type"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Location Type",
                      },
                    ]}
                  >
                    <SelectBox>
                      <Select.Option value="Airport">Airport</Select.Option>
                      <Select.Option value="Seaport">Seaport</Select.Option>
                      <Select.Option value="City">City</Select.Option>
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-12 mt-1">
                  <label>
                    Country<span className="required">*</span>
                  </label>
                  <Form.Item
                    name="location_country"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Country",
                      },
                    ]}
                  >
                    <SelectBox>
                      {selectCountry &&
                        selectCountry.map((item, index) => {
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

              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />

      {/* {edit location modal - Ann} */}
      <CustomModel
        show={modalEditLocation}
        onHide={() => setModalEditLocation(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Location</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzz", data);
                updateLocation(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>
                    Code<span className="required">*</span>
                  </label>
                  <div>
                    <Form.Item
                      name="locationCode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Valid Location Code",
                        },
                      ]}
                    >
                      <InputType
                      //   value={taxTypeName}
                      //   onChange={(e) => setTaxTypeName(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12  mt-1">
                  <label>
                    Name<span className="required">*</span>
                  </label>
                  <div>
                    <Form.Item
                      name="locationName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid Location Name",
                        },
                      ]}
                    >
                      <InputType
                      //   value={taxPercent}
                      //   onChange={(e) => setTaxPercent(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12  mt-1">
                  <label>
                    Type<span className="required">*</span>
                  </label>
                  <Form.Item
                    name="locationType"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Location Type",
                      },
                    ]}
                  >
                    <SelectBox
                      value={locationType}
                      onChange={(e) => setLocationType(e)}
                    >
                      <Select.Option value="Airport">Airport</Select.Option>
                      <Select.Option value="Seaport">Seaport</Select.Option>
                      <Select.Option value="City">City</Select.Option>
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-12  mt-1">
                  <label>
                    Country<span className="required">*</span>
                  </label>
                  <Form.Item
                    name="locationCountry"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Country",
                      },
                    ]}
                  >
                    <SelectBox>
                      {selectCountry &&
                        selectCountry.length > 0 &&
                        selectCountry.map((item, index) => {
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
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />

      {/* {view location modal - Ann} */}
      <Custom_model
        show={modalViewLocation}
        onHide={() => setmodalViewLocation(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row mb-5">
              <div className="col-9">
                <h5 className="lead_text">Location</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    locationViewToEdit(viewLocation);
                    setmodalViewLocation(false);
                  }}
                >
                  Edit
                  <FiEdit
                    style={{ marginBottom: "4px", marginInline: "3px" }}
                  />
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Code</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">{viewLocation.location_code}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">{viewLocation.location_name}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Type</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">{viewLocation.location_type}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Country</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">
                  {viewLocation.location_countryname}
                </p>
              </div>
            </div>
          </div>
        }
      />

      <CustomModel
        success
        show={successPopup}
        onHide={() => {
          setSuccessPopup(false);
        }}
      />
    </>
  );
}
