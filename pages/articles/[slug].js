import styled from "@emotion/styled";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

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

  const paths = data.items.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return { paths, fallback: false };
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
  };
}
const Post = ({ article }) => {
  console.log(article);
  return (
    <>
      <Wrapper>
        <h1>{article.fields.title}</h1>
        <img src={article.fields.image.fields.file.url} />
        <h4>{article.fields.title}</h4>
        {documentToReactComponents(article.fields.content)}
      </Wrapper>
    </>
  );
};

export default Post;
