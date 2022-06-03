import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Cart = (props) => {
  // try getting email first as they're all unique
  const [id, SetId] = useState("");
  const [email1, SetEmail1] = useState("");
  const email = "bfeltzcode@gmail.com";
  const password = "Sports123";





  useEffect(() => {
    // SetId();
  }, []);

  const getEmail = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/users/email";
    axios
      .post(url, {
        email: e.target.value,
        password: password,
      })
      .then((response) => {
        console.log(response.data.user);
        SetEmail1(response.data.user.email);
        console.log(email1);
      });
  };

  // test to see if email was sent back
  //   console.log(email);

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



  return (
    <>
      <ul>
        <li>
          {props.name}
          <button value={props.id} onClick={addToCart}>
            Add to cart
          </button>
        </li>
      </ul>
    </>
  );
};

export default Cart;
