import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import RelatedPosts from "../../components/blog/RelatedPosts";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Social from "../../components/layout/Social";
import { getAllPosts, getPostsFromSlug, getSlugs } from "../../utils/helpers_blog";
import styles from "../../styles/blog/PostPage.module.scss";


export default function PostPage({source, meta, relatedPostsMeta}) {

    const router = useRouter();
    const [curUrl, setCurUrl] = useState("");

    // Get the current url
    useEffect(() => {
      const host = window.location.host;
      const baseUrl = `https://${host}`;

      setCurUrl(`${baseUrl}${router.asPath}`);
    }, [router.asPath]);


    console.log(meta);
    const components = { Link, Image, }

    let postDate = new Date(meta.date);
    postDate = postDate.toLocaleDateString('en-us', {month:"short", day:"numeric"});    // like May 8
    const postTopic = meta.topic;
    const topicSlug = postTopic.replace(/^\s+|\s+$/g, '').replace(/\s/g, '-').toLocaleLowerCase();

    const metaTitle = meta.meta_title;
    const metaDescription = meta.meta_description;

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
                            height={370}
                        />
                        <div className={styles.post_heading}>
                            <div className={styles.post_meta}><Link href="/blog/"><a className={styles.post_meta_home}>ReadsOmnia blog ›</a></Link> {postDate}, from <span>{meta.author}</span> in <Link href={`/blog/topic/${topicSlug}`}><a>{postTopic}</a></Link></div>
                            <h1>{meta.title}</h1>
                            <p className={styles.post_excerpt}>{meta.excerpt}</p>
                        </div>

                        <div className={styles.post_body}>
                            <MDXRemote {...source} components={components} />
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

    return {
        props:{
            source: mdxSource,
            meta,
            relatedPostsMeta,
        }
    }
}