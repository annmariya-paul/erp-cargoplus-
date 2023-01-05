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
  UPDATE_OPPORTUNITY_ASSIGNMENT:"/update_oppo_assignment",
  CREATEAGENT: "/create_agent",
  FRIGHTLIST:"/fright_list",
};

module.exports = { ROUTES };
