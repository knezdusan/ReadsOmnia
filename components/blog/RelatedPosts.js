import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/blog/RelatedPosts.module.scss";

export default function RelatedPosts({relatedPosts}) {
    return (
        <div className={styles.post_footer}>
            <h3 className={styles.rel_posts_h1}>Related Posts:</h3>
            <div className={styles.rel_posts}>
                {
                    relatedPosts.map((relPost) => {
                        const relPostHeroSrc = `/blog/${relPost.index}/${relPost.hero}`;

                        return(
                            <Link href={`/blog/${relPost.slug}`} key={relPost.slug}>
                                <a className={styles.rel_post_box}>
                                    <Image
                                        unoptimized={true}
                                        src={relPostHeroSrc}
                                        alt={relPost.title}
                                        layout="responsive"
                                        width={265}
                                        height={140}
                                    />
                                    <div className={styles.rel_post_data}>
                                        <h4>{relPost.title}</h4>
                                        <p>{relPost.excerpt}</p>
                                    </div>
                                </a>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    );
}