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
  CContainer,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import { cilUser } from "@coreui/icons";
import axios from "axios";

const Category = () => {
  useEffect(() => {
    getData();
  }, []);

  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/dashboard/category/showCategory")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    axios
      .post("http://localhost:5000/dashboard/category/addcategory", {
        category: category,
      })
      .then(
        (response) => {
          window.location = "/dashboard/category";
        },
        (error) => {
          console.log(error);
        }
      );
  };
  
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer>
              <CRow>
                <CCol>
                  <CCard className="mb-4">
                    <CCardBody>
                      <CTable striped hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {data.map((user, index) => (
                            <>
                              <CTableRow key={index}>
                                <CTableDataCell>{user.category}</CTableDataCell>
                              </CTableRow>
                            </>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol>
                      <CRow className="justify-content-center">
                        <CCol >
                          <CCard className="mx-4">
                            <CCardBody className="p-4">
                              <CForm onSubmit={handleSubmit}>
                                <h2 className="mb-4">Add Category</h2>
                                <CInputGroup className="mb-4">
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    placeholder="Category"
                                    autoComplete="category"
                                    onChange={handleCategory}
                                    value={category}
                                    required
                                  />
                                </CInputGroup>
                                <div className="d-grid">
                                  <CButton type="submit" color="success">
                                    Add
                                  </CButton>
                                </div>
                              </CForm>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                </CCol>
              </CRow>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default Category;
