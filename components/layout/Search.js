import SearchDrop from "./SearchDrop";
import { useState, useEffect } from 'react';
import axios from "axios";
import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "../../styles/Search.module.scss";


export default function Search() {
  const [booksObj, setBooksObj] = useState([]);
  const [query, setQuery] = useState('');
  // const [triggerFetch, setTriggerFetch] = useState(false);

  const loadBooks = async(query) => {
    if(query.length > 2){
      query = encodeURIComponent(query.trim());
      const response = await axios(`https://readsomnia.app/api/search_${query}`);

      setBooksObj(response.data);
    }
    else{
      setBooksObj(false);
    }
  }

  useEffect(()=>{
    const timer = setTimeout(() => {
      loadBooks(query);
    }, 700)

    return () => clearTimeout(timer)
  }, [query]);

  const onChangeHandler = (query) => {
    // Strp all non-alphanumerics, fix multiple spaces and trim.
    let regex = new RegExp(/[^0-9a-zA-Z ]/gi);
    query = query.replace(regex, '');
    query = query.replace(/\s+/g, ' ');

    setQuery(query);
  }

  const outHandler = () => {
    setBooksObj(false);
  }

  return (
    <div className={styles.search_box}>
      <div className={styles.search_input}>
        <input type="text" onChange={e => onChangeHandler(e.target.value)} value={query} placeholder="Search by title or author"/>
        <SearchRounded className={styles.search_ico} />
      </div>
      <div className={styles.search_results} onClick={outHandler} onMouseLeave={outHandler}>
        <SearchDrop booksObj={booksObj} />
      </div>
      
    </div>

  );
}