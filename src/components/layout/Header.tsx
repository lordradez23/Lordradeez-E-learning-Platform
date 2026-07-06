"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import ActiveLink from "../shared/ActiveLink";
import { images } from "../shared/Images";
import { userLogoutAction } from "@/actions/userActions";
import { redirect, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ModeToggle } from "../modeToggle";

const Header = ({ user }: { user: JwtPayload | null }) => {
  const cart = useAppSelector((state) => state.cart);
  const handleLogout = async () => {
    await userLogoutAction();
    redirect("/login");
  };

  const roleBorder =
    {
      USER: "border-primary",
      ADMIN: "border-amber-500",
      INSTRUCTOR: "border-green-500",
    }[user?.role as string] || "border-gray-400";

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme } = useTheme();

  //* search for a course
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleCourseSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const data = await (await fetch(`/api/courses/search?title=${searchQuery}`)).json();
      if (data.success && data.course) {
        router.push(`/all-courses?search=${searchQuery}`);
      } else {
        router.push(`/all-courses`);
      }
    } catch {
      router.push(`/all-courses`);
    } finally {
      setSearchQuery("");
    }
  };

  return (
    <header className="flex items-center justify-between lg:justify-evenly lg:gap-8 py-4 px-4 lg:px-10 bg-white dark:bg-slate-800 relative shadow-md rounded-4xl my-8 max-w-10/12 xl:max-w-8/12 mx-auto border-0">
      <div>
        <Link href="/" className="cursor-pointer">
          <Image src={theme === "dark" ? images.logoDark : images.logo} alt="logo" width={80} height={60} className="w-24 h-10 object-cover" />
        </Link>
      </div>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6 px-6">
          {navItems.map((item, index) => (
            <li className="relative" key={index}>
              <ActiveLink
                href={item.href}
                className="font-medium duration-200 hover:text-primary"
                activeClassName="text-primary after:absolute after:-bottom-3 after:left-1/2 after:w-2 after:h-2 after:bg-primary after:rounded-full"
              >
                {item.name}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={`mobileSidebar md:hidden fixed ${mobileSidebarOpen ? "inset-0" : "-left-96"} z-50 backdrop-blur-xs duration-300`}
        onClick={() => setMobileSidebarOpen(false)}
      >
        <nav className="bg-white/60 dark:bg-black/60 pl-4 pr-8 py-8 w-fit duration-200 relative h-screen shadow-lg">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="relative -top-4 left-11/12 w-8 h-8 p-1 hover:bg-primary hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X />
          </Button>
          <ul className="flex flex-col items-center gap-6 px-6">
            <Link href="/" className="cursor-pointer">
              <Image src={theme === "dark" ? images.logoDark : images.logo} alt="logo" width={80} height={60} className="w-24 h-10 object-cover" />
            </Link>
            {navItems.map((item, index) => (
              <li className="relative" key={index}>
                <ActiveLink
                  href={item.href}
                  className="font-medium duration-200 hover:text-primary p-4"
                  activeClassName="text-primary after:absolute after:bottom-2 after:right-0 after:w-2 after:h-2 after:bg-primary after:rounded-full"
                >
                  {item.name}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center relative lg:border-1 border-gray-300 dark:border-gray-700 rounded-2xl lg:flex-1 ml-auto">
        <Input
          placeholder="Search Courses..."
          className="hidden lg:block placeholder:text-gray-400 placeholder:font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCourseSearch()}
        />
        <Button
          size={"icon"}
          variant={"outline"}
          className="hidden md:block absolute right-0 border-0 hover:bg-transparent lg:bg-transparent shadow-none"
          onClick={handleCourseSearch}
        >
          <Search className="text-primary mx-auto" />
        </Button>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        <Link href={"/cart"} className="relative">
          <ShoppingCart className="text-primary p-1 hover:bg-primary hover:text-white rounded-full" size={30} />
          <span className="absolute -top-0.5 right-0 text-xs bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full pointer-events-none">
            {cart.length || 0}
          </span>
        </Link>
        <ModeToggle />
        {user && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={(user?.avatar as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                  alt="user avatar"
                  width={200}
                  height={200}
                  className={cn("w-9 h-9 rounded-full object-cover mx-auto cursor-pointer border-2 p-0.5", roleBorder)}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-46" align="center">
                {user.role === "ADMIN" ? (
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/admin" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                ) : (
                  user.role === "INSTRUCTOR" && (
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/instructor-dashboard" className="w-full">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                  )
                )}
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/account" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/account/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {!user && (
          <h3>
            <ActiveLink href="/login" className="font-medium duration-200 hover:text-primary" activeClassName="text-primary">
              Sign In
            </ActiveLink>
          </h3>
        )}
      </div>
      <Menu
        className="md:hidden text-primary hover:bg-primary p-1 hover:text-white rounded-full"
        size={30}
        onClick={() => setMobileSidebarOpen(true)}
      />
    </header>
  );
};

export default Header;
