import ListItem from "../components/ListItem";
import styles from "../styles/List.module.scss";
import ArrowBackIosOutlined from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlined from "@material-ui/icons/ArrowForwardIosOutlined";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { useRef, useEffect, useState } from "react";

const List = ({listName, listData}) => {

  const [slideNumber, setSlideNumber]= useState(1);
  const [isTransitioned, setIsTransitioned] = useState(true);

  const listRef = useRef();
  const listLeft = useRef();
  const listRight = useRef();

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
  const realScreenWidth = screenWidth - 50;  // to exclude the left padding - 1230
  const realScreenWidth2 = screenWidth - 100;  // to exclude both padings - 1180
  const realCoverWidth = coverWidth + 15;   // to include the right margin - 240
  let visibleCovers = Math.floor(realScreenWidth2/realCoverWidth);  // 1180 / 240 = 4
  if(visibleCovers === 1) visibleCovers = 2;
  // console.log('visibleCovers:', visibleCovers);

  const sliderWidth = visibleCovers * realCoverWidth; // 4 * 240 = 960
  const sliderWidthHolder = sliderWidth; // 4 * 240 = 960
  
  const slidersNumber = Math.floor(30 / visibleCovers); // 7 (eg 30 / 4 = 7) (7*4 = 28, remainder 2)
  const sliderReminder = 30 % visibleCovers; // remaining covers - 2
  
  let sliderWidthLast;
  if(sliderReminder > 1){
    slidersNumber ++;
    sliderWidthLast = (sliderReminder-1) * (realCoverWidth);
  }
  else{
    sliderWidthLast = sliderWidth - (realCoverWidth);
  }

  const listNames = {
    // top_all: "Top of the Charts - All Genres",
    top_fiction: "Top of the Charts Fiction",
    top_nonfiction: "Top of the Charts Non-Fiction",
    trending_fiction: "Fiction Global Trendsetters",
    trending_nonfiction: "Non-Fiction Global Trendsetters",
    list_nyt: "New York Times Best Sellers",
    list_pw: "Publishers Weekly Bestseller Lists",
    list_ban: "Barnes & Noble Book Blockbusters",
    list_am: "Amazon.com Book Blockbusters",
    list_young_adult: "Top Young Adult Books",
    list_fbc: "Critically Acclaimed Books",
    list_gr: "Community Acclaimed Must Reads:",
    new_fiction: "New & Popular Fiction Bestsellers",
    new_nonfiction: "New & Popular Non-Fiction Bestsellers",
    list_prh: "Random House Global Publisher Bestsellers",
    list_hcp: "HarperCollins Global Publisher Bestsellers",
    list_hbg: "Hachette Global Publisher Bestsellers",
    list_ib: "Independent - INDI Publishers Bestsellers",
    list_children: "Children's Bestselling Books",
    list_gb1: "Greatest Books of All Time",
    list_gb2: "Greatest Books of the Millennium",
  }

  const handleTransition = () => {
    setTimeout(() => {
      setIsTransitioned(true);
    }, 800);
  }


  const handleClick = (direction) => {

    const leftDistance = listRef.current.getBoundingClientRect().x - 50;

    if(direction === "left" && slideNumber > 1){
      setSlideNumber(slideNumber - 1);
      if(slideNumber === slidersNumber){ sliderWidth = sliderWidthLast}else{ sliderWidth = sliderWidthHolder }
      listRef.current.style.transform = `translateX(${sliderWidth + leftDistance}px)`;
    }

    if(direction === "right" && slideNumber < slidersNumber){
      setSlideNumber(slideNumber + 1);
      if(slideNumber === slidersNumber - 1){ sliderWidth = sliderWidthLast}else{ sliderWidth = sliderWidthHolder }
      listRef.current.style.transform = `translateX(${(0 - sliderWidth) + leftDistance}px)`;
    }

    setIsTransitioned(false);
    handleTransition();
  }


  useEffect(() => {
    if(slideNumber === 1){
      listLeft.current.children[0].style.visibility = `hidden`;
    }
    else{
      listLeft.current.children[0].style.visibility = `visible`;
    }

    if(slideNumber === slidersNumber){
      listRight.current.children[0].style.visibility = `hidden`;
    }
    else{
      listRight.current.children[0].style.visibility = `visible`;
    }
  },[slideNumber, slidersNumber]);


  let counter = 1;

  return (
    <div className = {styles.list_box}>
      <div className = {styles.list_name}>{listNames[listName]}</div>
      <div className = {styles.list}>
        <ArrowBackIosOutlined className={[styles.sliderArrow, styles.left].join(" ")} onClick={isTransitioned ? () => handleClick("left") : null} ref={listLeft}/>
        <div className = {styles.list_wrapper} ref={listRef}>
          {listData.map((listItem) => <ListItem page="front" itemNum={counter++} itemsNum={visibleCovers} key={listItem.bid} listItemData={listItem} dimensions={dimensions} /> )}
        </div>
        <ArrowForwardIosOutlined className={[styles.sliderArrow, styles.right].join(" ")} onClick={isTransitioned ? () => handleClick("right") : null} ref={listRight}/>
      </div>
    </div>
  )
};

export default List;
