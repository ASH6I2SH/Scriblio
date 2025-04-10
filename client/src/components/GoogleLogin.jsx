import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/helpers/firebase";
import { signInWithPopup } from "firebase/auth";
import { RouteIndex } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {

  const dispatch= useDispatch()
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user= googleResponse.user
      
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error");
      }
      dispatch(setUser(data.user))
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <Button className="w-full" variant="outline" onClick={handleLogin}>
      <FcGoogle /> Continue With Google
    </Button>
  );
};

export default GoogleLogin;
