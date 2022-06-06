// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Login from './components/Login'
import Cart from './components/Cart'



const App = () => {

  const [store, setStore] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState('')

  const [show, setShow] = useState(false)
  const [showSports, setShowSports] = useState(false)
  const [showElectronics, setShowElectronics] = useState(false)
  const [showClothes, setShowClothes] = useState(false)
  const [showFood, setShowFood] = useState(false)
  const [showHome, setShowHome] = useState(false)

  const [newSoldOut, setNewSoldOut] = useState(false)

  const [toggleInfo, setToggleInfo] = useState(false)

  const [toggleLogin, setToggleLogin] = useState(true)


  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResult, setShowSearchResult] = useState(false)

  const [itemObjectArray, setItemObjectArray] = useState("")

  const [email, setEmail] = useState('')

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [cart, setCart] = useState([])

  const handleCart = () => {
    let token = localStorage.getItem("token")
    if (token) {
      axios.get('https://project-3-backend-ga.herokuapp.com/users/me').then((response) => {
        console.log(response.data);
        setCart(response.data)
      })
    } else if (token = null){
      alert('please log in!')
    }
  }



  const handleToggleLogin = () => {
    let token = localStorage.getItem("token")
    console.log(token);
    if (token) {
      setToggleLogin(!toggleLogin)
    } else if (token == null) {
      alert("Please log in!")
    }
  }




  const handleSoldOut = (event, storeData) => {
    event.preventDefault()
    axios.put(`https://project-3-backend-ga.herokuapp.com/store/${storeData._id}`, {
      itemName:storeData.itemName,
      category:storeData.category,
      description:storeData.description,
      price:storeData.price.$numberDecimal,
      image:storeData.image,
      rating:storeData.rating,
      soldOut:!storeData.soldOut
    }).then(() => {
      axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
      })
    })
  }

  const handleToggleInfo = (event, storeData) => {
    event.preventDefault()
    axios.put(`https://project-3-backend-ga.herokuapp.com/store/${storeData._id}`, {
      itemName:storeData.itemName,
      category:storeData.category,
      description:storeData.description,
      price:storeData.price.$numberDecimal,
      image:storeData.image,
      rating:storeData.rating,
      soldOut:!storeData.soldOut
    }).then(() => {
      axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
      })
    })
  }




  const changeToSports = () => {
    setShowSports(true)
    setShowHome(true)
    setShowElectronics(false)
    setShowClothes(false)
    setShowFood(false)

  }

  const changeToElectronics = () => {
    setShowElectronics(true)
    setShowHome(true)
    setShowSports(false)
    setShowClothes(false)
    setShowFood(false)
  }

  const changeToClothes = () => {
    setShowClothes(true)
    setShowHome(true)
    setShowSports(false)
    setShowElectronics(false)
    setShowFood(false)
  }

  const changeToFood = () => {
    setShowFood(true)
    setShowHome(true)
    setShowSports(false)
    setShowElectronics(false)
    setShowClothes(false)
  }

  const changeToHome = () => {
    setShowHome(false)
    setShowSports(false)
    setShowElectronics(false)
    setShowClothes(false)
    setShowFood(false)
  }


  const changeToSearch = (event) => {
    event.preventDefault()
    setShowSearchResult(true)
    setShowHome(true)
    setShowSports(false)
    setShowElectronics(false)
    setShowClothes(false)
    setShowFood(false)
  }



  const reveal = () => {
    setShow(!show)
  }


  const handleNewItemName = (event) => {
    setNewItemName(event.target.value)
  }
  const handleNewCategory = (event) => {
    setNewCategory(event.target.value)
  }
  const handleNewDescription = (event) => {
    setNewDescription(event.target.value)
  }
  const handleNewPrice = (event) => {
    setNewPrice(event.target.value)
  }
  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewRating = (event) => {
    setNewRating(event.target.value)
  }
  const handleSearch = (event) => {
    event.preventDefault()
    setSearchQuery(event.target.value)
  }
  const handleEmail = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }



  const newItemSubmit = (event) => {
    event.preventDefault()
    axios.post(`https://project-3-backend-ga.herokuapp.com/store`, {
      itemName:newItemName,
      category:newCategory,
      description:newDescription,
      price:newPrice,
      image:newImage,
      rating:newRating,
      soldOut:false
    }).then(() => {
      axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
        // console.log(response.data);
      })
      setNewItemName('')
      setNewCategory('')
      setNewDescription('')
      setNewPrice('')
      setNewImage('')
      setNewRating('')

    })
  }



  useEffect(() => {
    axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
    })
  }, [])


  const deleteItem = (storeData) => {
    let token = localStorage.getItem("token")
    // console.log(token);
    if (token) {
      axios.delete(`https://project-3-backend-ga.herokuapp.com/store/${storeData._id}`).then(() => {
        axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
          setStore(response.data)
        })
      })
    } else if (token == null) {
      alert("Please log in!")
    }

  }



  const updateItem = (event, storeData) => {
    event.preventDefault()
    let token = localStorage.getItem("token")
    if (token) {
      axios.put(`https://project-3-backend-ga.herokuapp.com/store/${storeData._id}`, {
        itemName:newItemName,
        category:newCategory,
        description:newDescription,
        price:newPrice,
        image:newImage,
        rating:newRating,
        soldOut:false
      }).then(() => {
        axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
          setStore(response.data)
          // console.log(response.data);
        })
        setNewItemName('')
        setNewCategory('')
        setNewDescription('')
        setNewPrice('')
        setNewImage('')
        setNewRating('')

      })
    } else if (token == null) {
        alert("Please log in!")
    }
  }



  return (
    <>

    <div className="store-container">
      <div className="top-container">
        <div className="h1">
        <div className="logo"><img onClick={changeToHome} src="https://i.postimg.cc/vBNk5NTZ/d91ac1bf29314b43a07aefc109cfd43f.png"/></div>
        <h1>Welcome to Ibay, where shopping is a pleasure!</h1>
        </div>
      <nav className="nav">
        <ul className="nav-list">
          <div className="item-1">
            <li className="nav-item nav-item-1"><i onClick={changeToSports} className="fa-solid fa-basketball"></i></li><br/>
            <h2>Sports</h2>
          </div>
          <div className="item-2">
            <li className="nav-item nav-item-2"><i onClick={changeToElectronics} className="fa-solid fa-mobile-screen-button"></i></li><br/>
            <h2>Electronics</h2>
          </div>
          <div className="item-3">
            <li className="nav-item nav-item-3"><i onClick={changeToClothes} className="fa-solid fa-shirt"></i></li><br/>
            <h2>Clothes</h2>
          </div>
          <div className="item-4">
            <li className="nav-item nav-item-4"><i onClick={changeToFood} className="fa-solid fa-burger"></i></li><br/>
            <h2>Food</h2>
          </div>
        </ul>
      </nav>
    </div>

  {toggleLogin ? <>
    <button onClick={handleToggleLogin}>Main</button><Login Email={setEmail} userEmail={email}/>
  </>:
    <div className="add-item">
    <form onSubmit={changeToSearch}>
      <input type="text" onChange={handleSearch} />
      <input type="submit" value="Search" />
    </form>
    <button onClick={handleToggleLogin}>Logout Page</button>
    <button onClick={handleCart}>Cart!</button>
    {cart.filter(inventory => inventory.email == email.toLowerCase() ).map((inventory) => {
      return(
        <>
          <ul className="cart-container">
            <hr/>
            <li className="cart-item">
              Cart: {inventory.cart} <br/>
            </li>

          </ul>
        </>
      )
    })}
      <div className="text-box">
        <p>Add</p>
        <div className="text-box-text">
          <span>Sport</span>
          <span>Electronic</span>
          <span>Clothing</span>
          <span>Food</span>
        </div>
        <p>item!!</p>
        <div className="text-box-icon">
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
      <div className="form-box">
        <form onSubmit={newItemSubmit}>
          <div className="form-name">Name:<input  type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
          <div className="form-category">Category:
              <select name="category" value={newCategory} onChange={handleNewCategory} required>
                <option value="">category</option>
                <option value="sports">Sports</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="food">Food</option>
              </select><br/>
          </div>
          <div className="form-description">Description: <input type="text" value={newDescription} onChange={handleNewDescription} required/><br/>
          </div>
          <div className="form-price">Price: <input type="text" value={newPrice} onChange={handleNewPrice} required/><br/>
          </div>
          <div className="form-image">Image:<input type="url" value={newImage} onChange={handleNewImage}/><br/>
          </div>
          <div className="form-rating">Rating:
            <select name="rating" onChange={handleNewRating} value={newRating} required>
              <option value=''>Select rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select><br/>
          </div>

          <div className="form-submit"><input type="submit" value="Add Item to the Store"/>
          </div>
        </form>
      </div>
    </div> }
      <ul className="item-container">
        {store.map((item) => {

        return (
          <>

          {showHome ? null : <li key={item._id} className="single-item">

              Name: {item.itemName}<br/>
              Category: {item.category}<br/>

              {item.soldOut ?

                 <div><p>Description: {item.description}</p><br/>
              Price: ${item.price.$numberDecimal}
              {item.image == "" ? null : <img src={item.image}/>}<br/>
              {item.rating == 1 ? <div>Rating:<i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 2 ? <div>Rating:<i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 3 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 4 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 5 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null} <button onClick={(event) => {
               handleToggleInfo(event, item)
             }}><i class="fa-solid fa-angles-up"></i></button></div>

               : <button onClick={(event) => {
                handleToggleInfo(event, item)
              }}><i class="fa-solid fa-angles-down"></i></button> }



              <button onClick={(event) => {
                deleteItem(item)
              }}>Delete this item!</button><br/>


            {item.soldOut ? <form onSubmit={(event) => {
                updateItem(event, item)
              }}>
                <div className="edit-name">Name:<input type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
                <div className="edit-category">Category:
                  <select name="category" onChange={handleNewCategory} value={newCategory} required>
                    <option value="">category</option>
                    <option value="sports">Sports</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="food">Food</option>
                  </select><br/>
                </div>
                <div className="edit-description">Description: <input value={newDescription} type="text" onChange={handleNewDescription} required/><br/>
                </div>
                <div className="edit-price">Price: <input value={newPrice} type="text" onChange={handleNewPrice} required/><br/>
                </div>
                <div className="edit-image">Image:<input value={newImage} type="url" onChange={handleNewImage}/><br/>
                </div>
                <div className="edit-rating">Rating:
                  <select name="rating" onChange={handleNewRating} value={newRating} required>
                    <option value=''>Select rating</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select><br/>
                </div>

                <div className="edit-submit"><input type="submit" value="Edit Item"/>
                </div>
                <button onClick={(event) => {
                  handleSoldOut(event, item)
                }}>Cancel Edit!</button>
                <Cart cart={cart} Email={email} item={item} />
              </form> : null}
            </li> }
              </>
            )
          })}

          {store.filter(item => item.itemName == searchQuery.toLowerCase()).map((item) =>
          {
          return (
            <>
              {showSearchResult ?
              <li key={item._id} className="single-item">

                Name: {item.itemName}<br/>
                Category: {item.category}<br/>
                {item.soldOut ?

                   <div><p>Description: {item.description}</p><br/>
                Price: ${item.price.$numberDecimal}
                {item.image == "" ? null : <img src={item.image}/>}<br/>
                {item.rating == 1 ? <div>Rating:<i className="fa-solid fa-star"></i><br/></div> : null}
                {item.rating == 2 ? <div>Rating:<i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><br/></div> : null}
                {item.rating == 3 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
                {item.rating == 4 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
                {item.rating == 5 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null} <button onClick={(event) => {
                 handleToggleInfo(event, item)
               }}><i class="fa-solid fa-angles-up"></i></button></div>

                 : <button onClick={(event) => {
                  handleToggleInfo(event, item)
                }}><i class="fa-solid fa-angles-down"></i></button> }



                <button onClick={(event) => {
                  deleteItem(item)
                }}>Delete this item!</button><br/>


                {item.soldOut ? <form onSubmit={(event) => {
                  updateItem(event, item)
                }}>
                  <div className="edit-name">Name:<input type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
                  <div className="edit-category">Category:
                    <select name="category" onChange={handleNewCategory} value={newCategory} required>
                      <option value="">category</option>
                      <option value="sports">Sports</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothes">Clothes</option>
                      <option value="food">Food</option>
                    </select><br/>
                  </div>
                  <div className="edit-description">Description: <input value={newDescription} type="text" onChange={handleNewDescription} required/><br/>
                  </div>
                  <div className="edit-price">Price: <input value={newPrice} type="text" onChange={handleNewPrice} required/><br/>
                  </div>
                  <div className="edit-image">Image:<input value={newImage} type="url" onChange={handleNewImage}/><br/>
                  </div>
                  <div className="edit-rating">Rating:
                    <select name="rating" onChange={handleNewRating} value={newRating} required>
                      <option value=''>Select rating</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </select><br/>
                  </div>

                  <div className="edit-submit"><input type="submit" value="Edit Item"/>
                  </div>
                  <button onClick={(event) => {
                    handleSoldOut(event, item)
                  }}>Cancel Edit!</button>
                </form> : <button onClick={(event) => {
                  handleSoldOut(event, item)
                }}>Edit Item</button>}
              </li> : null }
            </>
              )
            })}

        {store.filter(item => item.category == "sports").map((item) =>
        {
        return (
          <>
            {showSports ?
            <li key={item._id} className="single-item">

              Name: {item.itemName}<br/>
              Category: {item.category}<br/>
              {item.soldOut ?

                 <div><p>Description: {item.description}</p><br/>
              Price: ${item.price.$numberDecimal}
              {item.image == "" ? null : <img src={item.image}/>}<br/>
              {item.rating == 1 ? <div>Rating:<i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 2 ? <div>Rating:<i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 3 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 4 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 5 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null} <button onClick={(event) => {
               handleToggleInfo(event, item)
             }}><i class="fa-solid fa-angles-up"></i></button></div>

               : <button onClick={(event) => {
                handleToggleInfo(event, item)
              }}><i class="fa-solid fa-angles-down"></i></button> }



              <button onClick={(event) => {
                deleteItem(item)
              }}>Delete this item!</button><br/>


              {item.soldOut ? <form onSubmit={(event) => {
                updateItem(event, item)
              }}>
                <div className="edit-name">Name:<input type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
                <div className="edit-category">Category:
                  <select name="category" onChange={handleNewCategory} value={newCategory} required>
                    <option value="">category</option>
                    <option value="sports">Sports</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="food">Food</option>
                  </select><br/>
                </div>
                <div className="edit-description">Description: <input value={newDescription} type="text" onChange={handleNewDescription} required/><br/>
                </div>
                <div className="edit-price">Price: <input value={newPrice} type="text" onChange={handleNewPrice} required/><br/>
                </div>
                <div className="edit-image">Image:<input value={newImage} type="url" onChange={handleNewImage}/><br/>
                </div>
                <div className="edit-rating">Rating:
                  <select name="rating" onChange={handleNewRating} value={newRating} required>
                    <option value=''>Select rating</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select><br/>
                </div>

                <div className="edit-submit"><input type="submit" value="Edit Item"/>
                </div>
                <button onClick={(event) => {
                  handleSoldOut(event, item)
                }}>Cancel Edit!</button>
              </form> : <button onClick={(event) => {
                handleSoldOut(event, item)
              }}>Edit Item</button>}
            </li> : null }
          </>
            )
          })}

        {store.filter(item => item.category == "electronics").map((item) =>
        {
        return (
          <>
            {showElectronics ?
            <li key={item._id} className="single-item">

              Name: {item.itemName}<br/>
              Category: {item.category}<br/>
              {item.soldOut ?

                 <div><p>Description: {item.description}</p><br/>
              Price: ${item.price.$numberDecimal}
              {item.image == "" ? null : <img src={item.image}/>}<br/>
              {item.rating == 1 ? <div>Rating:<i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 2 ? <div>Rating:<i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 3 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 4 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 5 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null} <button onClick={(event) => {
               handleToggleInfo(event, item)
             }}><i class="fa-solid fa-angles-up"></i></button></div>

               : <button onClick={(event) => {
                handleToggleInfo(event, item)
              }}><i class="fa-solid fa-angles-down"></i></button> }


              <button onClick={(event) => {
                deleteItem(item)
              }}>Delete this item!</button><br/>


              {item.soldOut ? <form onSubmit={(event) => {
                updateItem(event, item)
              }}>
                <div className="edit-name">Name:<input type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
                <div className="edit-category">Category:
                  <select name="category" onChange={handleNewCategory} value={newCategory} required>
                    <option value="">category</option>
                    <option value="sports">Sports</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="food">Food</option>
                  </select><br/>
                </div>
                <div className="edit-description">Description: <input value={newDescription} type="text" onChange={handleNewDescription} required/><br/>
                </div>
                <div className="edit-price">Price: <input value={newPrice} type="text" onChange={handleNewPrice} required/><br/>
                </div>
                <div className="edit-image">Image:<input value={newImage} type="url" onChange={handleNewImage}/><br/>
                </div>
                <div className="edit-rating">Rating:
                  <select name="rating" onChange={handleNewRating} value={newRating} required>
                    <option value=''>Select rating</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select><br/>
                </div>

                <div className="edit-submit"><input type="submit" value="Edit Item"/>
                </div>
                <button onClick={(event) => {
                  handleSoldOut(event, item)
                }}>Cancel Edit!</button>
              </form> : <button onClick={(event) => {
                handleSoldOut(event, item)
              }}>Edit Item</button> }
            </li> : null }
          </>
            )
          })}

        {store.filter(item => item.category == "clothes").map((item) =>
        {
        return (
          <>
            {showClothes ?
            <li key={item._id} className="single-item">

              Name: {item.itemName}<br/>
              Category: {item.category}<br/>
              {item.soldOut ?

                 <div><p>Description: {item.description}</p><br/>
              Price: ${item.price.$numberDecimal}
              {item.image == "" ? null : <img src={item.image}/>}<br/>
              {item.rating == 1 ? <div>Rating:<i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 2 ? <div>Rating:<i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 3 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 4 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 5 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null} <button onClick={(event) => {
               handleToggleInfo(event, item)
             }}><i class="fa-solid fa-angles-up"></i></button></div>

               : <button onClick={(event) => {
                handleToggleInfo(event, item)
              }}><i class="fa-solid fa-angles-down"></i></button> }



              <button onClick={(event) => {
                deleteItem(item)
              }}>Delete this item!</button><br/>


              {item.soldOut ? <form onSubmit={(event) => {
                updateItem(event, item)
              }}>
                <div className="edit-name">Name:<input type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
                <div className="edit-category">Category:
                  <select name="category" onChange={handleNewCategory} value={newCategory} required>
                    <option value="">category</option>
                    <option value="sports">Sports</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="food">Food</option>
                  </select><br/>
                </div>
                <div className="edit-description">Description: <input value={newDescription} type="text" onChange={handleNewDescription} required/><br/>
                </div>
                <div className="edit-price">Price: <input value={newPrice} type="text" onChange={handleNewPrice} required/><br/>
                </div>
                <div className="edit-image">Image:<input value={newImage} type="url" onChange={handleNewImage}/><br/>
                </div>
                <div className="edit-rating">Rating:
                  <select name="rating" onChange={handleNewRating} value={newRating} required>
                    <option value=''>Select rating</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select><br/>
                </div>

                <div className="edit-submit"><input type="submit" value="Edit Item"/>
                </div>
                <button onClick={(event) => {
                  handleSoldOut(event, item)
                }}>Cancel Edit!</button>
              </form> : <button onClick={(event) => {
                handleSoldOut(event, item)
              }}>Edit Item</button>}
            </li> : null }
          </>
            )
          })}

        {store.filter(item => item.category == "food").map((item) =>
        {
        return (
          <>
            {showFood ?
            <li key={item._id} className="single-item">

              Name: {item.itemName}<br/>
              Category: {item.category}<br/>
              {item.soldOut ?

                 <div><p>Description: {item.description}</p><br/>
              Price: ${item.price.$numberDecimal}
              {item.image == "" ? null : <img src={item.image}/>}<br/>
              {item.rating == 1 ? <div>Rating:<i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 2 ? <div>Rating:<i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><br/></div> : null}
              {item.rating == 3 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 4 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null}
              {item.rating == 5 ? <div>Rating:<i className="fa-solid fa-star"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></i><br/></div> : null} <button onClick={(event) => {
               handleToggleInfo(event, item)
             }}><i class="fa-solid fa-angles-up"></i></button></div>

               : <button onClick={(event) => {
                handleToggleInfo(event, item)
              }}><i class="fa-solid fa-angles-down"></i></button> }



              <button onClick={(event) => {
                deleteItem(item)
              }}>Delete this item!</button><br/>


              {item.soldOut ? <form onSubmit={(event) => {
                updateItem(event, item)
              }}>
                <div className="edit-name">Name:<input type="text" value={newItemName} onChange={handleNewItemName} required/><br/></div>
                <div className="edit-category">Category:
                  <select name="category" onChange={handleNewCategory} value={newCategory} required>
                    <option value="">category</option>
                    <option value="sports">Sports</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="food">Food</option>
                  </select><br/>
                </div>
                <div className="edit-description">Description: <input value={newDescription} type="text" onChange={handleNewDescription} required/><br/>
                </div>
                <div className="edit-price">Price: <input value={newPrice} type="text" onChange={handleNewPrice} required/><br/>
                </div>
                <div className="edit-image">Image:<input value={newImage} type="url" onChange={handleNewImage}/><br/>
                </div>
                <div className="edit-rating">Rating:
                  <select name="rating" onChange={handleNewRating} value={newRating} required>
                    <option value=''>Select rating</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select><br/>
                </div>

                <div className="edit-submit"><input type="submit" value="Edit Item"/>
                </div>
                <button onClick={(event) => {
                  handleSoldOut(event, item)
                }}>Cancel Edit!</button>
              </form> : <button onClick={(event) => {
                handleSoldOut(event, item)
              }}>Edit Item</button>}
            </li> : null }
          </>
            )
          })}
        </ul>
    </div>
    </>
  )
}


export default App;
