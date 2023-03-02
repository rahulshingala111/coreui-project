import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilAlignLeft,
  cilApple,
  cilCart,
  cilClearAll
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: "Theme",
  },
  {
    component: CNavItem,
    name: "Employee",
    to: "/dashboard/employee",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Categories",
    to: "/dashboard/category",
    icon: <CIcon icon={cilAlignLeft} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Product",
    to: "/dashboard/product",
    icon: <CIcon icon={cilApple} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "All Item List",
    to: "/dashboard/product/allitem",
    icon: <CIcon icon={cilClearAll} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Cart",
    to: "/dashboard/cart",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Extras",
  },
  {
    component: CNavGroup,
    name: "Pages",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Login",
        to: "/login",
      },
      {
        component: CNavItem,
        name: "Register",
        to: "/register",
      },
      {
        component: CNavItem,
        name: "Error 404",
        to: "/404",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Docs",
    href: "https://coreui.io/react/docs/templates/installation/",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
