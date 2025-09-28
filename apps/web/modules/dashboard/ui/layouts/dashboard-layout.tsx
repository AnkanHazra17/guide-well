import React from "react";
import { cookies } from "next/headers";
import AuthGuard from "@/modules/auth/ui/components/auth-guard";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <AuthGuard>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar />
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarProvider>
    </AuthGuard>
  );
}

export default DashboardLayout;
