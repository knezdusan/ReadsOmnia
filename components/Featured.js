import { useRouter } from 'next/router'
import Image from "next/image";
import styles from "../styles/Featured.module.scss";
import InfoOutlined from "@material-ui/icons/InfoOutlined";


export default function Featured({featuredData}) {
  const router = useRouter();

  const {page, bid, isbn, title, text, cover} = featuredData;
  const coverUrl = `/featured/${cover}`;
  const bookUrl = `/title/${title}_${bid}`;

  let iconStyles = {
    fontSize: '2rem',
    marginRight: '0.5rem',
    marginLeft: '-0.3rem'
  };

  return (
    <div className={[styles.featured, styles[`${page}`]].join(" ")}>
      <div className={styles.data}>
        <div className={styles.data_left}>
            {title}
            <div className={styles.data_text}>{text}</div>
            <button className={styles.data_button} onClick={() => router.push(`${bookUrl}`)}><InfoOutlined style={iconStyles}/>More Info</button>
        </div>
        <div className={styles.cover}><Image  src={coverUrl} alt={title} width={400} height={600} priority/></div>
      </div>
    </div>
  )
}