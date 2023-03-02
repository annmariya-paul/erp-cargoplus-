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
import ViewJob from "./pages/FMS/Job/viewjob";

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
import Listjob from "./pages/FMS/Job/joblist";
import CreateJob from "./pages/FMS/Job/createjob";
import Updatejob from "./pages/FMS/Job/Updatejob";
import Taskexpenses from "./pages/FMS/Job/Task and Expenses/add_task_expenses";
import InvoiceList from "./pages/FMS/Invoice/InvoiceList";
import InvoicePreView from "./pages/FMS/Invoice/InvoicePreView";
import Quotationinvoice from "./pages/FMS/Quotations/create quotation/quotation_invoice";
import Jobinvoice from "./pages/FMS/Job/Job_invoice/job_invoice";
import Vendortype from "./pages/CRM/Purchase/vendertype/vendortype";
import Vendor from "./pages/CRM/Purchase/vendor/vendor";
import ProtectedRoute from "./components/ProtectedRoute";
import InvoicePrint from "./components/Invoice/InvoicePrint";
import PrintInvoice from "./pages/FMS/Invoice/PrintInvoice";
// import Payment_mode from "./pages/FMS/settings/payment mode/payment_mode";
import InvoiceView from "./pages/FMS/Invoice/InvoiceView";
import DailyExpence from "./pages/Accounts/DailyExpence/DailyExpence";
import AddPayments from "./pages/Accounts/AddPayments/AddPayments";
import CreateExpence from "./pages/Accounts/DailyExpence/CreateExpence";
import ExpenseCategory from "./pages/Accounts/settings/Expense_Category/ExpenseCategory";
// import Vendortype from "./pages/CRM/Purchase/vendertype/vendortype";
// import Lead from "./pages/lead/lead";

//Account
import Payment_mode from "./pages/Accounts/settings/payment_mode";
import Add_purchase from "./pages/Accounts/settings/add_purchase";
import Purchase from "./pages/Accounts/settings/purchase";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIDEBAR} element={<Sidebar />} />
          <Route path={ROUTES.Layout} element={<Layout />}>
            {/* <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute />}> */}
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
            </Route>

            <Route path={ROUTES.COUNTRYSELECT} element={<ProtectedRoute />}>
              <Route index element={<SelectCountry />} />
            </Route>
            <Route path={ROUTES.LEAD} element={<ProtectedRoute />}>
              <Route index element={<Lead />} />
            </Route>

            <Route path={ROUTES.LEADLIST} element={<ProtectedRoute />}>
              <Route index element={<LeadList />} />
            </Route>

            <Route path={ROUTES.LEAD} element={<ProtectedRoute />}>
              <Route index element={<Lead />} />
            </Route>

            <Route path={ROUTES.CATEGORY} element={<ProtectedRoute />}>
              <Route index element={<Category />} />
            </Route>

            <Route path={ROUTES.TEST_PAGE} element={<ProtectedRoute />}>
              <Route index element={<TestPage />} />
            </Route>
            <Route path={ROUTES.OPPORTUNITY} element={<ProtectedRoute />}>
              <Route index element={<Opportunitylist />} />
            </Route>

            <Route
              path={ROUTES.OPPORTUNITY_LEAD_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<OpportunityLeadlist />} />
            </Route>

            <Route path={ROUTES.CATEGORY_LIST} element={<ProtectedRoute />}>
              <Route index element={<Categorylist />} />
            </Route>

            <Route path={ROUTES.LEAD_REPORT} element={<ProtectedRoute />}>
              <Route index element={<LeadReport />} />
            </Route>

            <Route path={ROUTES.LEAD_EDIT_ID} element={<ProtectedRoute />}>
              <Route index element={<LeadEdit />} />
            </Route>

            <Route path={ROUTES.BRANDS} element={<ProtectedRoute />}>
              <Route index element={<BrandsList />} />
            </Route>
            <Route path={ROUTES.ATTRIBUTES} element={<ProtectedRoute />}>
              <Route index element={<Attribute />} />
            </Route>

            <Route path={ROUTES.ADD_ATTRIBUTES} element={<ProtectedRoute />}>
              <Route index element={<Add_Attribute />} />
            </Route>

            <Route
              path={ROUTES.OPPORTUNITY_REPORT}
              element={<ProtectedRoute />}
            >
              <Route index element={<OpportunityReport />} />
            </Route>

            <Route path={ROUTES.VENDOR_TYPE} element={<ProtectedRoute />}>
              <Route index element={<Vendortype />} />
            </Route>
            <Route path={ROUTES.VENDOR} element={<ProtectedRoute />}>
              <Route index element={<Vendor />} />
            </Route>

            {/* <Route path={ROUTES.UNIT_LIST} element={<Unitlist />} /> */}
            {/* <Route path={ROUTES.ADD_UNIT} element={<Addunit />} /> */}

            <Route path={ROUTES.UNIT_LIST} element={<ProtectedRoute />}>
              <Route index element={<Unitlist />} />
            </Route>

            <Route path={ROUTES.ADD_UNIT} element={<ProtectedRoute />}>
              <Route index element={<Addunit />} />
            </Route>

            <Route path={ROUTES.BRANDCREATE} element={<ProtectedRoute />}>
              <Route index element={<BrandCreate />} />
            </Route>

            <Route path={ROUTES.PRODUCT} element={<ProtectedRoute />}>
              <Route index element={<Productlist />} />
            </Route>

            <Route path={ROUTES.PRODUCTCREATE} element={<ProtectedRoute />}>
              <Route index element={<ProductCreate />} />
            </Route>

            <Route path={ROUTES.PRODUCTDETAIL_ID} element={<ProtectedRoute />}>
              <Route index element={<ProductDetails />} />
            </Route>

            <Route
              path={ROUTES.PRODUCTVARIENTS_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Varients />} />
            </Route>

            <Route path={ROUTES.SERVICES} element={<ProtectedRoute />}>
              <Route index element={<Services />} />
            </Route>

            <Route path={ROUTES.SERVICECREATE} element={<ProtectedRoute />}>
              <Route index element={<ServiceCreate />} />
            </Route>

            <Route path={ROUTES.BRANCHES} element={<ProtectedRoute />}>
              <Route index element={<Branches />} />
            </Route>

            <Route path={ROUTES.DEPARTMENTS} element={<ProtectedRoute />}>
              <Route index element={<Departments />} />
            </Route>

            <Route path={ROUTES.DESIGNATION} element={<ProtectedRoute />}>
              <Route index element={<Designation />} />
            </Route>

            <Route path={ROUTES.EMPLOYMENT_TYPE} element={<ProtectedRoute />}>
              <Route index element={<EmploymentType />} />
            </Route>

            <Route path={ROUTES.PERMISSIONS} element={<ProtectedRoute />}>
              <Route index element={<Permission />} />
            </Route>

            <Route path={ROUTES.ROLES_SCREEN} element={<ProtectedRoute />}>
              <Route index element={<Roles_and_Screen />} />
            </Route>

            <Route path={ROUTES.EMPLOYEES} element={<ProtectedRoute />}>
              <Route index element={<Employees />} />
            </Route>

            <Route path={ROUTES.CREATEEMPLOYEE} element={<ProtectedRoute />}>
              <Route index element={<CreateEmployee />} />
            </Route>

            <Route path={ROUTES.EMPLOYEEGRADE} element={<ProtectedRoute />}>
              <Route index element={<Employeegrade />} />
            </Route>

            {/* {FMS} */}
            <Route path={ROUTES.TRACK_ASSIGNMENTS} element={<ProtectedRoute />}>
              <Route index element={<Track_assignments />} />
            </Route>

            <Route path={ROUTES.LISTAGENT} element={<ProtectedRoute />}>
              <Route index element={<ListAgent />} />
            </Route>

            {/* <Route  path={ROUTES.UPDATEAGENT}
              element={<UpdateAgent />} />   */}
            <Route path={ROUTES.UPDATEAGENT_ID} element={<ProtectedRoute />}>
              <Route index element={<UpdateAgent />} />
            </Route>

            <Route
              path={ROUTES.ASSIGN_OPPORTUNITIES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Assign_opportunity />} />
            </Route>

            <Route
              path={ROUTES.UPDATE_OPPORTUNITY_ASSIGNMENT}
              element={<ProtectedRoute />}
            >
              <Route index element={<UpdateAssignOppurtunity />} />
            </Route>

            <Route path={ROUTES.CREATEAGENT} element={<ProtectedRoute />}>
              <Route index element={<CreateAgent />} />
            </Route>

            {/* <Route
              path={ROUTES.FRIGHTLIST}
              element={<Frightlist />}
            /> */}
            <Route path={ROUTES.QUATATIONS} element={<ProtectedRoute />}>
              <Route index element={<Quotations />} />
            </Route>

            <Route path={ROUTES.ADD_QUOTATION} element={<ProtectedRoute />}>
              <Route index element={<Add_Quotation />} />
            </Route>

            <Route path={ROUTES.FRIGHTLIST} element={<ProtectedRoute />}>
              <Route index element={<Frightlist />} />
            </Route>

            <Route path={ROUTES.CARRIER} element={<ProtectedRoute />}>
              <Route index element={<Carrierlist />} />
            </Route>

            <Route path={ROUTES.MODE} element={<ProtectedRoute />}>
              <Route index element={<Modelist />} />
            </Route>

            <Route path={ROUTES.QUATATIONS} element={<ProtectedRoute />}>
              <Route index element={<Quotations />} />
            </Route>

            <Route path={ROUTES.EDIT_QUOTATION_ID} element={<ProtectedRoute />}>
              <Route index element={<EditQuotation />} />
            </Route>

            <Route path={ROUTES.VIEW_QUOTATION_ID} element={<ProtectedRoute />}>
              <Route index element={<ViewQuotation />} />
            </Route>

            <Route path={ROUTES.ENQUIRIES} element={<ProtectedRoute />}>
              <Route index element={<Enquiries />} />
            </Route>

            <Route path={ROUTES.AGENT_RESPONSE_ID} element={<ProtectedRoute />}>
              <Route index element={<Agent_Response />} />
            </Route>

            <Route
              path={ROUTES.EDIT_ASSIGN_OPPORTUNITY_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Assign_oppertunity_edit />} />
            </Route>

            <Route path={ROUTES.CONSIGNEE} element={<ProtectedRoute />}>
              <Route index element={<Consignee />} />
            </Route>

            <Route path={ROUTES.TERMS_OF_PAYMENT} element={<ProtectedRoute />}>
              <Route index element={<PaymentTerms />} />
            </Route>

            <Route path={ROUTES.TAXTYPE} element={<ProtectedRoute />}>
              <Route index element={<TaxType />} />
            </Route>

            <Route path={ROUTES.JOBTASKS} element={<ProtectedRoute />}>
              <Route index element={<JobTasks />} />
            </Route>

            <Route path={ROUTES.AIRPORT} element={<ProtectedRoute />}>
              <Route index element={<Airport />} />
            </Route>

            <Route path={ROUTES.SEAPORT} element={<ProtectedRoute />}>
              <Route index element={<Seaport />} />
            </Route>

            <Route path={ROUTES.LOCATIONS} element={<ProtectedRoute />}>
              <Route index element={<Locations />} />
            </Route>

            <Route
              path={ROUTES.ASSIGN_QUOTATION_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<QuotationAssign />} />
            </Route>

            <Route path={ROUTES.LIST_JOB} element={<ProtectedRoute />}>
              <Route index element={<Listjob />} />
            </Route>

            <Route path={ROUTES.CREATEJOB} element={<ProtectedRoute />}>
              <Route index element={<CreateJob />} />
            </Route>

            <Route path={ROUTES.UPDATEJOB_ID} element={<ProtectedRoute />}>
              <Route index element={<Updatejob />} />
            </Route>

            <Route path={ROUTES.VIEW_JOB_ID} element={<ProtectedRoute />}>
              <Route index element={<ViewJob />} />
            </Route>

            <Route path={ROUTES.INVOICE_LIST} element={<ProtectedRoute />}>
              <Route index element={<InvoiceList />} />
            </Route>

            <Route
              path={ROUTES.INVOICE_PREVIEW_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<InvoicePreView />} />
            </Route>

            {/* Accounts */}
            {/* <Route path={ROUTES.PAYMEMENT_MODE} element={<ProtectedRoute/>}> */}
            {/* <Route index element={<Payment_mode/>}/> */}
            {/* </Route> */}
            <Route path={ROUTES.PAYMEMENT_MODE} element={<ProtectedRoute />}>
              <Route index element={<Payment_mode />} />
            </Route>

            <Route path={ROUTES.ADD_PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Add_purchase />} />
            </Route>
            <Route path={ROUTES.PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Purchase />} />
            </Route>

            <Route path={ROUTES.INVOICE_VIEW_ID} element={<ProtectedRoute />}>
              <Route index element={<InvoiceView />} />
            </Route>

            {/* General settings */}

            <Route path={ROUTES.CURRENCY} element={<ProtectedRoute />}>
              <Route index element={<Currency />} />
            </Route>

            <Route path={ROUTES.COMPANYINFO} element={<ProtectedRoute />}>
              <Route index element={<Companyinfo />} />
            </Route>

            <Route
              path={ROUTES.TASKANDEXPENSES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Taskexpenses />} />
            </Route>

            {/* ######## ACCOUNTS ######## */}
            <Route path={ROUTES.DAILY_EXPENSE} element={<ProtectedRoute />}>
              <Route index element={<DailyExpence />} />
            </Route>

            {/* </Route> */}
          </Route>
          <Route
            path={ROUTES.QUATATION_INVOICE_ID}
            element={<Quotationinvoice />}
          />
          <Route path={ROUTES.PRINT_INVOICE_ID} element={<ProtectedRoute />}>
            <Route path={ROUTES.PRINT_INVOICE_ID} element={<PrintInvoice />} />
          </Route>

          <Route path={ROUTES.JOB_INVOICE_ID} element={<Jobinvoice />} />
          <Route path={ROUTES.INVOICE_PRINT} element={<InvoicePrint />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
