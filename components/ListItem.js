import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Rating from "./layout/Rating";
import debounce from "lodash.debounce";
import { useRef, useState, useEffect } from "react";
import { synopsisFixFormat, synopsisFixLength, strSlugify } from "../utils/helpers";
import styles from "../styles/ListItem.module.scss";
import InfoOutlined from "@material-ui/icons/InfoOutlined";



const ListItem = ({itemNum, itemsNum, listItemData, dimensions}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const itemRef = useRef();

  const router = useRouter();

  const [screenWidth, itemWidth, itemHeight] = dimensions;
  const itemHoverWidth = 2 * itemWidth + 7;

  // Fix synopsis format for diff resolutions
  let synopsis = synopsisFixFormat(listItemData.synopsis);

  if(screenWidth < 1450){
    synopsis = synopsisFixLength(synopsis, 150);
  }
  else if(screenWidth <= 1600){
    synopsis = synopsisFixLength(synopsis, 200);
  }


  let leftOffset = 120;

  if(screenWidth >= 1500){
    leftOffset = 140;
  }

  if(screenWidth >= 1650){
    leftOffset = 150;
  }


  // Item distnace from the right side of screen
  useEffect(() => {
    if(itemNum == 1){
      setIsFirst(true);
      setIsLast(false);
    }
    else if (itemNum % itemsNum === 0){
      setIsLast(true);
    }
    else if ((itemNum -1) % itemsNum === 0){
      setIsFirst(true);
    }
    else{
      setIsFirst(false);
      setIsLast(false);
    }

    // console.log(isFirst, isLast);
  },[isHovered]);
  
  
  const coverUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/c_${listItemData.isbn10}.jpg`;
  const coverBlurUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/blur/c_${listItemData.isbn10}.jpg`;

  let authors;
  const authorsArray = listItemData.authors;
  let authorNamesArray = authorsArray.map((authorObj) => authorObj.author);

  if(authorNamesArray.length > 2){
    authorNamesArray = authorNamesArray.slice(0, 2);
    authors = authorNamesArray.join(" & ") + " ...";
  }
  else if(authorNamesArray.length === 2){
    authorNamesArray = authorNamesArray.slice(0, 2);
    authors = authorNamesArray.join(" & ");
  }
  else{
    authors = authorNamesArray[0];
  }


  let titleSize = 1.7;
  const itemTitle = listItemData.title;
  if(itemTitle.length < 65){
    titleSize = 1.8;
  }
  if(itemTitle.length < 35){
    titleSize = 2;
  }
  if(itemTitle.length > 65){
    titleSize = 1.4;
  }
  if(itemTitle.length > 120){
    titleSize = 1.2;
  }

  const titleSlugify = strSlugify(itemTitle);

  const bookUrl = `/title/${titleSlugify}_${listItemData.bid}`;


  const debouncedHandleMouseEnter = debounce(() => setIsHovered(true), 500);

  const handlOnMouseLeave = () => {
    debounce(() => setIsHovered(true), 500);

    setIsHovered(false);
    debouncedHandleMouseEnter.cancel();

    itemRef.current.style.zIndex = "initial";

    itemRef.current.children[0].children[0].style.display = "initial";
    itemRef.current.children[0].children[0].style.width = `${itemWidth}px`;
    itemRef.current.children[0].children[0].style.height = `${itemHeight}px`;

    // revert background
    itemRef.current.style.backgroundColor = `#131313`;
    itemRef.current.style.boxShadow = `none`;

    // extend item area
    itemRef.current.style.minWidth = `${itemWidth}px`;
    itemRef.current.style.marginRight = "15px";
    itemRef.current.style.left = "0px";
  }

  
  const handlOnMouseEnter = (isHovered) => {
    
    if(isHovered){

      // handle image shrink and display on responsive
      if(screenWidth < 460){
        itemRef.current.style.minWidth = `275px`;
        itemRef.current.style.marginRight = `-${itemWidth}px`;

        itemRef.current.children[0].children[0].style.display = "none";
      }
      else{
        // extend item area
        itemRef.current.style.minWidth = `${itemHoverWidth+8}px`;
        itemRef.current.style.marginRight = `-${itemWidth}px`;
      }

      itemRef.current.style.zIndex = "99";
      
      itemRef.current.children[0].children[0].style.width = "130px";
      itemRef.current.children[0].children[0].style.minWidth = "130px";
      itemRef.current.children[0].children[0].style.height = "195px";

      // lighter background
      itemRef.current.style.backgroundColor = `#212121`;
      itemRef.current.style.boxShadow = `0 2px 15px #000000`;
      

      // if the first item in current viewport, dont shift the info box
      // if last slide, shirt it to the right to make it fully visible
      if(isFirst){
        itemRef.current.style.left = `1px`;
      }
      else if(isLast){
        itemRef.current.style.left = `-${itemWidth + 13}px`;
      }
      else{
        itemRef.current.style.left = `-${leftOffset}px`;
      }
    }

  }


  let iconStyles = {
    fontSize: '2rem',
    marginRight: '0.5rem',
    marginLeft: '-0.3rem'
  };

 
  return (
    <div className = {styles.list_item_box} data-index={itemNum} onMouseEnter={handlOnMouseEnter(isHovered)} onMouseOver={debouncedHandleMouseEnter} onMouseLeave={handlOnMouseLeave} ref={itemRef}>
      <div className = {styles.list_item_top}>
        <div id="cover_box" className = {styles.list_item_cover} >
          <Image alt={`${itemTitle} - book cover`} src={coverUrlSrc} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={coverBlurUrlSrc} />
        </div>
        {
          isHovered ?
          <div className = {styles.item_info}>
            <div className = {styles.item_genre}>{listItemData.category} › {listItemData.genre}</div>
            <div className = {styles.title_section}>
              <h3 style={{fontSize: `${titleSize}rem`}}>{itemTitle}</h3>
              <div className = {styles.item_authors}>{ authorNamesArray.length > 0 && `by ${authors}`}</div>
            </div>
            <div className = {styles.item_info_down}>
              <div className = {styles.item_rating}><Rating rating={listItemData.rating}/></div>
              <button className = {styles.info_button} onClick={() => router.push(`${bookUrl}`)}><InfoOutlined style={iconStyles}/>More Info</button>
            </div>
          </div>
          :
          <></>
        }

      </div>
      { isHovered ? <div className = {styles.item_synopsys}><span>{synopsis}</span></div> : <></> }
      { isHovered ? <Link href={bookUrl}><a className={styles.read_more} >read more ›</a></Link> : <></> }
    </div>
  )
};

export default ListItem;
