/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
} from "@coreui/react";

const ReadRow = ({ user, index, handleEdit }) => {
  return (
    <>
      <CTableRow key={index}>
        <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
        {/* <CTableDataCell>{user._id}</CTableDataCell> */}
        <CTableDataCell>{user.username}</CTableDataCell>
        <CTableDataCell>{user.email}</CTableDataCell>
        <CTableDataCell>{user.contact}</CTableDataCell>
        <CTableDataCell>{user.result[0].username}</CTableDataCell>
        <CTableDataCell><CButton type="button" color="info" onClick={(event)=>handleEdit(event,user)}>Edit</CButton></CTableDataCell>
      </CTableRow>
    </>
  );
};

export default ReadRow;
