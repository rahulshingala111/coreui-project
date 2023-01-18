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
import ReadRow from "./Components/ReadRow";
import EditRow from "./Components/EditRow";

const Employee = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const [editId, setEditId] = useState(null);

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

  const [editData, setEditData] = useState({
    username: "",
    email: "",
    contact: "",
  });

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

  const handleEdit = (event, user) => {
    event.preventDefault();
    setEditId(user._id);

    const formValues = {
      username: user.username,
      email: user.email,
      contact: user.contact,
    };

    setEditData(formValues);
  };

  const handleEditChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editData };
    newFormData[fieldName] = fieldValue;

    setEditData(newFormData);
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
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <div className="row">
                      <div className="col h3">Table - Employee</div>
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
                          {/* <CTableHeaderCell scope="col">_id</CTableHeaderCell> */}
                          <CTableHeaderCell scope="col">username</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col"> Contact</CTableHeaderCell>
                          <CTableHeaderCell scope="col">createdBy</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {filter.map((user, index) => (
                          <>
                            {editId === user._id ? (
                              <EditRow editData={editData} handleEditChange={handleEditChange} />
                            ) : (
                              <ReadRow user={user} index={index} handleEdit={handleEdit} />
                            )}
                          </>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default Employee;
