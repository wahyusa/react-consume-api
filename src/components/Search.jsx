import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchValue, handleSearch }) => {
  return (
    <input
      type="search"
      placeholder="Cari catatan"
      name="search"
      id="trigger-search-note"
      value={searchValue}
      onChange={handleSearch}
      className="border w-full inline-flex border-gray-400 rounded-md px-3 py-1.5"
    />
  );
};

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
