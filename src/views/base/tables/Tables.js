/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
} from "@coreui/react";
import axios from "axios";

const Tables = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/dashbord/showUser")
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
        setFilter(data)
    }
    else {
        setFilter(filteredRows)
    }
  };

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="row">
                <div className="col h3">Table</div>
                <div className="col-md-4">
                  <CForm>
                    <CFormInput
                      type="text"
                      id="searchInput"
                      placeholder="Search"
                      onChange={(e) => requestSearch(e.target.value)}
                    />
                  </CForm>
                </div>  
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">_id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col"> </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filter.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                      <CTableDataCell>{user._id}</CTableDataCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
