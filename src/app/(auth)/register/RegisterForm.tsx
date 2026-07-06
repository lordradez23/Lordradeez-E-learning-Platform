"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, registerSchemaValues } from "@/schema/registerSchema";
import Link from "next/link";
import { RegisterFormInputs } from "@/constants";
import { createUserAction } from "@/actions/userActions";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { images } from "@/components/shared/Images";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<registerSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: registerSchemaValues) {
    try {
      setLoading(true);
      const result = await createUserAction(values);
      if (!result.success) {
        toast.error(result.message || "Something went wrong!");
        return;
      }
      toast.success("Account created successfully, please login", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push("/login");
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
          {RegisterFormInputs.map((input, index) => (
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
            Create Account
          </Button>
        </form>
      </Form>
      <Button variant="outline" fullwidth onClick={() => (window.location.href = "/api/auth/google/login")}>
        <Image src={images.googleIcon} alt="google" width={20} height={20} />
        Sign in with Google
      </Button>
      <span className="text-sm">
        Already registered?{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </span>
    </div>
  );
};

export default RegisterForm;
