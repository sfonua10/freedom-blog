import styled from "@emotion/styled";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import Image from "next/image";

const Wrapper = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
`;
let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  let data = await client.getEntries({
    content_type: "post",
  });

  return {
    paths: data.items.map((post) => ({
      params: { slug: post.fields.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let data = await client.getEntries({
    content_type: "post",
    "fields.slug": params.slug,
  });
  return {
    props: {
      article: data.items[0],
    },
    revalidate: 1,
  };
}
const Post = ({ article }) => {
  if(!article) return <div>404</div>
  return (
    <div>
      <Head>
        <title>{article.fields.title}</title>
        <link rel="icon" href="/favicon_io/apple-touch-icon.png" />
      </Head>
      <Wrapper>
        <h1>{article.fields.title}</h1>
        {article?.fields?.image && (
          <Image
            src={"https:" + article?.fields?.image?.fields?.file?.url}
            width={article?.fields?.image?.fields.file.details.image.width}
            height={article?.fields?.image?.fields.file.details.image.height}
          />
        )}
        <h4>{article.fields.subtitle}(self-awareness)</h4>
        {documentToReactComponents(article.fields.content)}
      </Wrapper>
    </div>
  );
};

export default Post;
