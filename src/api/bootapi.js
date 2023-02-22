const ApiSettings = require("../version_settings.config.json");
const CRM_PREFIX = "crm/sales";
const CRM_SELLING_PREFIX = "crm/selling";
const CRM_HRMS_PREFIX = "/hrms";
const CRM_FMS_PREFIX = "/freightManagement";
const GENERAL_SETTING_PRIFIX = "/generalsettings";
const CRM_PURCHASE_PREFIX ="crm/purchases"

const CRM_BASE_URL = `${process.env.REACT_APP_BASE_URL}/${CRM_PREFIX}/${ApiSettings.crm.version_name}`;
const CRM_BASE_URL_SELLING = `${process.env.REACT_APP_BASE_URL}/${CRM_SELLING_PREFIX}/${ApiSettings.crm.version_name}`;
const CRM_BASE_URL_HRMS = `${process.env.REACT_APP_BASE_URL}${CRM_HRMS_PREFIX}/${ApiSettings.crm.version_name}`;
const CRM_BASE_URL_FMS = `${process.env.REACT_APP_BASE_URL}${CRM_FMS_PREFIX}/${ApiSettings.crm.version_name}`;
const GENERAL_SETTING_BASE_URL = `${process.env.REACT_APP_BASE_URL}${GENERAL_SETTING_PRIFIX}/${ApiSettings.general_settings.version_name}`
const CRM_BASE_URL_PURCHASING = `${process.env.REACT_APP_BASE_URL}/${CRM_PURCHASE_PREFIX}/${ApiSettings.crm.version_name}`

module.exports = { CRM_BASE_URL,CRM_BASE_URL_SELLING,CRM_BASE_URL_HRMS,CRM_BASE_URL_FMS,GENERAL_SETTING_BASE_URL,CRM_BASE_URL_PURCHASING};
