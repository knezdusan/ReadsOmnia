import Head from "next/head";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Featured from "../components/Featured";
import Lists from "../components/Lists";

export default function Home({listsData}) {

  const featuredData = {
    page: "frontpage",
    bid: "58",
    isbn: "0735222355",
    title: <h2>222The Lincoln Highway:<br />A Novel</h2>,
    text: <span><p>#1 NEW YORK TIMES BESTSELLER</p><p>The bestselling author of A Gentleman in Moscow and Rules of Civility and master of absorbing, sophisticated fiction returns with a stylish and propulsive novel set in 1950s America.</p></span>,
    cover: "lincoln-highway-novel-cover.jpg",
  };

  return (
    <>
      <Head>
        <title>ReadsOmnia - Your Next Read Must-read Books Library</title>
        <meta
          name="description"
          content="Top bestsellers, new fiction and non-fiction blockbusters, Critically acclaimed & Award winners books, Community recommendations Must Reads,  Global and Indi publishers top picks  | ReadsOmnia"
        />
      </Head>

      <div className={styles.main_content}>
        <Featured featuredData = {featuredData}/>
        <h1 className={styles.h1}>Reding Lists from Relevant Sources:</h1>
        <Lists listsData = {listsData} />
      </div>
    </>
  );
}


export async function getStaticProps() {

  const { data } = await axios.get(
    process.env.RO_API_URL+'front',
    {
      headers: {
        'Authorization': `${process.env.RO_API_KEY}`
      },
      timeout: 30000, // 30s
    }
  )

  // const dataJson = await import('../public/data.json');
  // const data = JSON.parse(JSON.stringify(dataJson));

  return {
    props: {
      listsData: data || [],
    },
    revalidate: 30,
  };
}
