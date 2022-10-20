import "./fileupload.scss";
import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const { register, handleSubmit } = useForm();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: [],
    noClick: false,
    noKeyboard: true,
    onDrop,
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <small>{file.name}</small>
      {/* <img src={file.preview} alt={file.name} style={{width:"30px",padding:"2px"}}/> */}
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  // const filess =acceptedFiles.map((file) => {
  //   return (
  //     <li key={file.path}>
  //       {file.path} - {fil e.size}bytes
  //     </li>
  //   );
  // });

  return (
    <>
      <div className="row justify-content-center">
        <div className="imgwid col-xl-3 col-md-4 col-sm-6 " >
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
                {/* {files ? (<ul style={{listStyle:"none"}}>{image}</ul>):
              (<ul style={{ textAlign: "center" }}>{files}</ul>)
              } */}
              </aside>
            </div>
          </div>
        </div>
      </div>

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
