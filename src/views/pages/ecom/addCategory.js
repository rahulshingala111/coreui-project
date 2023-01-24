/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  CContainer,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAlignLeft } from "@coreui/icons";

import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";

const addCategory = () => {
  const [category, setCatagory] = useState("");

  const handleCategory = (e) => {
    setCatagory(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited!");
    axios
      .post("http://localhost:5000/dashbord/addcategory", { category: category })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-50 bg-light">
          <AppHeader />
          <div className="bg-light min-vh-100 flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                  <CCard className="mx-4">
                    <CCardBody className="p-4">
                      <CForm onSubmit={handleSubmit}>
                        <h1>Add Category</h1>
                        <p className="text-medium-emphasis">add category</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilAlignLeft} />
                          </CInputGroupText>
                          <CFormInput placeholder="category" onChange={handleCategory} />
                        </CInputGroup>

                        <div className="d-grid">
                          <CButton type="submit" color="success">
                            Add category
                          </CButton>
                        </div>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default addCategory;
