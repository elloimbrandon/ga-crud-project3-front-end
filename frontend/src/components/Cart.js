import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Cart = ({item, Email}) => {
  // try getting email first as they're all unique
  const [id, SetId] = useState("");
  const [email1, SetEmail1] = useState("");
  // const email = "aloha@gmail.com";
  // const name = "aloha";
  // const password = "aloha123";

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState([])

  const [cart, setCart] = useState([])



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
        email: Email,
        cart: e.target.value,
      })
      .then((response) => {
        console.log(response.data);
        setCart(response.data)
      });

  };


  // const getMe = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   const url = "http://localhost:3000/users/me";
  //   axios
  //     .post(url, {
  //       email: email,
  //       name: name,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //
  //     });
  // };



  return (
    <>
      <ul>
        <li>
          <button value={item._id} onClick={addToCart}>
            Add to cart
          </button>
          
        </li>
      </ul>
    </>
  );
};

export default Cart;
