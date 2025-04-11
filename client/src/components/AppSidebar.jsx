import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
} from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);

  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="logo p-4">
          <Link
            to={RouteIndex}
            className="font-bold tracking-tighter flex items-center gap-[2px] sm:gap-1 text-[1rem] sm:text-[1rem]"
          >
            <span className="text-[#7420E6] text-1xl sm:text-2xl">S</span>
            <span>CR</span>
            <span className="italic">I</span>
            <span className="text-[#7420E6]">B</span>
            <span>L</span>
            <span className="text-[#7420E6] italic">I</span>
            <span className="text-[#6a00ff] text-1xl sm:text-2xl">O</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              {" "}
              {/*className="mt-4"*/}
              <SidebarMenuButton asChild>
                <Link to={RouteIndex}>
                  <IoHomeOutline /> Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteBlog}>
                      <GrBlog /> Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteCommentDetails}>
                      <FaRegComments /> Comments
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
            {user && user.isLoggedIn && user.user.role === "admin" ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteCategoryDetails}>
                      <BiCategory /> Categories
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteUser}>
                      {" "}
                      <LuUsers /> Users
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category.length > 0 &&
              categoryData.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton asChild>
                    <Link to={RouteBlogByCategory(category.slug)}>
                      <GoDot />
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
