import Head from "next/head";
import Featured from "../../components/Featured";
import GenreList from "../../components/GenreList";
import { useRouter } from 'next/router';
import styles from "../../styles/GenrePage.module.scss";
import axios from "axios";


// const categorySlug = {
  // * "literature-fiction": "Literature & Fiction",
  // * children: "Children's Books",
  // * "mystery-thriller-suspense": "Mystery, Thriller & Suspense",
  // * "teen-young-adult": "Teen & Young Adult",
  // * "politics-social-science": "Politics & Social Sciences",
  // * "biographies-memoirs": "Biographies & Memoirs",
  // * "christian-bibles": "Christian Books & Bibles",
  // * "comics-graphic-novels": "Comics & Graphic Novels",
  // * "science-fiction-fantasy": "Science Fiction & Fantasy",
  // * "cookbooks-food-wine": "Cookbooks, Food & Wine",
  // * history: "History",
  // * "humor-entertainment": "Humor & Entertainment",
  // * "business-money": "Business & Money",
  // * "arts-photography": "Arts & Photography",
  // * "self-help": "Self-Help",
  // * lgbtq: "LGBTQ+ Books",
  // * "health-fitness-dieting": "Health, Fitness & Dieting",
  // * romance: "Romance",
// };


const genreArray = {
  "literature-fiction":
  [
    "Best Sellers in Literature & Fiction",
    "Best Sellers in Literature & Fiction - Fresh, Trending and All-Time Greatest Selection | ReadsOmnia",
    "Discover best-selling novels in Literature & Fiction -  From new releases to the best fiction books of all time.'",
  ],
  "children":
  [
    "Best-Selling Children's Books",
    "The Best Selling Children's Books - Fresh, Trending and All-Time Bestsellers Selection | ReadsOmnia",
    "Top Selling Books for Kids - From new releases to the best Children's literature of all time.",
  ],
  "mystery-thriller-suspense":
  [
    "Best Sellers in Mystery, Thriller & Suspense",
    "Mystery Thriller Suspense Best-Sellers You Won't Be Able to Put Down | ReadsOmnia",
    "Best Suspense Books That'll Keep You Turning Pages - From new releases to the best Mystery & Thriller novels of all time.",
  ],
  "teen-young-adult":
  [
    "Best Sellers in Teen & Young Adult",
    "Teen & Young Adult Best-Sellers You Won't Be Able to Put Down | ReadsOmnia",
    "Stellar best-selling young adult books that will appeal to adults too - From new releases to the best Teen & Young Adult novels of all time.",
  ],
  "politics-social-science":
  [
    "Best Sellers in Politics & Social Sciences",
    "Best Selling Books in Politics & Social Sciences - Fresh, Trending and All-Time Greatest Selection | ReadsOmnia",
    "Politics & Social Sciences Bestsellers - From new releases to the best Social & Political Sciences books of all time.",
  ],
  "biographies-memoirs":
  [
    "Best Sellers in Biographies & Memoirs",
    "Best Selling Books in Biographies & Memoirs - Fresh, Trending and All-Time Greatest Selection | ReadsOmnia",
    "Famous biographies, inspiring memoirs, and bestselling autobiographies. Learn about compelling historical figures and modern-day luminaries.",
  ],
  "christian-bibles":
  [
    "Best Sellers in Christian Books & Bibles",
    "Religion, Spirituality and Faith Books - Christian Books & Bibles Bestseller Selection | ReadsOmnia",
    "Discover most compelling Christian titles after the Bible - From new releases to the best-selling Christian books of all time.",
  ],
  "comics-graphic-novels":
  [
    "Best Sellers in Comics & Graphic Novels",
    "Best Selling Graphic Novels & Comic Books - Fresh, Trending and All-Time Bestsellers Selection | ReadsOmnia",
    "Stellar best-selling Comics & Graphic Novels that will appeal to all generations - From classic superhero books to politically-charged thrillers and cynical, autobiographical titles",
  ],
  "science-fiction-fantasy":
  [
    "Best Sellers in Science Fiction & Fantasy",
    "Best Selling Science Fiction & Fantasy Books - Fresh, Trending and All-Time Bestsellers Selection | ReadsOmnia",
    "The best sci-fi and fantasy books to catch up with - From new releases to the all-time greatest, all must reads at one spot.",
  ],
  "cookbooks-food-wine":
  [
    "Best Sellers in Cookbooks, Food & Wine",
    "Best Selling Cookbooks, Food & Wine Books - Fresh, Trending and All-Time Bestsellers Selection | ReadsOmnia",
    "This all-time round-up of the best cookbooks, food & wine bestsellers to catch up with.",
  ],
  "history":
  [
    "History Best Sellers",
    "Best Books For History Lovers | ReadsOmnia",
    "Explore new, trending and all-time best history books. And you can start reading it TODAY!",
  ],
  "humor-entertainment":
  [
    "Best Sellers in Humor & Entertainment",
    "Hilarious Humor & Entertainment Books Guaranteed To Make You Laugh Out Loud | ReadsOmnia",
    "Explore Most Funny Fiction Books You're Sure to Love. From new releases to the best-selling Humor & Entertainment titles of all time.",
  ],
  "business-money":
  [
    "Best Sellers in Business & Money",
    "Top Business & Money Best Selling Books | ReadsOmnia",
    "The best business, money, inspiration bestseller books to catch up with - From new releases to the all-time greatest.",
  ],
  "arts-photography":
  [
    "Best Sellers in Arts & Photography",
    "Top Arts & Photography Best Selling Books | ReadsOmnia",
    "Enjoy visually-stunning art and photography books - From new releases to the all-time greatest.",
  ],
  "self-help":
  [
    "Best Sellers in Self-Help",
    "Personal Growth, Self-Help & Relationships Best Selling Books | ReadsOmnia",
    "No matter what you’re looking to improve, there’s a book here for you. And you can start reading it TODAY!",
  ],
  "lgbtq":
  [
    "Best Sellers in LGBTQ+ Books",
    "Most Notable LGBTQ+ Pride Book List | ReadsOmnia",
    "Discover the best LGBTQ fiction bestsellers, award winners, trendsetter books. And you can start reading it TODAY!",
  ],
  "health-fitness-dieting":
  [
    "Best Sellers in Health, Fitness & Dieting",
    "Diet, Health & Fitness Best Sellers | ReadsOmnia",
    "Most in-demand selection of Health, Fitness & Dieting books at one spot. And you can start reading it TODAY!",
  ],
  "romance":
  [
    "Romance Best Sellers",
    "Romance Fiction Best Sellers | ReadsOmnia",
    "Ultimate selection of Romantic reads to curl up with. From the best romance authors hosts veterans and newcomers alike. And you can start reading it TODAY!",
  ],
};


export default function GenrePage({genre}) {
  
  const router = useRouter();

  if( genre === void 0){
    console.log('genreData: -----------> ', JSON.stringify(genre));
    return(
      <div style={{textAlign:"center", paddingTip:"100px",}}>Fetching Genre data...</div>
    )
  }

  const curGenreSlug = router.asPath.replace("/genre/",""); // like: health-fitness-dieting
  const curGenreTitle = genreArray[curGenreSlug][0];
  const curGenreMetaTitle = genreArray[curGenreSlug][1];
  const curGenreMetaDescription = genreArray[curGenreSlug][2];

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
        <title>{curGenreMetaTitle}</title>
        <meta name="description" content={curGenreMetaDescription} />
      </Head>

      <div className={styles.main_content}>
        <Featured featuredData = {featuredData}/>
        <h1 className={styles.h1}>{curGenreTitle}</h1>

        <div className = {styles.genre_page_content}>
          <GenreList genreData={genre} />
        </div>
      </div>
    </>
  );

}


export async function getStaticPaths() {
  // Get the paths we want to pre-render based on genre names array
  const paths = Object.keys(genreArray).map((genreSlug) => ({
    params: { genre: genreSlug },
  }))

  return { paths, fallback: false }
}


export async function getStaticProps({params}) {
  let notFound = false;
  let genreSlug = "genre_"+params.genre; // mystery-thriller-suspense

  const { data } = await axios.get(
    process.env.RO_API_URL + genreSlug,
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
      genre: data,
    },
    revalidate: 10800,  // 3 hours
    notFound,
  };
}
