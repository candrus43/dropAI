import type { Order } from "./types";

export interface OrderInsight {
  type: "warning" | "info" | "positive";
  title: string;
  description: string;
  metric?: string;
}

export function analyzeOrderPatterns(orders: Order[]): OrderInsight[] {
  if (orders.length === 0) {
    return [
      {
        type: "info",
        title: "No orders",
        description: "There are no orders to analyze yet.",
      },
    ];
  }

  const insights: OrderInsight[] = [];

  // ── Shipping delays ──
  const shippedOrders = orders.filter(
    (o) => o.shippedAt !== null
  );
  const delayedOrders = shippedOrders.filter((o) => {
    const created = new Date(o.createdAt).getTime();
    const shipped = new Date(o.shippedAt!).getTime();
    const diffDays = (shipped - created) / (1000 * 60 * 60 * 24);
    return diffDays > 3;
  });

  if (delayedOrders.length > 0) {
    insights.push({
      type: "warning",
      title: "Shipping delays detected",
      description: `${delayedOrders.length} order${delayedOrders.length > 1 ? "s" : ""} took more than 3 days to ship after being placed.`,
      metric: `${delayedOrders.length} orders`,
    });
  }

  // ── Payment failures ──
  const failedPayments = orders.filter(
    (o) => o.paymentStatus === "failed"
  );
  const failureRate = (failedPayments.length / orders.length) * 100;

  if (failedPayments.length > 0) {
    insights.push({
      type: "warning",
      title: "Payment failures",
      description: `${failedPayments.length} out of ${orders.length} orders had failed payments. Consider reviewing your payment gateway.`,
      metric: `${failureRate.toFixed(1)}% failure rate`,
    });
  }

  // ── Top product ──
  const productCounts = new Map<string, { name: string; count: number }>();
  for (const order of orders) {
    const existing = productCounts.get(order.productId);
    if (existing) {
      existing.count += 1;
    } else {
      productCounts.set(order.productId, {
        name: order.productName,
        count: 1,
      });
    }
  }
  const topProduct = [...productCounts.entries()].sort(
    (a, b) => b[1].count - a[1].count
  )[0];

  if (topProduct) {
    insights.push({
      type: "positive",
      title: "Top-selling product",
      description: `${topProduct[1].name} is your best performer, driving the most orders.`,
      metric: `${topProduct[1].count} orders`,
    });
  }

  // ── Average fulfillment time ──
  if (shippedOrders.length > 0) {
    const totalFulfillmentDays = shippedOrders.reduce((sum, o) => {
      const created = new Date(o.createdAt).getTime();
      const shipped = new Date(o.shippedAt!).getTime();
      return sum + (shipped - created) / (1000 * 60 * 60 * 24);
    }, 0);
    const avgFulfillment = totalFulfillmentDays / shippedOrders.length;

    insights.push({
      type: "info",
      title: "Average fulfillment time",
      description: `On average, orders ship within ${avgFulfillment.toFixed(1)} day${avgFulfillment !== 1 ? "s" : ""} of being placed.`,
      metric: `${avgFulfillment.toFixed(1)} days`,
    });
  }

  // ── Cancellation rate ──
  const cancelledOrders = orders.filter(
    (o) => o.status === "cancelled"
  );
  const cancelRate = (cancelledOrders.length / orders.length) * 100;

  if (cancelRate > 10) {
    insights.push({
      type: "warning",
      title: "High cancellation rate",
      description: `${cancelledOrders.length} out of ${orders.length} orders were cancelled — above the 10% threshold.`,
      metric: `${cancelRate.toFixed(1)}%`,
    });
  } else if (cancelledOrders.length > 0) {
    insights.push({
      type: "info",
      title: "Cancellation rate",
      description: `${cancelledOrders.length} order${cancelledOrders.length > 1 ? "s" : ""} cancelled out of ${orders.length} total.`,
      metric: `${cancelRate.toFixed(1)}%`,
    });
  }

  // ── Peak order day ──
  const dayCounts = new Map<number, number>();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (const order of orders) {
    const day = new Date(order.createdAt).getDay();
    dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
  }
  const peakDay = [...dayCounts.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0];

  if (peakDay) {
    insights.push({
      type: "info",
      title: "Peak order day",
      description: `Most orders are placed on ${dayNames[peakDay[0]]}s. Consider timing campaigns around this day.`,
      metric: `${peakDay[1]} orders`,
    });
  }

  // ── Refund rate ──
  const refundedPayments = orders.filter(
    (o) => o.paymentStatus === "refunded"
  );
  const refundRate = (refundedPayments.length / orders.length) * 100;

  if (refundRate > 5) {
    insights.push({
      type: "warning",
      title: "Elevated refund rate",
      description: `${refundedPayments.length} out of ${orders.length} orders have been refunded — above the 5% threshold. Review product quality or descriptions.`,
      metric: `${refundRate.toFixed(1)}%`,
    });
  }

  // ── Revenue by status ──
  const deliveredRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingRevenue = orders
    .filter((o) => o.status === "pending")
    .reduce((sum, o) => sum + o.total, 0);

  insights.push({
    type: "info",
    title: "Revenue breakdown",
    description: `Delivered orders account for $${deliveredRevenue.toFixed(2)} in confirmed revenue, with $${pendingRevenue.toFixed(2)} still pending.`,
    metric: `$${deliveredRevenue.toFixed(0)} delivered`,
  });

  // ── Returning customer rate ──
  const customerOrderCounts = new Map<string, number>();
  for (const order of orders) {
    const key = order.customerEmail.toLowerCase();
    customerOrderCounts.set(key, (customerOrderCounts.get(key) || 0) + 1);
  }
  const returningCustomers = [...customerOrderCounts.values()].filter(
    (c) => c > 1
  ).length;

  if (returningCustomers > 0) {
    const returningRate = (returningCustomers / customerOrderCounts.size) * 100;
    insights.push({
      type: "positive",
      title: "Returning customers",
      description: `${returningCustomers} customer${returningCustomers > 1 ? "s" : ""} placed more than one order — a strong signal of satisfaction.`,
      metric: `${returningRate.toFixed(1)}% repeat rate`,
    });
  }

  return insights;
}
