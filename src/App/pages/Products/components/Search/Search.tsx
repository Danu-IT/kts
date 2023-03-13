import React, { FC } from "react";

import Input from "components/Input";
import MultiDropdown from "components/MultiDropdown";
import { Option } from "type/index";

interface SearchProps {
  handleFind: () => void;
  search: string;
  filter: Option[];
  setSearch: (value: string) => void;
  setFilter: (value: Option[]) => void;
  options: Option[];
  className?: string;
}

const Search: FC<SearchProps> = ({
  search,
  filter,
  setFilter,
  setSearch,
  handleFind,
  className,
  options,
}) => {
  return (
    <div className={className}>
      <Input
        placeholder="Search property"
        handleFind={handleFind}
        value={search}
        onChange={setSearch}
        button="Find Now"
        icons={true}></Input>
      <MultiDropdown
        value={filter}
        onChange={setFilter}
        options={options}
        pluralizeOptions={(option: Option[]) =>
          !option.length ? "Filter" : `Выбрано: ${option.length}`
        }></MultiDropdown>
    </div>
  );
};

export default Search;
