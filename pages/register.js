import Link from "next/link";
import classes from "../styles/Auth.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      setError(true);
      return;
    }
    if (password.length < 7) {
      setShortPassword(true);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.auth}>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>Please fill in all fields</p>}
        {shortPassword && <p>Your password must be longer than 7 characters</p>}
        <button type="submit">Register</button>
        <span>
          Do you have an account? <Link href="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
