/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import { useLocation } from "react-router-dom";

const EditEmployee = () => {
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleUserName = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleContact = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setContact(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(username);
    console.log(email);
    console.log(contact);
    axios
      .post("http://localhost:5000/dashboard/employee/editUser", {
        id:location.state.id,
        contact: contact,
        email: email,
        username: username,
      })
      .then(
        (response) => {
          //console.log(response);
          window.location = "/dashboard/employee";
        },
        (error) => {
          console.log(error);
        }
      );
  };
  // const { state } = this.props.location;
  // console.log(state)
  // const UserName = location.state.username;
  // const Email = location.state.email;
  // const Contact = location.state.contact;
  // const ID = location.state.id;

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="bg-light d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                      <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                          <h1>Edit Employee</h1>
                          <p className="text-medium-emphasis">Edit Employee</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder={location.state.username}
                              autoComplete="username"
                              onChange={handleUserName}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormInput
                              placeholder={location.state.email}
                              autoComplete="email"
                              onChange={handleEmail}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder={location.state.contact}
                              autoComplete="contect"
                              onChange={handleContact}
                            />
                          </CInputGroup>
                          <div className="d-grid">
                            <CButton type="submit" color="success">
                              Edit
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
      </div>
    </>
  );
};
export default EditEmployee;
