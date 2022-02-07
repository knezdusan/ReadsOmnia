import Head from "next/head";
import PostsList from "../../components/blog/PostsList";
import { getAllPosts } from "../../utils/helpers_blog";
import styles from "../../styles/blog/Home.module.scss";



export default function Home({postsMeta}) {
    return (
        <>
            <Head>
                <title>ReadsOmnia Blog</title>
                <meta name="description" content="ReadsOmnia Blog" />
            </Head>

            <div className={styles.posts_lists_main}>
                <div className={styles.posts_lists_wrapper}>
                    <div className={styles.post_lists_wrapper_inner}>
                        <h1>ReadsOmnia Blog</h1>
                        <PostsList postsMeta={postsMeta}/>
                    </div>
                </div>
            </div>
        </>

    );
}


export const getStaticProps = async ( ) => {
    const postsMeta = getAllPosts().slice(0, 30).map((post) => post.meta);

    console.log(postsMeta);

    return {
        props:{ postsMeta }
    }
}