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
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const Addemployee = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleUserName = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleContact = (e) => {
    console.log(e.target.value);
    setContact(e.target.value);
  };

  // useEffect(() => {
  //   const createdBy = jwt.decode(Cookies.get("token"), { complete: true });
  //   console.log(createdBy.payload.username);
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdBy = jwt.decode(Cookies.get("token"), { complete: true });
    console.log("submitted");
    axios
      .post("http://localhost:5000/dashboard/addemployee/registeremployee", {
        contact: contact,
        email: email,
        username: username,
        password: password,
        createdBy: createdBy.payload.username,
      })
      .then(
        (response) => {
          console.log(response);
          window.location = "/dashboard/employee";
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
            <div className="bg-light d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                      <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                          <h1>Employee</h1>
                          <p className="text-medium-emphasis">Add new Employee</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Username"
                              autoComplete="username"
                              onChange={handleUserName}
                              value={username}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormInput
                              onChange={handleEmail}
                              placeholder="Email"
                              autoComplete="email"
                              value={email}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Contact No."
                              autoComplete="contect"
                              onChange={handleContact}
                              value={contact}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput
                              onChange={handlePassword}
                              type="password"
                              placeholder="Password"
                              autoComplete="new-password"
                              value={password}
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
              </CContainer>
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};
export default Addemployee;
