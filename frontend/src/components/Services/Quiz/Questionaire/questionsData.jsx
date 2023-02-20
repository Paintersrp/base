const questionsData = [
  {
    question: "Placeholder Text",
    options: [
      { label: "Less than 10 hours", value: 10 },
      { label: "10-20 hours", value: 20 },
      { label: "More than 20 hours", value: Infinity },
    ],
    state: weeklyServiceHours,
    handle: handleServiceHoursChange,
    name: "Needs",
  },
  {
    question: "What is your budget per month?",
    options: [
      { label: "Less than $30", value: 30 },
      { label: "Between $30 and $100", value: 100 },
      { label: "Over $100", value: Infinity },
    ],
    state: hourlyBudget,
    handle: handleHourlyBudgetChange,
    name: "Budget",
  },
  {
    question: "Placeholder Text",
    options: [
      { label: "Less than 10 hours", value: 10 },
      { label: "10-20 hours", value: 20 },
      { label: "More than 20 hours", value: Infinity },
    ],
    state: weeklyServiceHours,
    handle: handleServiceHoursChange,
    name: "Urgency",
  },
];

export default questionsData;
