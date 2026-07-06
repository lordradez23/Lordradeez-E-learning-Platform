"use client";
import Image from "next/image";
import { images } from "../shared/Images";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="bg-[#D7E3FB] min-h-96 dark:bg-slate-900">
      <div className="px-16 min-h-96 py-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-8 items-center justify-center">
        <div className="space-y-8 xl:col-span-2">
          <div className="space-y-2 ">
            <Image src={theme === "dark" ? images.logoDark : images.logo} alt="logo" width={80} height={60} className="w-24 h-20 object-cover" />
            <p>Online learning platform anytime and anywhere</p>
          </div>
          <div className="flex gap-4 lg:gap-12">
            <Facebook className="rounded-full p-2 bg-primary text-white hover:text-primary hover:bg-white/80 cursor-pointer" size={40} />
            <Twitter className="rounded-full p-2 bg-primary text-white hover:text-primary hover:bg-white/80 cursor-pointer" size={40} />
            <Instagram className="rounded-full p-2 bg-primary text-white hover:text-primary hover:bg-white/80 cursor-pointer" size={40} />
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="font-medium">Courses</h3>
          <ul className="space-y-2">
            <li>
              <Link href={"#"}>Business</Link>
            </li>
            <li>
              <Link href={"#"}>Design</Link>
            </li>
            <li>
              <Link href={"#"}>Technology</Link>
            </li>
            <li>
              <Link href={"#"}>Languages</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="font-medium">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href={"/contact-us"}>Contact Us</Link>
            </li>
            <li>
              <Link href={"#"}>Address</Link>
            </li>
            <li>
              <Link href={"#"}>Email</Link>
            </li>
            <li>
              <Link href={"/about-us"}>About Us</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="font-medium">Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href={"#"}>Support</Link>
            </li>
            <li>
              <Link href={"#"}>Payment</Link>
            </li>
            <li>
              <Link href={"#"}>Help</Link>
            </li>
            <li>
              <Link href={"#"}>Blog</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <h3 className="font-medium">Subscribe Me</h3>
          <div className="flex flex-col md:flex-row items-center max-w-xs gap-y-4">
            <Input placeholder="Enter Email Address" className=" bg-white placeholder:text-gray-400 placeholder:font-medium" />
            <Button className="w-full md:w-fit">Subscribe</Button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-center p-4">
          Made By
          <a href="https://lordradeez.netlify.app" target="_blank" className="font-semibold">
            {" "}
            Lordradeez{" "}
          </a>
          © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
