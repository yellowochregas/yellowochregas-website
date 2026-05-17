import { brand } from "./brand";

const contactSteps = [
  {
    key: "postcode",
    type: "text",
    title: "What is the postcode?",
    help: "This helps us confirm Braintree or nearby Essex coverage.",
    label: "Postcode",
    placeholder: "For example CM7 3DP",
    required: true,
    autoComplete: "postal-code"
  },
  {
    key: "urgency",
    type: "choice",
    title: "When do you need help?",
    help: "Choose the closest option. You can still call now at any point.",
    choices: ["Emergency", "Today", "Tomorrow", "This week", "Flexible"]
  },
  {
    key: "mediaNote",
    type: "textarea",
    title: "Add a photo or video if you can",
    help: "Optional. In this MVP, add a note about what the photo would show.",
    label: "Photo/video note",
    placeholder: "For example: water under the sink, boiler error code, blocked outside drain"
  },
  {
    key: "contact",
    type: "contact",
    title: "Who should we contact?",
    help: "No account is needed before requesting help."
  },
  {
    key: "review",
    type: "review",
    title: "Check the request",
    help: "Send this request or call now if you would rather speak to someone."
  }
];

const flows = {
  "water-leak": [
    { key: "leakingNow", type: "choice", title: "Is water leaking right now?", help: "If water is spreading quickly, choose yes.", choices: ["Yes", "No", "Not sure"] },
    { key: "nearElectrics", type: "choice", title: "Is it near electrics?", help: "Keep away from wet electrics. Call now if you are worried.", choices: ["Yes", "No", "Not sure"] },
    { key: "waterSupply", type: "choice", title: "Can you turn off the water supply?", help: "Only answer what you know. Do not take risks.", choices: ["Yes", "No", "Not sure"] },
    { key: "emergencyHelp", type: "choice", title: "Do you need emergency help?", help: "Emergency requests are shown first.", choices: ["Yes, urgent", "Maybe", "No"] }
  ],
  "boiler-problem": [
    { key: "gasSmell", type: "choice", title: "Do you smell gas or suspect carbon monoxide?", help: `If yes or not sure, leave the property and call ${brand.gasEmergencyDisplay}.`, choices: ["Yes", "No", "Not sure"], safety: true },
    { key: "boilerImpact", type: "choice", title: "What is affected?", help: "Choose the closest option.", choices: ["No heating", "No hot water", "Both", "Error code", "Other"] },
    { key: "errorCode", type: "text", title: "Is there an error code?", help: "If you can see one, type it exactly. Skip if not.", label: "Error code", placeholder: "For example F22 or E119" },
    { key: "needTime", type: "choice", title: "When do you need help?", help: "A Gas Safe registered engineer is needed for gas and boiler work.", choices: ["Emergency", "Today", "This week", "Flexible"] }
  ],
  "no-heating": [
    { key: "hotWater", type: "choice", title: "Do you still have hot water?", help: "This helps the engineer understand the fault.", choices: ["Yes", "No", "Not sure"] },
    { key: "vulnerable", type: "choice", title: "Is anyone vulnerable or very cold?", help: "Tell us if children, elderly people, illness, or a business closure is involved.", choices: ["Yes", "No", "Not sure"] },
    { key: "gasSmell", type: "choice", title: "Do you smell gas or suspect carbon monoxide?", help: `If yes or not sure, leave the property and call ${brand.gasEmergencyDisplay}.`, choices: ["Yes", "No", "Not sure"], safety: true }
  ],
  "blocked-drain": [
    { key: "blockedWhere", type: "choice", title: "What is blocked?", help: "Choose the nearest match.", choices: ["Toilet", "Sink", "Bath or shower", "Outside drain", "Not sure"] },
    { key: "overflowing", type: "choice", title: "Is it overflowing now?", help: "Overflowing waste water may need urgent help.", choices: ["Yes", "No", "Not sure"] }
  ],
  "radiator-problem": [
    { key: "radiatorIssue", type: "choice", title: "What is happening with the radiator?", help: "No jargon needed.", choices: ["Cold at top", "Cold all over", "Leaking", "Noisy", "Not sure"] },
    { key: "howManyRadiators", type: "choice", title: "How many radiators are affected?", help: "A rough answer is fine.", choices: ["One", "A few", "All", "Not sure"] }
  ],
  "new-installation": [
    { key: "installType", type: "choice", title: "What would you like installed?", help: "Choose the closest option.", choices: ["Boiler", "Heating controls", "Radiators", "Bathroom plumbing", "Pipework", "Not sure"] },
    { key: "propertyType", type: "choice", title: "What type of property is it?", help: "This helps plan the visit.", choices: ["House", "Flat", "Shop or office", "Rental property", "Other"] }
  ],
  "annual-service": [
    { key: "serviceType", type: "choice", title: "What needs servicing?", help: "Gas boiler work must be handled by a Gas Safe registered engineer.", choices: ["Boiler", "Landlord gas safety check", "Heating system", "Not sure"] },
    { key: "lastService", type: "choice", title: "When was it last checked?", help: "A rough answer is fine.", choices: ["Within 12 months", "Over 12 months", "I do not know"] }
  ],
  "not-sure": [
    { key: "mainSymptom", type: "choice", title: "What do you notice first?", help: "Choose the closest match.", choices: ["Water problem", "Heating problem", "Boiler problem", "Drain problem", "I need advice"] },
    { key: "urgentWorry", type: "choice", title: "Are you worried this is urgent?", help: "If yes, we will mark it clearly.", choices: ["Yes", "Maybe", "No"] }
  ],
  emergency: [
    { key: "emergencyType", type: "choice", title: "What is the emergency?", help: "Choose the nearest fit. You can call now instead.", choices: ["Water leak", "No heating", "Boiler or gas concern", "Blocked drain", "Commercial emergency", "Not sure"] },
    { key: "immediateRisk", type: "choice", title: "Is anyone at immediate risk?", help: "If there is immediate danger, call emergency services or the gas emergency number.", choices: ["Yes", "No", "Not sure"] }
  ]
};

export function getAssistantFlow(issueId) {
  return [...(flows[issueId] || flows["not-sure"]), ...contactSteps];
}
