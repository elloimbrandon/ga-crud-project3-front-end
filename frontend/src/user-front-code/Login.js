import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // prevents the page from reloading
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    axios.post(`http://localhost:3000/users/register`, {
      name: user,
      email: email,
      password: pwd,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/users/login";
    axios
      .post(url, {
        email: email,
        password: pwd,
      })
      .then((response) => {
        var token = localStorage.setItem("token", response.data.token);
        console.log(`logged in with ` + localStorage.getItem("token", token));
      });
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    console.log(`logged out`);
    localStorage.removeItem("token");
  };

  return (
    <>
      <section>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            value={user}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            required
          />
          <button>Sign up!</button>
        </form>
      </section>
      <section>
        <form onSubmit={handleSignIn}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            required
          />
          <button>Sign in</button>
        </form>
      </section>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Login;
