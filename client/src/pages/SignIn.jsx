import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouteIndex, RouteSignIn, RouteSignUp } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "password is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error");
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen px-4 ">
      <Card className="w-[400px] p-5">
        <CardHeader>
          <div className="logo flex justify-center items-center mb-2">
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

          <CardTitle className="text-2xl font-bold text-center">
            Login Into Account
          </CardTitle>
        </CardHeader>


        <CardContent>
          <GoogleLogin />
        <div>
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-background backdrop-opacity-100 text-sm rounded-full">
              Or
            </span>
          </div>
        </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-2 mt-5 text-sm justify-center items-center">
          <p>Don&apos;t have account?</p>
          <Link className="text-blue-500 hover:underline" to={RouteSignUp}>
            {" "}
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
