function Addvendor(){
    return(
 
        <div className="container-fluid container_fms pt-3">

                  <Form
                  form={addForm}
                  onFinish={(data) => {
                    console.log("valuezzzzzzz", data);
                    // createvendortype()
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row py-4">
                    <div className="col-4 pt-1">
                      <label> Name</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                          // onChange={(e) => setFrighttypename(e.target.value)}
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label> Organisation Type</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>  Type</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                   
                  </div>


                  <div className="row py-4">
                    <div className="col-4 pt-1">
                      <label> Name</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                          // onChange={(e) => setFrighttypename(e.target.value)}
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label> Organisation Type</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>  Type</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                   
                  </div>


                 <div className="row">
                 <div className="col-4 pt-1">
                      <label>Type</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>  Type</label>
                      <div>
                        <Form.Item
                          name="vendortypename"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          // value={vendortypename}
                          // onChange={(e) => {
                          //   setVendortypename(e.target.value);
                            
                          // }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    
                 </div>


                  <div className="row justify-content-center ">
                    <div className="col-auto">
                     
                      <Button btnType="save">Save</Button>
                    </div>
                  </div>
                </Form>
        </div>

    )
}
export default Addvendor;