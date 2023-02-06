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
import Opportunitylist from "./pages/CRM/lead/opportunity_ List/opportunitylist";
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
import Unitlist from "./pages/CRM/Selling/unit/Unitlist";
import Addunit from "./pages/CRM/Selling/unit/Addunit";
import Login from "./pages/Login/login";

// {HRMS}
import Branches from "./pages/HRMS/branches/branches";
import Departments from "./pages/HRMS/departments/departments";
import Designation from "./pages/HRMS/designation/designation";
import EmploymentType from "./pages/HRMS/employment_type/employment_type";
import OpportunityLeadlist from "./pages/CRM/lead/opportunity_ List/opportunityleadlist";
import Permission from "./pages/HRMS/permissions/Permission";
import Roles_and_Screen from "./pages/HRMS/Roles and screen/roles_and_screen";
import Employees from "./pages/HRMS/employees/employees";
import CreateEmployee from "./pages/HRMS/employees/CreateEmployee";
import Employeegrade from "./pages/HRMS/employeegrade/employeegrade";

// {FMS}
import Assign_opportunity from "./pages/FMS/Opportunity_assigns/AssignOpportunity/assign_opportunity";
import Track_assignments from "./pages/FMS/Opportunity_assigns/Track_assignments/track_opportunity_assigns";
import UpdateAssignOppurtunity from "./pages/FMS/Opportunity_assigns/update_oppo_assignment/update_oppo_assignment";
import CreateAgent from "./pages/FMS/Agent mangement/CreateAgent";
// import SelectCountry from "./pages/CRM/General/CountrySelect";
import Frightlist from "./pages/FMS/settings/Fright_types/fright_types";
import Quotations from "./pages/FMS/Quotations/create quotation/quotation_list";
import Add_Quotation from "./pages/FMS/Quotations/create quotation/add_quotation";
import EditQuotation from "./pages/FMS/Quotations/create quotation/edit_quotation";
import ViewQuotation from "./pages/FMS/Quotations/create quotation/view_quotation";
import Carrierlist from "./pages/FMS/settings/Carrier/carrier";
import ListAgent from "./pages/FMS/Agent mangement/ListAgent";
import UpdateAgent from "./pages/FMS/Agent mangement/Updateagent";

import Enquiries from "./pages/FMS/Opportunity_assigns/Enquiries/Enquiries";
import Agent_Response from "./pages/FMS/Opportunity_assigns/Enquiries/agent_response";
import Modelist from "./pages/FMS/settings/Mode/mode";
import Assign_oppertunity_edit from "./pages/FMS/Opportunity_assigns/AssignOpportunity/assign_oppertunity_edit";
import Consignee from "./pages/FMS/settings/Consignee/consignee";

import PaymentTerms from "./pages/FMS/settings/Payment Terms/payment_terms";
import Currency from "./pages/General Settings/Currency/currency";
import TaxType from "./pages/FMS/settings/Tax_type/tax_type";
import JobTasks from "./pages/FMS/settings/Job_tasks/job_tasks";
import Airport from "./pages/FMS/settings/Airport/airport";
import Seaport from "./pages/FMS/settings/Seaport/seaport";
import Companyinfo from "./pages/General Settings/companyinfo/companyinfo";
import Locations from "./pages/FMS/settings/Locations/locations";
import SelectCountry from "./pages/General Settings/country/CountrySelect";
import QuotationAssign from "./pages/FMS/Quotations/QuotationAssign";
import Listjob from "./pages/FMS/Jobtask/joblist";
import CreateJob from "./pages/FMS/Jobtask/createjob";
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
            <Route path={ROUTES.COUNTRYSELECT} element={<SelectCountry />} />
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
            <Route path={ROUTES.EMPLOYEEGRADE} element={<Employeegrade />} />

            {/* {FMS} */}
            <Route
              path={ROUTES.TRACK_ASSIGNMENTS}
              element={<Track_assignments />}
            />
            <Route path={ROUTES.LISTAGENT} element={<ListAgent />} />

            {/* <Route  path={ROUTES.UPDATEAGENT}
              element={<UpdateAgent />} />   */}

            <Route path={ROUTES.UPDATEAGENT_ID} element={<UpdateAgent />} />
            <Route
              path={ROUTES.ASSIGN_OPPORTUNITIES_ID}
              element={<Assign_opportunity />}
            />
            <Route
              path={ROUTES.UPDATE_OPPORTUNITY_ASSIGNMENT}
              element={<UpdateAssignOppurtunity />}
            />
            <Route path={ROUTES.CREATEAGENT} element={<CreateAgent />} />
            {/* <Route
              path={ROUTES.FRIGHTLIST}
              element={<Frightlist />}
            /> */}
            <Route path={ROUTES.QUATATIONS} element={<Quotations />} />
            <Route path={ROUTES.ADD_QUOTATION} element={<Add_Quotation />} />
            <Route path={ROUTES.FRIGHTLIST} element={<Frightlist />} />
            <Route path={ROUTES.CARRIER} element={<Carrierlist />} />
            <Route path={ROUTES.MODE} element={<Modelist />} />
            <Route path={ROUTES.QUATATIONS} element={<Quotations />} />
            <Route
              path={ROUTES.EDIT_QUOTATION_ID}
              element={<EditQuotation />}
            />
            <Route
              path={ROUTES.VIEW_QUOTATION_ID}
              element={<ViewQuotation />}
            />
            <Route path={ROUTES.ENQUIRIES} element={<Enquiries />} />
            <Route
              path={ROUTES.AGENT_RESPONSE_ID}
              element={<Agent_Response />}
            />
            <Route
              path={ROUTES.EDIT_ASSIGN_OPPORTUNITY_ID}
              element={<Assign_oppertunity_edit />}
            />
            <Route path={ROUTES.CONSIGNEE} element={<Consignee />} />
            <Route path={ROUTES.TERMS_OF_PAYMENT} element={<PaymentTerms />} />
            <Route path={ROUTES.TAXTYPE} element={<TaxType />} />
            <Route path={ROUTES.JOBTASKS} element={<JobTasks />} />
            <Route path={ROUTES.AIRPORT} element={<Airport />} />
            <Route path={ROUTES.SEAPORT} element={<Seaport />} />
            <Route path={ROUTES.LOCATIONS} element={<Locations />} />
            <Route
              path={ROUTES.ASSIGN_QUOTATION_ID}
              element={<QuotationAssign />}
            />
            <Route path={ROUTES.LIST_JOB} element={<Listjob />} />
            <Route path={ROUTES.CREATEJOB} element={<CreateJob />} />

            {/* General settings */}

            <Route path={ROUTES.CURRENCY} element={<Currency />} />
            <Route path={ROUTES.COMPANYINFO} element={<Companyinfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
