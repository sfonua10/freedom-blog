import { useEffect, useState } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from 'next/link'

let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'post'
  })
  return {
    props: {
      posts: data.items
    },
    revalidate: 1,
  };
}

export default function Home({ posts }) {
  const [myPosts, setMyPosts] = useState(posts);
  useEffect(() => {
    const initialPosts = posts.filter(post => post?.fields?.type !== 'incidents');
    setMyPosts(initialPosts);
  }, []);

  const filterBlogs = () => {
    const incidentPosts = posts.filter(post => post?.fields?.type === 'incidents');
    setMyPosts(incidentPosts);
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Insights and knowledge to help <span onClick={filterBlogs}>find</span> freedom from sin </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {myPosts.map((post) => (
            <li className={utilStyles.listItem} key={post.sys.id}>
              <Link href={`/articles/${post.fields.slug}`}>
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

