import classes from "../styles/Write.module.css";
import Layout from "../components/Layout";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import db, { auth } from "../firebase";
import { collection, doc } from "firebase/firestore/lite";
import { setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";

const Write = () => {
  const router = useRouter();
  const storage = getStorage();
  const editTitle = router.query.title;
  const editId = router.query.edit;
  const editDesc = router.query.desc;
  const editImg = router.query.img;

  if (!auth.currentUser) router.push("/login");

  const [value, setValue] = useState(editDesc ? editDesc : "");
  const [title, setTitle] = useState(editTitle ? editTitle : "");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const publish = async () => {
    if (title === "" || value === "") {
      setError(true);
      return;
    }
    if (file) {
      const fileId = crypto.randomUUID();
      const imgRef = ref(storage, `images/${fileId}`);
      uploadBytes(imgRef, file)
        .then(() => alert("upload succesfull"))
        .finally(() =>
          getDownloadURL(imgRef).then(async (imageUrl) => {
            if (editId) {
              await setDoc(
                doc(db, "posts", `${editId}`),
                {
                  title: title,
                  desc: value,
                  img: imageUrl,
                },
                { merge: true }
              ).then(router.push("/post/" + editId));
              return;
            }

            const postsRef = collection(db, "posts");
            await setDoc(doc(postsRef), {
              title: title,
              desc: value,
              date: new Date().toDateString(),
              author: auth.currentUser.displayName,
              img: imageUrl,
            }).then(router.push("/"));
          })
        );
      return;
    }

    if (editId) {
      await setDoc(
        doc(db, "posts", `${editId}`),
        {
          title: title,
          desc: value,
          img: editImg,
        },
        { merge: true }
      ).then(router.push("/post/" + editId));
      return;
    }

    const postsRef = collection(db, "posts");
    await setDoc(doc(postsRef), {
      title: title,
      desc: value,
      date: new Date().toDateString(),
      author: auth.currentUser.displayName,
      img: "",
    }).then(router.push("/"));
  };

  return (
    <Layout>
      <div className={classes.add}>
        <div className={classes.content}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && <p>Please fill out all fields</p>}
          <div className={classes.editorContainer}>
            <ReactQuill
              className={classes.editor}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className={classes.menu}>
          <div className={classes.item}>
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className={classes.file} htmlFor="file">
              Upload Image
            </label>
            <div className={classes.buttons}>
              <button className={classes.save}>Save as a draft</button>
              <button className={classes.publish} onClick={publish}>
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Write;
