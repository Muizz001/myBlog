import React, { useEffect, useState } from "react";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import Link from "next/link";
import classes from "../../styles/Post.module.css";
import Layout from "../../components/Layout";
import { addDoc, collection, getDocs, query } from "firebase/firestore/lite";
import db, { auth } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";

const Single = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const id = router.query.id;

  const deletePostHandler = async () => {
    await deleteDoc(doc(db, "posts", `${props.id}`)).then(router.push("/"));
  };

  const uploadComment = async (e) => {
    e.preventDefault();
    const commentRef = collection(db, `posts/${id}/comments`);
    await addDoc(commentRef, {
      comment: comment,
      date: new Date().toDateString(),
      author: auth.currentUser.displayName,
    })
      .then(() => setComment(""))
      .finally(location.reload());
  };

  const user = auth?.currentUser?.displayName;
  const author = props?.post?.author;
  const showIcons = author === user || user === "Admin";
  return (
    <Layout>
      <div className={classes.single}>
        <div className={classes.content}>
          <img
            src={props?.post?.img || "https://picsum.photos/600/400"}
            alt=""
          />
          <div className={classes.user}>
            <div className={classes.info}>
              <span>{props?.post?.author}</span>
              <p>{props?.post?.date}</p>
            </div>

            {showIcons && (
              <div className={classes.edit}>
                <Link
                  href={`/write?edit=${props?.id}&title=${props?.post?.title}&desc=${props?.post?.desc}&img=${props?.post?.img}`}
                  as="/write"
                >
                  <img src={Edit.src} alt="" />
                </Link>
                <img src={Delete.src} alt="" onClick={deletePostHandler} />
              </div>
            )}
          </div>
          <h1>{props?.post?.title}</h1>
          {!loaded ? (
            ""
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props?.post?.desc),
              }}
            ></p>
          )}
        </div>
        <h3>Comments</h3>
        {auth.currentUser && (
          <form onSubmit={uploadComment}>
            <input
              type="text"
              placeholder="Post comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Post</button>
          </form>
        )}
        {props?.comments?.map((comment, i) => (
          <div className={classes.comment}>
            <p>{comment.comment}</p>
            <div className={classes.commentinfo}>
              <span className="author">{comment.author}</span>
              <span className="time">{comment?.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let post;
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.id === context.params.id) {
      post = { ...doc.data() };
    }
  });

  let comments = [];
  const c = query(collection(db, `posts/${context.params.id}/comments`));
  const snapshot = await getDocs(c);
  snapshot.forEach((doc) => {
    comments = [...comments, { ...doc.data(), id: doc.id }];
  });

  return {
    props: {
      post: post,
      id: context.params.id,
      comments: comments,
    },
  };
}

export default Single;
