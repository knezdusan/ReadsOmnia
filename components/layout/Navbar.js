import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Navbar.module.scss";
import logoPic from '../../public/logo.png';
import Search from "@material-ui/icons/Search";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import { useState, useRef } from "react";

export default function Navbar({isScrolled}) {

  const [isHamburger, setIsHamburger] = useState(false);
  const hamburgerRef = useRef();

  const hamburgerClick = () =>{
    setIsHamburger(!isHamburger);
    if(isHamburger){
      hamburgerRef.current.style.transform = "translateX(-255px)";
    }
    else{
      hamburgerRef.current.style.transform = "translateX(0px)";
    }

    console.log(isHamburger);
  }
 
  return (
    <div className={isScrolled ? [styles.navbar, styles.scrolled].join(" ") : styles.navbar}>
      <div className={styles.left}>
        <Menu className={styles.hamburger} onClick={hamburgerClick} />
        <Link href="/">
            <a className={styles.main_logo}><Image  src={logoPic} alt="ReadsOmnia logo" priority /></a>
        </Link>
        <div className={styles.main_nav} ref={hamburgerRef}>
          <Link href="/list/top-charts-bestsellers"><a>Top of Charts</a></Link>
          <Link href="/list/top-trending-bestsellers"><a>Trending Now</a></Link>
          <Link href="/list/critically-acclaimed-bestsellers"><a>Critically Acclaimed</a></Link>
          <Link href="/list/new-fiction-bestsellers"><a>Recently Added</a></Link>
          <Link href="/list/all-time-bestsellers"><a>All-Timers</a></Link>

          <Close className={styles.close_menu} onClick={hamburgerClick}/>
        </div>
      </div>

      <div className={styles.right}>
        <span>Genres</span>
        <ArrowDropDown/>
        <input type="text" name="search" placeholder="Search by title or author"/>
        <Search />
      </div>

    </div>
  );
}