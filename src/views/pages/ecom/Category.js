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
import { cilUser, cilAlignLeft } from "@coreui/icons";
import axios from "axios";

const Category = () => {
  useEffect(() => {
    getData();
  }, []);

  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const [editedId, setEditedId] = useState("");
  const [editedData, setEditedData] = useState("");

  const [editedCategory, setEditedCategory] = useState("");
  const [deletedCategory, setDeletedCategory] = useState("");

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
      .then((response) => {
        console.log(response);
        window.location = "/dashboard/category";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (e, user) => {
    e.preventDefault();
    setEditedId(user._id);
    setEditedData(user.category);
  };

  const handleEditedCategory = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setEditedCategory(e.target.value);
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/dashboard/category/editcategory", {
        id: editedId,
        editedCategory: editedCategory,
      })
      .then((response) => {
        console.log(response);
        window.location = "/dashboard/category";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditedId(null);
  };

  const handleDeleteCategory = async (e, user) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/dashboard/category/deletecategory", {
        id: user._id,
        category: user.category,
      })
      .then((response) => {
        console.log(response);
        window.location = "/dashboard/category";
      })
      .catch((error) => {
        console.log(error);
      });
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
                                <CTableDataCell>
                                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <CButton
                                      color="info"
                                      variant="outline"
                                      className="me-md-2"
                                      onClick={(e) => handleEdit(e, user)}
                                    >
                                      Edit
                                    </CButton>
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      className="me-md-2"
                                      onClick={(e) => handleDeleteCategory(e, user)}
                                    >
                                      Delete
                                    </CButton>
                                  </div>
                                </CTableDataCell>
                              </CTableRow>
                            </>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol>
                  {data.map((user) => (
                    <>
                      {editedId === user._id ? (
                        <CRow key={user} className="justify-content-center">
                          <CCol>
                            <CCard className="mx-4">
                              <CCardBody className="p-4">
                                <CForm>
                                  <h3 className="mb-4">Edit Category</h3>
                                  <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                      <CIcon icon={cilAlignLeft} />
                                    </CInputGroupText>
                                    <CFormInput
                                      placeholder={user.category}
                                      onChange={handleEditedCategory}
                                      required
                                    />
                                  </CInputGroup>
                                  <CRow>
                                    <CCol>
                                      <div className="d-grid gap-2 col-6 mx-auto">
                                        <CButton
                                          color="success"
                                          variant="outline"
                                          onClick={handleSave}
                                        >
                                          Save
                                        </CButton>
                                      </div>
                                    </CCol>
                                    <CCol>
                                      <div className="d-grid gap-2 col-6 mx-auto">
                                        <CButton
                                          color="danger"
                                          variant="outline"
                                          onClick={handleCancel}
                                        >
                                          Cancel
                                        </CButton>
                                      </div>
                                    </CCol>
                                  </CRow>
                                </CForm>
                              </CCardBody>
                            </CCard>
                          </CCol>
                        </CRow>
                      ) : null}
                    </>
                  ))}
                  <CRow className="justify-content-center">
                    <CCol>
                      <CCard className="mx-4">
                        <CCardBody className="p-4">
                          <CForm onSubmit={handleSubmit}>
                            <h2 className="mb-4">Add Category</h2>
                            <CInputGroup className="mb-4">
                              <CInputGroupText>
                                <CIcon icon={cilAlignLeft} />
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
