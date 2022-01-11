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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Special+Elite&display=swap" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isScrolled={isScrolled}/>
      <main>{children}</main>
      <Footer />
      { isToTop && <Scrolltop isScrolled={isScrolled}/> }
    </div>
  )
}