export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  price: number;
  margin: number;
  supplierId: string;
  imageUrl: string;
  inStock: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  quantity: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "refunded" | "failed";
  createdAt: string;
  shippedAt: string | null;
}

export interface Supplier {
  id: string;
  name: string;
  platform: "AliExpress" | "CJDropshipping" | "Spocket" | "Zendrop" | "Printful";
  productCount: number;
  averageShippingDays: number;
  rating: number;
  status: "active" | "inactive";
  contactEmail: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  totalVisitors: number;
  conversionRate: number;
  averageOrderValue: number;
  returnRate: number;
  topTrafficChannel: string;
  dailyRevenue: Array<{ date: string; revenue: number }>;
}

export interface EmailCampaign {
  id: string;
  name: string;
  type: "welcome" | "order_confirmation" | "shipping_notification" | "abandoned_cart" | "supplier_outreach";
  subject: string;
  status: "active" | "paused" | "draft";
  sentCount: number;
  openRate: number;
  clickRate: number;
  lastSent: string | null;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
