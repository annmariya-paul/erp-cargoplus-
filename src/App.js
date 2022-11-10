import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Sidebar from "./components/Sidebar/sidebar";
import Layout from "./layouts/layout";
import Lead from "./pages/CRM/lead/lead";
import LeadList from "./pages/CRM/lead/lead_list/lead_list";
import Dashboard from "./pages/dashboard/dashboard";
import Category from "./pages/CRM/Selling/category/category";
import TestPage from "./pages/testpage";
import LeadReport from "./pages/CRM/lead/leadReport/leadReport";
import Opportunitylist from "./pages/opportunity_ List/opportunitylist";
import Categorylist from "./pages/CRM/Selling/category/viewCategory";

// import BrandsList from "./pages/CRM/lead/brands/BrandsList";
// import OpportunityReport from "./pages/opportunityReport/OpportunityReport";
import Unitlist from "./pages/CRM/lead/unit/Unitlist";
import Addunit from "./pages/CRM/lead/unit/Addunit";

import LeadEdit from "./pages/CRM/lead/lead_list/edit_lead_list";



import OpportunityReport from "./pages/opportunityReport/OpportunityReport";

// import Viewunit from "./pages/unit/ViewUnit";
import Attribute from "./pages/CRM/Selling/attributes/attributes";
import Add_Attribute from "./pages/CRM/Selling/attributes/add_attribute";
import BrandCreate from "./pages/CRM/Selling/brands/BrandCreate";
import BrandsList from "./pages/CRM/Selling/brands/BrandsList";
import Productlist from "./pages/CRM/Selling/Product/Productlist";
import ProductCreate from "./pages/CRM/Selling/Product/ProductCreate";
import ProductDetails from "./pages/CRM/Selling/Product/ProductDetails";
import Varients from "./pages/CRM/Selling/Product/Varient/Varients";

import Services from "./pages/CRM/Selling/services/services_list";
import ServiceCreate from "./pages/CRM/Selling/services/ServiceCreate";

import Add_Branch from "./pages/HRMS/branches/add_branches";
import Add_Department from "./pages/HRMS/departments/add_deparments";
// import Lead from "./pages/lead/lead";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIDEBAR} element={<Sidebar />} />
          <Route path={ROUTES.Layout} element={<Layout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.LEAD} element={<Lead />} />
            <Route path={ROUTES.LEADLIST} element={<LeadList />} />
            <Route path={ROUTES.LEAD} element={<Lead />} />

            <Route path={ROUTES.CATEGORY} element={<Category />} />
            <Route path={ROUTES.TEST_PAGE} element={<TestPage />} />
            <Route path={ROUTES.OPPORTUNITY} element={<Opportunitylist />} />
            <Route path={ROUTES.CATEGORY_LIST} element={<Categorylist />} />
            <Route path={ROUTES.LEAD_REPORT} element={<LeadReport />} />
            <Route path={ROUTES.LEAD_EDIT_ID} element={<LeadEdit />} />

            <Route path={ROUTES.BRANDS} element={<BrandsList />} />
            <Route path={ROUTES.ATTRIBUTES} element={<Attribute />} />
            <Route path={ROUTES.ADD_ATTRIBUTES} element={<Add_Attribute />} />

            <Route
              path={ROUTES.OPPORTUNITY_REPORT}
              element={<OpportunityReport />}
            />

            <Route path={ROUTES.UNIT_LIST} element={<Unitlist />} />
            <Route path={ROUTES.ADD_UNIT} element={<Addunit />} />

            <Route path={ROUTES.BRANDCREATE} element={<BrandCreate />} />
            <Route path={ROUTES.PRODUCT} element={<Productlist />} />
            <Route path={ROUTES.PRODUCTCREATE} element={<ProductCreate />} />
            <Route path={ROUTES.PRODUCTDETAILS} element={<ProductDetails />} />
            <Route path={ROUTES.PRODUCTVARIENTS} element={<Varients />} />
            <Route path={ROUTES.SERVICES} element={<Services />} />
            <Route path={ROUTES.SERVICECREATE} element={<ServiceCreate />} />
            <Route path={ROUTES.ADD_BRANCHES} element={<Add_Branch />} />
            <Route path={ROUTES.ADD_DEPARTMENT} element={<Add_Department />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
