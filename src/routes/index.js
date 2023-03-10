const ROUTES = {
  LOGIN: "/",
  LAYOUT: "/layout",
  SIDEBAR: "/sidebar",
  DASHBOARD: "/dashboard",
  LEAD: "/lead",
  LEADLIST: "/lead_list",
  CATEGORY: "/category",
  TEST_PAGE: "/test-page",
  OPPORTUNITY: "/opportunity",

  CATEGORY_LIST: "/categorylist",
  LEAD_REPORT: "/leadReport",
  LEAD_EDIT: "/edit_lead_list",

  OPPORTUNITY_REPORT: "/opportunity-report",
  OPPORTUNITY_LEAD_ID: "/opportunity_lead/:id",
  OPPORTUNITY_LEAD: "/opportunity_lead",

  LEAD_EDIT_ID: "/edit_lead_list/:id",
  COUNTRYSELECT: "/CountrySelect",
  BRANDS: "/brands",
  ATTRIBUTES: "/attributes",
  ADD_ATTRIBUTES: "/add_attribute",
  UNIT_LIST: "/unit-list",

  ADD_UNIT: "/add-unit",

  BRANDCREATE: "/createbrand",
  PRODUCT: "/product",
  PRODUCTCREATE: "/create_product",
  PRODUCTDETAIL: "/product_details",
  PRODUCTDETAIL_ID: "/product_details/:id",

  PRODUCTVARIENTS: "/product_varients",
  PRODUCTVARIENTS_ID: "/product_varients/:id",

  SERVICES: "/services",
  SERVICECREATE: "/create_service",

  BRANCHES: "/branches",

  // TRACK_ASSIGNMENTS: "/track_assignments",
  // ASSIGN_OPPORTUNITIES: "/assign_opportunity",
  DEPARTMENTS: "/departments",
  DESIGNATION: "/designation",
  EMPLOYMENT_TYPE: "/employment_type",
  PERMISSIONS: "/permissions",
  ROLES_SCREEN: "/roles_and_screens",
  EMPLOYEES: "/employees",
  CREATEEMPLOYEE: "/createemployee",
  EMPLOYEEGRADE: "/employeegrade",

  // { FMS }
  TRACK_ASSIGNMENTS: "/track_assignments",
  ASSIGN_OPPORTUNITIES: "/assign_opportunity",
  ASSIGN_OPPORTUNITIES_ID: "/assign_opportunity/:id",
  UPDATE_OPPORTUNITY_ASSIGNMENT: "/update_oppo_assignment",
  CREATEAGENT: "/create_agent",
  LISTAGENT: "/list_agent",
  UPDATEAGENT: "/update_agent",
  UPDATEAGENT_ID: "/update_agent/:id",
  FRIGHTLIST: "/fright_list",
  CARRIER: "/carrier",
  MODE: "/mode",
  QUATATIONS: "/quatations_list",
  ADD_QUOTATION: "/add_quotation",
  EDIT_QUOTATION: "/edit_quotation",
  EDIT_QUOTATION_ID: "/edit_quotation/:id",

  VIEW_QUOTATION: "/view_quotation",
  ENQUIRIES: "/enquiries",
  AGENT_RESPONSE: "/agent_response",
  AGENT_RESPONSE_ID: "/agent_response/:id",
  EDIT_ASSIGN_OPPORTUNITY: "/edit_assign_opportunity",
  EDIT_ASSIGN_OPPORTUNITY_ID: "/edit_assign_opportunity/:id",
  CONSIGNEE: "/consignee",
  TERMS_OF_PAYMENT: "/terms_of_payment",
  TAXTYPE: "/tax_type",
  JOBTASKS: "/job_tasks",
  AIRPORT: "/airport",
  SEAPORT: "/seaport",
  LOCATIONS: "/locations",
  ASSIGN_QUOTATION: "/assign_quotation",
  ASSIGN_QUOTATION_ID: "/assign_quotation/:id",
  LIST_JOB: "/joblist",
  CREATEJOB: "/createjob",
  UPDATEJOB: "/updatejob",
  UPDATEJOB_ID: "/updatejob/:id",
  VIEW_JOB: "/view_job",
  VIEW_JOB_ID: "/view_job/:id",
  VIEW_QUOTATION_ID: "/view_quotation/:id",
  INVOICE_LIST: "/invoice_list",
  INVOICE_PREVIEW: "/invoice_preview",
  INVOICE_PREVIEW_ID: "/invoice_preview/:id",
  INVOICE_VIEW: "/invoice_view",
  INVOICE_VIEW_ID: "/invoice_view/:id",
  INVOICE_PRINT: "/invoice_print",
  PRINT_INVOICE: "/print_invoice",
  PRINT_INVOICE_ID: "/print_invoice/:id",
  AGENT_REPORT: "/agentReport",
  COST_AND_EXPENSE_REPORT: "/cost_and_expense_report",

  // Accounts
  PAYMEMENT_MODE: "/payment_mode",
  ADD_PURCHASE: "/add_purchase",
  PURCHASE: "/purchase",

  //  Accounts
  DAILY_EXPENSE: "/daily_expense",
  CREATE_EXPENSE: "/create_expense",
  EXPENSE_CATEGORY: "/expense_category",
  ADD_PAYMENTS: "/add_payments",
  JOB_PAYMENTS: "/job_payments",
  ADD_JOBPAYMENT: "/add_job_payment",
  EDIT_JOBPAYMENT: "/edit_job_payment",
  VIEW_JOBPAYMENT: "/view_job_payment",
  EDIT_EXPENSE: "/edit_expense",
  EDIT_EXPENSE_ID: "/edit_expense/:id",
  BANK_DETAILS: "/list_bankdetails",
  ENQUIRY_REPORT: "/enquiry_report",

  // general settings
  CURRENCY: "/currency",
  COMPANYINFO: "/company_info",
  TASKANDEXPENSES: "/task_expenses",
  TASKANDEXPENSES_ID: "/task_expenses/:id",
  QUATATION_INVOICE: "/quatation_invoice",
  QUATATION_INVOICE_ID: "/quatation_invoice/:id",
  JOB_INVOICE: "/job_invoice",
  JOB_INVOICE_ID: "/job_invoice/:id",
  VENDOR_TYPE: "/vendor_type",
  VENDOR: "/vendor",
};

module.exports = { ROUTES };
