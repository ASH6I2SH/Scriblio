import React, { useState, useRef, useEffect } from "react";

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
import { ModeToggle } from "./Mode-toggle";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setshowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const searchRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setshowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-background text-foreground px-5 border-b">
      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl"
          type="button"
        >
          <AiOutlineMenu />
        </button>
        <div className="logo">
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
      </div>

      <div className="w-[500px]">
        <div className="relative w-full max-w-md">
          <div
            className={`md:relative md:block absolute  rounded-full backdrop-blur-lg left-0 w-full md:top-0 top-16 md:p-0 p-2 ${
              showSearch ? "block" : "hidden"
            }`}
            ref={searchRef}
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
        <ModeToggle />
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
                  <Link to="/profile">
                    <FaRegUser /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={RouteBlogAdd}>
                    <FaPlus /> Create Blog
                  </Link>
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
