"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const buttons = [
  { label: "All cabins", value: "all" },
  { label: <span>1&mdash;3 guests</span>, value: "small" },
  { label: <span>4&mdash;7 guests</span>, value: "medium" },
  { label: <span>8&mdash;12 guests</span>, value: "large" },
];

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFilter = searchParams.get("capacity");

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {buttons.map((but) => (
        <button
          key={but.value}
          className={`px-5 py-2 hover:bg-primary-800 ${
            currentFilter === but.value ? "bg-primary-700 text-primary-100" : ""
          } `}
          onClick={() => handleFilter(but.value)}
        >
          {but.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
