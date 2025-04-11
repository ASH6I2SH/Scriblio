import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Topbar />
        <AppSidebar />
        
        {/* Content wrapper that grows to fill space */}
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
