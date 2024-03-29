import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
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
import { AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import axios from "axios";

const AddProduct = () => {
  const [itemname, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = async (e) => {
    // console.log(e.target.value);
    const filee = e.target.files[0];
    const base64 = await convertToBase64(filee);
    setFile(base64);
  };

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        "http://localhost:5000/dashboard/product/addproduct",
        {
          itemname: itemname,
          category: category,
          description: description,
          file: file,
        },
        config
      )
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
                          <CFormInput placeholder="item name" onChange={handleItemName} required />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilImagePlus} />
                          </CInputGroupText>
                          <CFormInput type="file" onChange={handleImage} required />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilAlignLeft} />
                          </CInputGroupText>
                          <CFormSelect id="itemCategory" onChange={handleCategory} required>
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
                            placeholder="Must be 8-20 Character long"
                            required
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
