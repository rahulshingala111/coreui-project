/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
    CRow,
    CContainer,
    CCol,CCard,CCardImage,CCardBody,CCardTitle,CCardText,CButton
} from "@coreui/react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import axios from "axios";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const Cart = () => {

    const [data, setData] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const userId = jwt.decode(Cookies.get("token"), { complete: true });
        axios
            .get("http://localhost:5000/dashbord/cart/showcartitem", {
                headers: {
                    'myheader': userId.payload.username,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCartUpdate = (e, user) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/dashbord/cart/deletecartitem", {
                id: user._id,
            })
            .then((response) => {
                console.log(response);
                window.location = "/dashboard/cart";
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
                                                    <CButton href="/dashboard/cart" onClick={(e) => handleCartUpdate(e, user)}>Remove</CButton>
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

export default Cart;
