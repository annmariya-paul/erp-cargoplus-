import React, { useState } from "react";
import { Input, Select } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import Custom_model from "../../../../components/custom_modal/custom_model";

export default function CreditNoteType(){
 return(<>
 <h5 className="lead_text">Credit Note Type</h5> 
 </>)
}