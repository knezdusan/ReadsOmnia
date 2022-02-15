import { StylesContext } from "@material-ui/styles";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/blog/PostsList.module.scss";

export default function PostsList({postsMeta}) {
    return (
        <ul className={styles.posts_list_box}>
            {postsMeta.map((postMeta) => {
                const postImgSrc = `/blog/${postMeta.index}/${postMeta.hero}`;
                let postDate = new Date(postMeta.date);
                postDate = postDate.toLocaleDateString('en-us', {month:"short", day:"numeric"});    // like May 8
                const postTopic = postMeta.topic;
                const topicSlug = postTopic.replace(/^\s+|\s+$/g, '').replace(/\s/g, '-').toLocaleLowerCase();

                return(
                    <li key={postMeta.slug}>
                        <Link href={`/blog/${postMeta.slug}`}>
                            <a className={styles.post_list_item}>
                                <Image
                                    unoptimized={true}
                                    src={postImgSrc}
                                    alt={postMeta.meta_title}
                                    layout="responsive"
                                    width={850}
                                    height={400}
                                />
                                <div className={styles.post_list_item_data}>
                                    <h2 className={styles.post_list_item_title}>{postMeta.title}</h2>
                                    <p className={styles.post_list_item_excerpt}>{postMeta.excerpt}</p>
                                    <div className={styles.post_list_item_meta}>{postDate} from <span>{postMeta.author}</span> in <Link href={`/blog/topic/${topicSlug}`}><a>{postTopic}</a></Link></div>
                                </div>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}