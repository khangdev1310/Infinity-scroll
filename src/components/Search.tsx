import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

function Search({ onChange }: { onChange: (value: string) => void }) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debounceValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue, onChange]);

  return (
    <div
      style={{
        width: "40%",
        margin: "0 auto",
      }}
    >
      <input
        style={{ width: "80%" }}
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        autoFocus
      />
    </div>
  );
}

export default Search;
