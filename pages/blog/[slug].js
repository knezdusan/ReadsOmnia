import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import RelatedPosts from "../../components/blog/RelatedPosts";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Social from "../../components/layout/Social";
import YouTube from "../../components/blog/YouTube";
import BookBlock from "../../components/blog/BookBlock";
import { getAllPosts, getPostsFromSlug, getSlugs} from "../../utils/helpers_blog";
import { ifEmptyUndefinedNull } from "../../utils/helpers";
import styles from "../../styles/blog/PostPage.module.scss";


/*
{
    index: 0,
    slug: 'what-is-readsomnia',
    title: 'ReadsOmnia - Beyond the Trending Hashtag',
    meta_title: '',
    meta_description: 'What is Readsomnia?',
    hero: 'what-is-readsomnia.jpg',
    topic: 'ReadsOmnia',
    author: 'ReadsOmnia',
    date: '2020-05-09',
    toc: false,
    related: [],
    excerpt: 'In the time of hyper-production in publishing industry, ReadsOmnia brings a fresh and moderated selection of the best fiction and nonfiction books to your must-read collection.'
  }
*/


export default function PostPage({source, meta, relatedPostsMeta, postBooksData}) {

    const router = useRouter();
    const [curUrl, setCurUrl] = useState("");

    // Get the current url
    useEffect(() => {
      const host = window.location.host;
      const baseUrl = `https://${host}`;

      setCurUrl(`${baseUrl}${router.asPath}`);
    }, [router.asPath]);

    const components = { Link, Image, YouTube, BookBlock, }

    let postDate = new Date(meta.date);
    postDate = postDate.toLocaleDateString('en-us', {month:"short", day:"numeric"});    // like May 8
    const postTopic = meta.topic;
    const topicSlug = postTopic.replace(/^\s+|\s+$/g, '').replace(/\s/g, '-').toLocaleLowerCase();

    const metaTitle = ifEmptyUndefinedNull(meta.meta_title) ? meta.title : meta.meta_title;
    const metaDescription = ifEmptyUndefinedNull(meta.meta_description) ? meta.excerpt: meta.meta_description;

    const postImgSrc = `/blog/${meta.index}/${meta.hero}`;



    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />


                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle}/>
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:site" content="@readsomnia" />
                <meta name="twitter:creator" content="@readsomnia" />
                <meta name="twitter:image" content={postImgSrc}/>

                {/* Open Graph general (Facebook, Pinterest) */}
                <meta property='og:title' content={metaTitle} />
                <meta property='og:description' content={metaDescription} />
                <meta property='og:url' content={curUrl} />
                <meta property="og:site_name" content="readsomnia.com" />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={postImgSrc} />
            </Head>

            <div className={styles.posts_main}>
                <div className={styles.posts_wrapper}>
                    <div className={styles.post_wrapper_inner}>
                        <Image
                            unoptimized={true}
                            priority={true}
                            src={postImgSrc}
                            alt={metaTitle}
                            layout="responsive"
                            width={850}
                            height={400}
                        />
                        <div className={styles.post_heading}>
                            <div className={styles.post_meta}><span className={styles.post_meta_links}><Link href="/blog/"><a className={styles.post_meta_home}>ReadsOmnia blog ›</a></Link> <Link href={`/blog/topic/${topicSlug}`}><a className={styles.post_meta_topic}>{postTopic} ›</a></Link></span> {postDate}, from <span>{meta.author}</span> </div>
                            <h1>{meta.title}</h1>
                            <p className={styles.post_excerpt}>{meta.excerpt}</p>
                        </div>

                        <div className={styles.post_body}>
                            <MDXRemote {...source} components={components} scope={postBooksData}/>
                        </div>

                        { meta.related.length > 0 ? <RelatedPosts relatedPosts={relatedPostsMeta}/> : null }
                    </div>
                    <Social title={metaTitle} cururl={curUrl} />
                </div>
            </div>
        </>
    );
}


export const getStaticPaths = async () => {
    const paths = getSlugs().map((slug) => {
        return {params: {slug}}
    });

    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async ({params}) => {
    const { slug } = params;
    const postIndex = getSlugs().indexOf(slug);
    const {meta, content} = getPostsFromSlug(slug, postIndex);
    const mdxSource = await serialize(content, {
        mdxOptions:{
            rehypePlugins:[
                rehypeSlug,
                [rehypeAutolinkHeadings, {behavior: "wrap"}],
            ],
        }
    });

    // Related posts:
    const relatedPostsMeta = getAllPosts().filter((post) => meta.related.includes(post.meta.slug) ).map((post) => post.meta);

    // Blogpost books:
    let postBooksData = "";

    if(!ifEmptyUndefinedNull(meta.books)){
        const blogpostBooks = meta.books        // like: '0060530626-014118499X-0061233846-0385738722'
        const apiSlug = "bpbooks_"+blogpostBooks; // like: 'bpbooks_0060530626-014118499X-0061233846-0385738722'

        const { data } = await axios.get(
          process.env.RO_API_URL + apiSlug,
          {
            headers: {
              'Authorization': `${process.env.RO_API_KEY}`
            },
            timeout: 30000, // 30s
          }
        )

        postBooksData = data;
    }


    return {
        props:{
            source: mdxSource,
            meta,
            relatedPostsMeta,
            postBooksData,
        }
    }
}