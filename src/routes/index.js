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
  COUNTRYSELECT:"/CountrySelect",
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
  EMPLOYEEGRADE:"/employeegrade",

  // { FMS }
  TRACK_ASSIGNMENTS:"/track_assignments",
  ASSIGN_OPPORTUNITIES:"/assign_opportunity",
  ASSIGN_OPPORTUNITIES_ID:"/assign_opportunity/:id",
  UPDATE_OPPORTUNITY_ASSIGNMENT:"/update_oppo_assignment",
  CREATEAGENT: "/create_agent",
  LISTAGENT:"/list_agent",
  UPDATEAGENT: "/update_agent",
  UPDATEAGENT_ID:"/update_agent/:id",
  FRIGHTLIST:"/fright_list",
  CARRIER:"/carrier",
  MODE:"/mode",
  QUATATIONS:"/quatations_list",
  ADD_QUOTATION:"/add_quotation",
  EDIT_QUOTATION:"/edit_quotation",
  VIEW_QUOTATION:"/view_quotation",
  ENQUIRIES:"/enquiries",
  EDIT_ASSIGN_OPPORTUNITY:"/edit_assign_opportunity",
  EDIT_ASSIGN_OPPORTUNITY_ID:"/edit_assign_opportunity/:id",
  CONSIGNEE:"/consignee",
  TERMS_OF_PAYMENT:"/terms_of_payment",
  TAXTYPE:"/tax_type",
  JOBTASKS:"/job_tasks",
  AIRPORT:"/airport",
  SEAPORT:"/seaport",
  
  // general settings
  CURRENCY:"/currency",
  COMPANYINFO:"/company_info"
};

module.exports = { ROUTES };
