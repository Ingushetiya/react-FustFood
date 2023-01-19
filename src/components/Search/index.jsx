import React, { useCallback, useContext, useRef, useState } from "react";
import { searchContext } from "../../App";

import debounce from "lodash.debounce";

import styles from "./search.module.scss";

const Search = () => {
  const { setSearch } = useContext(searchContext);
  const [value, setValue] = useState('')
  const inputRef = useRef()

  const onClickClear = () =>{
    setSearch('')
    setValue('')
    inputRef.current.focus();
  }
  
  const updateInputValue = useCallback(
    debounce((str)=>{
      setSearch(str)
    }, 1000), []
  )
  
  const onChangeInput = e =>{
    setValue(e.target.value)
    updateInputValue(e.target.value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы ... "
      />
      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 0 48 48"
          width="48"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
