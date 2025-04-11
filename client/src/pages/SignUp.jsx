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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {
  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.string().email("Enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmpassword: z.string(),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Passwords do not match",
      path: ["confirmpassword"],
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
      showToast("success", data.message);
      navigate(RouteSignIn);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md px-4 py-6 sm:px-6 shadow-md">
        <CardHeader className="text-center">
          <Link
            to={RouteIndex}
            className="font-bold tracking-tighter flex justify-center items-center gap-[2px] sm:gap-1 text-[1rem] sm:text-[1rem]"
          >
            <span className="text-[#7420E6] text-xl sm:text-2xl">S</span>
            <span>CR</span>
            <span className="italic">I</span>
            <span className="text-[#7420E6]">B</span>
            <span>L</span>
            <span className="text-[#7420E6] italic">I</span>
            <span className="text-[#6a00ff] text-xl sm:text-2xl">O</span>
          </Link>
          <CardTitle className="text-2xl font-bold mt-2">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <GoogleLogin />
          <div className="border-t my-4 text-center text-sm text-muted-foreground relative">
            <span className="absolute bg-background rounded-full px-2 left-1/2 -translate-x-1/2 -top-3">
              Or
            </span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Re-enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-2" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center gap-1 text-sm">
          <p>Already have an account?</p>
          <Link className="text-blue-500 hover:underline" to={RouteSignIn}>
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
