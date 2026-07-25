import type { ReactNode } from "react";
import { DashboardShell } from "./DashboardShell";

export function DashboardPageShell({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}