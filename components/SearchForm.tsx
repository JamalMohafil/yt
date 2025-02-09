import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
type Props = {};

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <div>
      <Form action={`/?query=${query}`} className="search-form" scroll={false}>
        <input
          name="query"
          defaultValue={query}
          className="search-input"
          placeholder="Search Startups"
        />

        {query && query.trim() !== "" && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </Form>
    </div>
  );
};

export default SearchForm;
