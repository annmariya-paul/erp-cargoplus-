import React, { useEffect, useState } from "react";
import "./category.css";
import { TreeSelect } from "antd";
import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import FileUpload from "../../../../components/fileupload/fileUploader";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";

function Category() {
  const { TreeNode } = TreeSelect;
  const [toggleState, setToggleState] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  const [error, setError] = useState(false);
  const [State, setState] = useState("null");
  const [treeLine, setTreeLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [TreeData, setTreeData] = useState();

  const getCategorydata = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/category`)
      .then((res) => {
        console.log("response Data", res);
        if (res.data.success) {
          setTreeData(res.data.data);
          // getTreeData(res.data.data);
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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

  const Submit = (data) => {
    console.log(data);
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));
      setModalShow(true);
      close_modal(modalShow, 1000);
      reset();
    } else {
      setError(true);
    }
  };
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
            <Form onSubmit={handleSubmit(Submit)}>
              <div className="row px-4 pt-4">
                <div className="col-sm-4 pt-3">
                  <Form.Group className="mb-2" controlId="Cname">
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
                  </Form.Group>
                </div>
                <div className="col-sm-4 pt-3">
                  <Form.Group className="mb-2" controlId="category_code">
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
                  </Form.Group>
                </div>
                <div className="col-sm-4 pt-3">
                  <label for="tree" className="form-label">
                    Parent Category
                  </label>
                  <TreeSelect
                    className="tree"
                    name="tree"
                    style={{ width: "100%" }}
                    value={setState.value}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    // treeData={TreeData?.map((item, index) => ({
                    //   title: item?.category_name,
                    //   value: item?.category_id,
                    //   match: item?.category_id,
                    //   key: item?.category_id,
                    //   children: item?.other_crm_v1_categories,
                    // }))}
                    // treeData={}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    onChange={onChange}
                    onSelect={onSelect}
                  >
                    {getTreeData(TreeData)}
                  </TreeSelect>
                </div>
                <div className=" col-sm-5 pt-3">
                  <Form.Group className="mb-2" controlId="cat_description">
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
                  </Form.Group>
                </div>
                <div className="row ">
                  <div className="col-12 ">
                    <Form.Group className="mb-2" controlId="cat_img">
                      <Form.Label>category Image</Form.Label>

                      <FileUpload
                        className={`${errors.attachments && "invalid"}`}
                        {...register("attachments")}
                        onKeyUp={() => {
                          trigger("attachments");
                        }}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <Button className="savebtn" onClick={Submit} btnType="save">
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
