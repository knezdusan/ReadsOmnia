import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Rating from "../layout/Rating";
import { synopsisFixFormat, synopsisFixLength, strSlugify, genreArray } from "../../utils/helpers";
import styles from "../../styles/blog/BooksBlock.module.scss";
import InfoOutlined from "@material-ui/icons/InfoOutlined";

export default function BookBlock({isbn, books, show_authors}) {
    const router = useRouter();

    const bookData = books.filter((book) => (book.isbn10 === isbn))[0];

    const coverUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/c_${bookData.isbn10}.jpg`;
    const coverBlurUrlSrc = `https://res.cloudinary.com/readsomnia/image/upload/covers/blur/c_${bookData.isbn10}.jpg`;

    let authors;
    const authorsArray = bookData.authors;
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
    const itemTitle = bookData.title;
    if(itemTitle.length < 65){
      titleSize = 1.6;
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

    const bookUrl = `/title/${titleSlugify}_${bookData.bid}`;

    // Fix synopsis format for diff resolutions
    let synopsis = synopsisFixFormat(bookData.synopsis);
    synopsis = synopsisFixLength(synopsis, 200);


    let iconStyles = {
        fontSize: '2rem',
        marginRight: '0.5rem',
        marginLeft: '-0.3rem'
    };




    return (
        <div className={styles.book_box}>
            <Link href={bookUrl}><a className={styles.book_item_cover} >
                <Image unoptimized={true} alt={`${itemTitle} - book cover`} src={coverUrlSrc} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={coverBlurUrlSrc} />
            </a></Link>

            <div className = {styles.book_item_info}>
                <div className={styles.book_item_info_top}>
                    <div className = {styles.book_item_genre}>{bookData.category in genreArray ? <Link href={`/genre/${genreArray[bookData.category]}`}><a>{bookData.category}</a></Link> : bookData.category} › {bookData.genre}</div>
                    <div className = {styles.book_item_rating}><Rating rating={bookData.rating}/></div>
                </div>
                <div className = {styles.title_section}>
                    <h3 style={{fontSize: `${titleSize}rem`}}>{itemTitle}</h3>
                    { show_authors ? <div className = {styles.book_item_authors}>{ authorNamesArray.length > 0 && `by ${authors}`}</div> : <></> }
                </div>
                <div className = {styles.book_item_synopsys}>{synopsis}</div>
                <div className = {styles.book_item_info_down}>
                    <button className = {styles.info_button} onClick={() => router.push(`${bookUrl}`)}><InfoOutlined style={iconStyles}/>More Info</button>
                </div>
            </div>
        </div>
    );
}