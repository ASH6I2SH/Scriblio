import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className="w-full h-screen">
        <div className="h-[4rem]"></div>
        <div className="min-h-[calc(100%-6.5rem)] ">
          <Outlet />
        </div>
        <Footer className="h-[4rem]" />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
