"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import CartItem from "./CartItem";
import { VAT_RATE } from "@/constants";

const CartItems = () => {
  const cart = useAppSelector((state) => state.cart);

  const TotalAmount = () => cart.reduce((total, course) => total + course.price, 0);
  const VatAmount = () => VAT_RATE * TotalAmount();
  return (
    <>
      <section className="px-6 md:px-16 pb-8 py-6 md:py-10">
        <div className="container mx-auto space-y-6">
          <h1 className="text-2xl font-bold sm:text-4xl text-center">Shopping Cart</h1>
          <div className="flex flex-col lg:flex-row justify-evenly gap-12">
            <div className="flex-1 lg:flex-2/3">
              <h3 className="text-2xl font-medium pb-2">{cart.length || 0} Courses in Cart</h3>
              <ul className="space-y-4  max-h-[500px] overflow-auto">
                {cart && cart?.length > 0 ? cart.map((course) => <CartItem key={course.id} {...course} />) : <li>No Items Added Yet</li>}
              </ul>
            </div>

            <div className="flex-1 lg:flex-1/3">
              <h3 className="text-2xl font-semibold pb-2">Order Details</h3>
              {cart && cart?.length > 0 ? (
                <div className="space-y-8 max-w-full min-w-64 sm:min-w-md bg-white dark:bg-slate-800 p-4 shadow-md hover:shadow-lg duration-200 rounded-lg">
                  <dl className="space-y-4 text-lg text-muted-foreground ">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${TotalAmount().toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>${VatAmount().toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${(VatAmount() + TotalAmount()).toFixed(2)}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <Button className="text-white">
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 max-w-full min-w-64 sm:min-w-md bg-white dark:bg-slate-800 p-4 shadow-md hover:shadow-lg duration-200 rounded-lg">
                  No Items Added Yet
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartItems;
