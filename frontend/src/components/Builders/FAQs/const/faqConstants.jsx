export const faqLayoutOptions = [
  { value: "option1", label: "Tabs" },
  { value: "option2", label: "Condensed List" },
  { value: "option3", label: "List" },
];

export const faqItemData = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Items must be in their original condition and packaging.",
    category: "Shipping",
    order: 1,
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging in to your account and clicking on 'Order History'. From there, you can see the status of your order and the tracking number.",
    category: "Shipping",
    order: 2,
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, American Express, and PayPal.",
    category: "Payment",
    order: 1,
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we offer gift wrapping for an additional fee of $5 per item.",
    category: "Gifts",
    order: 1,
  },
];

export const faqFieldNames = [
  { name: "name", label: "FAQ Set Name*", type: "text", md: 8 },
  {
    name: "description",
    label: "FAQ Description*",
    type: "text",
    md: 8,
    multiline: true,
  },
];

export const fieldNames = [
  { name: "category", label: "Question Set Category*", type: "text", md: 6 },
  { name: "order", label: "Question Set Order*", type: "text", md: 6 },
  {
    name: "question",
    label: "Question Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
  {
    name: "answer",
    label: "Answer Text*",
    type: "number",
    md: 6,
    multiline: true,
  },
];

export const initialFormData = {
  name: "",
  description: "",
  question: "",
  answer: "",
  category: "",
  order: "",
};
