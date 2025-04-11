import React, { useState } from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setshowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error");
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setshowSearch(!showSearch);
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl"
          type="button"
        >
          <AiOutlineMenu />
        </button>
        <Link to={RouteIndex}>
          <img
            src={logo}
            alt="logo"
            className="h-8 w-auto max-w-[150px] md:max-w-none"
          />
        </Link>
      </div>


      <div className="w-[500px]">
      <div className="relative w-full max-w-md">

        <div
          className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-2 ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <SearchBox />
        </div>
      </div>


      </div>
      <div className="flex items-center gap-3">
  <button
    onClick={toggleSearch}
    type="button"
    className="md:hidden block"
  >
    <IoMdSearch className="text-2xl md:text-3xl" />

  </button>
  <div>
    {!user.isLoggedIn ? (
      <Button className="rounded-full" asChild>
        <Link to={RouteSignIn}>
          <MdLogin />
          Sign In
        </Link>
      </Button>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.user.avatar || usericon} />
            <AvatarFallback />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p>{user.user.name}</p>
            <p className="text-sm">{user.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile"><FaRegUser /> Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={RouteBlogAdd}><FaPlus /> Create Blog</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <IoLogInOutline className="text-red-500" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
</div>

    </div>
  );
};

export default Topbar;
