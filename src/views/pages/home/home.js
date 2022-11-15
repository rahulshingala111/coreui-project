/* eslint-disable */
import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";

const home = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CButton color="success" href="/Login">Login</CButton><br />
            <CButton color="danger" href="/Register">Register</CButton>
            <Link to="/Login">Login page </Link>
            <Link to="/Register">Register page </Link>

            {/* <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup> */}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default home;
