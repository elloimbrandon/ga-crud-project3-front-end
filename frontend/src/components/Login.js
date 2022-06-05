import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Login = ({Email, userEmail}) => {
  // const userRef = useRef();

  const [user, setUser] = useState("");
  // const [userEmail, setuserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [login, setLogin] = useState(false)
  const [hidden, setHidden] = useState(false)

  const [show, setShow] = useState(true)

  const reveal = () => {
    setShow(!show)
  }


  const handleLogin = () => {
    let token = localStorage.getItem("token")
    console.log(token);
    if (token) {
      setLogin(!login)
    } else if (token == null) {
      alert("Please log in!")
    }
  }

  const handleNewEmail = (event) => {
    Email(event.target.value)
  }
  const handleNewUser = (event) => {
    setUser(event.target.value)
  }
  const handleNewPwd = (event) => {
    setPwd(event.target.value)
  }


  const handleHidden = () => {
    setHidden(!hidden)
  }

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // prevents the page from reloading
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    axios.post(`https://project-3-backend-ga.herokuapp.com/users/register`, {
      name: user,
      email: userEmail,
      password: pwd,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const url = "https://project-3-backend-ga.herokuapp.com/users/login";
    axios
      .post(url, {
        email: userEmail,
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
    Email("")

      alert("You have signed out!")


  };

  return (
    <>
    {login ? <div>Welcome!! {userEmail}<br/><button onClick={handleLogin}>Back to Sign in!</button><br/>

    </div> :
      <div>

      <section>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"

            autoComplete="off"
            onChange={(e) => {
              Email(e.target.value);
            }}
            value={userEmail}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"

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
        <h1>Sign in</h1>
        <form onSubmit={handleSignIn}>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="userEmail"

            autoComplete="off"
            onChange={(e) => {
              Email(e.target.value);
            }}
            value={userEmail}
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
        <button onClick={handleLogin}>Your page</button>
      </section>
      <button onClick={handleSignOut}>Sign Out</button></div>}

    </>
  );
};

export default Login;
