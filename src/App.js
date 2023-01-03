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
// import Unitlist from "./pages/CRM/Selling/unit/Unitlist";
// import Addunit from "./pages/CRM/Selling/unit/Addunit";

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
import Login from "./pages/Login/login";
import Branches from "./pages/HRMS/branches/branches";
import Departments from "./pages/HRMS/departments/departments";
import Unitlist from "./pages/CRM/Selling/unit/Unitlist";
import Addunit from "./pages/CRM/Selling/unit/Addunit";
import Designation from "./pages/HRMS/designation/designation";
import EmploymentType from "./pages/HRMS/employment_type/employment_type";
import OpportunityLeadlist from "./pages/opportunity_ List/opportunityleadlist";
import Permission from "./pages/HRMS/permissions/Permission";
import Roles_and_Screen from "./pages/HRMS/Roles and screen/roles_and_screen";
import Employees from "./pages/HRMS/employees/employees";
import CreateEmployee from "./pages/HRMS/employees/CreateEmployee";

import Employeegrade from "./pages/HRMS/employeegrade/employeegrade";
import Assign_opportunity from "./pages/FMS/Opportunity_assigns/AssignOpportunity/assign_opportunity";
import Track_assignments from "./pages/FMS/Opportunity_assigns/Track_assignments/track_opportunity_assigns";
// import Lead from "./pages/lead/lead";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIDEBAR} element={<Sidebar />} />
          <Route path={ROUTES.Layout} element={<Layout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.LEAD} element={<Lead />} />
            <Route path={ROUTES.LEADLIST} element={<LeadList />} />
            <Route path={ROUTES.LEAD} element={<Lead />} />

            <Route path={ROUTES.CATEGORY} element={<Category />} />
            <Route path={ROUTES.TEST_PAGE} element={<TestPage />} />
            <Route path={ROUTES.OPPORTUNITY} element={<Opportunitylist />} />
            <Route
              path={ROUTES.OPPORTUNITY_LEAD_ID}
              element={<OpportunityLeadlist />}
            />
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

            {/* <Route path={ROUTES.UNIT_LIST} element={<Unitlist />} /> */}
            {/* <Route path={ROUTES.ADD_UNIT} element={<Addunit />} /> */}

            <Route path={ROUTES.UNIT_LIST} element={<Unitlist />} />
            <Route path={ROUTES.ADD_UNIT} element={<Addunit />} />

            <Route path={ROUTES.BRANDCREATE} element={<BrandCreate />} />
            <Route path={ROUTES.PRODUCT} element={<Productlist />} />
            <Route path={ROUTES.PRODUCTCREATE} element={<ProductCreate />} />
            <Route
              path={ROUTES.PRODUCTDETAIL_ID}
              element={<ProductDetails />}
            />
            <Route path={ROUTES.PRODUCTVARIENTS_ID} element={<Varients />} />
            <Route path={ROUTES.SERVICES} element={<Services />} />
            <Route path={ROUTES.SERVICECREATE} element={<ServiceCreate />} />
            <Route path={ROUTES.BRANCHES} element={<Branches />} />
            <Route path={ROUTES.DEPARTMENTS} element={<Departments />} />
            <Route path={ROUTES.DESIGNATION} element={<Designation />} />
            <Route path={ROUTES.EMPLOYMENT_TYPE} element={<EmploymentType />} />
            <Route path={ROUTES.PERMISSIONS} element={<Permission />} />
            <Route path={ROUTES.ROLES_SCREEN} element={<Roles_and_Screen />} />
            <Route path={ROUTES.EMPLOYEES} element={<Employees />} />
            <Route path={ROUTES.CREATEEMPLOYEE} element={<CreateEmployee />} />

            <Route path={ROUTES.EMPLOYEEGRADE} element={<Employeegrade/>}/>

            <Route path={ROUTES.TRACK_ASSIGNMENTS} element={<Track_assignments />} />
            
            <Route path={ROUTES.ASSIGN_OPPORTUNITIES} element={<Assign_opportunity />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
