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
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAlignLeft } from "@coreui/icons";

import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";

const addProduct = () => {
  const [category, setCatagory] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/dashbord/showcategory")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategory = (e) => {
    setCatagory(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited!");
    axios
      .post("http://localhost:5000/dashbord/addproduct", { category: category })
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
                        <h1>Add Product</h1>
                        <p className="text-medium-emphasis">add product</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText id="ItemName">Item</CInputGroupText>
                          <CFormInput
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CFormInput
                            type="file"
                            id="FileUpload"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                            Category
                          </CInputGroupText>
                          <CFormSelect id="CatagoryDD">
                            <option>Choose...</option>
                            {data.map((cat, index) => (
                              <>
                                <option key={index} value={cat.category}>
                                  {cat.category}
                                </option>
                              </>
                            ))}
                          </CFormSelect>
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText id="inputGroup-sizing-default">Description</CInputGroupText>
                          <CFormTextarea id="exampleFormControlTextarea1" rows={3}></CFormTextarea>
                        </CInputGroup>

                        <div className="d-grid">
                          <CButton type="submit" color="success">
                            Add product
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

export default addProduct;
