import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Cart = (props) => {
  // try getting email first as they're all unique
  const [id, SetId] = useState("");
  const [email1, SetEmail1] = useState("");
  const email = "panda@gmail.com";
  const name = "panda";
  const password = "12345678";

  // const [email, setEmail] = useState('')
  // const [name, setName] = useState('')
  // const [password, setPassword] = useState('')




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
          <button value={props._id} onClick={addToCart}>
            Add to cart
          </button>
        </li>
      </ul>
    </>
  );
};

export default Cart;
