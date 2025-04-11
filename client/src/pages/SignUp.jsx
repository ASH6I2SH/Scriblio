import React from "react";
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
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {
  const formSchema = z.object({
    name: z.string().min(3, "name must be 3 character long"),
    email: z.string().email(),
    password: z.string().min(8, "password must be 8 character long"),
    confirmpassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmpassword,
        "password and confirm password should be same"
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
      navigate(RouteSignIn);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] px-5 min-h-[80%]">
        <CardHeader>
          <div className="logo flex justify-center items-center">
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
            Create Your Account
          </CardTitle>
        </CardHeader>

        <div>
          <GoogleLogin />
          <div className="border mt-3 flex justify-center items-center">
            <span className=" absolute bg-background backdrop-opacity-[50%] text-foreground text-sm rounded-full">
              Or
            </span>
          </div>
        </div>

        <CardContent className="-mt-1.5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
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
              <div className="">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password again"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className=" w-full" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex gap-2  text-sm justify-center items-center">
          <p>Already have account?</p>
          <Link className="text-blue-500 hover:underline" to={RouteSignIn}>
            {" "}
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
