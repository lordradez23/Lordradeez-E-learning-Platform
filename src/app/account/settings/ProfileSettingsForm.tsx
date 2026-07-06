"use client";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProfileSettingsFormInputs } from "@/constants";
import { ProfileSettingsSchema, ProfileSettingsSchemaSchemaValues } from "@/schema/AccountSettingsSchema";

const ProfileSettingsForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ProfileSettingsSchemaSchemaValues>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: {
      username: "",
      fullname: "",
      language: "en",
      role: "USER",
    },
  });

  async function onSubmit(values: ProfileSettingsSchemaSchemaValues) {
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
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {ProfileSettingsFormInputs.map((input, index) => (
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
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language Preference</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="English" defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="User" defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileSettingsForm;
