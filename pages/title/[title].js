import Image from "next/image";
import Link from 'next/link';
import Head from "next/head";
import Social from "../../components/layout/Social";
import Rating from "../../components/layout/Rating";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import styles from "../../styles/Title.module.scss";
import axios from "axios";
import { cleanHtml, strSlugify } from "../../utils/helpers";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Person from "@material-ui/icons/Person";
import ArrowBack from "@material-ui/icons/ArrowBack";

import dynamic from 'next/dynamic';
const YouTubeComponent = dynamic(() => import('../../components/YouTube'))


export default function Title({bookData}) {

  const router = useRouter();
  const [curUrl, setCurUrl] = useState("");

  // Get the current url
  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `https://${host}`;

    setCurUrl(`${baseUrl}${router.asPath}`);
  }, [router.asPath]);

  if( bookData === void 0){
    return(
      <div style={{textAlign:"center"}}>Fetching book data...</div>
    )
  }

  // Main data blocks
  const mainData = bookData["book_data"][0];
  const authorsArray = bookData["authors"];
  const reviewsArray = bookData["reviews"];
  const relatedArray = bookData["related"];

  const coverUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/c_${mainData.isbn10}.jpg`;
  const coverBlurUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/blur/c_${mainData.isbn10}.jpg`;
  const amazonTitleUrl = `https://www.amazon.com/dp/${mainData.isbn10}/`


  // Date formating

  let d = new Date(mainData.published);

  let options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
  };
  
  const published = d.toLocaleDateString('en-ZA', options);

  // Authors block
  let authorsBox;
  let authorNamesArray;
  let authorNamesString; // like John Dow, Will Grace..
  
  if(authorsArray.length > 0){
    authorsBox = authorsArray.map((authorObj) => {
      const authorName = authorObj.author;
      const authorImgSrc = `https://res.cloudinary.com/readsomnia/image/upload/authors/a_${authorObj.amid}.jpg`;
      const authorAmazonUrl = `https://www.amazon.com${authorObj.url}${authorObj.amid}`
  
      return (
        <div className={styles.author_box} key={authorObj.aid}>
          <Link href={authorAmazonUrl}>
            <a className={styles.author_img}>
              <Image alt={`${authorName} - ${mainData} author`} src={authorImgSrc} width={65} height={65} />
              <div className={styles.author_name}>{authorName}</div>
            </a>
          </Link>
        </div>
      );
    });

    // Extract only Authors names array, as it will be used to compose the page title and description tags
    authorNamesArray = authorsArray.map((authorObj) => authorObj.author);
    authorNamesString = authorNamesArray.join(", ");  // like John Dow, Will Grace..
  }


  let titleSize = 1.7;
  const bookTitle = mainData.title;
  if(bookTitle.length < 65){
    titleSize = 1.8;
  }
  if(bookTitle.length < 35){
    titleSize = 2;
  }
  if(bookTitle.length > 65){
    titleSize = 1.4;
  }
  if(bookTitle.length > 120){
    titleSize = 1.2;
  }


  // Synopsis
  const synopsis = cleanHtml(mainData.synopsis);

  // Editorial Reviews section
  const editorialsSection = (editorials) => {
    const editorialsHtml = cleanHtml(mainData.editorials);
    return (
      <div className={styles.editorials_box}>
        <h2>Editorial Reviews</h2>
        <div className = {styles.title_editorials} dangerouslySetInnerHTML={{ __html: editorialsHtml }} />
        <button className = {styles.buy_book} onClick={() => router.push(`${amazonTitleUrl}`)}><ShoppingCart style={iconStyles}/>Buy This Book ›</button>
      </div>
    )
  }

  // Readers reviews
  let reviewsBox;
  let reviewer = "";
  
  if(reviewsArray.length > 0){
    reviewsBox = reviewsArray.map((reviewObj) => {
      const rwId = reviewObj.rid;
      const rwRating = reviewObj.rating;
      let rwName = reviewObj.reviewer;
      const rwReview = reviewObj.review.replace(/<br>/gm," ");

      if(rwReview.length > 50){

        if(reviewer != ""){
          rwName = rwName.replace(reviewer, "");
        }
  
        reviewer = rwName + reviewer;
  
        rwName = rwName.replace(/Amazon/g," ");
        rwName = rwName.replace(/Customer/g," ");
        if(rwName.length > 20){
          rwName = rwName.substring(0,20);
        }
      
  
        let iconPersonStyles = {
          // border: '2px solid green',
        }
  
        return (
          <div className={styles.review_box} key={reviewObj.rid}>
              <div className={styles.review_heading}>
                <div className = {styles.review_rating}><Rating rating={rwRating}/></div>
                <div className = {styles.reviewer}>
                  <Person style={iconPersonStyles}/>
                  <em className = {styles.review_name}> {rwName}</em>
                </div>
              </div>
              <div className = {styles.review_content}>{ rwReview }</div>
          </div>
        );
      }
    });
  }

  const reviewsSection = (reviews) => {
    return (
      <section className={styles.reviews_section}>
        <div className={styles.reviews_box}>
          <h2>Readers Top Reviews</h2>
          <div className = {styles.reviews_list}>{reviews}</div>
          <button className = {styles.buy_book} onClick={() => router.push(`${amazonTitleUrl}`)}><ShoppingCart style={iconStyles}/>Buy This Book ›</button>
        </div>
      </section>
    )
  }

  // Excerpt or Video review section
  let excerptSection;
  if(mainData.excerpt.length > 50){
    excerptSection = () => {
      const excerptHtml = cleanHtml(mainData.excerpt);
      return (
        <section className={styles.excerpt_section}>
          <div className={styles.excerpt_box}>
            <h2>Short Excerpt Teaser</h2>
            <div className = {styles.title_excerpt} dangerouslySetInnerHTML={{ __html: excerptHtml }} />
            <button className = {styles.buy_book} onClick={() => router.push(`${amazonTitleUrl}`)}><ShoppingCart style={iconStyles}/>Buy This Book ›</button>
          </div>
        </section>
      )
    }
  }
  else if(mainData.video && mainData.video.length > 5){
    excerptSection = () => {
      return (
        <section className={styles.video_section}>
          <div className={styles.video_box}>
            <h2>Featured Video</h2>
            <YouTubeComponent  ytid={mainData.video} yttitle={mainData.title} />
            <button className = {styles.buy_book} onClick={() => router.push(`${amazonTitleUrl}`)}><ShoppingCart style={iconStyles}/>Buy This Book ›</button>
          </div>
        </section>
      )
    }
  }
  else{
    excerptSection = () =>  <></>
  }


  // Related titles
  let relatedBox;

  if(Array.isArray(relatedArray) && relatedArray.length > 0){
    relatedBox = relatedArray.map((relatedObj) => {
      const rlId = relatedObj.bid;
      const rlTitle = relatedObj.title;
      const rlIsbn = relatedObj.isbn10;

      const titleSlugify = strSlugify(rlTitle);
      const rlBookUrl = `/title/${titleSlugify}_${rlId}`;

      const rCoverUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/c_${rlIsbn}.jpg`;
      const rCoverBlurUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/blur/c_${rlIsbn}.jpg`;
      
      return (
        <Link href={rlBookUrl} key={relatedObj.bid}>
          <a className={styles.rl_book_cover}>
            <Image alt={`${rlTitle} book cover`} src={rCoverUrlSrc} width={230} height={345} placeholder="blur" blurDataURL={rCoverBlurUrlSrc} />
          </a>
        </Link>
      );
    })
  }

  const relatedSection = (related) => {
    return (
      <section className={styles.related_section}>
        <div className={styles.related_box}>
          <h2>Related Titles</h2>
          <div className = {styles.related_list}>{related}</div>
          <button className = {styles.buy_book} onClick={() => router.push(`/`)}><ArrowBack style={iconStyles}/>Back to Main Catalog</button>
        </div>
      </section>
    )
  }

  let iconStyles = {
    fontSize: '2rem',
    marginRight: '0.5rem',
    marginLeft: '-0.3rem'
  };

  // Title and description meta tags ********

  // Meta Title:
  let metaTitle = bookTitle;
  let bookTitleHasAuthor = false;

  if( bookData === void 0){
    return(
      <h1>No data fetched for this book</h1>
    )
  }

  if(authorNamesArray != void 0){
    for (let bookAuth of authorNamesArray){
      if(metaTitle.includes(bookAuth)){
        bookTitleHasAuthor = true;
      }
    }
  }


  if(!bookTitleHasAuthor){
    metaTitle += ` - book by ${authorNamesString}`;
  }

  metaTitle += ' | ReadsOmnia';

  // Meta Descritpion

  const metaLength = bookTitle.length > 30 ? 155 : 120;

  let metaDescription = synopsis;
  metaDescription = metaDescription.split("<br>").join(" ");
  metaDescription = metaDescription.split("<i>").join("");
  metaDescription = metaDescription.split("</i>").join("");
  metaDescription = metaDescription.split("<b>").join("");
  metaDescription = metaDescription.split("</b>").join("");

  metaDescription = metaDescription.trim().substring(0, metaLength);

  let lastIndex = metaDescription.lastIndexOf(" ");
  metaDescription = metaDescription.substring(0, lastIndex);

  if(!metaDescription.includes(mainData.title) && bookTitle.length <= 30){
    metaDescription += `.. "${mainData.title}"`;
  }
  else{
    metaDescription += `.. readsOmnia`;
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription}/>

        <meta property='og:title' content={metaTitle}/>
        <meta property='og:image' content={coverUrlSrc}/>
        <meta property='og:description' content={metaDescription}/>
        <meta property='og:url' content={curUrl} />
      </Head>
      
      <div className={styles.main_content}>
  
        {/* <div className={styles.top_space}> </div> */}
        <div className={styles.main_box_wrapper}>

          <div id={mainData.isbn10} className={styles.main_box}>
            <section className={styles.title_top}>
              <div className = {styles.title_info_left}>
                <div id="cover_box" className = {styles.title_cover} >
                  <Image alt={`${mainData.title} - book cover`} src={coverUrlSrc} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={coverBlurUrlSrc} priority />
                </div>
                <div className = {styles.title_rating}><Rating rating={mainData.rating}/></div>
                <div className = {styles.title_genres}>
                    <div>{mainData.category}</div>
                    <div>{mainData.genre}</div>
                </div>
                <div className={styles.title_details}>
                  <ul>
                    <li key="1"><strong>Publisher : </strong> {mainData.publisher}</li>
                    <li key="2"><strong>Publis date : </strong> {published}</li>
                    <li key="3"><strong>Pages : </strong> {mainData.pagesno}</li>
                    <li key="4"><strong>ISBN-10 : </strong> {mainData.isbn10}</li>
                    <li key="5"><strong>ISBN-13 : </strong> {mainData.isbn13}</li>
                    <li key="6"><strong>Language : </strong> {mainData.lang}</li>
                  </ul>
                  <div className = {styles.authors_box}>{ authorsBox }</div>
                </div>
              </div>
              <div className = {styles.title_info_right}>
                <h1 style={{fontSize: `${titleSize}rem`}}>{mainData.title}</h1>
                { mainData.synopsis.length > 20 ? <div className = {styles.title_synopsys} dangerouslySetInnerHTML={{ __html: synopsis }} /> : <></> }
                <button className = {styles.buy_book} onClick={() => router.push(`${amazonTitleUrl}`)}><ShoppingCart style={iconStyles}/>Buy This Book ›</button>
              </div>
            </section>

            { mainData.editorials.length > 50 ? <section className={styles.title_editorials_section}>{editorialsSection(mainData.editorials)}</section> : <></> }

            { reviewsArray.length > 0 ? reviewsSection(reviewsBox) : <></> }

            { excerptSection() }

            { relatedArray.length > 0 ? relatedSection(relatedBox) : <></> }

          </div>
          <Social title={metaTitle} cururl={curUrl} />
        </div>
      </div>
    </>
  );

}


export async function getStaticPaths() {
  // Call an external API endpoint to get initial book ids (top_general_view table)
  const { data } = await axios.get(
    process.env.RO_API_URL+"bids",
    {
      headers: {
        'Authorization': `${process.env.RO_API_KEY}`
      },
      timeout: 30000, // 30s
    }
  )

  // Get the paths we want to pre-render based on posts
  const paths = data["book_titles"].map((btitle) => ({
    params: { title: btitle },
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({params}) {

  // const router = useRouter();
  // const { title } = router.query;

  const title = params.title; // like tom-clancy-chain-of-command-a-jack-ryan-novel_1296

  // validate title and extract bookid (eg: tom-clancy-chain-of-command-a-jack-ryan-novel_1296)
  const lastIndex = title.lastIndexOf('_');
  let bookData = [];

  if(lastIndex > 0){
    const titleID = title.split("_").pop(); // like 1296
    const bookId = "book_"+titleID // like book_1296

    const { data } = await axios.get(
      process.env.RO_API_URL + bookId,
      {
        headers: {
          'Authorization': `${process.env.RO_API_KEY}`
        },
        timeout: 30000, // 30s
      }
    )

    bookData = data;
  }

  // const dataJson = await import('../public/data.json');
  // const data = JSON.parse(JSON.stringify(dataJson));

  return {
    props: {
      bookData: bookData || [],
    },
  };
}
