import Head from "next/head";
import axios from "axios";
import Featured from "../../components/Featured";
import GenreList from "../../components/GenreList";
import { useRouter } from 'next/router';
import { genreDataObj, genreFeaturedObj } from '../../utils/helpers_genre';
import styles from "../../styles/GenrePage.module.scss";


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


export default function GenrePage({genre}) {
  
  const router = useRouter();

  if( genre === void 0){
    console.log('genreData: -----------> ', JSON.stringify(genre));
    return(
      <div style={{textAlign:"center", paddingTip:"100px",}}>Fetching Genre data...</div>
    )
  }

  const curGenreSlug = router.asPath.replace("/genre/",""); // like: health-fitness-dieting
  const curGenreTitle = genreDataObj[curGenreSlug][0];
  const curGenreMetaTitle = genreDataObj[curGenreSlug][1];
  const curGenreMetaDescription = genreDataObj[curGenreSlug][2];

  return (
    <>
      <Head>
        <title>{curGenreMetaTitle}</title>
        <meta name="description" content={curGenreMetaDescription} />
      </Head>

      <div className={styles.main_content}>
        <Featured featuredData = {genreFeaturedObj[curGenreSlug]}/>
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
  const paths = Object.keys(genreDataObj).map((genreSlug) => ({
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
