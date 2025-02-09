"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const SearchFormReset = (props: Props) => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button onClick={() => reset()}>
      <Link href={"/"}>
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
