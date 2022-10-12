const ApiSettings = require("../api_settings.config.json");
const CRM_PREFIX = "crm";
const CRM_BASE_URL = `${process.env.REACT_APP_BASE_URL}/${CRM_PREFIX}/${ApiSettings.crm.version_name}`;

module.exports = { CRM_BASE_URL };
