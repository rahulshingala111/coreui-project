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
} from "@coreui/react";
import axios from "axios";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";

import { Link, useNavigate } from "react-router-dom";

const Employee = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/dashbord/employee/showUser")
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.username.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
    });
    if (searchedVal.length < 1) {
      setFilter(data);
    } else {
      setFilter(filteredRows);
    }
  };

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" href="/dashboard/addemployee">
                Add
              </CButton>
            </div>
            <CForm>
              <CRow>
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <div className="row">
                        <div className="col h3">Table - Employee</div>
                        <div className="col-md-4">
                          <CFormInput
                            type="text"
                            id="searchInput"
                            placeholder="Search"
                            onChange={(e) => requestSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <CTable striped hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">username</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col"> Contact</CTableHeaderCell>
                            <CTableHeaderCell scope="col">createdBy</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            <CTableHeaderCell scope="col"></CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {filter.map((user, index) => (
                            <>
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                                <CTableDataCell>{user.username}</CTableDataCell>
                                <CTableDataCell>{user.email}</CTableDataCell>
                                <CTableDataCell>{user.contact}</CTableDataCell>
                                <CTableDataCell>{user.result[0].username}</CTableDataCell>
                                <CTableDataCell>
                                  <CButton
                                    onClick={() => {
                                      navigate("/dashboard/editemployee", {
                                        state: {
                                          id: user._id,
                                          username: user.username,
                                          email: user.email,
                                          contact: user.contact,
                                        },
                                      });
                                    }}
                                    color="info"
                                    href="/dashboard/editemployee"
                                  >
                                    Edit
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
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default Employee;
