"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactUs, contactUsValues } from "@/schema/ContactUsSchema";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormInputs } from "@/constants";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";

const ContactUsForm = () => {
  const formRef = useRef<null | HTMLFormElement>(null);
  const form = useForm<contactUsValues>({
    resolver: zodResolver(contactUs),
    defaultValues: {
      from_email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit() {
    if (!formRef?.current) return;
    try {
      await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!, formRef.current, {
        publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!,
      });
      toast.success("Message Sent!");
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        toast.error("EMAILJS FAILED..." + err);
        return;
      }
      toast.error("ERROR" + err);
    }
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {ContactFormInputs.map((input, index) =>
          input.name === "message" ? (
            <FormField
              key={index}
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={input.placeholder} className="bg-white resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key={index}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={input.placeholder} className="bg-white" type={input.type} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
        <Button type="submit" fullwidth className="rounded-none">
          Send
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;
