import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Sidebar from "./components/Sidebar/sidebar";
import Layout from "./layouts/layout";
import Lead from "./pages/CRM/lead/lead";
import LeadList from "./pages/CRM/lead/lead_list/lead_list";
import Dashboard from "./pages/dashboard/dashboard";
import Category from "./pages/category/category";
import TestPage from "./pages/testpage";
import LeadReport from "./pages/CRM/lead/leadReport/leadReport";
import Opportunitylist from "./pages/opportunity_ List/opportunitylist";
import Categorylist from "./pages/category/viewCategory";

// import BrandsList from "./pages/CRM/lead/brands/BrandsList";
// import OpportunityReport from "./pages/opportunityReport/OpportunityReport";
import Unitlist from "./pages/CRM/lead/unit/Unitlist";
import Addunit from "./pages/CRM/lead/unit/Addunit";

import LeadEdit from "./pages/CRM/lead/lead_list/edit_lead_list";

import Attribute from "./pages/CRM/attributes/attributes";
import Add_Attribute from "./pages/CRM/attributes/add_attribute";

import BrandsList from "./pages/CRM/lead/brands/BrandsList";
import OpportunityReport from "./pages/opportunityReport/OpportunityReport";

import BrandCreate from "./pages/CRM/lead/brands/BrandCreate";
import Productlist from "./pages/CRM/lead/Product/Productlist";
import ProductCreate from "./pages/CRM/lead/Product/ProductCreate";

// import Lead from "./pages/lead/lead";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIDEBAR} element={<Sidebar />} />
          <Route path={ROUTES.Layout} element={<Layout />}>
            <Route index element={<Lead />} />
            <Route path={ROUTES.LEADLIST} element={<LeadList />} />
            <Route path={ROUTES.LEAD} element={<Lead />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.CATEGORY} element={<Category />} />
            <Route path={ROUTES.TEST_PAGE} element={<TestPage />} />
            <Route path={ROUTES.OPPORTUNITY} element={<Opportunitylist />} />
            <Route path={ROUTES.CATEGORY_LIST} element={<Categorylist />} />
            <Route path={ROUTES.LEAD_REPORT} element={<LeadReport />} />
            <Route path="/LeadEdit/:id" element={<LeadEdit />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
