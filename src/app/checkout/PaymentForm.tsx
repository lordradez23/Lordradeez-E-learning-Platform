"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BillingFormInputs } from "@/constants";
import { billingInfo, billingInfoValues } from "@/schema/BillingInfoSchema";
const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const form = useForm<billingInfoValues>({
    resolver: zodResolver(billingInfo),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      // todo react-select-country-list
      country: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  function onSubmit(values: billingInfoValues) {
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {BillingFormInputs.map((input, index) => (
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
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Payment Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      paymentMethod === "card" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="font-medium">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      paymentMethod === "paypal" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">P</div>
                    <span className="font-medium">PayPal</span>
                  </button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pr-12" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
                          <div className="w-6 h-4 bg-red-600 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" maxLength={4} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="newsletter" />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for updates and offers
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full h-12 text-lg font-semibold text-white">
                      <Lock className="w-4 h-4 mr-2" />
                      Complete Order
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Secured by 256-bit SSL encryption</span>
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "paypal" && (
                <>
                  <Separator />
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">P</span>
                    </div>
                    <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your payment securely.</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Continue with PayPal</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default PaymentForm;
