import Link from "next/link";
import Layout from "../../components/Layout";
import classes from "../../styles/Home.module.css";
import { collection, query, getDocs, where } from "firebase/firestore/lite";
import db from "../../firebase";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <Layout>
      <div className={classes.home}>
        <div className={classes.posts}>
          {props.posts.map((post, i) => (
            <div className={classes.post} key={i}>
              <div className={classes.img}>
                <img src={post.img || "https://picsum.photos/600/400"} alt="" />
              </div>
              <div className={classes.content}>
                <Link className="link" href={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{!loaded ? "" : getText(post.desc)}</p>
                <Link href={"/post/" + post?.id}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let posts = [];
  const q = query(
    collection(db, "posts"),
    where("title", "==", context.params.search)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    posts = [...posts, { ...doc.data(), id: doc.id }];
  });

  return {
    props: {
      posts: posts,
    },
  };
}

export default Home;
