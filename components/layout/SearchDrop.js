import Link from "next/link";
import {strSlugify } from "../../utils/helpers";
import styles from "../../styles/SearchDrop.module.scss";


export default function SearchDrop(bookObjArray) {

    const booksObj = bookObjArray.booksObj;
    let bookListHtml;

    if(booksObj === false){
        bookListHtml = null;
    }
    else if(booksObj.length === 0){
        bookListHtml = <div className={[styles.search_results, styles.search_results_false].join(" ")}>no results :(</div>
    }
    else{
        bookListHtml = booksObj.map((bookObj) => {
            let title = bookObj.title;
                const titleSlugify = strSlugify(title);
            const isbn = bookObj.isbn10;
            const bid = bookObj.bid;
                const bookUrl = `/title/${titleSlugify}_${bid}`;
            const genre = bookObj.category;
            let authorsHtml;
                const authorsArrayObj = bookObj.authors;
                const authorsArray= authorsArrayObj.map((authorObj) => authorObj.author);

                if(authorsArray.lenght === 1){
                    authorsHtml = <span className={styles.author_box}>{authorsArray[0]}</span>
                }
                else{
                    authorsHtml = authorsArray.join(", ");
                    authorsHtml = authorsHtml.trim();
                    authorsHtml = authorsHtml.substring(0, authorsHtml.length - 1);
                    authorsHtml = <span className={styles.author_box}>{authorsHtml}</span>
                }

            if(title.length > 60){
                title = title.substring(0,60);
                title = title.split(" ").slice(0, -1).join(" ");
                title = title + "..";
            }

            return(
                <Link href={bookUrl} key={bid}>
                    <a className={[styles.search_results, styles.search_results_true].join(" ")}>
                        <div className={styles.search_result_item}>
                            <img src={`https://res.cloudinary.com/readsomnia/image/upload/covers/c_${isbn}.jpg`} width={90} height={120} />
                            <div className={styles.search_result_item_data}>
                                <h3>{title}</h3>
                                <em className={styles.search_result_authors}>
                                    by {authorsHtml}
                                </em>
                                <div className={styles.search_resut_genre}>in {genre}</div>
                            </div>
                        </div>
                    </a>
                </Link>
            ) 
        });
    }

    return (
        <div className={styles.search_drop_box} >{bookListHtml}</div>
    );
}