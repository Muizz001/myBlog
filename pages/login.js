import Link from "next/link";
import classes from "../styles/Auth.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        router.push("/"); // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };
  return (
    <div className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        {loginError && <p>{loginError}</p>}
        <button type="submit">Login</button>
        <span>
          Don't you have an account? <Link href="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
