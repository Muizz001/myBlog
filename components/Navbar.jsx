import Link from "next/link";
import { auth } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const logout = () => {
    signOut(auth)
      .then(() => {
        if (router.asPath !== "/") {
          router.push("/");
        }
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const searchBlog = (e) => {
    e.preventDefault();

    router.push("/search/" + search);
  };
  return (
    <div className="navbar">
      <div className="container">
        <Link className="link" href="/">
          Blog
        </Link>
        <form onSubmit={searchBlog}>
          <input
            type="search"
            placeholder="Search for blog posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </form>
        <div className="links">
          <span>{auth.currentUser?.displayName}</span>
          {auth.currentUser ? (
            <span onClick={logout} className="logout">
              Logout
            </span>
          ) : (
            <Link className="link" href="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" href="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
