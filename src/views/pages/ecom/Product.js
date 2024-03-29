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
  CImage,
} from "@coreui/react";
import axios from "axios";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";

import { Link, useNavigate } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/dashboard/product/showproduct")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (e, user) => {
    e.preventDefault();
    console.log(user.itemname);
    axios
      .post("http://localhost:5000/dashboard/category/deleteproduct", {
        id: user._id,
      })
      .then((response) => {
        console.log(response);
        window.location = "/dashboard/product";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="body flex-grow-1 px-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="info" href="/dashboard/product/addproduct">
                  Add
                </CButton>
              </div>
              <CForm>
                <CRow>
                  <CCol xs={12}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <div className="row">
                          <div className="col h3">Table - product</div>
                        </div>
                      </CCardHeader>
                      <CCardBody>
                        <CTable striped hover>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Item name</CTableHeaderCell>
                              <CTableHeaderCell scope="col">category</CTableHeaderCell>
                              <CTableHeaderCell scope="col"> description</CTableHeaderCell>
                              <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {data.map((user, index) => (
                              <>
                                <CTableRow key={index}>
                                  <CTableDataCell>
                                    <CImage
                                      fluid
                                      rounded
                                      src={user.image}
                                      width={200}
                                      height={200}
                                    />
                                  </CTableDataCell>
                                  <CTableDataCell>{user.itemname}</CTableDataCell>
                                  <CTableDataCell>{user.category}</CTableDataCell>
                                  <CTableDataCell>{user.description}</CTableDataCell>
                                  <CTableDataCell>
                                    <CButton
                                      onClick={() => {
                                        navigate("../dashboard/product/editproduct", {
                                          state: {
                                            id: user._id,
                                            itemname: user.itemname,
                                            category: user.category,
                                            description: user.description,
                                          },
                                        });
                                      }}
                                      color="info"
                                      href="/dashboard/product/editproduct"
                                    >
                                      Edit
                                    </CButton>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CButton
                                      color="danger"
                                      onClick={(e) => handleDelete(e, user)}
                                    >Delete
                                    </CButton>
                                  </CTableDataCell>
                                </CTableRow>
                              </>
                            ))}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CForm>
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default Product;
