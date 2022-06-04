// import logo from './logo.svg';
import "./App.css";
import Login from "./Login";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const itemObjectArray = [
    {
      name: "Basket Ball",
      id: "1",
    },
    {
      name: "Volley Ball",
      id: "2",
    },
    {
      name: "Base Ball",
      id: "3",
    },
    {
      name: "Foot Ball",
      id: "4",
    },
    {
      name: "Hand Ball",
      id: "5",
    },
  ];

  useEffect(() => {
    let isAuthenticated = localStorage.getItem("token");
    setIsAuth(isAuthenticated);
  });

  const toggleAuth = () => {
    setIsAuth(!isAuth);
  };

  return (
    // testing
    <div className="App">
      {isAuth ? <button onClick={toggleAuth}> Profile</button> : <Login />}
      <>
        {itemObjectArray.map((item) => {
          return (
            <div key={item.id}>
              <Cart {...item} />
            </div>
          );
        })}
      </>
    </div>
  );
}

export default App;
