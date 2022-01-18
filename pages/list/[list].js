import Image from "next/image";
import Link from 'next/link';
import Head from "next/head";
import Social from "../../components/layout/Social";
import Rating from "../../components/layout/Rating";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import styles from "../../styles/Title.module.scss";
import axios from "axios";
import { cleanHtml, strSlugify } from "../../utils/helpers";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Person from "@material-ui/icons/Person";
import ArrowBack from "@material-ui/icons/ArrowBack";

const listsArray = [
  'top-charts-bestsellers',
  'top-trending-bestsellers',
  'top-charts-fiction',
  'top-charts-non-fiction',
  'trending-fiction',
  'trending-non-fiction',
  'new-fiction-bestsellers',
  'new-non-fiction-bestsellers',
  'critically-acclaimed-bestsellers',
  'community-acclaimed-bestsellers',
  'indi-bestsellers',
  'all-time-bestsellers',
  'millennium-bestsellers',
  'top-young-adult-books',
  'top-children-books',
  'new-york-times-bestsellers',
  'publishers-weekly-bestsellers',
  'burns-noble-book-bestsellers',
  'amazon-book-bestsellers',
  'random-house-bestsellers',
  'harper-collins-bestsellers',
  'hachette-bestsellers',
]


export default function List({listData}) {

  const featuredData = {
    page: "frontpage",
    bid: "58",
    isbn: "0735222355",
    title: <h2>The Lincoln Highway:<br />A Novel</h2>,
    text: <span><p>#1 NEW YORK TIMES BESTSELLER</p><p>The bestselling author of A Gentleman in Moscow and Rules of Civility and master of absorbing, sophisticated fiction returns with a stylish and propulsive novel set in 1950s America.</p></span>,
    cover: "lincoln-highway-novel-cover.jpg",
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


export async function getStaticPaths() {
  // Get the paths we want to pre-render based on list names array
  const paths = listsArray.map((listSlug) => ({
    params: { listSlug: listSlug },
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({params}) {

  let listSlug = "list_"+params.listSlug; // like list_top-charts-bestsellers

  const { data } = await axios.get(
    process.env.RO_API_URL + listSlug,
    {
      headers: {
        'Authorization': `${process.env.RO_API_KEY}`
      },
      timeout: 30000, // 30s
    }
  )

  listData = data;

  // const dataJson = await import('../public/data.json');
  // const data = JSON.parse(JSON.stringify(dataJson));

  return {
    props: {
      listData: listData || [],
    },
  };
}
