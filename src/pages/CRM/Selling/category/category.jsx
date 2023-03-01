import React, { useEffect, useState } from "react";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../ErrorMessages/errormessages";
import "./category.css";
import { TreeSelect } from "antd";
import { Form, Input } from "antd";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import FileUpload from "../../../../components/fileupload/fileUploader";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import InputType from "../../../../components/Input Type textbox/InputType";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";

const getBase64 = (file) => {
  console.log("getbase64", file);
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function Category() {
  const [addForm] = Form.useForm();
  const [error403, setError403] = useState(false);
  const navigate = useNavigate();
  const [successPopup, setSuccessPopup] = useState(false);
  const { TreeNode } = TreeSelect;
  const [toggleState, setToggleState] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  const [error, setError] = useState(false);
  const [State, setState] = useState("null");
  const [treeLine, setTreeLine] = useState(true);
  const [name, setName] = useState();
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);
  const [description, setDescription] = useState("");
  const [code, setCode] = useState();
  const [category, setCategory] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [parentcategory, setParentcategory] = useState(null);
  const [imageSize, setImageSize] = useState(false);
  const [uniqueCode, setuniqueCode] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  // const [parent,setParent]=useState(null);
  console.log("set image", img);
  // console.log("bsae64", previewImage);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.CATEGORY_LIST);
      }, time);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.CATEGORY);
  };
  const handlePreview = async (file) => {
    console.log("handlePreview", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [TreeData, setTreeData] = useState();
  const [categoryTree, setCategoryTree] = useState([]);
  const getCategoryChildren = (categoryId) => {};
  const structureTreeData = (categories) => {
    let treeStructure = [];
    if (categories && Array.isArray(categories) && categories.length > 0) {
      categories.forEach((category, categoryIndex) => {
        // if (category?.other_crm_v1_categories?.length > 0) {
        let ch = structureTreeData(category?.other_crm_v1_categories);
        treeStructure.push({
          value: category?.category_id,
          title: category?.category_name,
          children: ch,
        });
        // }
      });
    }
    return treeStructure;
    // console.log("Tree structure : ", treeStructure);
  };
  const getCategorydata = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/category`)
      .then((res) => {
        console.log("response Data", res);
        if (res.data.success) {
          setTreeData(res.data.data);
          // getTreeData(res.data.data);
          let d = structureTreeData(res.data.data);
          console.log("Structured Tree : ", d);
          setCategoryTree(d);
          console.log("all data", res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getCategorydata();
  }, []);

  console.log("Tree state dataa", TreeData);

  const treeData = [
    {
      title: "Parent Node-1",
      value: "Parent-1",

      children: [
        {
          title: "01 Node1",
          value: "0-0-1",

          children: [
            {
              title: "Child Node1.1",
              value: "0-0-1-1",
            },
          ],
        },
        {
          title: "Child Node2",
          value: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: " Parent Node2",
      value: "0-1",
      key: "0-1",
    },
  ];

  const valueMap = {};
  function loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (valueMap[value] = {
        parent,
        value,
      });
      node.children = loops(children, node);
      return node;
    });
  }

  loops(treeData);

  function getPath(value) {
    const path = [];
    let current = valueMap[value];
    while (current) {
      path.unshift(current.value);
      current = current.parent;
    }
    return path;
  }
  const onChange = (value) => {
    // console.log("Change", value);
    setState({ value });
    setCategory(value.target.value);
  };

  const onSelect = (value) => {
    // console.log("Select:", value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  // const close_modal = (mShow, time) => {
  //   if (!mShow) {
  //     setTimeout(() => {
  //       setModalShow(false);
  //     }, time);
  //   }
  // };

  // const Submit = (data) => {
  //   console.log(data);
  //   if (data) {
  //     localStorage.setItem("Form", JSON.stringify(data));
  //     setModalShow(true);
  //     close_modal(modalShow, 1000);
  //     reset();
  //   } else {
  //     setError(true);
  //   }
  // };
  const OnSubmit = () => {
    const formData = new FormData();

    formData.append("category_name", name);
    formData.append("category_code", code);
    if (img) {
      formData.append("category_pic", img);
    }

    formData.append("category_description", description);

    if (parentcategory) {
      formData.append("category_parent_id", parentcategory);
    }

    // formData.append("brand_name", brand);

    PublicFetch.post(`${CRM_BASE_URL_SELLING}/category`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
        } else if (res.data.success === false) {
          //  setError403(true);
          //   console.log("Category Code has been taken ");
          alert(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err.data.data);
        setError(true);
      });
  };

  // console.log("data", description);

  // const renderTreeNodes = (data) => {
  //   TreeData.map((item) => {
  //     if (item.children) {
  //       return (
  //         <TreeNode
  //           title={item.title}
  //           key={item.key}
  //           dataRef={item}
  //           isLeaf={false}
  //         >
  //           {this.renderTreeNodes(item.children)}
  //         </TreeNode>
  //       );
  //     }
  //     return (
  //       <TreeNode key={item.key} {...item} title={item.title} dataRef={item} />
  //     );
  //   });

  const getTreeData = (data) => {
    // console.log("hai buddies", data);
    data?.map((item, index) => {
      // console.log("happy birthday", item);

      if (item?.other_crm_v1_categories) {
        // console.log("hai halo");
        return (
          <>
            <div className="">Nothing</div>
            <TreeNode
              title={item?.category_name}
              value={item?.category_id}
              key={item?.category_id}
              dataRef={item}
              isLeaf={true}
            >
              {getTreeData(item?.other_crm_v1_categories)}
            </TreeNode>
          </>
        );
      } else {
        // console.log("bei bei");
        return (
          <TreeNode
            key={item?.category_id}
            {...item}
            title={item?.category_name}
            dataRef={item}
          />
        );
      }
    });
  };

  const checkCategoryCodeis = (data) => {
    PublicFetch.get(
      `${process.env.REACT_APP_BASE_URL}/misc?type=categorycode&value=${code}`
    )
      .then((res) => {
        console.log("Response 1123", res);
        if (res.data.success) {
          console.log("Success", res.data.data);
          if (res.data.data.exist) {
            console.log("hai guys");
            setuniqueCode(true);
          } else {
            setuniqueCode(false);
          }
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  // console.log("imgage preview", imgPreview);
  const beforeUpload = (file, fileList) => {};
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="content-tabs" style={{ maxHeight: "1000px" }}>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
                OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row px-4 pt-4">
                <div className="col-sm-4 pt-3">
                  <label>Name</label>
                  <Form.Item
                    name="category_name"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Category Name",
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Name cannot be longer than 100 characters",
                      },
                    ]}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Category Code</label>
                  <Form.Item
                    name="category_code"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9]+$"),
                        message: "Please enter a Valid Category code",
                      },
                      {
                        min: 2,
                        message: "Code must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Code cannot be longer than 100 characters",
                      },
                    ]}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError403(false);
                      setuniqueCode(false);
                    }}
                  >
                    <InputType
                      onBlur={() => {
                        checkCategoryCodeis();
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <label style={{ color: "red" }} className=" mb-2">
                      Category Code {UniqueErrorMsg.UniqueErrName}
                    </label>
                  ) : null}
                </div>
                <div className="col-sm-4 pt-3">
                  <label for="tree" className="form-label">
                    Parent Category
                  </label>
                  <Form.Item name="category_parent_id">
                    <TreeSelect
                      className="tree"
                      style={{ width: "100%" }}
                      value={setState.value}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      onChange={(value) => setParentcategory(value)}
                      // treeData={TreeData?.map((item, index) => ({
                      //   title: item?.category_name,
                      //   value: item?.category_id,
                      //   match: item?.category_id,
                      //   key: item?.category_id,
                      //   children: item?.other_crm_v1_categories,
                      // }))}
                      treeData={categoryTree}
                      placeholder="Please select"
                      // treeDefaultExpandAll
                      // onChange={onChange}
                      onSelect={onSelect}
                    >
                      {/* {getTreeData(TreeData)} */}
                    </TreeSelect>
                  </Form.Item>
                </div>
                <div className="col-xl-6 col-lg-6 col-sm-12 pt-3">
                  <label>Description</label>
                  <Form.Item
                    name="category_description"
                    rules={[
                      {
                        min: 2,
                        message: "Description must be at least 2 characters",
                      },
                      {
                        max: 500,
                        message:
                          "Description cannot be longer than 500 characters",
                      },
                    ]}
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
                <div className="col-xl-6 col-lg-6 col-sm-12 pt-3">
                  <label>Display Picture</label>
                  <Form.Item name="category_pic">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      // onPreview={handlePreview}
                      beforeUpload={beforeUpload}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);
                        if (file.file.size > 1000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          console.log("Allowed image size");
                          setImageSize(false);
                          setImgPreview(file?.file?.thumbUrl);
                        } else {
                          setImageSize(true);
                          console.log("image size between 1 kb and  500 kb");
                        }
                      }}
                    />
                    {imageSize ? (
                      <p style={{ color: "red" }}>
                        Please Upload an image between 1 kb and 500 kb
                      </p>
                    ) : (
                      ""
                    )}
                  </Form.Item>
                </div>
                <div className="row ">
                  {/* {
              error403 ? (<div><p style={{textAlign:"center",color:"red"}}>Category Code has been taken </p></div>):""
            } */}
                </div>
                {/* <div>
                  <img src={imgPreview} alt height={"50px"} width={"50px"} />
                </div> */}
                <div className="d-flex mb-3">
                  <Button className="savebtn" btnType="save">
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <CustomModel
        size={"sm"}
        success
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
      />
      {error ? <ErrorMsg code="500" /> : ""}
    </>
  );
}

export default Category;
