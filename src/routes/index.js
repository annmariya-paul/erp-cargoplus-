const ROUTES = {
  LOGIN: "/",
  LAYOUT: "/layout",
  SIDEBAR: "/sidebar",
  DASHBOARD: "dashboard",
  CUSTOMER: "/customer",
  CUSTOMER_LIST: "/customer_list",
  CATEGORY: "/category",
  TEST_PAGE: "/test-page",
  OPPORTUNITY: "/opportunity",
  VIEW_OPPORTUNITY: "/view_opportunity",
  VIEW_OPPORTUNITY_ID: "/view_opportunity/:id",

  CATEGORY_LIST: "/categorylist",
  LEAD_REPORT: "/Customer_Report",
  CUSTOMER_EDIT: "/edit_customer_list",

  VIEW_CUSTOMER: "/view_customer",
  VIEW_CUSTOMER_ID: "/view_customer/:id",

  OPPORTUNITY_REPORT: "/opportunity-report",
  OPPORTUNITY_LEAD_ID: "/opportunity_lead/:id",
  OPPORTUNITY_LEAD: "/opportunity_lead",

  LEAD_CUSTOMER_ID: "/edit_customer_list/:id",
  COUNTRYSELECT: "/CountrySelect",
  BRANDS: "/brands",
  ATTRIBUTES: "/attributes",
  ADD_ATTRIBUTES: "/add_attribute",
  UNIT_LIST: "/unit-list",

  ADD_UNIT: "/add-unit",
  ADD_OPPORTUNITY: "/add-opportunity",
  ADD_OPPORTUNITY_ID: "/add-opportunity/:id",
  EDIT_OPPORTUNITY: "/edit-opportunity",
  EDIT_OPPORTUNITY_ID: "/edit-opportunity/:id",
  BRANDCREATE: "/createbrand",
  PRODUCT: "/product",
  PRODUCTCREATE: "/create_product",
  PRODUCTDETAIL: "/product_details",
  PRODUCTDETAIL_ID: "/product_details/:id",

  PRODUCTVARIENTS: "/product_varients",
  PRODUCTVARIENTS_ID: "/product_varients/:id",

  SERVICES: "/services",
  SERVICECREATE: "/create_service",
  SERVICE_EDIT: "/edit_service",
  SERVICE_EDIT_ID: "/edit_service/:id",
  VIEW_SERVICE:"/view_service",
  VIEW_SERVICE_ID:"/view_service/:id",

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
  QUATATIONS: "/quotations_list",
  ADD_QUOTATION: "/add_quotation",
  ADD_QUOTATION_ID: "/add_quotation/:id",
  EDIT_QUOTATION: "/edit_quotation",
  EDIT_QUOTATION_ID: "/edit_quotation/:id",
//  purchase

  PURCHASEORDER: "/purchase_order",
  PUCHASE_ORDER_LIST: "/purchase_order_list",
  EDIT_PUCHASE_ORDER: "/edit_purchase_order",
  EDIT_PUCHASE_ORDER_ID: "/edit_purchase_order/:id",
  VIEW_PURCHASE_ORDER: "/view_purchase_order",
  VIEW_PURCHASE_ORDER_ID:"/view_purchase_order/:id",

  PURCHASEBILL:"/purchase_bill",
  ADD_PURCHASEBILL:"/add_purchase_bill",

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
  INCOTERM: "/incoterm",
  ASSIGN_QUOTATION: "/assign_quotation",
  ASSIGN_QUOTATION_ID: "/assign_quotation/:id",
  LIST_JOB: "/joblist",
  CREATEJOB: "/createjob",
  CREATEJOB_ID: "/createjob/:id",
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
  MONTHLY_REPORT: "/monthly_report",
  INVOICE_REPORT: "/invoice_report",
  ENQUIRY_REPORT: "/enquiry_report",
  // masters fms
  CONTAINER_TYPES: "/container_type",

  // Accounts
  PAYMEMENT_MODE: "/payment_mode",
  ADD_PURCHASE: "/add_purchase",
  PURCHASE: "/purchase",
  CREATE_PURCHASE: "/purchaseAdd",

  //  Accounts
  DAILY_EXPENSE: "/daily_expense",
  CREATE_EXPENSE: "/create_expense",
  EXPENSE_CATEGORY: "/expense_category",
  EDIT_EXPENSE: "/edit_expense",
  EDIT_EXPENSE_ID: "/edit_expense/:id",

  CREDIT_NOTES: "/credit_notes",
  ADD_CREDIT_NOTES: "/add_credit_notes",
  EDIT_CREDIT_NOTES: "/edit_credit_notes",
  EDIT_CREDIT_NOTES_ID: "/edit_credit_notes/:id",
  VIEW_CREDIT_NOTES: "/view_credit_notes",
  VIEW_CREDIT_NOTES_ID: "/view_credit_notes/:id",

  DEBIT_NOTES: "/debit_notes",
  ADD_DEBIT_NOTES: "/add_debit_notes",
  EDIT_DEBIT_NOTES: "/edit_debit_notes",
  EDIT_DEBIT_NOTES_ID: "/edit_debit_notes/:id",
  VIEW_DEBIT_NOTES: "/view_debit_notes",
  VIEW_DEBIT_NOTES_ID: "/view_debit_notes/:id",

  /*payments routes */
  PAYMENTS: "/payments",
  ADD_PAYMENTS: "/add_payments",
  VIEW_PURCHASE: "/view_purchase",
  VIEW_PURCHASE_ID: "/view_purchase/:id",
  EDIT_PURCHASE: "/edit_purchase",
  EDIT_PURCHASE_ID: "/edit_purchase/:id",
  PRINT_PURCHASE: "/print_purchase",

  VIEW_PAYMENTS_INDEX: "/view_payments",
  VIEW_PAYMENT: "/view_payments/:payment_id",
  EDIT_PAYMENTS_INDEX: "/edit_payments",
  EDIT_PAYMENT: "/edit_payments/:payment_id",
  /*payments routes end*/

  JOB_PAYMENTS: "/job_payments",
  ADD_JOBPAYMENT: "/add_job_payment",
  EDIT_JOBPAYMENT: "/edit_job_payment",
  EDIT_JOBPAYMENT_ID: "/edit_job_payment/:id",
  VIEW_JOBPAYMENT: "/view_job_payment",
  VIEW_JOBPAYMENT_ID: "/view_job_payment/:id",

  //  Accounts -> Settings
  CREDIT_NOTE_TYPE: "/credit_note_type",
  BANK_DETAILS: "/list_bankdetails",

  // Accounts -> Reports
  DAILY_EXPENSE_REPORT: "/daily_expense_report",

  // general settings
  CURRENCY: "/currency",
  COMPANYINFO: "/company_info",
  TASKANDEXPENSES: "/task_expenses",
  TASKANDEXPENSES_ID: "/task_expenses/:id",
  QUATATION_INVOICE: "/quotation_invoice",
  QUATATION_INVOICE_ID: "/quotation_invoice/:id",
  PURCHASEORDER_INVOICE: "/purchase_order_invoice",
  PURCHASEORDER_INVOICE_ID: "/purchase_order_invoice/:id",
  JOB_INVOICE: "/job_invoice",
  JOB_INVOICE_ID: "/job_invoice/:id",
  VENDOR_TYPE: "/vendor_type",
  VENDOR: "/vendor",
  ADDVENDOR: "/add_vendor",
  UPDATE_VENDOR: "/update_vendor",
  UPDATE_VENDOR_ID: "/update_vendor/:id",
  VIEW_VENDOR: "/view_vendor",
  VIEW_VENDOR_ID: "/view_vendor/:id",
  FMSSETTINGS: "/fmssettings",

  // CRM -> sales => Enquiry
  CREATE_ENQUIRY: "/create_enquiry",
  ENQUIRY_LIST: "/enquiry_list",
  EDIT_ENQUIRY: "/edit_enquiry",
  EDIT_ENQUIRY_ID: "/edit_enquiry/:id",
  VIEW_ENQUIRY: "/view_enquiry",
  VIEW_ENQUIRY_ID: "/view_enquiry/:id",
  ENQUIRY_SOURCE: "/enquiry_source",

  // Accounts => Bill Payments
  CREATE_BILL_PAYMENT: "/create_bill_payment",
  EDIT_BILL_PAYMENT: "/edit_bill_payment",
  EDIT_BILL_PAYMENT_ID: "/edit_bill_payment/:id",
  BILL_PAYMENT_LIST: "/bill_payment_list",
  VIEW_BILL_PAYMENT: "/bill_payment_view",
  VIEW_BILL_PAYMENT_ID: "/bill_payment_view/:id",

  //FMS => master => Tax Group
  TAX_GROUP: "/tax_groups",
  AWBBL_REPORT: "/awb_bl_report",

  // ACCOUNTS => master => Legder
  LEDGER: "/ledger",
  GL_TYPE: "/gl_type",
  ACCOUNTS_SETTINGS: "/accounts_settings",

  // ACCOUNTS => Master => Account Group
  ACC_GROUP: "/account_groups",

  // testingg invoice

  INVOICETEMPLATE: "/invoicetemplate1",
  INVOICE_NEWTEMP: "/invoicetemplate2",

  // selectinginvoicetemplates

  SELECT_INVOICETEMPLATE: "/selectinvoicetemplate",
};

module.exports = { ROUTES };
