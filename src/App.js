import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
// import Sidebar from "./components/Sidebar/sidebar";
import Layout from "./layouts/layout";
import Lead from "./pages/CRM/lead/lead";
import LeadList from "./pages/CRM/lead/lead_list/lead_list";
import Dashboard from "./pages/dashboard/dashboard";
import Category from "./pages/CRM/Selling/category/category";
import TestPage from "./pages/testpage";
import LeadReport from "./pages/CRM/lead/leadReport/leadReport";
import Opportunitylist from "./pages/CRM/lead/opportunity_ List/opportunitylist";
import Categorylist from "./pages/CRM/Selling/category/viewCategory";
import EditOpportunity from "./pages/CRM/lead/modals/editopportunity";
// import BrandsList from "./pages/CRM/lead/brands/BrandsList";
// import OpportunityReport from "./pages/opportunityReport/OpportunityReport";
// import Unitlist from "./pages/CRM/Selling/unit/Unitlist";
// import Addunit from "./pages/CRM/Selling/unit/Addunit";

import LeadEdit from "./pages/CRM/lead/lead_list/edit_lead_list";
import Purchaseorderinvoice from "./pages/FMS/Purchase/Purchase Order/purcahse_invoice";
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
import AddOpportunity from "./pages/CRM/lead/modals/addopportunity";

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
import Updatevendor from "./pages/CRM/Purchase/vendor/updatevendor";
// {FMS}
import Assign_opportunity from "./pages/FMS/Opportunity_assigns/AssignOpportunity/assign_opportunity";
import Track_assignments from "./pages/FMS/Opportunity_assigns/Track_assignments/track_opportunity_assigns";
import UpdateAssignOppurtunity from "./pages/FMS/Opportunity_assigns/update_oppo_assignment/update_oppo_assignment";
import CreateAgent from "./pages/FMS/Agent mangement/CreateAgent";
import Purchaseorder from "./pages/FMS/Purchase/Purchase Order/purchase_order";
// import SelectCountry from "./pages/CRM/General/CountrySelect";
import Frightlist from "./pages/FMS/settings/Fright_types/fright_types";
import Quotations from "./pages/FMS/Quotations/create quotation/quotation_list";
import Add_Quotation from "./pages/FMS/Quotations/create quotation/add_quotation";
import EditQuotation from "./pages/FMS/Quotations/create quotation/edit_quotation";
import ViewQuotation from "./pages/FMS/Quotations/create quotation/view_quotation";
import Carrierlist from "./pages/FMS/settings/Carrier/carrier";
import ListAgent from "./pages/FMS/Agent mangement/ListAgent";
import UpdateAgent from "./pages/FMS/Agent mangement/Updateagent";
import Addvendor from "./pages/CRM/Purchase/vendor/addvendor";

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
import AddPayments from "./pages/Accounts/Payments/AddPayments";
import CreateExpence from "./pages/Accounts/DailyExpence/CreateExpence";
import ExpenseCategory from "./pages/Accounts/settings/Expense_Category/ExpenseCategory";
import ListpurchaseOrder from "./pages/FMS/Purchase/Purchase Order/purchase_orderlist";
import EditPurchaseorder from "./pages/FMS/Purchase/Purchase Order/edit_purchaseorder";
import ViewpurchaseOrder from "./pages/FMS/Purchase/Purchase Order/view_purchaseorder";
// import Vendortype from "./pages/CRM/Purchase/vendertype/vendortype";
// import Lead from "./pages/lead/lead";

//Account
import Payment_mode from "./pages/Accounts/settings/payment_mode";
import Add_purchase from "./pages/Accounts/settings/Purchase/add_purchase";
import Purchase from "./pages/Accounts/settings/Purchase/purchase";
import View_purchase from "./pages/Accounts/settings/Purchase/view_purchase";
import Edit_purchase from "./pages/Accounts/settings/Purchase/edit_purchase";
import Print_purchase from "./pages/Accounts/settings/Purchase/print_purchase";
import Credit_notes from "./pages/Accounts/CreditNotes/list_creditnotes";
import Addcredit_notes from "./pages/Accounts/CreditNotes/add_creditnotes";
import Bank from "./pages/Accounts/settings/BankAccount/bank";
import Editcredit_notes from "./pages/Accounts/CreditNotes/edit_creditnote";
import CreditnotesView from "./pages/Accounts/CreditNotes/view_creditnotes";
import JobPayments from "./pages/Accounts/JobPayments/job_payments";
import AddJobPayments from "./pages/Accounts/JobPayments/add_job_payment";
import EditJobPayment from "./pages/Accounts/JobPayments/edit_job_payments";
import ViewJobPayment from "./pages/Accounts/JobPayments/view_job_payments";
import Payments from "./pages/Accounts/Payments/Payments";
import EditPayments from "./pages/Accounts/Payments/EditPayments";
import ViewPayment from "./pages/Accounts/Payments/ViewPayment";
import EditExpence from "./pages/Accounts/DailyExpence/EditExpense";
import AgentReport from "./pages/FMS/AgentReport/agentReport";
import CostAndExpenseReport from "./pages/FMS/CustomerwiseCostAndExpenseReport/costAndExpenseReport";
import EnquiryReport from "./pages/FMS/EnquiryReport/EnquiryReport";
import Monthly_report from "./pages/FMS/Monthly report/monthlyreport";
import Invoicereport from "./pages/FMS/Invoice/InvoiceReport/Invoicereport";
import CreditNoteType from "./pages/Accounts/settings/CreditNoteType/credit_note_type";
import Adddebit_notes from "./pages/Accounts/DebitNotes/add_debitnotes";
import Editdebit_notes from "./pages/Accounts/DebitNotes/edit_debitnote";
import Debit_notes from "./pages/Accounts/DebitNotes/list_debitnotes";
import DebitnotesView from "./pages/Accounts/DebitNotes/view_debitnotes";
import DailyExpenseReport from "./pages/Accounts/Reports/daily_expense_report";
import CreatePurchase from "./pages/Accounts/settings/Purchase/purchaseAdd";
import Enquiry from "./pages/CRM/lead/enquiry/enquiry";
import CreateBillPayment from "./pages/Accounts/Bill Payments/CreateBillPayment";
import ListBillPayment from "./pages/Accounts/Bill Payments/ListBillPayment";
import EditBillPayment from "./pages/Accounts/Bill Payments/EditBillPayment";
import ViewBillPayment from "./pages/Accounts/Bill Payments/ViewBillPayment";
import Fmssettings from "./pages/General Settings/Fmssettings/fmssetting";
import ServiceEdit from "./pages/CRM/Selling/services/ServiceEdit";
import Incoterm from "./pages/FMS/settings/Incoterm/incoterm";
import EnquiryList from "./pages/CRM/lead/enquiry/EnquiryList";
import EditEnquiry from "./pages/CRM/lead/enquiry/EditEnquiry";
import ViewEnquiry from "./pages/CRM/lead/enquiry/ViewEnquiry";
import Viewvendor from "./pages/CRM/Purchase/vendor/viewvendor";
import Containertypes from "./pages/FMS/settings/containertypes/containertypes";
import EnquirySource from "./pages/CRM/lead/EnquirySource/EnquirySource";
import TaxGroup from "./pages/FMS/settings/TaxGroup/TaxGroup";
import AwbblReport from "./pages/FMS/Awb_bl_report/awb_bl_report";
import Ledger from "./pages/Accounts/settings/Ledger/Ledger";
import Gltypes from "./pages/Accounts/settings/GLType/gl_type";
import AccGroup from "./pages/Accounts/settings/Account Group/AccGroup";
import Invoicetemp1 from "./components/Invoice/invoicetemp1/invoicetemp1";
import Invoicetemplate2 from "./components/Invoice/invoicetemp2/invoicetemp2";
import Invoicetemplateselect from "./pages/General Settings/invoicetemplates/invoicetemplate";
import Viewcustomer from "./pages/CRM/lead/lead_list/view_customer";
import ViewOpportunity from "./pages/CRM/lead/modals/viewopportunity";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          {/* <Route path={ROUTES.SIDEBAR} element={<Sidebar />} /> */}
          <Route element={<Layout />}>
            {/* <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute />}> */}
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
            </Route>

            <Route path={ROUTES.COUNTRYSELECT} element={<ProtectedRoute />}>
              <Route index element={<SelectCountry />} />
            </Route>
            <Route path={ROUTES.CUSTOMER} element={<ProtectedRoute />}>
              <Route index element={<Lead />} />
            </Route>

            <Route path={ROUTES.CUSTOMER_LIST} element={<ProtectedRoute />}>
              <Route index element={<LeadList />} />
            </Route>

            <Route path={ROUTES.CUSTOMER} element={<ProtectedRoute />}>
              <Route index element={<Lead />} />
            </Route>

            <Route path={ROUTES.VIEW_CUSTOMER_ID} element={<ProtectedRoute />}>
              <Route index element={<Viewcustomer />} />
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
            {/* sales - enquiries */}

            <Route path={ROUTES.CREATE_ENQUIRY} element={<ProtectedRoute />}>
              <Route index element={<Enquiry />} />
            </Route>
            <Route path={ROUTES.ENQUIRY_LIST} element={<ProtectedRoute />}>
              <Route index element={<EnquiryList />} />
            </Route>
            <Route path={ROUTES.EDIT_ENQUIRY_ID} element={<ProtectedRoute />}>
              <Route index element={<EditEnquiry />} />
            </Route>
            <Route path={ROUTES.VIEW_ENQUIRY_ID} element={<ProtectedRoute />}>
              <Route index element={<ViewEnquiry />} />
            </Route>
            <Route path={ROUTES.ENQUIRY_SOURCE} element={<ProtectedRoute />}>
              <Route index element={<EnquirySource />} />
            </Route>

            {/* / FMS => MASTER => TAX GROUP */}
            <Route path={ROUTES.TAX_GROUP} element={<ProtectedRoute />}>
              <Route index element={<TaxGroup />} />
            </Route>

            {/* {ACCOUNTS => MASTER => LEDGER } */}
            <Route path={ROUTES.LEDGER} element={<ProtectedRoute />}>
              <Route index element={<Ledger />} />
            </Route>

            {/* {ACCOUNT => MASTER => ACCOUNT GROUP} */}
            <Route path={ROUTES.ACC_GROUP} element={<ProtectedRoute />}>
              <Route index element={<AccGroup />} />
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
            <Route path={ROUTES.AWBBL_REPORT} element={<ProtectedRoute />}>
              <Route index element={<AwbblReport />} />
            </Route>

            <Route path={ROUTES.LEAD_CUSTOMER_ID} element={<ProtectedRoute />}>
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

            <Route path={ROUTES.SERVICE_EDIT_ID} element={<ProtectedRoute />}>
              <Route index element={<ServiceEdit />} />
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
            <Route
              path={ROUTES.VIEW_OPPORTUNITY_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<ViewOpportunity />} />
            </Route>
            <Route path={ROUTES.ADD_OPPORTUNITY} element={<ProtectedRoute />}>
              <Route index element={<AddOpportunity />} />
            </Route>
            <Route
              path={ROUTES.EDIT_OPPORTUNITY_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<EditOpportunity />} />
            </Route>

            {/* {FMS} */}
            <Route path={ROUTES.TRACK_ASSIGNMENTS} element={<ProtectedRoute />}>
              <Route index element={<Track_assignments />} />
            </Route>

            <Route path={ROUTES.LISTAGENT} element={<ProtectedRoute />}>
              <Route index element={<ListAgent />} />
            </Route>

            <Route path={ROUTES.PURCHASEORDER} element={<ProtectedRoute />}>
              <Route index element={<Purchaseorder />} />
            </Route>
            <Route
              path={ROUTES.PUCHASE_ORDER_LIST}
              element={<ProtectedRoute />}
            >
              <Route index element={<ListpurchaseOrder />} />
            </Route>
            <Route
              path={ROUTES.EDIT_PUCHASE_ORDER_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<EditPurchaseorder />} />
            </Route>
            <Route
              path={ROUTES.VIEW_PURCHASE_ORDER_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<ViewpurchaseOrder />} />
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

            <Route path={ROUTES.ADDVENDOR} element={<ProtectedRoute />}>
              <Route index element={<Addvendor />} />
            </Route>
            <Route path={ROUTES.UPDATE_VENDOR_ID} element={<ProtectedRoute />}>
              <Route index element={<Updatevendor />} />
            </Route>
            <Route path={ROUTES.VIEW_VENDOR_ID} element={<ProtectedRoute />}>
              <Route index element={<Viewvendor />} />
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
            <Route path={ROUTES.ADD_QUOTATION_ID} element={<ProtectedRoute />}>
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
            <Route path={ROUTES.INCOTERM} element={<ProtectedRoute />}>
              <Route index element={<Incoterm />} />
            </Route>

            <Route path={ROUTES.CONTAINER_TYPES} element={<ProtectedRoute />}>
              <Route index element={<Containertypes />} />
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
            <Route path={ROUTES.CREATE_PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<CreatePurchase />} />
            </Route>

            <Route path={ROUTES.ADD_PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Add_purchase />} />
            </Route>
            <Route path={ROUTES.VIEW_PURCHASE_ID} element={<ProtectedRoute />}>
              <Route index element={<View_purchase />} />
            </Route>
            <Route path={ROUTES.EDIT_PURCHASE_ID} element={<ProtectedRoute />}>
              <Route index element={<Edit_purchase />} />
            </Route>
            <Route path={ROUTES.PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Purchase />} />
            </Route>
            <Route path={ROUTES.PRINT_PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Print_purchase />} />
            </Route>

            <Route path={ROUTES.INVOICE_VIEW_ID} element={<ProtectedRoute />}>
              <Route index element={<InvoiceView />} />
            </Route>

            <Route path={ROUTES.CREDIT_NOTES} element={<ProtectedRoute />}>
              <Route index element={<Credit_notes />} />
            </Route>
            <Route path={ROUTES.ADD_CREDIT_NOTES} element={<ProtectedRoute />}>
              <Route index element={<Addcredit_notes />} />
            </Route>

            <Route
              path={ROUTES.EDIT_CREDIT_NOTES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Editcredit_notes />} />
            </Route>
            <Route
              path={ROUTES.VIEW_CREDIT_NOTES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<CreditnotesView />} />
            </Route>

            <Route path={ROUTES.DEBIT_NOTES} element={<ProtectedRoute />}>
              <Route index element={<Debit_notes />} />
            </Route>
            <Route path={ROUTES.ADD_DEBIT_NOTES} element={<ProtectedRoute />}>
              <Route index element={<Adddebit_notes />} />
            </Route>

            <Route
              path={ROUTES.EDIT_DEBIT_NOTES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Editdebit_notes />} />
            </Route>
            <Route
              path={ROUTES.VIEW_DEBIT_NOTES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<DebitnotesView />} />
            </Route>

            {/* General settings */}

            <Route path={ROUTES.CURRENCY} element={<ProtectedRoute />}>
              <Route index element={<Currency />} />
            </Route>

            <Route path={ROUTES.COMPANYINFO} element={<ProtectedRoute />}>
              <Route index element={<Companyinfo />} />
            </Route>

            <Route path={ROUTES.FMSSETTINGS} element={<ProtectedRoute />}>
              <Route index element={<Fmssettings />} />
            </Route>

            <Route
              path={ROUTES.SELECT_INVOICETEMPLATE}
              element={<ProtectedRoute />}
            >
              <Route index element={<Invoicetemplateselect />} />
            </Route>

            <Route path={ROUTES.AGENT_REPORT} element={<ProtectedRoute />}>
              <Route index element={<AgentReport />} />
            </Route>

            <Route
              path={ROUTES.COST_AND_EXPENSE_REPORT}
              element={<ProtectedRoute />}
            >
              <Route index element={<CostAndExpenseReport />} />
            </Route>

            <Route path={ROUTES.ENQUIRY_REPORT} element={<ProtectedRoute />}>
              <Route index element={<EnquiryReport />} />
            </Route>

            <Route
              path={ROUTES.TASKANDEXPENSES_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<Taskexpenses />} />
            </Route>

            <Route path={ROUTES.INVOICE_REPORT} element={<ProtectedRoute />}>
              <Route index element={<Invoicereport />} />
            </Route>

            {/* ######## ACCOUNTS ######## */}
            <Route path={ROUTES.DAILY_EXPENSE} element={<ProtectedRoute />}>
              <Route index element={<DailyExpence />} />
            </Route>
            <Route path={ROUTES.CREATE_EXPENSE} element={<ProtectedRoute />}>
              <Route index element={<CreateExpence />} />
            </Route>
            <Route path={ROUTES.EDIT_EXPENSE_ID} element={<ProtectedRoute />}>
              <Route index element={<EditExpence />} />
            </Route>
            <Route path={ROUTES.EXPENSE_CATEGORY} element={<ProtectedRoute />}>
              <Route index element={<ExpenseCategory />} />
            </Route>

            <Route path={ROUTES.PAYMEMENT_MODE} element={<ProtectedRoute />}>
              <Route index element={<Payment_mode />} />
            </Route>
            <Route path={ROUTES.GL_TYPE} element={<ProtectedRoute />}>
              <Route index element={<Gltypes />} />
            </Route>

            <Route path={ROUTES.ADD_PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Add_purchase />} />
            </Route>
            <Route path={ROUTES.PURCHASE} element={<ProtectedRoute />}>
              <Route index element={<Purchase />} />
            </Route>
            <Route path={ROUTES.PAYMENTS} element={<ProtectedRoute />}>
              <Route index element={<Payments />} />
            </Route>
            <Route path={ROUTES.ADD_PAYMENTS} element={<ProtectedRoute />}>
              <Route index element={<AddPayments />} />
            </Route>
            <Route path={ROUTES.EDIT_PAYMENT} element={<ProtectedRoute />}>
              <Route index element={<EditPayments />} />
            </Route>
            <Route path={ROUTES.VIEW_PAYMENT} element={<ProtectedRoute />}>
              <Route index element={<ViewPayment />} />
            </Route>
            <Route path={ROUTES.JOB_PAYMENTS} element={<ProtectedRoute />}>
              <Route index element={<JobPayments />} />
            </Route>
            <Route path={ROUTES.ADD_JOBPAYMENT} element={<ProtectedRoute />}>
              <Route index element={<AddJobPayments />} />
            </Route>
            <Route path={ROUTES.EDIT_JOBPAYMENT} element={<ProtectedRoute />}>
              <Route index element={<EditJobPayment />} />
            </Route>
            <Route
              path={ROUTES.EDIT_JOBPAYMENT_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<EditJobPayment />} />
            </Route>
            <Route path={ROUTES.VIEW_JOBPAYMENT} element={<ProtectedRoute />}>
              <Route index element={<ViewJobPayment />} />
            </Route>
            <Route
              path={ROUTES.VIEW_JOBPAYMENT_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<ViewJobPayment />} />
            </Route>

            <Route path={ROUTES.MONTHLY_REPORT} element={<ProtectedRoute />}>
              <Route index element={<Monthly_report />} />
            </Route>
            <Route path={ROUTES.CREDIT_NOTE_TYPE} element={<ProtectedRoute />}>
              <Route index element={<CreditNoteType />} />
            </Route>
            <Route path={ROUTES.BANK_DETAILS} element={<ProtectedRoute />}>
              <Route index element={<Bank />} />
            </Route>
            <Route
              path={ROUTES.DAILY_EXPENSE_REPORT}
              element={<ProtectedRoute />}
            >
              <Route index element={<DailyExpenseReport />} />
            </Route>
            <Route
              path={ROUTES.CREATE_BILL_PAYMENT}
              element={<ProtectedRoute />}
            >
              <Route index element={<CreateBillPayment />} />
            </Route>
            <Route path={ROUTES.BILL_PAYMENT_LIST} element={<ProtectedRoute />}>
              <Route index element={<ListBillPayment />} />
            </Route>
            <Route
              path={ROUTES.EDIT_BILL_PAYMENT_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<EditBillPayment />} />
            </Route>
            <Route
              path={ROUTES.VIEW_BILL_PAYMENT_ID}
              element={<ProtectedRoute />}
            >
              <Route index element={<ViewBillPayment />} />
            </Route>

            {/* </Route> */}
          </Route>

          <Route
            path={ROUTES.PURCHASEORDER_INVOICE_ID}
            element={<ProtectedRoute />}
          >
            <Route index element={<Purchaseorderinvoice />} />
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

          <Route path={ROUTES.INVOICETEMPLATE} element={<Invoicetemp1 />} />
          <Route path={ROUTES.INVOICE_NEWTEMP} element={<Invoicetemplate2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
