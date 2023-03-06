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
    CTableRow, CContainer, CCardImage, CCardTitle, CCardText
} from "@coreui/react";
import { AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import axios from 'axios'

const Menu = () => {
    const [data, setData] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios
            .get("http://localhost:5000/dashboard/product/menu/showallitem")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleCartUpdate = (e, user) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/dashbord/cart/updatecartitem", {
                id: user._id,
            })
            .then((response) => {
                console.log(response);
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
                        <CContainer>
                            <CRow xs={{ cols: 2, gutter: 2 }} lg={{ cols: 4, gutter: 4 }}>
                                {data?.map((user) => (
                                    <>
                                        <CCol>
                                            <CCard style={{ width: '17rem' }}>
                                                <CCardImage orientation="top" src={user.image} height="200px"></CCardImage>
                                                <CCardBody>
                                                    <CCardTitle>{user.itemname}</CCardTitle>
                                                    <CCardText>
                                                        {user.category}
                                                    </CCardText>
                                                    <CCardText>
                                                        {user.description}
                                                    </CCardText>
                                                    <CButton onClick={(e) => handleCartUpdate(e, user)}>Add to Cart</CButton>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </>
                                ))}
                            </CRow>
                        </CContainer>
                    </div>
                    <AppFooter />
                </div>
            </div>
        </>
    );
};

export default Menu;
