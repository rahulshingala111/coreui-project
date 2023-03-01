/* eslint-disable */
import { layouts } from "chart.js";
import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Home = React.lazy(() => import("./views/pages/home/home"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Employee = React.lazy(() => import("./views/pages/employee/Employee"));
const Addemployee = React.lazy(() => import("./views/pages/employee/Addemployee"));
const EditEmployee = React.lazy(() => import("./views/pages/employee/EditEmployee"));

const Category = React.lazy(() => import("./views/pages/ecom/Category"));
const Product = React.lazy(() => import("./views/pages/ecom/Product"));
const AddProduct = React.lazy(() => import("./views/pages/ecom/AddProduct"));
const EditProduct = React.lazy(() => import("./views/pages/ecom/EditProduct"));


class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/" name="Home" element={<Home />} />
              <Route exact path="/dashboard" name="Dashboard" element={<Dashboard />} />
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />

              <Route exact path="/dashboard/employee" name="Dashboard" element={<Employee />} />
              <Route exact path="/dashboard/addemployee" name="AddDashbord" element={<Addemployee />} />
              <Route exact path="/dashboard/editemployee" name="EditDashboard" element={<EditEmployee />} />

              <Route exact path="/dashboard/category" name="Category" element={<Category />} />
              <Route exact path="/dashboard/product" name="Product" element={<Product />} />
              <Route exact path="/dashboard/product/addproduct" name="AddProduct" element={<AddProduct />} />
              <Route exact path="/dashboard/product/editproduct" name="EditProduct" element={<EditProduct />} />

              <Route path="/*" name="Page 404" element={<Page404 />} />
              <Route path="/500" name="Page 500" element={<Page500 />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
