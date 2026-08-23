import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { adminQueryClient } from "@/lib/adminQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={adminQueryClient}>
      <div className="min-h-screen bg-neutral-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="min-h-[calc(100vh-5rem)] p-5 sm:p-8 [&>section]:py-8 [&>section]:lg:py-10">
          <Outlet />
        </main>
      </div>
      </div>
    </QueryClientProvider>
  );
}