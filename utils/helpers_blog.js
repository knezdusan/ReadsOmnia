import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";


/*
   {
    index: 9,
    slug: '2020-product-update',
    title: '9 What is ReadsOmnia?',
    meta_title: '9 What is Readsomina?',
    meta_description: '9 What is Readsomnia?',
    hero: 'october-2020-product-update.jpg',
    topic: 'ReadsOmnia',
    author: 'Team ReadsOmnia',
    date: '2020-08-31',
    toc: false,
    related: [],
    excerpt: '9 In the time of hyper-production in publishing industry, ReadsOmnia brings a fresh and moderated selection of the best fiction and nonfiction books to your must-read collection.'
   },
*/

const POSTS_PATH = path.join(process.cwd(), "posts");

export const getSlugs = () => {
    const paths = sync(POSTS_PATH + '/*.mdx');
        // eg: ['D:/websites/readsOmnia/rosite/0_what-is-readsomnia.mdx', 'D:/websites/readsOmnia/rosite/posts/1_common-cyber-security-risks.mdx']
    const numericSlugsArray = paths.map( path => {
        const partsArray = path.split("/");
        const fileName = partsArray[partsArray.length - 1];         // 1_common-cyber-security-risks.mdx
        const fileSlug= fileName.split(".")[0];                    // like 1_common-cyber-security-risks
        return fileSlug.split("_");                               // like [1, common-cyber-security-risks]
    })

    // Sorting all posts by the post number ascending (0, 1, 2 .. - so we can use the slugArray index to get numeric part of file, eg 3 in 3_third-post.mdx)
    let slugsArray = []
    for (const slugArrayItem of numericSlugsArray){
        slugsArray[parseInt(slugArrayItem[0])] = slugArrayItem[1];
    }

    return slugsArray;
}

export const getPostsFromSlug = (slug, index) => {
    const postPath = path.join(POSTS_PATH, `${index}_${slug}.mdx`);
    const source = fs.readFileSync(postPath);
    const { content, data } = matter(source);

    const meta = {index, slug, ...data};

    return {
        meta,
        content,
    }
}

export const getAllPosts = () => {
    const posts = getSlugs()
        .map((slug, index) => getPostsFromSlug(slug, index))
        .sort((a, b) => {
            if(a.meta.date > b.meta.date) return 1;
            if(a.meta.date < b.meta.date) return -1;
            return 0;
        })
        .reverse();

    return posts;
}


// **** Topics handle

export const getSlugFromTopic = (topic) => topic.replace(/^\s+|\s+$/g, '').replace(/\s/g, '-').toLocaleLowerCase();

export const getAllTopicsArr = () => {
    const postsArr = getAllPosts();
    const topicsSet = new Set(postsArr.map((post) => post.meta.topic)); // to make the topics list unique
    const topicsArr = Array.from(topicsSet).map((topic) => topic);

    return topicsArr;
}

export const getAllTopicSlugsArr = getAllTopicsArr().map((topic) => getSlugFromTopic(topic));

export const getAllTopicsSlugsCombo = getAllTopicsArr().map((topic) => ([getSlugFromTopic(topic), topic]));

