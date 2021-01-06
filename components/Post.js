import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

function Post({ postData }) {
  return (
    <li className={utilStyles.listItem} key={postData.title}>
      <Link href={`/posts/${postData.slug}`}>
        <a>{postData.title}</a>
      </Link>
      <br />
      <small className={utilStyles.lightText}>
        {/* <Date dateString={p.date} /> */}
      </small>
    </li>
  );
}

export default Post;
