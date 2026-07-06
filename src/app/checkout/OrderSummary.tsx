"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hooks";
import { VAT_RATE } from "@/constants";

const OrderSummary = () => {
  const cart = useAppSelector((state) => state.cart);

  const TotalAmount = () => cart.reduce((total, course) => total + course.price, 0);
  const VatAmount = () => VAT_RATE * TotalAmount();

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Order Summary
          <Badge variant="secondary">
            {cart?.length || 0} {cart && cart?.length === 1 ? "Item" : "Items"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <span className="font-medium text-foreground">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${TotalAmount().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax</span>
            <span>${VatAmount().toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>Total</span>
            <span>${(VatAmount() + TotalAmount()).toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg pointer-events-none">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure 256-bit SSL encryption</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
