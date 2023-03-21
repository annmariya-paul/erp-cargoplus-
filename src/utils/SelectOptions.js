const LeadStatus = [
  {
    id: "1",
    name: "Lead",
    value: "1",
  },
  {
    id: "2",
    name: "Opportunity",
    value: "2",
  },
  {
    id: "3",
    name: "Quotation",
    value: "3",
  },
  {
    id: "4",
    name: "Interested",
    value: "4",
  },
  {
    id: "5",
    name: "Converted",
    value: "5",
  },
  {
    id: "6",
    name: "Lost",
    value: "6",
  },
  {
    id: "7",
    name: "DND",
    value: "7",
  },
];
const LeadType = [
  { id: "1", name: "Lead", value: "L" },
  { id: "2", name: "Customer", value: "C" },
];
const LeadOrganization = [
  { id: "1", name: "Individual", value: "I" },
  { id: "2", name: "Organisation", value: "O" },
];

const Oppor_Status = [
  { id: "1", name: "Quotation", value: "1" },
  { id: "2", name: "Interested", value: "2" },
  { id: "3", name: "Converted", value: "3" },
  { id: "4", name: "Lost", value: "4" },
  { id: "5", name: "DND", value: "5" },
];
const Prob_conversion = [
  { id: "1", name: "Low", value: "1" },
  { id: "2", name: "Medium", value: "2" },
  { id: "3", name: "High", value: "3" },
];

const cargo_typeoptions = [
  {
    id: "1",
    name: "Frozen",
    value: "Frozen",
  },
  {
    id: "2",
    name: "Dangerous",
    value: "Dangerous",
  },
  {
    id: "3",
    name: "Refrigerated",
    value: "Refrigerator",
  },
];

const vendor_Organisation = [
  { id: "1", name: "Individual", value: "IND" },
  { id: "2", name: "Organisation", value: "ORG" },
  
];
const JobStatus = [
  { id: "1", name: "Pending", value: "1" },
  { id: "2", name: "Converted", value: "2" },
];
module.exports = {
  LeadType,
  LeadStatus,
  LeadOrganization,
  Oppor_Status,
  Prob_conversion,
  cargo_typeoptions,
  vendor_Organisation,
  JobStatus,
};
