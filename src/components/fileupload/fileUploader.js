import "./fileupload.scss";
import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { MdUploadFile } from "react-icons/md";

const { Dragger } = Upload;
export default function FileUpload({
  multiple,
  listType,
  onChange,
  onClick,
  accept,
  height,
  filetype,
  fileList,
  beforeUpload,
  style,
}) {
  // const [files, setFiles] = useState([]);

  // const { register, handleSubmit } = useForm();

  // const onDrop = useCallback((acceptedFiles) => {
  //   setFiles(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // }, []);
  // const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  //   accept: [],
  //   noClick: false,
  //   noKeyboard: true,
  //   onDrop,
  // });

  // const thumbs = files.map((file) => (
  //   <div key={file.name}>
  //     <small>{file.name}</small>
  //     {/* <img src={file.preview} alt={file.name} style={{width:"30px",padding:"2px"}}/> */}
  //   </div>
  // ));

  // useEffect(
  //   () => () => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );
  // const filess =acceptedFiles.map((file) => {
  //   return (
  //     <li key={file.path}>
  //       {file.path} - {fil e.size}bytes
  //     </li>
  //   );
  // });
  const customAction = async () => {
    setTimeout(() => {
      return true;
    }, 100);
    return true;
  };

  return (
    <>
      <Dragger
        // fileList={[]}
        // style={style}
        action={async () => await customAction()}
        multiple={multiple}
        listType={listType}
        accept={accept}
        height={height}
        beforeUpload={beforeUpload}
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => {
            onSuccess("done");
          }, 0);
        }}
        onChange={onChange}
        onClick={onClick}
      >
        {/* <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                      </p> */}
        <>
          {" "}
          <div style={style} className="">
            <label className=" p-0 m-0">
              {/* <i className="bi5 bi-file-earmark-arrow-up-fill" /> */}
              <MdUploadFile style={{ color: "#9ccde8" }} fontSize={50} />
            </label>
          </div>
          <div className="">
            <label>Drop Your Files</label>
          </div>
          <small className="filetype_text">{filetype}</small>
        </>
      </Dragger>

      {/* <div className="row ">
        <div className=" w-100 ">
          <div className="dropzone-div" {...getRootProps()}>
            <input
              ref={register}
              name="files"
              className="dropzone-input"
              {...getInputProps()}
            />
            <div className="container dashed d-flex justify-content-center">
              {isDragActive ? (
                <p
                  className=" dropzone-content "
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <i className="bi5 bi-file-earmark-arrow-up-fill" />
                  <br />
                  Release to drop the files here
                </p>
              ) : (
                <p
                  className="dropzone-content "
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <i className="bi5 bi-file-earmark-arrow-up-fill" />
                  <br />
                  Drop Your Files
                </p>
              )}
              <p
                style={{
                  color: "gray",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Mulitiple Files Allowed
              </p>
              <aside>
                {thumbs}
               
              </aside>
            </div>
          </div>
        </div>
      </div> */}

      {/* <label id="" htmlFor="file" name="">
          <div className="card filerow">
            <div className="row">
              <div>
                <i
                  className="bi bi-file-earmark-arrow-up-fill"
                  style={{ fontSize: "5rem", color: "#099ed9" }}
                />
              </div>
            </div>
            <div className="row">
              <p>Drop your Document</p>
            </div>
          </div>
          <input
            type="file"
            id="file"
            accept=""
            style={{ display: "none" }}
            className="fileuploader"
          />
        </label> */}
    </>
  );
}
