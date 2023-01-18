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

const EditRow = ({ editData, handleEditChange }) => {
  return (
    <>
      <CTableRow>
        <CTableDataCell></CTableDataCell>
        <CTableHeaderCell scope="row">
          <CFormInput
            type="text"
            required="required"
            placeholder="Enter username"
            name="username"
            value={editData.username}
            onChange={handleEditChange}
          ></CFormInput>
        </CTableHeaderCell>

        <CTableDataCell>
          <CFormInput
            type="text"
            required="required"
            placeholder="Enter email"
            name="email"
            value={editData.email}
            onChange={handleEditChange}
          ></CFormInput>
        </CTableDataCell>

        <CTableDataCell>
          <CFormInput
            type="text"
            required="required"
            placeholder="Enter contact"
            name="contact"
            value={editData.contact}
            onChange={handleEditChange}
          ></CFormInput>
        </CTableDataCell>

        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
      </CTableRow>
    </>
  );
};

export default EditRow;
