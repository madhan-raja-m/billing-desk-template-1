// Mock data layer — replace with API calls later. No UI imports here.

export type Customer = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  gstin?: string;
  address: string;
  invoices: number;
  totalPurchase: number;
  lastPurchase: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  hsn: string;
  price: number;
  gst: number;
  stock: number;
  status: "Active" | "Inactive" | "Low stock";
};

export type Invoice = {
  id: string;
  number: string;
  customer: string;
  customerId: string;
  date: string;
  amount: number;
  payment: "Cash" | "UPI" | "Card" | "Bank Transfer" | "Credit";
  status: "Paid" | "Pending" | "Overdue" | "Cancelled";
  createdBy: string;
};

export type Enquiry = {
  id: string;
  customer: string;
  mobile: string;
  location: string;
  date: string;
  interest: string;
  status: "New" | "Contacted" | "Quoted" | "Converted" | "Lost";
};

export const business = {
  name: "Billing Desk",
  legalName: "Meridian Traders Pvt. Ltd.",
  gstin: "27AABCM1234K1Z9",
  address: "204, Anand Business Park, Andheri East, Mumbai 400069",
  phone: "+91 98204 41120",
  email: "accounts@meridiantraders.in",
  state: "Maharashtra",
};

export const currentUser = {
  name: "Rohan Mehta",
  role: "Billing Manager",
  email: "rohan@meridiantraders.in",
  initials: "RM",
};

export const customers: Customer[] = [
  { id: "C-1041", name: "Sunrise Electricals", mobile: "+91 98330 21145", email: "purchase@sunriseelec.in", gstin: "27AAECS1122H1Z4", address: "Shop 12, Lamington Road, Mumbai", invoices: 34, totalPurchase: 842500, lastPurchase: "2026-08-25" },
  { id: "C-1042", name: "Kiran Deshpande", mobile: "+91 90045 77812", email: "kiran.d@gmail.com", address: "Kothrud, Pune", invoices: 9, totalPurchase: 62340, lastPurchase: "2026-08-24" },
  { id: "C-1043", name: "Vertex Interiors", mobile: "+91 98191 30022", email: "accounts@vertexinteriors.com", gstin: "27AAFCV8890M1Z2", address: "Bandra West, Mumbai", invoices: 21, totalPurchase: 517800, lastPurchase: "2026-08-22" },
  { id: "C-1044", name: "Anita Sharma", mobile: "+91 99201 44567", email: "anita.sharma@outlook.com", address: "Vashi, Navi Mumbai", invoices: 4, totalPurchase: 18990, lastPurchase: "2026-08-19" },
  { id: "C-1045", name: "Nimbus Hospitality", mobile: "+91 91678 90234", email: "ops@nimbushotels.in", gstin: "27AACCN5566L1Z8", address: "Powai, Mumbai", invoices: 47, totalPurchase: 1284000, lastPurchase: "2026-08-26" },
  { id: "C-1046", name: "Farhan Qureshi", mobile: "+91 98670 11209", email: "farhan.q@gmail.com", address: "Dadar, Mumbai", invoices: 6, totalPurchase: 34500, lastPurchase: "2026-08-14" },
  { id: "C-1047", name: "Greenline Agro", mobile: "+91 94220 55531", email: "billing@greenlineagro.in", gstin: "27AAGCG3344P1Z6", address: "Nashik", invoices: 15, totalPurchase: 298400, lastPurchase: "2026-08-11" },
  { id: "C-1048", name: "Priya Nair", mobile: "+91 97690 20087", email: "priya.nair@yahoo.in", address: "Thane West", invoices: 12, totalPurchase: 91250, lastPurchase: "2026-08-26" },
  { id: "C-1049", name: "Orbit Systems", mobile: "+91 98925 66710", email: "po@orbitsystems.co.in", gstin: "27AAACO7788D1Z1", address: "SEEPZ, Andheri East", invoices: 28, totalPurchase: 736900, lastPurchase: "2026-08-20" },
  { id: "C-1050", name: "Deepak Joshi", mobile: "+91 93240 78145", email: "deepak.joshi@gmail.com", address: "Borivali, Mumbai", invoices: 3, totalPurchase: 12700, lastPurchase: "2026-07-30" },
  { id: "C-1051", name: "Astra Print House", mobile: "+91 98211 34400", email: "hello@astraprint.in", gstin: "27AAJCA9911R1Z3", address: "Lower Parel, Mumbai", invoices: 19, totalPurchase: 402150, lastPurchase: "2026-08-18" },
  { id: "C-1052", name: "Meera Kulkarni", mobile: "+91 90112 66098", email: "meera.k@gmail.com", address: "Aundh, Pune", invoices: 7, totalPurchase: 45600, lastPurchase: "2026-08-09" },
];

export const products: Product[] = [
  { id: "P-201", name: "Havells 1.2m Ceiling Fan — Enticer", sku: "HVL-FAN-1200", category: "Fans", hsn: "8414", price: 2450, gst: 18, stock: 42, status: "Active" },
  { id: "P-202", name: "Philips 9W LED Bulb (Pack of 4)", sku: "PHL-LED-9W4", category: "Lighting", hsn: "9405", price: 520, gst: 12, stock: 168, status: "Active" },
  { id: "P-203", name: "Finolex 1.5sqmm FR Wire 90m", sku: "FNX-WIR-15", category: "Wiring", hsn: "8544", price: 1899, gst: 18, stock: 7, status: "Low stock" },
  { id: "P-204", name: "Anchor Roma 6A Modular Switch", sku: "ANC-SW-6A", category: "Switches", hsn: "8536", price: 95, gst: 18, stock: 640, status: "Active" },
  { id: "P-205", name: "V-Guard Voltage Stabilizer 4kVA", sku: "VG-STB-4K", category: "Stabilizers", hsn: "8504", price: 3250, gst: 18, stock: 23, status: "Active" },
  { id: "P-206", name: "Crompton Immersion Rod 1500W", sku: "CRM-IMR-15", category: "Heating", hsn: "8516", price: 810, gst: 18, stock: 0, status: "Inactive" },
  { id: "P-207", name: "Bajaj Wall Fan 400mm", sku: "BJJ-WFN-400", category: "Fans", hsn: "8414", price: 1975, gst: 18, stock: 31, status: "Active" },
  { id: "P-208", name: "Legrand 32A MCB Double Pole", sku: "LGR-MCB-32", category: "Protection", hsn: "8536", price: 640, gst: 18, stock: 95, status: "Active" },
  { id: "P-209", name: "Syska LED Panel Light 18W", sku: "SYS-PNL-18", category: "Lighting", hsn: "9405", price: 430, gst: 12, stock: 210, status: "Active" },
  { id: "P-210", name: "Installation & Wiring Service (per point)", sku: "SRV-INST-PT", category: "Services", hsn: "9987", price: 250, gst: 18, stock: 999, status: "Active" },
  { id: "P-211", name: "Polycab PVC Conduit Pipe 25mm", sku: "PLY-CND-25", category: "Wiring", hsn: "3917", price: 165, gst: 18, stock: 480, status: "Active" },
  { id: "P-212", name: "Orient Table Fan 400mm", sku: "ORT-TFN-400", category: "Fans", hsn: "8414", price: 1640, gst: 18, stock: 9, status: "Low stock" },
];

export const invoices: Invoice[] = [
  { id: "1", number: "INV-2026-0412", customer: "Nimbus Hospitality", customerId: "C-1045", date: "2026-08-27", amount: 148620, payment: "Bank Transfer", status: "Paid", createdBy: "Rohan Mehta" },
  { id: "2", number: "INV-2026-0411", customer: "Priya Nair", customerId: "C-1048", date: "2026-08-26", amount: 8450, payment: "UPI", status: "Paid", createdBy: "Sneha Patil" },
  { id: "3", number: "INV-2026-0410", customer: "Sunrise Electricals", customerId: "C-1041", date: "2026-08-25", amount: 62340, payment: "Credit", status: "Pending", createdBy: "Rohan Mehta" },
  { id: "4", number: "INV-2026-0409", customer: "Kiran Deshpande", customerId: "C-1042", date: "2026-08-24", amount: 3125, payment: "Cash", status: "Paid", createdBy: "Amit Rane" },
  { id: "5", number: "INV-2026-0408", customer: "Vertex Interiors", customerId: "C-1043", date: "2026-08-22", amount: 41900, payment: "Card", status: "Paid", createdBy: "Sneha Patil" },
  { id: "6", number: "INV-2026-0407", customer: "Orbit Systems", customerId: "C-1049", date: "2026-08-20", amount: 96780, payment: "Bank Transfer", status: "Overdue", createdBy: "Rohan Mehta" },
  { id: "7", number: "INV-2026-0406", customer: "Anita Sharma", customerId: "C-1044", date: "2026-08-19", amount: 2360, payment: "UPI", status: "Paid", createdBy: "Amit Rane" },
  { id: "8", number: "INV-2026-0405", customer: "Astra Print House", customerId: "C-1051", date: "2026-08-18", amount: 27410, payment: "Credit", status: "Pending", createdBy: "Sneha Patil" },
  { id: "9", number: "INV-2026-0404", customer: "Farhan Qureshi", customerId: "C-1046", date: "2026-08-16", amount: 5890, payment: "Cash", status: "Cancelled", createdBy: "Amit Rane" },
  { id: "10", number: "INV-2026-0403", customer: "Greenline Agro", customerId: "C-1047", date: "2026-08-11", amount: 58230, payment: "Bank Transfer", status: "Paid", createdBy: "Rohan Mehta" },
  { id: "11", number: "INV-2026-0402", customer: "Meera Kulkarni", customerId: "C-1052", date: "2026-08-09", amount: 7420, payment: "UPI", status: "Paid", createdBy: "Sneha Patil" },
  { id: "12", number: "INV-2026-0401", customer: "Deepak Joshi", customerId: "C-1050", date: "2026-07-30", amount: 4180, payment: "Card", status: "Paid", createdBy: "Amit Rane" },
];

export const enquiries: Enquiry[] = [
  { id: "E-330", customer: "Ashok Bhatia", mobile: "+91 98700 11223", location: "Ghatkopar, Mumbai", date: "2026-08-27", interest: "Ceiling fans (bulk 20 units)", status: "New" },
  { id: "E-329", customer: "Sai Constructions", mobile: "+91 91345 88790", location: "Kalyan", date: "2026-08-26", interest: "Wiring + MCB panel", status: "Contacted" },
  { id: "E-328", customer: "Rekha Menon", mobile: "+91 99304 55621", location: "Chembur, Mumbai", date: "2026-08-26", interest: "Voltage stabilizer", status: "Quoted" },
  { id: "E-327", customer: "Blue Fig Cafe", mobile: "+91 98922 71134", location: "Bandra, Mumbai", date: "2026-08-25", interest: "LED panel lights", status: "Converted" },
  { id: "E-326", customer: "Manoj Tiwari", mobile: "+91 90290 33418", location: "Vasai", date: "2026-08-24", interest: "Table fans", status: "Lost" },
  { id: "E-325", customer: "Harbour View Realty", mobile: "+91 98195 60072", location: "Worli, Mumbai", date: "2026-08-23", interest: "Full site electricals", status: "Quoted" },
  { id: "E-324", customer: "Sneha Iyer", mobile: "+91 97025 41188", location: "Panvel", date: "2026-08-22", interest: "Modular switches", status: "Contacted" },
  { id: "E-323", customer: "Zenith Gym", mobile: "+91 93211 87450", location: "Malad, Mumbai", date: "2026-08-21", interest: "Industrial fans", status: "New" },
];

export const salesTrend = [
  { day: "01 Aug", sales: 84000, invoices: 18 },
  { day: "04 Aug", sales: 122000, invoices: 24 },
  { day: "07 Aug", sales: 96500, invoices: 21 },
  { day: "10 Aug", sales: 148000, invoices: 29 },
  { day: "13 Aug", sales: 131500, invoices: 26 },
  { day: "16 Aug", sales: 178000, invoices: 33 },
  { day: "19 Aug", sales: 154200, invoices: 30 },
  { day: "22 Aug", sales: 196400, invoices: 37 },
  { day: "25 Aug", sales: 172800, invoices: 34 },
  { day: "27 Aug", sales: 214600, invoices: 41 },
];

export const topProducts = [
  { name: "Ceiling Fan — Enticer", value: 386000 },
  { name: "FR Wire 90m", value: 291500 },
  { name: "Stabilizer 4kVA", value: 244300 },
  { name: "LED Panel 18W", value: 187900 },
  { name: "Modular Switch 6A", value: 142600 },
];

export const topCustomers = [
  { name: "Nimbus Hospitality", value: 1284000 },
  { name: "Sunrise Electricals", value: 842500 },
  { name: "Orbit Systems", value: 736900 },
  { name: "Vertex Interiors", value: 517800 },
  { name: "Astra Print House", value: 402150 },
];

export const paymentMix = [
  { name: "UPI", value: 38 },
  { name: "Bank Transfer", value: 27 },
  { name: "Cash", value: 18 },
  { name: "Card", value: 11 },
  { name: "Credit", value: 6 },
];

export const dashboardStats = {
  todaySales: 214600,
  todayDelta: 12.4,
  monthSales: 3487200,
  monthDelta: 8.1,
  invoiceCount: 412,
  invoiceDelta: 5.6,
  customerCount: 1284,
  customerDelta: 3.2,
  avgInvoice: 8464,
  avgDelta: -1.8,
  gstCollected: 528940,
  gstDelta: 7.4,
};

export const reportCatalog = [
  {
    group: "Sales",
    items: [
      { id: "daily-sales", name: "Daily Sales", desc: "Day-wise sales with invoice count and tax split" },
      { id: "monthly-sales", name: "Monthly Sales", desc: "Month-on-month revenue comparison" },
      { id: "invoice-register", name: "Invoice Register", desc: "Complete register of issued invoices" },
      { id: "product-sales", name: "Product Sales", desc: "Revenue and quantity per product" },
      { id: "customer-sales", name: "Customer Sales", desc: "Billing summary grouped by customer" },
      { id: "payment-method", name: "Payment Method", desc: "Collections split by payment mode" },
      { id: "gst-report", name: "GST Report", desc: "GSTR-ready taxable value and tax breakup" },
    ],
  },
  {
    group: "Customers",
    items: [
      { id: "new-customers", name: "New Customers", desc: "Customers onboarded in the period" },
      { id: "repeat-customers", name: "Repeat Customers", desc: "Customers with more than one invoice" },
      { id: "top-customers", name: "Top Customers", desc: "Highest value customers by revenue" },
    ],
  },
  {
    group: "Products",
    items: [
      { id: "top-products", name: "Top Products", desc: "Best performing products by revenue" },
      { id: "product-revenue", name: "Product Revenue", desc: "Revenue contribution per product" },
      { id: "product-quantity", name: "Product Quantity", desc: "Units sold per product" },
    ],
  },
  {
    group: "Invoices",
    items: [
      { id: "cancelled-invoices", name: "Cancelled Invoices", desc: "Voided invoices with reason and user" },
      { id: "user-wise-sales", name: "User-wise Sales", desc: "Billing performance per operator" },
    ],
  },
];

export const reportRows = [
  { date: "2026-08-27", invoices: 41, taxable: 181864, gst: 32736, total: 214600, mode: "Mixed" },
  { date: "2026-08-26", invoices: 34, taxable: 146440, gst: 26360, total: 172800, mode: "Mixed" },
  { date: "2026-08-25", invoices: 37, taxable: 166440, gst: 29960, total: 196400, mode: "Mixed" },
  { date: "2026-08-24", invoices: 30, taxable: 130678, gst: 23522, total: 154200, mode: "Mixed" },
  { date: "2026-08-23", invoices: 33, taxable: 150847, gst: 27153, total: 178000, mode: "Mixed" },
  { date: "2026-08-22", invoices: 26, taxable: 111440, gst: 20060, total: 131500, mode: "Mixed" },
  { date: "2026-08-21", invoices: 29, taxable: 125423, gst: 22577, total: 148000, mode: "Mixed" },
  { date: "2026-08-20", invoices: 21, taxable: 81779, gst: 14721, total: 96500, mode: "Mixed" },
];

export const activityLog = [
  { user: "Rohan Mehta", action: "Created invoice INV-2026-0412", time: "Today, 09:12" },
  { user: "Sneha Patil", action: "Edited product “V-Guard Stabilizer 4kVA”", time: "Today, 08:47" },
  { user: "Amit Rane", action: "Cancelled invoice INV-2026-0404", time: "Yesterday, 18:20" },
  { user: "Rohan Mehta", action: "Added customer “Priya Nair”", time: "Yesterday, 16:03" },
  { user: "System", action: "Nightly backup completed (48.2 MB)", time: "Yesterday, 02:00" },
];

export const users = [
  { name: "Rohan Mehta", email: "rohan@meridiantraders.in", role: "Admin", status: "Active" },
  { name: "Sneha Patil", email: "sneha@meridiantraders.in", role: "Billing", status: "Active" },
  { name: "Amit Rane", email: "amit@meridiantraders.in", role: "Billing", status: "Active" },
  { name: "Divya Shah", email: "divya@meridiantraders.in", role: "Accounts", status: "Invited" },
];

export const inr = (n: number, compact = false) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: compact ? 1 : 0,
    notation: compact ? "compact" : "standard",
  }).format(n);

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
