import Head from "next/head";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Featured from "../components/Featured";
import Lists from "../components/Lists";

export default function Home({listsData}) {

  const featuredData = {
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

  return (
    <>
      <Head>
        <title>ReadsOmnia - Fiction & Non-Fiction Must-Read Books at One Spot</title>

        <meta name="description" content="Top bestsellers, new and trending fiction and non-fiction books, Critically acclaimed & Award-winning titles, Community recommendation Must-Reads  | ReadsOmnia" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="📓 ReadsOmnia - Fiction & Non-Fiction Must-Read Books at One Spot" />
        <meta name="twitter:description" content="Top bestsellers, new and trending fiction and non-fiction books, Critically acclaimed & Award-winning titles, Community recommendations Must-Reads  | ReadsOmnia" />
        <meta name="twitter:site" content="@readsomnia" />
        <meta name="twitter:creator" content="@readsomnia" />
        <meta name="twitter:image" content="/readsomnia-og.jpg" />

        {/* Open Graph general (Facebook, Pinterest) */}
        <meta property="og:title" content="📓 ReadsOmnia - Fiction & Non-Fiction Must-Read Books at One Spot" />
        <meta property="og:description" content="Top bestsellers, new and trending fiction and non-fiction books, Critically acclaimed & Award-winning titles, Community recommendations Must-Reads  | ReadsOmnia" />
        <meta property="og:url" content="https://readsomnia.com" />
        <meta property="og:site_name" content="readsomnia.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/readsomnia-og.jpg" />

        {/* Emoji SVG favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📓</text></svg>" />
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
