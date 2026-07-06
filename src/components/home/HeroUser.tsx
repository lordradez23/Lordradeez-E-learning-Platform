"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeroUser = () => {
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
    <>
      <div className="absolute inset-0 z-0 before:absolute before:inset-0 before:bg-linear-to-r before:from-[#f0f5ff46] before:to-[#044cdda8]">
        <div className="container mx-auto  space-y-4 flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center justify-center gap-4  px-4 relative z-10 h-full">
            <h1 className="text-white text-3xl text-center sm:text-4xl md:text-6xl font-semibold !font-alike">Learn the course you like</h1>
            <p className="text-white text-sm md:text-lg max-w-80 text-center">
              Now you can take the course that you like. Choose the best course and study with a professional mentor
            </p>
            <div className="flex w-full ">
              <Input
                placeholder="Try Search “UX Researcher”"
                className="h-12 bg-white dark:bg-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCourseSearch()}
              />
              <Button className="h-12 text-white" onClick={handleCourseSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroUser;
