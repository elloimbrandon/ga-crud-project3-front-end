import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Cart = (props) => {
  // try getting email first as they're all unique
  const [id, SetId] = useState("");
  const [email1, SetEmail1] = useState("");
  const email = "bfeltzcode@gmail.com";
  const name = "Brandon";
  const password = "Sports123";
  useEffect(() => {
    // SetId();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();
    // SetId(e.target.value);
    console.log(e.target.value);
    const url = "http://localhost:3000/users/me/addtocart";
    axios
      .post(url, {
        email: email,
        cart: e.target.value,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const getMe = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const url = "http://localhost:3000/users/me";
    axios
      .post(url, {
        email: email,
        name: name,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <>
      <ul>
        <li>
          {props.name}
          <button onClick={getMe}>get me</button>
          <button value={props.id} onClick={addToCart}>
            Add to cart
          </button>
        </li>
      </ul>
    </>
  );
};

export default Cart;
