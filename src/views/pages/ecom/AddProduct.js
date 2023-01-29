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
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAlignLeft, cilDescription, cilLayers, cilImagePlus } from "@coreui/icons";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import axios from "axios";

const AddProduct = () => {
  const [itemname, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/dashboard/category/showcategory")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemName = (e) => {
    console.log(e.target.value);
    setItemName(e.target.value);
  };

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };
  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/dashboard/product/addproduct", {
        itemname: itemname,
        category: category,
        description: description,
      })
      .then(
        (response) => {
          console.log(response);
          window.location = "/dashboard/product";
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
              <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                  <CCard className="mx-4">
                    <CCardBody className="p-4">
                      <CForm onSubmit={handleSubmit}>
                        <h2 className="mb-4">Add Product</h2>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilLayers} />
                          </CInputGroupText>
                          <CFormInput placeholder="item name" onChange={handleItemName} />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilImagePlus} />
                          </CInputGroupText>
                          <CFormInput type="file" multiple />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilAlignLeft} />
                          </CInputGroupText>
                          <CFormSelect id="itemCategory" onChange={handleCategory}>
                            <option>Category</option>
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
                          <CInputGroupText>
                            <CIcon icon={cilDescription} />
                          </CInputGroupText>
                          <CFormTextarea
                            onChange={handleDescription}
                            id="itemdescription"
                            rows={3}
                            required
                            placeholder="Must be 8-20 Character long"
                          ></CFormTextarea>
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
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
