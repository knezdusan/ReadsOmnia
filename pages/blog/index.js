import Head from "next/head";
import BlogTopics from "../../components/blog/BlogTopics";
import PostsList from "../../components/blog/PostsList";
import { getAllPosts, getAllTopicsSlugsCombo } from "../../utils/helpers_blog";
import styles from "../../styles/blog/Home.module.scss";



export default function Home({postsMeta, getAllTopicsSlugsCombo}) {
    return (
        <>
            <Head>
                <title>ReadsOmnia Blog</title>
                <meta name="description" content="ReadsOmnia Blog" />
            </Head>

            <div className={styles.blog_main}>
                <div className={styles.blog_main_wrapper}>
                    <div className={styles.blog_main_wrapper_inner}>
                        <div className={styles.blog_main_heading}>
                            <h1>ReadsOmina Blog</h1>
                            <BlogTopics topics={getAllTopicsSlugsCombo}/>
                        </div>
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
        props:{ postsMeta, getAllTopicsSlugsCombo }
    }
}