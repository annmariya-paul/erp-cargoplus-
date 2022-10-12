import React, { useState } from "react";
import "./category.css";
import { TreeSelect } from "antd";
import { Form, Container } from "react-bootstrap";
import Button from "../../components/button/button";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Category() {
  const [toggleState, setToggleState] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalContact, setModalContact] = React.useState(false);
  const [modalAddress, setModalAddress] = React.useState(false);
  const [error, setError] = useState(false);
  const [State, setState] = useState("null");
  const [treeLine, setTreeLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const treeData = [
    {
      title: "Laptop",
      value: "Laptop",

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
      title: "Node2",
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
    console.log("Change", getPath(value));
    setState({ value });
  };

  const onSelect = (value) => {
    console.log("Select:", getPath(value));
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
      setModalContact(false);
      reset();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="content-tabs" style={{ maxHeight: "1000px" }}>
              <Form onSubmit={handleSubmit(Submit)}>
                <div className="mt-5">
                  <Container>
                    <div className="row">
                      <div className="col-8">
                        <div className="row">
                          <div className="col-sm-6 pt-2 md-2 sm-12">
                            <Form.Group className="mb-2" controlId="Cname">
                              <Form.Label>Category Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="Cname"
                                placeholder="Category Name"
                                className={`${errors.name && "invalid"}`}
                                {...register("Cname", {
                                  required:
                                    "Please enter a valid Category Name",
                                  minLength: {
                                    value: 3,
                                    message: "Minimum Required length is 3",
                                  },
                                  maxLength: {
                                    value: 100,
                                  },
                                  pattern: {
                                    value: /^[a-zA-Z0-9 ]*$/,
                                    message:
                                      "Only letters and numbers are allowed!",
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

                          <div className="col-sm-6 pt-2 md-2 sm-12">
                            <Form.Group className="mb-2" controlId="code">
                              <Form.Label>Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="code"
                                placeholder="Category Code"
                                className={`${errors.code && "invalid"}`}
                                {...register("code", {
                                  required:
                                    "Please enter a valid Category code",
                                  minLength: {
                                    value: 3,
                                    message: "Minimum Required length is 3",
                                  },
                                  maxLength: {
                                    value: 100,
                                  },
                                  pattern: {
                                    value: /^[a-zA-Z0-9 ]*$/,
                                    message:
                                      "Only letters and numbers are allowed!",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("code");
                                }}
                              />
                              {errors.code && (
                                <small className="text-danger">
                                  {errors.code.message}
                                </small>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="container-fluid">
                          <div className="pt-3">
                            <Form.Group
                              className="mb-2"
                              controlId="description"
                            >
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                className={`${errors.description && "invalid"}`}
                                {...register("description", {
                                  minLength: {
                                    value: 5,
                                    message: "Minimum Required length is 5",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("description");
                                }}
                              />
                              {errors.organisation && (
                                <small className="text-danger">
                                  {errors.organisation.message}
                                </small>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm">
                        <div
                          className="col-sm-3 pt-3 ml-auto"
                          style={{ marginTop: "-28px" }}
                        >
                          <div
                            className="parent_cat mb-2 p-3 mb-5 bg-body rounded"
                            controlId="Parent_Category"
                            style={{
                              height: "69px",
                              width: "fit-content",
                              marginTop: 4,
                            }}
                          >
                            <label>Parent Category</label>

                            <TreeSelect className="tree"
                              style={{ width:220 }}
                              value={setState.value}
                              dropdownStyle={{
                                maxHeight: 400,
                                overflow: "auto",
                              }}
                              treeData={treeData}
                              placeholder="Please select"
                              treeDefaultExpandAll
                              onChange={onChange}
                              onSelect={onSelect}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>

                  
                    <Button className="savebtn" onClick={Submit} btnType="save">
                      Save
                    </Button>
                 
                </div>
              </Form>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default Category;
