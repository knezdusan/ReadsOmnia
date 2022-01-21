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
        <div className={styles.genre_box}>
          <div className={styles.genre_nav_title}>Genres <ArrowDropDown/></div>
          <div className={styles.genre_nav_menu}>
            <ul>
              <strong>Fiction:</strong>
              <li><Link href="/genre/literature-fiction"><a>Literature & Fiction</a></Link></li>
              <li><Link href="/genre/mystery-thriller-suspense"><a>Mystery, Thriller & Suspense</a></Link></li>
              <li><Link href="/genre/science-fiction-fantasy"><a>Science Fiction & Fantasy</a></Link></li>
              <li><Link href="/genre/humor-entertainment"><a>Humor & Entertainment</a></Link></li>
              <li><Link href="/genre/history"><a>History</a></Link></li>
              <li><Link href="/genre/lgbtq"><a>LGBTQ+</a></Link></li>
              <li><Link href="/genre/romance"><a>Romance</a></Link></li>
            </ul>
            <ul>
              <strong>Non-Fiction:</strong>
              <li><Link href="/genre/biographies-memoirs"><a>Biographies & Memoirs</a></Link></li>
              <li><Link href="/genre/politics-social-science"><a>Politics & Social Sciences</a></Link></li>
              <li><Link href="/genre/christian-bibles"><a>Christian Books & Bibles</a></Link></li>
              <li><Link href="/genre/business-money"><a>Business & Money</a></Link></li>
              <li><Link href="/genre/arts-photography"><a>Arts & Photography</a></Link></li>
              <li><Link href="/genre/self-help"><a>Self-Help</a></Link></li>
              <li><Link href="/genre/health-fitness-dieting"><a>Health, Fitness & Dieting</a></Link></li>
            </ul>
            <ul>
              <strong>Non-Adult:</strong>
              <li><Link href="/genre/teen-young-adult"><a>Teen & Young Adult</a></Link></li>
              <li><Link href="/genre/comics-graphic-novels"><a>Comics & Graphic Novels</a></Link></li>
              <li><Link href="/genre/children"><a>Children's Books</a></Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.search_nav_box}>
          <input type="text" name="search" placeholder="Search by title or author"/>
          <Search className={styles.search_ico} />
        </div>
      </div>
    </div>
  );
}