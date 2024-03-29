import Head from "next/head";
import Featured from "../../components/Featured";
import ListGenre from "../../components/ListGenre";
import { useRouter } from 'next/router';
import styles from "../../styles/ListPage.module.scss";
import axios from "axios";

const listsArray = {
  'top-charts-bestsellers':
  [
    'Top of the Charts Bestsellers',
    'Fresh Bestseller Books List | ReadsOmnia',
    'Top of the charts books sorted by genre from major Global and Indi publishers and media sources at one spot.',
  ],
  'top-trending-bestsellers':
  [
    'Top Trending Bestsellers',
    'Top New and Trending Fiction Novels - Fresh Trendsetters Book List | ReadsOmnia',
    'Best fiction novels that are trending top of the charts with major global and indi Publishers and media sources at one spot',
  ],
  'top-charts-fiction':
  [
    'Top of the Charts Fiction Bestsellers',
    'Top Fiction Novels - Fresh Bestsellers List | ReadsOmnia',
    'Discover best new fiction titles that dominate the top-charts with major Global and Indi Publishers and media sources.',
  ],
  'top-charts-non-fiction':
  [
    'Top of the Charts Non-Fiction Bestsellers',
    'Top Non-Fiction Books - Fresh Bestsellers List | ReadsOmnia',
    'Discover best new non-fiction titles that dominate the top-charts with major Global and Indi Publishers and media sources.',
  ],
  'trending-fiction':
  [
    'Trending Fiction Bestsellers',
    'Top Trending Fiction Novels - Fresh Bestsellers List | ReadsOmnia',
    'Fiction trendsetters that currently dominate the major Global & Indi Publishers and media sources bestseller books charts.',
  ],
  'trending-non-fiction':
  [
    'Trending Non-Fiction Bestsellers',
    'Top Trending Non-Fiction Books - Fresh Bestsellers List | ReadsOmnia',
    'Non-fiction trendsetters currently dominating the major Global & Indi Publishers and media sources bestseller books charts.',
  ],
  'new-fiction-bestsellers':
  [
    'New & Popular Fiction Bestsellers',
    'New Fiction Bestsellers - Your Next Must-Read Novels | ReadsOmnia',
    'Discover incoming non-fiction trendsetters that already dominate the major Global & Indi Publishers and media sources bestseller charts.',
  ],
  'new-non-fiction-bestsellers':
  [
    'New & Popular Non-Fiction Bestsellers',
    'New Non-Fiction Bestsellers - Your Next Must-Read | ReadsOmnia',
    'Discover incoming non-fiction trendsetters that already dominate the major Global & Indi Publishers and media sources bestseller charts.',
  ],
  'critically-acclaimed-bestsellers':
  [
    'Critically Acclaimed Bestsellers',
    'Critically Acclaimed Bestsellers - Your Next Must-Read | ReadsOmnia',
    'Fresh selection of best fiction and non-fiction books determined by the most relevant lists and articles from various critics, authors and experts.',
  ],
  'community-acclaimed-bestsellers':
  [
    'Community Acclaimed Bestsellers',
    'Your Next Must-Read Book by Community Recommendations | ReadsOmnia',
    'Fresh selection of best fiction and non-fiction books determined by the most relevant community lists and recommendations from readers around the globe.',
  ],
  'indie-bestsellers':
  [
    'Independent - INDI Publishers Bestsellers',
    'Indie Bestsellers | ReadsOmnia',
    'CherryPicked selections of fresh indie fiction and non-fiction bestsellers on sales in hundreds of independent bookstores nationwide.',
  ],
  'all-time-bestsellers':
  [
    'Greatest Books of All Time',
    'Best-Selling Books of All-Time | ReadsOmnia',
    'All time selection of best fiction and non-fiction books determined by the most relevant lists and articles from various critics, authors and experts.',
  ],
  'millennium-bestsellers':
  [
    'Greatest Books of the Millennium',
    'Best-Selling Books of the Millennium | ReadsOmnia',
    'Fiction and non fiction must-read books that made the significant impact in the last 100+ years - determined by the most relevant lists and articles from various critics, authors and experts.',
  ],
  'top-young-adult-books':
  [
    'Top Young Adult Books',
    'Young Adult Best Sellers | ReadsOmnia',
    'Fresh selection of bestselling fiction books for teens and young adults. Discover best authors, hot new series, graphic novels, and new YA releases',
  ],
  'top-children-books':
  [
    'Children\'s Bestselling Books',
    'Best Selling Books for Children | ReadsOmnia',
    'The ultimate booklists to read before you\'re 14. Discover new must-read bestsellers for Children and some of the parents as well.',
  ],
  'new-york-times-bestsellers':
  [
    'New York Times Bestsellers',
    'Current List of New York Times Best Sellers Sorted by Genre | ReadsOmnia',
    'The New York Times fiction and non-fiction top-of-the-chart books - Preeminent and up to date list of best-selling books in the United States sorted by genre.',
  ],
  'publishers-weekly-bestsellers':
  [
    'Publishers Weekly Bestsellers',
    'Publishers Weekly Bestsellers List | ReadsOmnia',
    'Discover new and trending bestsellers brought to you by Publishers Weekly.',
  ],
  'burns-noble-book-bestsellers':
  [
    'Barnes & Noble Bestsellers List',
    'Barnes & Noble\'s  Bestsellers List | ReadsOmnia',
    'Discover new and trending bestsellers brought to you by B&A.',
  ],
  'amazon-book-bestsellers':
  [
    'Amazon Bestsellers List',
    'Amazon Bestsellers List | ReadsOmnia',
    'Discover real new and trending bestsellers on Amazon Bookstore.',
  ],
  'random-house-bestsellers':
  [
    'Random House Global Publisher Bestsellers',
    'Penguin Random House Bestsellers List | ReadsOmnia',
    'Discover new and trending bestsellers brought to you by Penguin Random House.',
  ],
  'harper-collins-bestsellers':
  [
    'HarperCollins Global Publisher Bestsellers',
    'HarperCollins Publishers Bestsellers List | ReadsOmnia',
    'Discover new and trending bestsellers brought to you by HarperCollins Publishers.',
  ],
  'hachette-bestsellers':
  [
    'Hachette Global Publisher Bestsellers',
    'Hachette Book Group Bestsellers List | ReadsOmnia',
    'Discover new and trending bestsellers brought to you by Hachette Book Group.',
  ],
};


export default function ListPage({listData}) {

  const router = useRouter();

  if( listData === void 0){
    console.log('listData: -----------> ', JSON.stringify(listData));
    return(
      <div style={{textAlign:"center", paddingTip:"100px",}}>Fetching list data...</div>
    )
  }

  const curListSlug = router.asPath.replace("/list/",""); // like: top-charts-bestsellers
  const curListTitle = listsArray[curListSlug][0];
  const curListMetaTitle = listsArray[curListSlug][1];
  const curListMetaDescription = listsArray[curListSlug][2];

  return (
    <>
      <Head>
        <title>{curListMetaTitle}</title>
        <meta name="description" content={curListMetaDescription} />
      </Head>

      <div className={styles.main_content}>
        <Featured />
        <h1 className={styles.h1}>{curListTitle}</h1>

        <div className={styles.list_page_content}>
          {Object.keys(listData).map(key => <ListGenre key={key} listName={key} listGenreData={listData[key]} />)}
        </div>
      </div>
    </>
  );

}


export async function getStaticPaths() {
  // Get the paths we want to pre-render based on list names array
  const paths = Object.keys(listsArray).map((listSlug) => ({
    params: { list: listSlug },
  }))

  return { paths, fallback: false }
}


export async function getStaticProps({params}) {
  let notFound = false;
  let listSlug = "list_"+params.list; // like list_top-charts-bestsellers

  const { data } = await axios.get(
    process.env.RO_API_URL + listSlug,
    {
      headers: {
        'Authorization': `${process.env.RO_API_KEY}`
      },
      timeout: 30000, // 30s
    }
  )

  if (Object.keys(data).length === 0) {
      notFound = true;
  }

  // console.log(JSON.stringify(data));

  return {
    props: {
      listData: data,
    },
    revalidate: 10800,  // 3 hours
    notFound,
  };
}
