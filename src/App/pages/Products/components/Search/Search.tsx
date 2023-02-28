import { FC } from "react";

import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@type/index";

interface SearchProps {
  search: string;
  filter: Option[];
  setSearch: (value: string) => void;
  setFilter: (value: Option[]) => void;
  className?: string;
}

const Search: FC<SearchProps> = ({
  search,
  filter,
  setFilter,
  setSearch,
  className,
}) => {
  return (
    <div className={className}>
      <Input
        placeholder="Search property"
        value={search}
        onChange={setSearch}
        button="Find Now"
        icons={true}
      ></Input>
      <MultiDropdown
        value={filter}
        onChange={setFilter}
        options={[
          { key: "1", value: "Val" },
          { key: "2", value: "Val2" },
        ]}
        pluralizeOptions={(option: Option[]) =>
          !option.length ? "Filter" : `Выбрано: ${option.length}`
        }
      ></MultiDropdown>
    </div>
  );
};

export default Search;
