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
      <main className="w-full min-h-screen flex flex-col">
  <div className="h-[4rem]"></div>
  <div className="flex-1">
    <Outlet />
  </div>
  <Footer className="h-[4rem]" />
</main>

    </SidebarProvider>
  );
};

export default Layout;
