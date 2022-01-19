import ListItem from "../components/ListItem";
import styles from "../styles/ListGenre.module.scss";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { useRef } from "react";

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
    </div>
  )
};

export default ListGenre;
