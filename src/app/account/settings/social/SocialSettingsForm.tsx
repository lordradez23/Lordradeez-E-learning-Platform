"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SocialSettingsFormInputs } from "@/constants";
import { SocialSettingsSchema, SocialSettingsSchemaValues } from "@/schema/AccountSettingsSchema";

const ChangeAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<SocialSettingsSchemaValues>({
    resolver: zodResolver(SocialSettingsSchema),
    defaultValues: {
      linkedin: "",
      github: "",
      facebook: "",
      website: "",
    },
  });

  async function onSubmit(values: SocialSettingsSchemaValues) {
    try {
      setLoading(true);
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="space-y-4">
          {SocialSettingsFormInputs.map((input, index) => (
            <div className="space-y-2" key={index}>
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
            </div>
          ))}

          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeAccountForm;
