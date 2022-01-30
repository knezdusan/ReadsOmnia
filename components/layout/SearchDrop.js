import Link from "next/link";
import { useState, useEffect } from 'react';
import axios from "axios";
import Search from "@material-ui/icons/Search";
import styles from "../../styles/SearchDrop.module.scss";

export default function SearchDrop() {
  const [booksObj, setBooksObj] = useState([]);
  const [query, setQuery] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(()=>{

    const loadBooks = async() => {
      const response = await axios('https://readsomnia.app/api/search_Speed%20hero');
      console.log(response.data);
      setBooksObj(response.data);
    }

    loadBooks();

  }, [triggerFetch]);

  const onChangeHandler = (query) => {
    setQuery(query);
  }

  return (
    <div className={styles.search_box}>
      <div className={styles.search_input}>
        <input type="text" onChange={e => onChangeHandler(e.target.value)} value={query} placeholder="Search by title or author"/>
        <Search className={styles.search_ico} />
      </div>
    </div>

  );
}