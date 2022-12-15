const ApiSettings = require("../version_settings.config.json");
const CRM_PREFIX = "crm/sales";
const CRM_SELLING_PREFIX = "crm/selling";
const CRM_HRMS_PREFIX = "/hrms";

const CRM_BASE_URL = `${process.env.REACT_APP_BASE_URL}/${CRM_PREFIX}/${ApiSettings.crm.version_name}`;
const CRM_BASE_URL_SELLING = `${process.env.REACT_APP_BASE_URL}/${CRM_SELLING_PREFIX}/${ApiSettings.crm.version_name}`;
const CRM_BASE_URL_HRMS = `${process.env.REACT_APP_BASE_URL}${CRM_HRMS_PREFIX}/${ApiSettings.crm.version_name}`;

module.exports = { CRM_BASE_URL,CRM_BASE_URL_SELLING,CRM_BASE_URL_HRMS};
