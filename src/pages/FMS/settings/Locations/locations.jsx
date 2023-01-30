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

export default function Locations() {
  const [addForm] = Form.useForm();
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchbyType, setSearchbyType] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const [error, setError] = useState(false);
  const [modalAddLocation, setModalAddLocation] = useState(false);
  const [modalEditLocation, setModalEditLocation] = useState(false);
  const [modalViewLocation, setmodalViewLocation] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [locationType, setLocationType] = useState("");
  const [selectCountry, setSelectCountry] = useState("");
  const [allLocations, setAllLocations] = useState();
  const [locationId, setLocationId] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return allLocations?.slice((current - 1) * pageSize, current * pageSize);
  };

  // { API to fetch countries- Ann - 23/1/23  }
  const getAllCountries = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/country`
      );
      console.log("countries are", allCountries.data.data);
      setSelectCountry(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  // { API to fetch all locations - Ann - 25/1/23  }
  const getAllLocations = async () => {
    try {
      const locations = await PublicFetch.get(`${CRM_BASE_URL_FMS}/locations`);
      console.log("all locations are", locations.data.data);
      setAllLocations(locations.data.data);
    } catch (err) {
      console.log("error while getting the locations: ", err);
    }
  };

  useEffect(() => {
    getAllCountries();
    getAllLocations();
  }, []);

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
          getAllLocations();
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
          getAllLocations();
          setModalEditLocation(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const columns = [
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
    {
      title: "CODE",
      dataIndex: "location_code",
      key: "location_code",
      filteredValue: [searchCode],
      onFilter: (value, record) => {
        return String(record.location_code)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "NAME",
      dataIndex: "location_name",
      key: "location_name",
      filteredValue: [searchName],
      onFilter: (value, record) => {
        return String(record.location_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "TYPE",
      dataIndex: "location_type",
      key: "location_type",
      filteredValue: [searchbyType],
      onFilter: (value, record) => {
        return String(record.location_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "COUNTRY",
      dataIndex: "location_country",
      key: "location_country",
    },
  ];

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Locations</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Code"
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
          <div className="col-4">
            <Input.Search
              placeholder="Search by Name"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchName(value);
              }}
            />
          </div>
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
        </div>
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

          <div className=" col-4 d-flex align-items-center justify-content-center">
            <MyPagination
              total={parseInt(allLocations?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button btnType="add" onClick={() => setModalAddLocation(true)}>
              Add Location
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={allLocations}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex mt-4 justify-content-center">
            <MyPagination
              total={parseInt(allLocations?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
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
              <h5 className="lead_text">Add Location</h5>
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
                  <label>Code</label>
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
                <div className="col-12">
                  <label>Name</label>
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
                <div className="col-12">
                  <label>Type</label>
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
              </div>
              <div className="col-12">
                <label>Country</label>
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
                  <label>Code</label>
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
                <div className="col-12">
                  <label>Name</label>
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
                <div className="col-12">
                  <label>Type</label>
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
              </div>
              <div className="col-12">
                <label>Country</label>
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
                  {viewLocation.location_country}
                </p>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
