import Link from 'next/link';
import ListItem from "../components/ListItem";
import styles from "../styles/ListGenre.module.scss";
import useWindowDimensions from "./hooks/useWindowDimensions";
import ArrowForwardIosOutlined from "@material-ui/icons/ArrowForwardIosOutlined";
import { useRef } from "react";


// More bestseleers in Genre -> link if exists in the categorySlug array meaning we hae a dedicated genre page
const genrePageArray = {
  "Literature & Fiction": "literature-fiction",
  "Children's Books": "children",
  "Mystery, Thriller & Suspense": "mystery-thriller-suspense",
  "Teen & Young Adult": "teen-young-adult",
  "Politics & Social Sciences": "politics-social-science",
  "Biographies & Memoirs": "biographies-memoirs",
  "Christian Books & Bibles": "christian-bibles",
  "Comics & Graphic Novels": "comics-graphic-novels",
  "Science Fiction & Fantasy": "science-fiction-fantasy",
  "Cookbooks, Food & Wine": "cookbooks-food-wine",
  "History": "history",
  "Humor & Entertainment": "humor-entertainment",
  "Business & Money": "business-money",
  "Arts & Photography": "arts-photography",
  "Self-Help": "self-help",
  "LGBTQ+ Books": "lgbtq",
  "Health, Fitness & Dieting": "health-fitness-dieting",
  "Romance": "romance",
};


const ListGenre = ({listName, listGenreData}) => {

  const listRef = useRef();

  const { screenHeight, screenWidth } = useWindowDimensions();
  // console.log(screenHeight, screenWidth);


  // Posible cover widths - intrinsic: 300 x 450
  const coverWidth = 130;
  const coverHeight = 195;

  if(screenWidth >= 460){
    coverWidth = 230;
    coverHeight = 345;
  }

  if(screenWidth >= 1500){
    coverWidth = 250;
    coverHeight = 375;
  }

  if(screenWidth >= 1650){
    coverWidth = 280;
    coverHeight = 420;
  }

  const dimensions = [screenWidth, coverWidth, coverHeight];

  // eg 1280 x 720
  const realScreenWidth = screenWidth - 100;  // to exclude both paddings - 1180
  const realCoverWidth = coverWidth + 15;   // to include the right margin - 240
  let visibleCovers = Math.floor(realScreenWidth/realCoverWidth);  // 1180 / 240 = 4
  if(visibleCovers === 1) visibleCovers = 2;
  // console.log('visibleCovers:', visibleCovers);


  let counter = 1;

  return (
    <div className = {styles.list_genre_box}>
      <h2 className = {styles.list_name}>{listName}</h2>
      <div className = {styles.list_genre_items}>
        {listGenreData.map((listItem) => <ListItem page="list" itemNum={counter++} itemsNum={visibleCovers} key={listItem.bid} listItemData={listItem} dimensions={dimensions} /> )}
      </div>
      {listName in genrePageArray ? <div className={styles.load_more}><Link href={`/genre/${genrePageArray[listName]}`}><a>More bestsellers in {listName} <ArrowForwardIosOutlined/></a></Link></div> : null}
    </div>
  )
};

export default ListGenre;
