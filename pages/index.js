import { useEffect, useState } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
// import Date from '../components/date'

import { fetchEntries } from "../util/contenfulPosts";
import Post from "../components/Post";

export default function Home({ posts }) {
  console.log(posts)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Insights and knowledge to help find freedom from sin</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map((post) => (
            <li className={utilStyles.listItem} key={post.sys.id}>
              <Link href={`/posts/${post.fields.slug}`}>
                <a>{post.fields.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {/* <Date dateString={date} /> */}
              </small>
            </li>
          ))}
        </ul>

      </section>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export async function getStaticProps() {
  const data = await fetchEntries();
  console.log('data', data)
  return {
    props: {
      posts: data
    },
  };
}
