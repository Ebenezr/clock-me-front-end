import React from "react";
import { BiSearchAlt } from "react-icons/bi";

interface Searchprops {
  filterUsers(str: string): void;
}
const Searchbar: React.FC<Searchprops> = ({ filterUsers }) => {
  const inputEl = React.useRef<HTMLInputElement>(null);
  const handleSearchFunction = () => {
    filterUsers(inputEl.current.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <BiSearchAlt className="search__icon" />
      <input
        ref={inputEl}
        className="search"
        type="search"
        placeholder="Search by name"
        onChange={handleSearchFunction}
      />
    </form>
  );
};

export default Searchbar;
