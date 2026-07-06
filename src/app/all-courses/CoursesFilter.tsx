"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SelectMenu from "@/components/shared/SelectMenu";

export default function CoursesFilter({ selected, options }: { selected: string; options: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    params.set("page", "1");
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return <SelectMenu label="Select a Category" options={options} selected={selected} setSelected={handleSelect} />;
}
