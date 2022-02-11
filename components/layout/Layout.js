import Head from "next/head";
import Navbar from './Navbar';
import Footer from './Footer';
import Scrolltop from './Scrolltop';
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useState, useEffect } from "react";
import styles from "../../styles/Layout.module.scss";


export default function Layout({ children }) {

  const { screenHeight, screenWidth } = useWindowDimensions();
  const toTopHeight = screenHeight - 100;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isToTop, setIsToTop] = useState(false);

  useEffect((toTopHeight) => {
    const scroll = () => {
       setIsScrolled(window.scrollY < 50 ? false : true);
       setIsToTop(window.scrollY < toTopHeight ? false : true);
    }
    window.addEventListener("scroll", scroll, false);
    return () => window.removeEventListener("scroll", scroll, false);
  }, []);

  return (
    <div className={styles.page_container}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Special+Elite&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Special+Elite&display=swap' />

        <link rel="icon" href="/favicon.ico" />

        <meta name="facebook-domain-verification" content="yvkpoq3pofwgh5khve8yr37cowzgcc" />
      </Head>
      <Navbar isScrolled={isScrolled}/>
      <main>{children}</main>
      <Footer />
      { isToTop && <Scrolltop isScrolled={isScrolled}/> }
    </div>
  )
}