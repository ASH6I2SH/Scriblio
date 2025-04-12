import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/Theme-provider";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main className="w-full h-full  flex flex-col">
          <div className="h-[4rem]"></div>
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer className="h-[4rem]" />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Layout;
