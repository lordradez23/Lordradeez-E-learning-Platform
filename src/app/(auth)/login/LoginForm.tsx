"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaValues } from "@/schema/loginSchema";
import Link from "next/link";
import { LoginFormInputs } from "@/constants";
import { useState } from "react";
import { userLoginAction } from "@/actions/userActions";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { images } from "@/components/shared/Images";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<loginSchemaValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginSchemaValues) {
    try {
      setLoading(true);
      const result = await userLoginAction(values);
      if (!result.success) {
        toast.error(result.message || "Something went wrong!");
        return;
      }
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center w-96 max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          {LoginFormInputs.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={input.placeholder} className="bg-input" type={input.type} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" fullwidth className="text-white" disabled={loading}>
            Login
          </Button>
        </form>
      </Form>
      <Button variant="outline" fullwidth onClick={() => (window.location.href = "/api/auth/google/login")}>
        <Image src={images.googleIcon} alt="google" width={20} height={20} />
        Sign in with Google
      </Button>
      <span className="text-sm">
        Not registered yet?{" "}
        <Link href="/register" className="text-primary">
          Create an Account
        </Link>
      </span>
    </div>
  );
};

export default LoginForm;
