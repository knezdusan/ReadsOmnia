import { useRouter } from 'next/router'
import Image from "next/image";
import styles from "../styles/Featured.module.scss";
import InfoOutlined from "@material-ui/icons/InfoOutlined";


export default function Featured({featuredData}) {
  const router = useRouter();

  if(!featuredData){
    featuredData = {
      section: "home",
      page: "frontpage",
      bid: "58",
      isbn: "0735222355",
      title: <h2>The Lincoln Highway:<br />A Novel</h2>,
      text: <span><p>#1 NEW YORK TIMES BESTSELLER</p><p>The bestselling author of A Gentleman in Moscow and Rules of Civility and master of absorbing, sophisticated fiction returns with a stylish and propulsive novel set in 1950s America.</p></span>,
      cover: "lincoln-highway-novel-cover.jpg",
      bck: "lincoln-highway-novel-bck.jpg",
      cta: "",
      url: "",
    };
  }

  const {section, page, bid, isbn, title, text, cover, bck, cta, url} = featuredData;
  const coverUrl = `/featured/${cover}`;
  const bckUrl = `/featured/${bck}`;
  const bookUrl = url.length > 5 ? url : `/title/${title}_${bid}`;
  const bookCta = cta.length > 5 ? cta : 'More Info';

  let iconStyles = {
    fontSize: '2rem',
    marginRight: '0.5rem',
    marginLeft: '-0.3rem'
  };

  return (
    <div className={[styles.featured, styles[`${section}`], styles[`${page}`]].join(" ")} style={{backgroundImage:`url(${bckUrl})`}}>
      <div className={styles.data}>
        <div className={styles.data_left}>
            {title}
            <div className={styles.data_text}>{text}</div>
            <button className={styles.data_button} onClick={() => router.push(`${bookUrl}`)}><InfoOutlined style={iconStyles}/>{bookCta}</button>
        </div>
        <div className={styles.cover}><Image  src={coverUrl} alt={title} width={400} height={600} priority/></div>
      </div>
    </div>
  )
}