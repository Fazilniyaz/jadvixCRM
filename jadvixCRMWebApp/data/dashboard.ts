// Mock data for the Jadvix CRM sales dashboard.

// Four full-bleed gradient sales cards. Each gradient is a single Jadvix hue
// running deep -> light, so the row reads as one family.
export const kpis = [
  {
    label: "TODAY ORDERS",
    value: "$5,74.12",
    delta: "+427",
    up: true,
    note: "Compared to last week",
    gradient: "bg-brand-blue-gradient",
    spark: [8, 12, 9, 15, 11, 18, 14, 20],
  },
  {
    label: "TODAY EARNINGS",
    value: "$1,230.17",
    delta: "-23.09%",
    up: false,
    note: "Compared to last week",
    gradient: "bg-brand-orange-gradient",
    spark: [18, 14, 16, 10, 13, 9, 12, 8],
  },
  {
    label: "TOTAL EARNINGS",
    value: "$7,125.70",
    delta: "+52.09%",
    up: true,
    note: "Compared to last week",
    gradient: "bg-brand-deep-gradient",
    spark: [6, 9, 8, 12, 10, 14, 16, 21],
  },
  {
    label: "PRODUCT SOLD",
    value: "$4,820.50",
    delta: "-152.3",
    up: false,
    note: "Compared to last week",
    gradient: "bg-brand-red-gradient",
    spark: [16, 13, 15, 11, 14, 10, 12, 9],
  },
] as const;

// Order status: grouped bar chart plus the three totals.
// Success / Pending / Failed map to the Jadvix blue / orange / red.
export const orderStatus = {
  totals: [
    { label: "Success", value: 120750, color: "#4599d3" },
    { label: "Pending", value: 56108, color: "#f05623" },
    { label: "Failed", value: 32895, color: "#e01e26" },
  ],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  series: [
    { name: "Success", color: "#4599d3", data: [44, 55, 41, 67, 22, 43, 61, 38] },
    { name: "Pending", color: "#f05623", data: [13, 23, 20, 8, 13, 27, 18, 22] },
    { name: "Failed", color: "#e01e26", data: [11, 17, 15, 15, 21, 14, 12, 18] },
  ],
};

export const salesRevenue = {
  // monthly revenue used by the area chart
  series: [31, 40, 28, 51, 42, 65, 58, 72, 60, 81, 74, 90],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  states: [
    { name: "California", value: "$1,935", pct: 92 },
    { name: "Texas", value: "$1,624", pct: 78 },
    { name: "New York", value: "$1,472", pct: 71 },
    { name: "Florida", value: "$1,238", pct: 60 },
    { name: "Illinois", value: "$986", pct: 47 },
  ],
};

export const recentCustomers = [
  { name: "Samantha Melon", id: "#1234", status: "Paid", initials: "SM", tone: "blue" },
  { name: "Jimmy Changa", id: "#1234", status: "Pending", initials: "JC", tone: "orange" },
  { name: "Gabe Lackmen", id: "#1234", status: "Pending", initials: "GL", tone: "sky" },
  { name: "Manuel Labor", id: "#1234", status: "Paid", initials: "ML", tone: "slate" },
  { name: "Sharon Needles", id: "#1234", status: "Paid", initials: "SN", tone: "blue" },
  { name: "Anne Teak", id: "#1234", status: "Pending", initials: "AT", tone: "orange" },
];

export const salesActivity = [
  { title: "Total Products", when: "3 days ago", detail: "1.3k New Products", value: "1,349", color: "blue", icon: "Boxes" },
  { title: "Total Sales", when: "35 mins ago", detail: "1k New Sales", value: "1,022", color: "orange", icon: "ShoppingCart" },
  { title: "Total Revenue", when: "50 mins ago", detail: "23.5K New Revenue", value: "23.5K", color: "sky", icon: "Wallet" },
  { title: "Total Profit", when: "1 hour ago", detail: "3k New profit", value: "3,004", color: "slate", icon: "PiggyBank" },
  { title: "Customer Visits", when: "1 day ago", detail: "15% increased", value: "+15%", color: "orange", icon: "Users" },
  { title: "Customer Reviews", when: "1 day ago", detail: "1.5k reviews", value: "1,543", color: "sky", icon: "Star" },
];

export const recentOrders = {
  deliveredPct: 83,
  cancelled: 3467,
  delivered: 5238,
  totalSales: "$7,590",
  activeUsers: "$5,460",
};

export const topCountries = [
  { name: "United States", value: "$1,671.10", code: "us", pct: 86 },
  { name: "India", value: "$1,930.12", code: "in", pct: 98 },
  { name: "Netherlands", value: "$1,064.75", code: "nl", pct: 54 },
  { name: "United Kingdom", value: "$1,055.98", code: "gb", pct: 53 },
  { name: "Canada", value: "$1,045.49", code: "ca", pct: 52 },
  { name: "Australia", value: "$1,042.00", code: "au", pct: 51 },
];

export const recentEarnings = [
  { date: "05 Dec 2019", count: 34, earnings: "$658.20", tax: "-$45.10" },
  { date: "06 Dec 2019", count: 26, earnings: "$453.25", tax: "-$15.02" },
  { date: "07 Dec 2019", count: 34, earnings: "$653.12", tax: "-$13.45" },
  { date: "08 Dec 2019", count: 45, earnings: "$546.47", tax: "-$24.22" },
  { date: "09 Dec 2019", count: 31, earnings: "$425.72", tax: "-$25.01" },
  { date: "10 Dec 2019", count: 40, earnings: "$564.34", tax: "-$34.05" },
];
