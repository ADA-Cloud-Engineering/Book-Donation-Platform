import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ data, placeholder, searchParam, onClick }) => {
  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    setSearchedData(
      data.filter((d) =>
        d[searchParam].toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  return (
    <div className={showSearch ? styles.search_container : null}>
      {showSearch && (
        <div className={styles.search_bar}>
          <input
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {input && (
            <div className={styles.search_output}>
              <div
                className={styles.search_overlay}
                onClick={() => {
                  setShowSearch(false);
                  setInput("");
                }}
              ></div>
              {searchedData.map((dat) => (
                <div
                  key={dat?.[searchParam]}
                  className={styles.search_output_div}
                  onClick={() => {
                    onClick(dat);
                    setShowSearch(false);
                  }}
                >
                  {dat?.[searchParam]}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <AiOutlineSearch
        onClick={() => setShowSearch(true)}
        size={30}
        color="darkslategray"
        cursor="pointer"
      />
    </div>
  );
};

export default SearchBar;
