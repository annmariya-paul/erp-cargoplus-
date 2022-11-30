import React, { useEffect, useState } from "react";
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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Category() {
  const [addForm] = Form.useForm();
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
  const [description, setDescription] = useState();
  const [code, setCode] = useState();
  const [category, setCategory] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [parentcategory,setParentcategory]=useState(null);
  // const [parent,setParent]=useState(null);
  console.log("set image", img);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.CATEGORY);
      }, time);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.CATEGORY);
  };
  const handlePreview = async (file) => {
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
    console.log("Change", value);
    setState({ value });
    setCategory(value.target.value)
  };

  const onSelect = (value) => {
    console.log("Select:", value);
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
    formData.append("category_pic", img);
    formData.append("category_description", description);
    
      
      formData.append("category_parent_id",parentcategory );
    
    
    
    // formData.append("brand_name", brand);

    PublicFetch.post(`${CRM_BASE_URL_SELLING}/category`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.data) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
        }
      })
      .catch((err) => {
        console.log("error", err);
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
      console.log("happy birthday", item);

      if (item?.other_crm_v1_categories) {
        console.log("hai halo");
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
        console.log("bei bei");
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

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="content-tabs" style={{ maxHeight: "1000px" }}>
            {/* <Form onSubmit={handleSubmit(Submit)}> */}
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
                // setDescription(value.description);
                // setBrand(value.brand);
                OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row px-4 pt-4">
                <div className="col-sm-4 pt-3">
                  {/* <Form.Group className="mb-2" controlId="Cname">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Cname"
                      placeholder="Category Name"
                      className={`${errors.Cname && "invalid"}`}
                      {...register("Cname", {
                        required: "Please enter a valid Category Name",
                        minLength: {
                          value: 3,
                          message: "Minimum Required length is 3",
                        },
                        maxLength: {
                          value: 100,
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9 ]*$/,
                          message: "Only letters and numbers are allowed!",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("Cname");
                      }}
                    />
                    {errors.Cname && (
                      <small className="text-danger">
                        {errors.Cname.message}
                      </small>
                    )}
                  </Form.Group> */}
                  <p>Name</p>
                  <Form.Item
                    name="category_name"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                        message: "Please enter a Valid Brand Name",
                      },

                      {
                        whitespace: true,
                      },
                      {
                        min: 3,
                      },
                    ]}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  {/* <Form.Group className="mb-2" controlId="category_code">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="category_code"
                      placeholder="Category Code"
                      className={`${errors.category_code && "invalid"}`}
                      {...register("category_code", {
                        required: "Please enter a valid Category code",
                        minLength: {
                          value: 3,
                          message: "Minimum Required length is 3",
                        },
                        maxLength: {
                          value: 100,
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9 ]*$/,
                          message: "Only letters and numbers are allowed!",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("category_code");
                      }}
                    />
                    {errors.category_code && (
                      <small className="text-danger">
                        {errors.category_code.message}
                      </small>
                    )}
                  </Form.Group> */}
                  <p>category_code</p>
                  <Form.Item
                    name="category_code"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                        message: "Please enter a Valid category_code",
                      },

                      {
                        whitespace: true,
                      },
                      {
                        min: 3,
                      },
                    ]}
                    onChange={(e) => setCode(e.target.value)}
                  >
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label for="tree" className="form-label">
                    Parent Category
                  </label>
                  <Form.Item
                    name="category_parent_id"
                  >
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
                <div className=" col-sm-5 pt-3">
                  {/* <Form.Group className="mb-2" controlId="cat_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className={`${errors.cat_description && "invalid"}`}
                      {...register("cat_description")}
                      onKeyUp={() => {
                        trigger("cat_description");
                      }}
                    />
                    {errors.cat_description && (
                      <small className="text-danger">
                        {errors.cat_description.message}
                      </small>
                    )}
                  </Form.Group> */}
                  <p>Description</p>
                  <Form.Item
                    name="category_description"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                        message: "Please enter a Valid Brand Name",
                      },

                      {
                        whitespace: true,
                      },
                      {
                        min: 3,
                      },
                    ]}
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    <InputType />
                  </Form.Item>
                </div>
                <div className="row ">
                  <div className="col-12 ">
                    {/* <Form.Group className="mb-2" controlId="cat_img">
                      <Form.Label>category Image</Form.Label>

                      <FileUpload
                        className={`${errors.attachments && "invalid"}`}
                        {...register("attachments")}
                        onKeyUp={() => {
                          trigger("attachments");
                        }}
                      />
                    </Form.Group> */}
                    <p>Display Picture</p>
                    <Form.Item
                      name="category_pic"
                      rules={[
                        {
                          required: true,
                          message: "Please select an image file",
                        },
                      ]}
                    >
                      <FileUpload
                        multiple
                        listType="picture"
                        accept=".png,.jpg,.jpeg"
                        onPreview={handlePreview}
                        beforeUpload={false}
                        onChange={(file) => {
                          console.log("Before upload", file.file);
                          console.log(
                            "Before upload file size",
                            file.file.size
                          );

                          if (file.file.size > 1000 && file.file.size < 50000) {
                            setImg(file.file.originFileObj);
                            console.log(
                              "image grater than 1 kb and less than 50 kb"
                            );
                          } else {
                            console.log("hgrtryyryr");
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <Button className="savebtn" btnType="save">
                    Save
                  </Button>
                </div>{" "}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
