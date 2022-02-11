import Link from "next/link";
import Head from "next/head";
import BlogTopics from "../../../components/blog/BlogTopics";
import PostsList from "../../../components/blog/PostsList";
import { getAllPosts, getSlugFromTopic, getAllTopicSlugsArr, getAllTopicsSlugsCombo } from "../../../utils/helpers_blog";
import styles from "../../../styles/blog/Home.module.scss";

export default function Topic({postsMeta, getAllTopicsSlugsCombo}) {

    const topic = postsMeta[0].topic;

    return (
        <>
            <Head>
                <title>{topic} - ReadsOmnia Blog</title>
                <meta name="description" content="ReadsOmnia Blog Topic" />
            </Head>

            <div className={styles.blog_main}>
                <div className={styles.blog_main_wrapper}>
                    <div className={styles.blog_main_wrapper_inner}>
                        <div className={styles.blog_main_heading}>
                            <div className={styles.blog_heading_top}>
                                <Link href="/blog/"><a className={styles.blog_home_title_link}>◂ReadsOmnia Blog</a></Link>
                                <BlogTopics topics={getAllTopicsSlugsCombo}/>
                            </div>
                            <h1 className={styles.blog_heading_bottom}>{topic}</h1>
                        </div>
                        <PostsList postsMeta={postsMeta}/>
                    </div>
                </div>
            </div>
        </>

    );
}


export const getStaticPaths = async () => {

    const paths = getAllTopicSlugsArr.map((topicSlug) => ({params: {topic: topicSlug}}));

    return {
        paths,
        fallback:false
    }
}


export const getStaticProps = async ({params}) => {
    const { topic } = params;
    const postsMeta = getAllPosts().slice(0, 50).filter((post) => getSlugFromTopic(post.meta.topic) === topic).map((post) => post.meta);

    return {
        props:{ postsMeta, getAllTopicsSlugsCombo }
    }
}